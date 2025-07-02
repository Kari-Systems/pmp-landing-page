
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { GeoPoint, Timestamp, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loader2, Upload, X } from "lucide-react";
import { toWords } from 'number-to-words';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const propertySchema = z.object({
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  images: z.any()
    .refine((files) => files === undefined || files?.length >= 0, "Images are required.")
    .refine((files) => files === undefined || files?.length <= 5, "You can upload a maximum of 5 images.")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE);
    }, `Max file size is 5MB.`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  property_type: z.enum(["flat", "house", "villa", "plot"]),
  property_used_type: z.string().optional().nullable(),
  property_age: z.string().min(1, {message: "Required"}).optional().nullable(),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  city: z.string().min(1, { message: "City is required." }),
  locality: z.string().min(3, { message: "Locality must be at least 3 characters." }),
  area: z.string().min(1, { message: "Area is required." }),
  carpet_area: z.string().optional().nullable(),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  expected_possession_date: z.date().optional().nullable(),
  is_public: z.boolean().default(true),
  price: z.string().min(1, { message: "Price is required." }),
  neighborhood_boundaries: z.string().optional().nullable(),
  average_property_price: z.string().optional().nullable(),
  proximity_to_amenities: z.string().optional().nullable(),
  demographic_insights: z.string().optional().nullable(),
  length: z.string().optional().nullable(),
  breadth: z.string().optional().nullable(),
  plot_area_units: z.string().optional().nullable(),
  boundary_wall: z.boolean().optional().nullable(),
  corner_plot: z.boolean().optional().nullable(),
  approvals: z.string().optional().nullable(),
  private_garden_terrace_area: z.string().optional().nullable(),
  villa_type: z.string().optional().nullable(),
  plot_area: z.string().optional().nullable(),
  floor_number: z.string().optional().nullable(),
  total_floors: z.string().optional().nullable(),
  uds: z.string().optional().nullable(),
  bedrooms: z.string().optional().nullable(),
  bathrooms: z.string().optional().nullable(),
  balconies: z.string().optional().nullable(),
  facing: z.enum(["East", "West", "North", "South", "NE", "NW", "SE", "SW", "Other"]),
  furnishing: z.enum(["Unfurnished", "Semi-Furnished", "Furnished"]).optional().nullable(),
  amenities: z.string().optional().nullable(),
  facilities: z.string().optional().nullable(),
  availability_status: z.string().optional().nullable(),
  ownership: z.string().optional().nullable(),
  parking: z.string().optional().nullable(),
}).superRefine((data, ctx) => {
    if (data.property_type === 'house' && !data.uds) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "UDS (Undivided Share) is required for House type.",
        path: ['uds'],
      });
    }
    if (data.property_type === 'flat' && !data.floor_number) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Floor number is required for Flat type.",
            path: ['floor_number'],
        });
    }
  });

type PropertyFormValues = z.infer<typeof propertySchema>;

const CONVERSIONS = {
  FEET_TO_METERS: 0.3048,
  METERS_TO_FEET: 3.28084,
  // Base unit is Sq. Feet
  UNITS_TO_SQFEET: {
    "Sq. Yards": 9,
    "Sq. Meters": 10.7639,
    "Acres": 43560,
    "Guntas": 1089,
    "Sq. Feet": 1,
  },
};

export default function AddPropertyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<{url: string, file: File}[]>([]);
  const [priceInWords, setPriceInWords] = React.useState("");

  const [lengthUnit, setLengthUnit] = React.useState("feet");
  const [breadthUnit, setBreadthUnit] = React.useState("feet");
  const [lastChangedSource, setLastChangedSource] = React.useState<"dims" | "area" | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      is_public: true,
      images: undefined,
      city: "Hyderabad",
      plot_area_units: "Sq. Yards",
    },
  });

  const propertyType = form.watch("property_type");
  const priceValue = form.watch("price");

  const { watch, setValue, getValues } = form;
  const watchedPlotFields = watch(['length', 'breadth', 'area', 'plot_area_units']);

  React.useEffect(() => {
      if (!lastChangedSource) return;

      const lengthVal = parseFloat(getValues('length') || '0');
      const breadthVal = parseFloat(getValues('breadth') || '0');
      const areaVal = parseFloat(getValues('area') || '0');
      const areaUnit = getValues('plot_area_units') || 'Sq. Yards';

      const lengthInFeet = lengthUnit === 'meters' ? lengthVal * CONVERSIONS.METERS_TO_FEET : lengthVal;
      const breadthInFeet = breadthUnit === 'meters' ? breadthVal * CONVERSIONS.METERS_TO_FEET : breadthVal;

      if (lastChangedSource === 'dims') {
          const areaInSqFeet = lengthInFeet * breadthInFeet;
          if (areaInSqFeet > 0) {
              const conversionFactor = CONVERSIONS.UNITS_TO_SQFEET[areaUnit as keyof typeof CONVERSIONS.UNITS_TO_SQFEET] || 1;
              const newArea = areaInSqFeet / conversionFactor;
              if (Math.abs(newArea - areaVal) > 0.01) {
                setValue('area', newArea.toFixed(2));
              }
          }
      } else if (lastChangedSource === 'area') {
          const conversionFactor = CONVERSIONS.UNITS_TO_SQFEET[areaUnit as keyof typeof CONVERSIONS.UNITS_TO_SQFEET] || 1;
          const areaInSqFeet = areaVal * conversionFactor;

          if (areaInSqFeet > 0) {
              if (lengthInFeet > 0) {
                  const newBreadthInFeet = areaInSqFeet / lengthInFeet;
                  const newBreadth = breadthUnit === 'meters' ? newBreadthInFeet * CONVERSIONS.FEET_TO_METERS : newBreadthInFeet;
                   if (Math.abs(newBreadth - breadthVal) > 0.01) {
                     setValue('breadth', newBreadth.toFixed(2));
                   }
              } else {
                  const sideInFeet = Math.sqrt(areaInSqFeet);
                  const newLength = lengthUnit === 'meters' ? sideInFeet * CONVERSIONS.FEET_TO_METERS : sideInFeet;
                  const newBreadth = breadthUnit === 'meters' ? sideInFeet * CONVERSIONS.FEET_TO_METERS : sideInFeet;
                  if (Math.abs(newLength - lengthVal) > 0.01) {
                    setValue('length', newLength.toFixed(2));
                  }
                  if (Math.abs(newBreadth - breadthVal) > 0.01) {
                    setValue('breadth', newBreadth.toFixed(2));
                  }
              }
          }
      }
      setLastChangedSource(null); // Reset after calculation
  }, [watchedPlotFields, lengthUnit, breadthUnit, lastChangedSource, getValues, setValue]);


  const numberToWordsIndian = (price: string) => {
      const num = Number(String(price).replace(/,/g, ''));
      if (isNaN(num) || num <= 0) return '';

      const crore = Math.floor(num / 10000000);
      const lakh = Math.floor((num % 10000000) / 100000);
      const remainder = num % 100000;

      let words = '';
      if (crore > 0) {
          words += `${toWords(crore)} Crore `;
      }
      if (lakh > 0) {
          words += `${toWords(lakh)} Lakh `;
      }
      if (remainder > 0) {
          words += toWords(remainder);
      }

      if (words.trim() === '') return '';

      const finalString = words.trim().replace(/\s\s+/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
      return `${finalString} Rupees Only`;
  };


  React.useEffect(() => {
    try {
      const words = numberToWordsIndian(priceValue);
      setPriceInWords(words);
    } catch (e) {
      setPriceInWords("");
    }
  }, [priceValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const currentFiles = form.getValues("images") || [];
      const newFiles = Array.from(files);
      const allFiles = [...currentFiles, ...newFiles];

      if (allFiles.length > 5) {
        toast({ title: "Error", description: "You can upload a maximum of 5 images.", variant: "destructive" });
        return;
      }
      
      const newPreviews = newFiles.map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      form.setValue("images", allFiles as any);
    }
  };

  const handleImageDelete = (indexToDelete: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== indexToDelete));
    const currentFiles = form.getValues("images") || [];
    const updatedFiles = currentFiles.filter((_: any, i: number) => i !== indexToDelete);
    form.setValue("images", updatedFiles);
  };

  async function onSubmit(values: PropertyFormValues) {
    setIsLoading(true);
    try {
      const id = `F${String(Math.floor(Math.random() * 900000000) + 100000000)}`;
      const createdAt = Timestamp.now();
      const validityEnd = Timestamp.fromDate(addDays(createdAt.toDate(), 30));

      let imageUrls: string[] = [];
      if (values.images && values.images.length > 0) {
        for (const file of Array.from(values.images as FileList)) {
          const storageRef = ref(storage, `properties/${id}/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadURL);
        }
      }

      const isPlot = values.property_type === 'plot';
      const isHouse = values.property_type === 'house';
      const isVilla = values.property_type === 'villa';

      const propertyData = {
        id,
        created_at: createdAt,
        updated_at: null,
        validity_end: validityEnd,
        
        description: values.description,
        property_type: values.property_type,
        price: values.price,
        
        address: values.address,
        city: values.city,
        locality: values.locality,
        map_location: values.latitude && values.longitude ? new GeoPoint(values.latitude, values.longitude) : null,
        
        is_public: values.is_public,
        paid: false,
        duplicate_hash: null,

        images: !isPlot ? imageUrls : [],
        contacted_leads: [],
        shortlisted_leads: [],

        property_used_type: values.property_used_type || null,
        property_age: values.property_age || null,
        area: values.area,
        facing: values.facing,
        approvals: values.approvals || null,
        ownership: values.ownership || null,
        availability_status: values.availability_status || null,
        expected_possession_date: values.expected_possession_date ? Timestamp.fromDate(values.expected_possession_date) : null,
        
        // Non-Plot Specifics
        carpet_area: !isPlot ? values.carpet_area : null,
        bedrooms: !isPlot ? values.bedrooms : null,
        bathrooms: !isPlot ? values.bathrooms : null,
        balconies: !isPlot ? values.balconies : null,
        furnishing: !isPlot ? values.furnishing : null,
        floor_number: !isPlot ? values.floor_number : null,
        total_floors: !isPlot ? values.total_floors : null,
        parking: !isPlot ? values.parking : null,
        amenities: !isPlot ? values.amenities : null,
        facilities: !isPlot ? values.facilities : null,
        private_garden_terrace_area: !isPlot ? values.private_garden_terrace_area : null,
        
        // House/Villa Specifics
        uds: (isHouse || isVilla) ? values.uds : null,
        villa_type: isVilla ? values.villa_type : null,
        
        // Plot Specifics
        length: isPlot ? values.length : null,
        breadth: isPlot ? values.breadth : null,
        plot_area: isPlot ? values.area : null,
        plot_area_units: isPlot ? values.plot_area_units : null,
        boundary_wall: isPlot ? values.boundary_wall ?? null : null,
        corner_plot: isPlot ? values.corner_plot ?? null : null,

        // Legacy fields for schema consistency, can be cleaned up later
        neighborhood_boundaries: values.neighborhood_boundaries || null,
        average_property_price: values.average_property_price || null,
        proximity_to_amenities: values.proximity_to_amenities || null,
        demographic_insights: values.demographic_insights || null,
      };

      await setDoc(doc(db, "properties", id), propertyData);

      toast({
        title: "Success!",
        description: "Your property has been listed successfully.",
      });
      router.push("/");

    } catch (error) {
      console.error("Error submitting property:", error);
      toast({
        title: "Error",
        description: "Failed to list property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageContainer>
      <Section>
        <SectionTitle>Add a New Property</SectionTitle>
        <p className="text-center text-lg text-muted-foreground -mt-8 mb-12 max-w-3xl mx-auto">
          Fill out the details below to list your property on our platform.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <Card>
              <CardHeader><CardTitle>1. Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="property_type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select property type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="house">House / Independent House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="plot">Plot</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe your property..." {...field} value={field.value ?? ""} rows={5} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (in Rs.)</FormLabel>
                    <FormControl><Input placeholder="e.g., 50,00,000" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                    {priceInWords && <p className="text-sm font-medium text-muted-foreground capitalize pt-2">{priceInWords}</p>}
                    <FormMessage />
                  </FormItem>
                )} />
                {propertyType !== 'plot' && (
                  <FormField control={form.control} name="images" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Images (Max 5)</FormLabel>
                       <FormControl>
                          <div className="relative">
                              <Input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isLoading}/>
                              <label htmlFor="images" className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                  <div className="text-center">
                                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                      <p className="mt-2 text-sm text-muted-foreground">Click or drag files to upload</p>
                                  </div>
                              </label>
                          </div>
                      </FormControl>
                      <FormMessage />
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                          {imagePreviews.map((preview, i) => (
                              <div key={i} className="relative">
                                  <img src={preview.url} alt={`Preview ${i+1}`} className="w-full h-24 object-cover rounded-md"/>
                                  <Button type="button" size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 z-10" onClick={() => handleImageDelete(i)}>
                                      <X className="h-4 w-4"/>
                                  </Button>
                              </div>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  )} />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader><CardTitle>2. Location Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Full Address</FormLabel>
                    <FormControl><Input placeholder="e.g., 123 Main St, Hitech City" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Hyderabad">Hyderabad</SelectItem></SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="locality" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locality / Area</FormLabel>
                    <FormControl><Input placeholder="e.g., Madhapur (or type a new one)" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                    <FormDescription>Start typing to see suggestions or add a new locality.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
                 <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="latitude" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude (Optional)</FormLabel>
                            <FormControl><Input type="number" step="any" placeholder="17.4474" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="longitude" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude (Optional)</FormLabel>
                            <FormControl><Input type="number" step="any" placeholder="78.3762" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
              </CardContent>
            </Card>

            {/* Property Specifics - For Flat, House, Villa */}
            {(propertyType === 'flat' || propertyType === 'house' || propertyType === 'villa') && (
              <Card>
                <CardHeader><CardTitle>3. Property Specifications</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="bedrooms" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Bedrooms</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value ?? ""} disabled={isLoading}>
                           <FormControl><SelectTrigger><SelectValue placeholder="Select bedrooms" /></SelectTrigger></FormControl>
                           <SelectContent>
                             {['1', '2', '3', '4', '5+'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                           </SelectContent>
                         </Select>
                         <FormMessage />
                       </FormItem>
                    )} />
                    <FormField control={form.control} name="bathrooms" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Bathrooms</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value ?? ""} disabled={isLoading}>
                           <FormControl><SelectTrigger><SelectValue placeholder="Select bathrooms" /></SelectTrigger></FormControl>
                           <SelectContent>
                             {['1', '2', '3', '4', '5+'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                           </SelectContent>
                         </Select>
                         <FormMessage />
                       </FormItem>
                    )} />
                    <FormField control={form.control} name="balconies" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Balconies</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value ?? ""} disabled={isLoading}>
                           <FormControl><SelectTrigger><SelectValue placeholder="Select balconies" /></SelectTrigger></FormControl>
                           <SelectContent>
                             {['0', '1', '2', '3', '4'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                           </SelectContent>
                         </Select>
                         <FormMessage />
                       </FormItem>
                    )} />
                    <FormField control={form.control} name="furnishing" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Furnishing</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined} disabled={isLoading}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select furnishing" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {["Unfurnished", "Semi-Furnished", "Furnished"].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="floor_number" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Floor Number</FormLabel>
                            <FormControl><Input placeholder="e.g., 5 or G" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="total_floors" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Floors in Building</FormLabel>
                            <FormControl><Input placeholder="e.g., 12" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    {(propertyType === 'house' || propertyType === 'villa') &&
                      <FormField control={form.control} name="uds" render={({ field }) => (
                        <FormItem>
                            <FormLabel>UDS (Undivided Share)</FormLabel>
                            <FormControl><Input placeholder="e.g., 50 sq yards" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                      )} />
                    }
                     {propertyType === 'villa' &&
                      <FormField control={form.control} name="villa_type" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Villa Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? ""} disabled={isLoading}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select Villa Type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Simplex">Simplex</SelectItem>
                                    <SelectItem value="Duplex">Duplex</SelectItem>
                                    <SelectItem value="Triplex">Triplex</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                      )} />
                    }
                </CardContent>
              </Card>
            )}

            {/* Plot Specifics - Conditional */}
            {propertyType === "plot" && (
                <Card>
                    <CardHeader><CardTitle>3. Plot Specifications</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="length" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Length</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g., 60" 
                                            {...field} 
                                            value={field.value ?? ""} 
                                            disabled={isLoading}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setLastChangedSource("dims");
                                            }}
                                        />
                                    </FormControl>
                                    <Select value={lengthUnit} onValueChange={(newUnit) => {
                                        const value = parseFloat(getValues('length') || '0');
                                        if (value > 0) {
                                            if (lengthUnit === 'feet' && newUnit === 'meters') {
                                                setValue('length', (value * CONVERSIONS.FEET_TO_METERS).toFixed(2));
                                            } else if (lengthUnit === 'meters' && newUnit === 'feet') {
                                                setValue('length', (value * CONVERSIONS.METERS_TO_FEET).toFixed(2));
                                            }
                                        }
                                        setLengthUnit(newUnit);
                                        setLastChangedSource("dims");
                                    }}>
                                        <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="feet">Feet</SelectItem>
                                            <SelectItem value="meters">Meters</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="breadth" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Breadth</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g., 30" 
                                            {...field} 
                                            value={field.value ?? ""} 
                                            disabled={isLoading} 
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setLastChangedSource("dims");
                                            }}
                                        />
                                    </FormControl>
                                     <Select value={breadthUnit} onValueChange={(newUnit) => {
                                        const value = parseFloat(getValues('breadth') || '0');
                                        if (value > 0) {
                                            if (breadthUnit === 'feet' && newUnit === 'meters') {
                                                setValue('breadth', (value * CONVERSIONS.FEET_TO_METERS).toFixed(2));
                                            } else if (breadthUnit === 'meters' && newUnit === 'feet') {
                                                setValue('breadth', (value * CONVERSIONS.METERS_TO_FEET).toFixed(2));
                                            }
                                        }
                                        setBreadthUnit(newUnit);
                                        setLastChangedSource("dims");
                                    }}>
                                        <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="feet">Feet</SelectItem>
                                            <SelectItem value="meters">Meters</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )} />

                       <div className="grid grid-cols-1 gap-2 md:col-span-2">
                           <FormField control={form.control} name="area" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Total Area</FormLabel>
                                   <div className="flex items-center gap-2">
                                      <FormControl>
                                        <Input 
                                            placeholder="e.g., 1800" 
                                            {...field} 
                                            value={field.value ?? ""} 
                                            disabled={isLoading} 
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setLastChangedSource("area");
                                            }}
                                        />
                                    </FormControl>
                                     <FormField control={form.control} name="plot_area_units" render={({ field: unitField }) => (
                                        <Select 
                                            value={unitField.value} 
                                            onValueChange={(newUnit) => {
                                                const oldUnit = getValues('plot_area_units');
                                                const areaValue = parseFloat(getValues('area') || '0');
                                                if (areaValue > 0 && oldUnit) {
                                                    const oldFactor = CONVERSIONS.UNITS_TO_SQFEET[oldUnit as keyof typeof CONVERSIONS.UNITS_TO_SQFEET] || 1;
                                                    const newFactor = CONVERSIONS.UNITS_TO_SQFEET[newUnit as keyof typeof CONVERSIONS.UNITS_TO_SQFEET] || 1;
                                                    const areaInSqFt = areaValue * oldFactor;
                                                    const newArea = areaInSqFt / newFactor;
                                                    setValue('area', newArea.toFixed(2));
                                                }
                                                unitField.onChange(newUnit);
                                                setLastChangedSource("area");
                                            }}
                                        >
                                            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Units" /></SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(CONVERSIONS.UNITS_TO_SQFEET).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                     )} />
                                  </div>
                                  <FormMessage />
                              </FormItem>
                           )} />
                        </div>

                        <FormField control={form.control} name="approvals" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Approvals</FormLabel>
                              <FormControl><Input placeholder="e.g., HMDA, DTCP" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                              <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="facing" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facing</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select direction" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {["East", "West", "North", "South", "NE", "NW", "SE", "SW", "Other"].map(dir => <SelectItem key={dir} value={dir}>{dir}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="boundary_wall" render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel>Boundary Wall Made</FormLabel></div>
                            <FormControl><Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} /></FormControl>
                          </FormItem>
                        )} />
                         <FormField control={form.control} name="corner_plot" render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel>Is it a Corner Plot?</FormLabel></div>
                            <FormControl><Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} /></FormControl>
                          </FormItem>
                        )} />
                    </CardContent>
                </Card>
            )}


            <Card>
                <CardHeader><CardTitle>4. Additional Details</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { propertyType !== 'plot' &&
                      <FormField control={form.control} name="area" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Total Built-up Area (sq ft)</FormLabel>
                              <FormControl><Input placeholder="e.g., 1200" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                              <FormMessage />
                          </FormItem>
                       )} />
                    }
                    { propertyType !== 'plot' &&
                      <FormField control={form.control} name="carpet_area" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Carpet Area (sq ft)</FormLabel>
                              <FormControl><Input placeholder="e.g., 900" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                              <FormMessage />
                          </FormItem>
                       )} />
                    }
                     <FormField control={form.control} name="facing" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Facing</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select direction" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {["East", "West", "North", "South", "NE", "NW", "SE", "SW", "Other"].map(dir => <SelectItem key={dir} value={dir}>{dir}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                     )} />
                    <FormField control={form.control} name="property_age" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property Age</FormLabel>
                            <FormControl><Input placeholder="e.g., 5 years" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="ownership" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ownership</FormLabel>
                            <FormControl><Input placeholder="e.g., Freehold" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    { propertyType !== 'plot' &&
                    <FormField control={form.control} name="parking" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parking</FormLabel>
                            <FormControl><Input placeholder="e.g., 1 Covered" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    }
                    <FormField control={form.control} name="availability_status" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Availability Status</FormLabel>
                            <FormControl><Input placeholder="e.g., Ready to move" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    { propertyType !== 'plot' &&
                      <FormField control={form.control} name="approvals" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Building Approvals</FormLabel>
                              <FormControl><Input placeholder="e.g., GHMC" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                    }
                    { propertyType !== 'plot' &&
                      <FormField control={form.control} name="amenities" render={({ field }) => (
                          <FormItem className="md:col-span-full">
                              <FormLabel>Amenities (comma separated)</FormLabel>
                              <FormControl><Input placeholder="e.g., Gym, Swimming Pool, Clubhouse" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                    }
                </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>5. Publishing</CardTitle></CardHeader>
              <CardContent>
                 <FormField control={form.control} name="is_public" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Publish Listing</FormLabel>
                            <FormDescription>
                                Make this property listing visible to everyone on the platform.
                            </FormDescription>
                        </div>
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full text-lg" size="lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : "Submit Property"}
            </Button>
          </form>
        </Form>
      </Section>
    </PageContainer>
  );
}
