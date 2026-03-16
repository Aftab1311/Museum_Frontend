import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const REGIONS = [
  { 
    id: "north-west", 
    name: "North-West", 
    position: [12.0, 6.0], 
    tribes: "Hausa, Fulani", 
    desc: "Known for the Sokoto Caliphate, ancient trade routes, and rich Islamic scholarship.",
    image: "hausa"
  },
  { 
    id: "north-east", 
    name: "North-East", 
    position: [11.0, 12.0], 
    tribes: "Kanuri, Fulani", 
    desc: "Home to the ancient Kanem-Bornu Empire and the Durbar festival traditions.",
    image: "kanuri"
  },
  { 
    id: "north-central", 
    name: "North-Central (Middle Belt)", 
    position: [9.5, 8.0], 
    tribes: "Tiv, Nupe, Igala", 
    desc: "The cultural crossroads of Nigeria, famous for the Nok terracotta sculptures.",
    image: "nokculture"
  },
  { 
    id: "south-west", 
    name: "South-West", 
    position: [7.5, 4.5], 
    tribes: "Yoruba", 
    desc: "The heartland of the Oyo Empire, Ife bronzes, and vibrant Osun-Osogbo festivals.",
    image: "yoruba"
  },
  { 
    id: "south-east", 
    name: "South-East", 
    position: [6.0, 7.5], 
    tribes: "Igbo", 
    desc: "Known for the Nri Kingdom, Igbo-Ukwu bronzes, and rich masquerade traditions.",
    image: "igbo"
  },
  { 
    id: "south-south", 
    name: "South-South", 
    position: [5.0, 6.5], 
    tribes: "Edo, Ijaw, Ibibio", 
    desc: "Home to the powerful Benin Empire, famous for its magnificent bronze casting.",
    image: "edo"
  },
];



export default function Map() {
  const [activeRegion, setActiveRegion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-serif text-[#2c2c1e] mb-4">Interactive Map</h1>
        <p className="text-[#5A5A40] text-lg">
          Explore the diverse cultural regions of Nigeria. Click on the markers to discover the origins of our artifacts and heritage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-4 shadow-sm border border-[#e8e8e0] relative overflow-hidden h-[600px]">
          <MapContainer 
            center={[9.0820, 8.6753]} 
            zoom={6} 
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {REGIONS.map((region) => (
              <Marker 
                key={region.id} 
                position={region.position}
                eventHandlers={{
                  click: () => setActiveRegion(region),
                }}
              >
                <Popup className="font-sans">
                  <div className="text-center">
                    <h3 className="font-serif font-bold text-lg text-[#2c2c1e]">{region.name}</h3>
                    <p className="text-xs text-[#5A5A40] uppercase tracking-widest mt-1">{region.tribes}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="lg:col-span-1">
          {activeRegion ? (
            <motion.div 
              key={activeRegion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#2c2c1e] rounded-[2rem] overflow-hidden shadow-xl h-full flex flex-col"
            >
              <div className="h-48 relative">
                <img 
                  src={`https://picsum.photos/seed/${activeRegion.image}/400/300`} 
                  alt={activeRegion.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c1e] to-transparent" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8e8e0]/60 mb-2 block">
                  Region Profile
                </span>
                <h2 className="text-3xl font-serif text-white mb-2">{activeRegion.name}</h2>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-4 h-4 text-[#5A5A40]" />
                  <span className="text-sm text-[#5A5A40] uppercase tracking-widest">{activeRegion.tribes}</span>
                </div>
                <p className="text-[#f5f5f0]/80 leading-relaxed mb-8 flex-grow">
                  {activeRegion.desc}
                </p>
                <Link 
                  to={`/gallery?category=Tribes`}
                  className="w-full py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white"
                >
                  Explore Artifacts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#f5f5f0] rounded-[2rem] border border-[#e8e8e0] h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#5A5A40]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#2c2c1e] mb-2">Select a Region</h3>
              <p className="text-[#5A5A40]">
                Click on any marker on the map to view detailed cultural information about that region.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REGIONS.slice(0, 3).map(region => (
          <button 
            key={region.id} 
            onClick={() => setActiveRegion(region)}
            className={`text-left p-6 rounded-2xl border transition-all group ${
              activeRegion?.id === region.id 
                ? 'bg-[#2c2c1e] border-[#2c2c1e] shadow-lg' 
                : 'bg-white border-[#e8e8e0] hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl transition-colors ${
                activeRegion?.id === region.id 
                  ? 'bg-white/10 text-white' 
                  : 'bg-[#f5f5f0] text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white'
              }`}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`font-serif text-xl mb-1 ${
                  activeRegion?.id === region.id ? 'text-white' : 'text-[#2c2c1e]'
                }`}>{region.name}</h3>
                <p className={`text-sm uppercase tracking-widest ${
                  activeRegion?.id === region.id ? 'text-white/60' : 'text-[#5A5A40]'
                }`}>{region.tribes}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
