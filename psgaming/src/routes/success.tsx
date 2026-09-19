import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f3f4f6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-xl border-t-4 border-t-green-500 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="size-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#1f2937] mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">Thank you for your purchase. Your transaction has been completed and your account is updated.</p>
        
        <Button className="w-full rounded-none bg-[#0070cc] hover:bg-[#005fb3] text-white font-semibold py-6" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
