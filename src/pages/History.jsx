import { useRef , useEffect} from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

import img1 from "../assets/nok.webp";
import img2 from "../assets/kingdomnri.webp";
import img3 from "../assets/benin.webp";
import img4 from "../assets/sokoto.webp";
import img5 from "../assets/british.webp";
import img6 from "../assets/democracy.webp";
import img7 from "../assets/nationalism.webp"
import img8 from "../assets/amalga.webp";
import img9 from "../assets/independence.webp";
import img10 from "../assets/second.webp";
import img11 from "../assets/war.webp";
import img12 from "../assets/historic.webp";
import img13 from "../assets/tinubu.webp";


const TIMELINE_DATA = [
  { year: "1000 BC - 300 AD", title: "Nok Culture", desc: "Known for their highly advanced terracotta sculptures, representing some of the earliest known sculptural traditions in Sub-Saharan Africa.", img: img1 },
  { year: "9th Century", title: "Kingdom of Nri", desc: "A center of religion, trade, and politics in the Igbo region, famous for the intricate Igbo-Ukwu bronzes.", img: img2 },
  { year: "11th - 15th Century", title: "Benin & Ile-Ife Empires", desc: "Golden age of brass and bronze casting. The Ooni of Ife and Oba of Benin established powerful, artistically rich kingdoms.", img: img3 },
  { year: "19th Century", title: "Sokoto Caliphate", desc: "A powerful Islamic empire in northern Nigeria, profoundly influencing the region's scholarship, architecture, and administration.", img: img4 },
  { year: "1900 - 1914", title: "British Colonial Expansion", desc: "Britain gradually consolidated control over the region, establishing the Northern and Southern Nigeria Protectorates and bringing many indigenous kingdoms under colonial administration.", img: img5 },
  { year: "1914", title: "Amalgamation of Nigeria", desc: "British governor Frederick Lugard merged the Northern and Southern protectorates, creating the modern administrative entity known as Nigeria.", img: img8 },
  { year: "1940s - 1950s", title: "Rise of Nationalism", desc: "Political movements led by figures such as Nnamdi Azikiwe, Obafemi Awolowo, and Ahmadu Bello pushed for self-governance and independence from British colonial rule.", img: img7 },
  { year: "1960", title: "Independence", desc: "Nigeria gained independence from Britain on October 1, 1960, becoming a sovereign nation within the Commonwealth.", img: img9 },
  { year: "1967 - 1970", title: "Nigerian Civil War", desc: "The southeastern region attempted to secede as the Republic of Biafra, leading to a devastating civil war that ended with Nigeria’s reunification.", img: img11 },
  { year: "1979 - 1983", title: "Second Republic", desc: "Nigeria briefly returned to civilian democratic rule under President Shehu Shagari before another military coup ended the republic.", img: img10 },
  { year: "1999", title: "Return to Democracy", desc: "After decades of military rule, Nigeria restored democratic governance with the election of Olusegun Obasanjo as president.", img: img6 },
  { year: "2015", title: "Historic Democratic Transition", desc: "Muhammadu Buhari won the presidential election, marking the first time an opposition candidate defeated a sitting president in Nigeria.", img: img12 },
  { year: "2023 - Present", title: "Tinubu Administration", desc: "Bola Ahmed Tinubu became president, focusing on economic reforms, currency restructuring, and policies aimed at stabilizing Nigeria’s economy.", img: img13 },
];

export default function History() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#f5f5f0] min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/nigeriahistory/1920/1080" 
            alt="History of Nigeria"
            className="w-full h-full object-cover opacity-90" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#f5f5f0]" />
        </div>
        <div className="relative z-10 text-center px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tight"
          >
            The Epic of Nigeria
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-16"
          >
            A journey through millennia of culture, conquest, resilience, and triumph.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center animate-bounce bg-black/20 backdrop-blur-sm">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Center Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#5A5A40]/20 transform md:-translate-x-1/2" />
        
        <div className="space-y-32 md:space-y-48">
          {TIMELINE_DATA.map((era, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem key={index} era={era} index={index} isEven={isEven} />
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}

function TimelineItem({ era, index, isEven }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Center Dot */}
      <div className="absolute left-8 md:left-1/2 w-5 h-5 bg-[#5A5A40] rounded-full transform -translate-x-2.5 md:-translate-x-2.5 ring-8 ring-[#f5f5f0] z-10 shadow-sm" />
      
      {/* Content */}
      <div className={`pl-20 md:pl-0 md:w-1/2 flex flex-col relative ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
        <h2 className={`text-6xl md:text-8xl font-serif text-[#2c2c1e] mb-4 opacity-10 absolute -top-10 md:-top-16 whitespace-nowrap pointer-events-none ${isEven ? 'left-20 md:left-0' : 'left-20 md:left-auto md:right-0'}`}>
          {era.year.split(' ')[0]}
        </h2>
        <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-4 block">
          Era {(index + 1).toString().padStart(2, '0')}
        </span>
        <h3 className="text-4xl md:text-5xl font-serif text-[#2c2c1e] mb-4 relative z-10 leading-tight">
          {era.title}
        </h3>
        <p className="text-xl md:text-2xl font-serif text-[#5A5A40] mb-6 italic">
          {era.year}
        </p>
        <p className="text-[#2c2c1e]/70 text-lg leading-relaxed max-w-md">
          {era.desc}
        </p>
      </div>

      {/* Image */}
      <div className="pl-20 md:pl-0 md:w-1/2 w-full">
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] group shadow-2xl">
          <img 
            src={era.img} 
            alt={era.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          
          {/* Decorative corner accent */}
          <div className={`absolute w-24 h-24 border-[#f5f5f0]/40 transition-all duration-500 ${isEven ? 'bottom-6 left-6 border-b-2 border-l-2 group-hover:bottom-4 group-hover:left-4' : 'bottom-6 right-6 border-b-2 border-r-2 group-hover:bottom-4 group-hover:right-4'}`} />
        </div>
      </div>
    </motion.div>
  );
}
