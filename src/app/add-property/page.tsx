
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { GeoPoint, Timestamp, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loader2, Upload } from "lucide-react";

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
    .refine((files) => files?.length >= 0, "Images are required.")
    .refine((files) => files?.length <= 5, "You can upload a maximum of 5 images.")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE);
    }, `Max file size is 5MB.`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  property_type: z.enum(["Flat", "Villa", "Plot", "Commercial", "Other"]),
  property_used_type: z.string().optional().nullable(),
  property_age: z.string().min(1, {message: "Required"}).optional().nullable(),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
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
  boundary_wall: z.boolean().optional().nullable(),
  corner_plot: z.boolean().optional().nullable(),
  approvals: z.string().optional().nullable(),
  private_garden_terrace_area: z.string().optional().nullable(),
  villa_type: z.string().optional().nullable(),
  plot_area: z.string().optional().nullable(),
  floor_number: z.coerce.number().optional().nullable(),
  total_floors: z.coerce.number().optional().nullable(),
  uds: z.string().min(1, {message: "Required"}),
  bedrooms: z.coerce.number().optional().nullable(),
  bathrooms: z.coerce.number().optional().nullable(),
  balconies: z.string().optional().nullable(),
  facing: z.enum(["East", "West", "North", "South", "NE", "NW", "SE", "SW", "Other"]),
  furnishing: z.enum(["Unfurnished", "Semi-Furnished", "Furnished"]),
  amenities: z.string().optional().nullable(),
  facilities: z.string().optional().nullable(),
  availability_status: z.string().optional().nullable(),
  ownership: z.string().optional().nullable(),
  parking: z.string().optional().nullable(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function AddPropertyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      is_public: true,
      images: undefined,
    },
  });

  const propertyType = form.watch("property_type");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      form.setValue("images", files as any);
    }
  };

  async function onSubmit(values: PropertyFormValues) {
    setIsLoading(true);
    try {
      const id = `F${String(Math.floor(Math.random() * 900000000) + 100000000)}`;
      const createdAt = Timestamp.now();
      const validityEnd = Timestamp.fromDate(addDays(createdAt.toDate(), 30));

      // 1. Upload images to Firebase Storage
      let imageUrls: string[] = [];
      if (values.images && values.images.length > 0) {
        for (const file of Array.from(values.images as FileList)) {
          const storageRef = ref(storage, `properties/${id}/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadURL);
        }
      }

      // 2. Prepare data for Firestore
      const propertyData = {
        id,
        images: imageUrls,
        contacted_leads: [],
        shortlisted_leads: [],
        description: values.description,
        property_type: values.property_type,
        property_used_type: values.property_used_type || null,
        property_age: values.property_age || null,
        address: values.address,
        area: values.area,
        carpet_area: values.carpet_area || null,
        map_location: values.latitude && values.longitude ? new GeoPoint(values.latitude, values.longitude) : null,
        created_at: createdAt,
        updated_at: null,
        expected_possession_date: values.expected_possession_date ? Timestamp.fromDate(values.expected_possession_date) : null,
        validity_end: validityEnd,
        is_public: values.is_public,
        paid: false,
        duplicate_hash: null, // As requested
        price: values.price,
        neighborhood_boundaries: values.neighborhood_boundaries || null,
        average_property_price: values.average_property_price || null,
        proximity_to_amenities: values.proximity_to_amenities || null,
        demographic_insights: values.demographic_insights || null,
        locality: values.locality,
        length: values.length || null,
        breadth: values.breadth || null,
        boundary_wall: values.boundary_wall ?? null,
        corner_plot: values.corner_plot ?? null,
        approvals: values.approvals || null,
        private_garden_terrace_area: values.private_garden_terrace_area || null,
        villa_type: values.villa_type || null,
        plot_area: values.plot_area || null,
        floor_number: values.floor_number ?? null,
        total_floors: values.total_floors ?? null,
        uds: values.uds,
        bedrooms: values.bedrooms ?? null,
        bathrooms: values.bathrooms ?? null,
        balconies: values.balconies || null,
        facing: values.facing,
        furnishing: values.furnishing,
        amenities: values.amenities || null,
        facilities: values.facilities || null,
        availability_status: values.availability_status || null,
        ownership: values.ownership || null,
        parking: values.parking || null,
      };

      // 3. Save to Firestore
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

            {/* Basic Info */}
            <Card>
              <CardHeader><CardTitle>1. Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="property_type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select property type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["Flat", "Villa", "Plot", "Commercial", "Other"].map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe your property..." {...field} rows={5} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (in Rs.)</FormLabel>
                    <FormControl><Input placeholder="e.g., 50,00,000" {...field} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
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
                        {imagePreviews.map((src, i) => <img key={i} src={src} alt={`Preview ${i+1}`} className="w-full h-24 object-cover rounded-md"/>)}
                      </div>
                    )}
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card>
              <CardHeader><CardTitle>2. Location Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Full Address</FormLabel>
                    <FormControl><Input placeholder="e.g., 123 Main St, Hitech City" {...field} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="locality" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locality / Area</FormLabel>
                    <FormControl><Input placeholder="e.g., Madhapur" {...field} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <div className="grid grid-cols-2 gap-4">
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

            {/* Property Specifics */}
            {(propertyType === "Flat" || propertyType === "Villa" || propertyType === "Commercial") && (
              <Card>
                <CardHeader><CardTitle>3. Property Specifications</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    { (propertyType === 'Flat' || propertyType === 'Villa') && <>
                         <FormField control={form.control} name="bedrooms" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 3" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                         )} />
                         <FormField control={form.control} name="bathrooms" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 2" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="balconies" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Balconies</FormLabel>
                                <FormControl><Input placeholder="e.g., 2" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                         )} />
                    </> }

                    { propertyType === 'Flat' && <>
                        <FormField control={form.control} name="floor_number" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Floor Number</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 5" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="total_floors" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Floors</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 12" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </>}

                    { propertyType === 'Villa' && <>
                        <FormField control={form.control} name="villa_type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Villa Type</FormLabel>
                                <FormControl><Input placeholder="e.g., Duplex" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </>}
                    
                    <FormField control={form.control} name="furnishing" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Furnishing</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select furnishing" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {["Unfurnished", "Semi-Furnished", "Furnished"].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                            </Select>
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
                     <FormField control={form.control} name="uds" render={({ field }) => (
                      <FormItem>
                          <FormLabel>UDS (Undivided Share)</FormLabel>
                          <FormControl><Input placeholder="e.g., 50 sq yards" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                          <FormMessage />
                      </FormItem>
                    )} />
                </CardContent>
              </Card>
            )}

            {/* Plot Specifics */}
            {propertyType === "Plot" && (
                <Card>
                    <CardHeader><CardTitle>3. Plot Specifications</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="plot_area" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plot Area (sq yards)</FormLabel>
                                <FormControl><Input placeholder="e.g., 200" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="length" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Length (ft)</FormLabel>
                                <FormControl><Input placeholder="e.g., 60" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="breadth" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Breadth (ft)</FormLabel>
                                <FormControl><Input placeholder="e.g., 30" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
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


            {/* Other Details */}
            <Card>
                <CardHeader><CardTitle>4. Additional Details</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField control={form.control} name="area" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Area (sq ft)</FormLabel>
                            <FormControl><Input placeholder="e.g., 1200" {...field} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                    <FormField control={form.control} name="carpet_area" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Carpet Area (sq ft)</FormLabel>
                            <FormControl><Input placeholder="e.g., 900" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
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
                    <FormField control={form.control} name="parking" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parking</FormLabel>
                            <FormControl><Input placeholder="e.g., 1 Covered" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="availability_status" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Availability Status</FormLabel>
                            <FormControl><Input placeholder="e.g., Ready to move" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="approvals" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Approvals</FormLabel>
                            <FormControl><Input placeholder="e.g., GHMC" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="amenities" render={({ field }) => (
                        <FormItem className="md:col-span-3">
                            <FormLabel>Amenities (comma separated)</FormLabel>
                            <FormControl><Input placeholder="e.g., Gym, Swimming Pool, Clubhouse" {...field} value={field.value ?? ""} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
            </Card>

            {/* Publishing */}
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
