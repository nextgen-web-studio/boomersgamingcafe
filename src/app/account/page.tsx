"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Button } from "@/components/ui/Button";
import { User, LogOut, Package, Gamepad2, Heart } from "lucide-react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-card border border-white/10 rounded-2xl p-6 text-center shadow-lg">
              <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10" />
              </div>
              <h2 className="text-white font-bold truncate" title={user.email}>{user.email}</h2>
              <p className="text-white/50 text-sm mt-1">Player</p>
            </div>
            
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                <Package className="h-5 w-5 text-primary" /> My Library
              </button>
              <button className="w-full flex items-center gap-3 text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors">
                <Gamepad2 className="h-5 w-5 text-yellow-500" /> Subscription
              </button>
              <button className="w-full flex items-center gap-3 text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors">
                <Heart className="h-5 w-5 text-red-500" /> Wishlist
              </button>
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 px-4 py-3 rounded-lg font-medium transition-colors mt-8"
              >
                <LogOut className="h-5 w-5" /> Sign Out
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <h1 className="text-3xl font-bold text-white mb-6">My Library</h1>
            
            {/* Empty State for now until we link real purchases */}
            <div className="bg-card border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center">
              <Gamepad2 className="h-16 w-16 text-white/20 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No games yet</h3>
              <p className="text-white/60 mb-6">You haven't bought or rented any games.</p>
              <Button onClick={() => router.push('/')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Browse Store
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
