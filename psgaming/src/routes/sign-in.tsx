import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-xl border-t-4 border-t-primary">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-tighter">PS</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#1f2937] mb-6">Sign In to PlayStation</h1>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Sign in is purely visual for now!"); }}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Sign-In ID (Email Address)</label>
            <Input type="email" required className="rounded-none border-gray-300 focus-visible:ring-primary focus-visible:border-primary" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input type="password" required className="rounded-none border-gray-300 focus-visible:ring-primary focus-visible:border-primary" />
          </div>
          
          <Button type="submit" className="w-full rounded-none bg-primary hover:bg-primary/90 text-white font-semibold py-6">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm space-y-4">
          <a href="#" className="text-primary hover:underline font-medium block">Trouble Signing In?</a>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full rounded-none border-gray-300 font-semibold py-6" asChild>
            <Link to="/">Create New Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
