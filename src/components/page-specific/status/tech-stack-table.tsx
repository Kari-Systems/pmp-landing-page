
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


const techStack = [
  { component: "Frontend Framework", technology: "React.js / Next.js", purpose: "Building fast, scalable, and SEO-friendly user interfaces." },
  { component: "Styling", technology: "Tailwind CSS", purpose: "Utility-first CSS framework for rapid UI development and consistent design." },
  { component: "UI Components", technology: "ShadCN UI", purpose: "Beautifully designed, accessible, and customizable components." },
  { component: "Language", technology: "TypeScript", purpose: "Strong typing for improved code quality and maintainability." },
  { component: "Hosting/Deployment", technology: "Vercel / Firebase", purpose: "Reliable and scalable hosting solutions for Next.js applications." },
  { component: "Database (Potential)", technology: "Firebase Firestore / Supabase", purpose: "Flexible and scalable NoSQL/SQL database options for user data and listings." },
  { component: "State Management", technology: "React Context / Zustand", purpose: "Efficient state management for complex applications." },
];

export function TechStackTable() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-center">Our Technology Stack</CardTitle>
        <CardDescription className="text-center">
          A glimpse into the technologies powering Post My Property, ensuring a robust and modern platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>This stack enables rapid development and a high-quality user experience.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Component</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead>Purpose</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {techStack.map((item) => (
              <TableRow key={item.component}>
                <TableCell className="font-medium">{item.component}</TableCell>
                <TableCell>{item.technology}</TableCell>
                <TableCell>{item.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
