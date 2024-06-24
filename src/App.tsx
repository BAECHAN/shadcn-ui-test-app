import "./App.css";
import { Button } from "./@/components/ui/index";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./@/components/ui/alert";

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
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
    </div>
  );
}

export default App;
