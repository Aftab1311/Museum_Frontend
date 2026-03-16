import { Landmark, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cultural-ink text-[#f5f5f0] py-12 mt-20">
      <div className="px-4 sm:px-6 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="h-8 w-8 text-[#5A5A40]" />
              <span className="font-serif text-2xl font-semibold tracking-tight">
                NaijaHeritage
              </span>
            </div>
            <p className="text-sm text-[#f5f5f0]/70 max-w-md leading-relaxed">
              A digital museum dedicated to preserving, integrating, and showcasing the rich cultural heritage, artifacts, and history of Nigeria for the world to explore.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#5A5A40]">Explore</h4>
            <ul className="space-y-2 text-sm text-[#f5f5f0]/70">
              <li><a href="/gallery" className="hover:text-white transition-colors">Artifacts</a></li>
              <li><a href="/gallery?category=Tribes" className="hover:text-white transition-colors">Tribes</a></li>
              <li><a href="/gallery?category=Festivals" className="hover:text-white transition-colors">Festivals</a></li>
              <li><a href="/map" className="hover:text-white transition-colors">Interactive Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#5A5A40]">Project</h4>
            <ul className="space-y-2 text-sm text-[#f5f5f0]/70">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Admin Login</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#f5f5f0]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#f5f5f0]/50">
          <p>© {new Date().getFullYear()} NaijaHeritage Digital Museum. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Built with <Heart className="h-3 w-3 text-red-500" /> for Final Year Project
          </p>
        </div>
      </div>
    </footer>
  );
}
