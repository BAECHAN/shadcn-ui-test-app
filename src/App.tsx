import "./App.css";
import {
  Button,
  Alert,
  AlertDescription,
  AlertTitle,
  Calendar,
  Carousel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
  Card,
  Checkbox,
} from "@/shared/lib/shadcn-ui/components/ui";
import SidebarLayout from "@/SidebarLayout";
import { useState } from "react";

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <SidebarLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
          <h1 className="text-2xl font-bold">Hello, ShadCN + TailwindCSS!</h1>
          <p className="text-gray-700">
            This is a simple example using TailwindCSS with ShadCN in a Vite +
            React + TypeScript project.
          </p>
        </div>
        <Button onClick={() => setShowAlert((prev) => !prev)}>Click me!</Button>
        {showAlert && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Alert!</AlertTitle>
            <AlertDescription>This is a destructive alert!</AlertDescription>
          </Alert>
        )}
        <Calendar />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Badge variant="secondary">Secondary</Badge>
        <Card>카드</Card>
        <Checkbox>ffd</Checkbox>
      </div>
    </SidebarLayout>
  );
}

export default App;
