import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  Image as ImageIcon,
  Search,
  Users,
  Palette,
} from "lucide-react";
import LazyImage from "../components/LazyImage";

import homeImg from "../assets/Home.png";
import city1 from "../assets/city1.jpg";
import culture2 from "../assets/culture1.webp";
import culture1 from "../assets/culture5.webp";
import city4 from "../assets/city2.webp";
import asooke from "../assets/asooke.jpg";
import bronze from "../assets/bronze.jpg";
import pottery from "../assets/pottery.jpg";
import tribes from "../assets/tribes.webp";
import cloths from "../assets/cloths.webp";
import music from "../assets/music.webp";
import artifacts from "../assets/artifacts.webp";
import festivals from "../assets/festival1.png";
import independence from "../assets/independence.webp";
import { useArtifacts } from "../context/ArtifactContext";

const CATEGORIES = [
  {
    name: "Tribes",
    image: tribes,
  },
  {
    name: "Artifacts",
    image: artifacts,
  },
  {
    name: "Festivals",
    image: festivals,
  },
  {
    name: "Historical Events",
    image: independence,
  },
  {
    name: "Traditional Clothing",
    image: cloths,
  },
  {
    name: "Music & Dance",
    image: music,
  },
];

const TIMELINE_DATA = [
  {
    year: "1000 BC - 300 AD",
    title: "Nok Culture",
    desc: "Known for their highly advanced terracotta sculptures, representing some of the earliest known sculptural traditions in Sub-Saharan Africa.",
  },
  {
    year: "9th Century",
    title: "Kingdom of Nri",
    desc: "A center of religion, trade, and politics in the Igbo region, famous for the intricate Igbo-Ukwu bronzes.",
  },
  {
    year: "11th - 15th Century",
    title: "Benin & Ile-Ife Empires",
    desc: "Golden age of brass and bronze casting. The Ooni of Ife and Oba of Benin established powerful, artistically rich kingdoms.",
  },
  {
    year: "19th Century",
    title: "Sokoto Caliphate",
    desc: "A powerful Islamic empire in northern Nigeria, profoundly influencing the region's scholarship, architecture, and administration.",
  },
  {
    year: "1900 - 1914",
    title: "British Colonial Expansion",
    desc: "Britain gradually consolidated control over the region, establishing the Northern and Southern Nigeria Protectorates and bringing many indigenous kingdoms under colonial administration.",
  },
  {
    year: "1914",
    title: "Amalgamation of Nigeria",
    desc: "British governor Frederick Lugard merged the Northern and Southern protectorates, creating the modern administrative entity known as Nigeria.",
  },
  {
    year: "1940s - 1950s",
    title: "Rise of Nationalism",
    desc: "Political movements led by figures such as Nnamdi Azikiwe, Obafemi Awolowo, and Ahmadu Bello pushed for self-governance and independence from British colonial rule.",
  },
  {
    year: "1960",
    title: "Independence",
    desc: "Nigeria gained independence from Britain on October 1, 1960, becoming a sovereign nation within the Commonwealth.",
  },
  {
    year: "1967 - 1970",
    title: "Nigerian Civil War",
    desc: "The southeastern region attempted to secede as the Republic of Biafra, leading to a devastating civil war that ended with Nigeria’s reunification.",
  },
  {
    year: "1979 - 1983",
    title: "Second Republic",
    desc: "Nigeria briefly returned to civilian democratic rule under President Shehu Shagari before another military coup ended the republic.",
  },
  {
    year: "1999",
    title: "Return to Democracy",
    desc: "After decades of military rule, Nigeria restored democratic governance with the election of Olusegun Obasanjo as president.",
  },
  {
    year: "2015",
    title: "Historic Democratic Transition",
    desc: "Muhammadu Buhari won the presidential election, marking the first time an opposition candidate defeated a sitting president in Nigeria.",
  },
  {
    year: "2023 - Present",
    title: "Tinubu Administration",
    desc: "Bola Ahmed Tinubu became president, focusing on economic reforms, currency restructuring, and policies aimed at stabilizing Nigeria’s economy.",
  },
];

export function Home() {
  const [activeEra, setActiveEra] = useState(0);
  const { artifacts, loading, error } = useArtifacts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading artifacts: {error}
      </div>
    );
  }

  const featuredArtifacts = artifacts.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-4 sm:px-6 lg:px-14 py-12"
    >
      {/* Hero Section */}
      <section className="relative rounded-4xl overflow-hidden mb-24 h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={homeImg}
            alt="Nigerian Culture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight"
          >
            Discover the Soul of <br />
            <span className="italic font-light">Nigeria</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-sans font-light"
          >
            Explore a digital repository of artifacts, tribes, festivals, and
            historical events that shape the rich cultural heritage of Nigeria.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/gallery"
              className="olive-button flex items-center justify-center gap-2"
            >
              Explore Gallery <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/map"
              className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Globe className="w-4 h-4" /> Interactive Map
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cultural Identity Section */}
      <section className="mb-24 bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-cultural-sand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-[#f5f5f0] rounded-xl text-[#5A5A40]">
                <Users className="w-6 h-6" />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-[#5A5A40]">
                Our Identity
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-cultural-ink mb-6 leading-tight">
              A Tapestry of <br />
              <span className="italic text-[#5A5A40]">300+ Ethnic Groups</span>
            </h2>
            <p className="text-cultural-ink/70 text-lg leading-relaxed mb-8">
              Nigeria's cultural landscape is one of the most diverse in the
              world. From the Yoruba in the southwest, the Igbo in the
              southeast, to the Hausa and Fulani in the north, each group brings
              its own unique traditions, languages, and artistic expressions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-[#5A5A40] pl-4">
                <p className="text-3xl font-serif text-cultural-ink mb-1">
                  500+
                </p>
                <p className="text-sm text-[#5A5A40] uppercase tracking-wider font-medium">
                  Languages Spoken
                </p>
              </div>
              <div className="border-l-2 border-[#5A5A40] pl-4">
                <p className="text-3xl font-serif text-cultural-ink mb-1">36</p>
                <p className="text-sm text-[#5A5A40] uppercase tracking-wider font-medium">
                  States of Heritage
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="space-y-4">
              <LazyImage
                src={city1}
                alt="Yoruba Culture"
                className="w-full aspect-[4/3] object-cover rounded-3xl"
              />

              <LazyImage
                src={culture2}
                alt="Igbo Culture"
                className="w-full aspect-[4/5] object-cover rounded-3xl"
              />
            </div>

            <div className="space-y-4 md:pt-8">
              <LazyImage
                src={culture1}
                alt="Hausa Culture"
                className="w-full aspect-[4/5] object-cover rounded-3xl"
              />

              <LazyImage
                src={city4}
                alt="Edo Culture"
                className="w-full aspect-[4/3] object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline Section */}
      <section className="mb-24">
        <div className="bg-[#2c2c1e] rounded-[3rem] p-8 md:p-12 text-[#f5f5f0] overflow-hidden relative shadow-xl">
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 text-[15rem] md:text-[20rem] font-serif font-bold opacity-[0.03] pointer-events-none leading-none select-none transition-all duration-700">
            {TIMELINE_DATA[activeEra].year.split(" ")[0]}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center mb-12 relative z-10">
            <div className="lg:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#e8e8e0]/40"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-[#e8e8e0]/60">
                  Timeline
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">
                Journey Through Time
              </h2>
              <p className="text-[#f5f5f0]/60 text-lg">
                Hover over a period to explore the key eras that shaped our
                history.
              </p>
            </div>

            <div className="lg:w-2/3 min-h-[220px] flex items-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm w-full"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-[#e8e8e0]/60 mb-3 block">
                    {TIMELINE_DATA[activeEra].year}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-white">
                    {TIMELINE_DATA[activeEra].title}
                  </h3>
                  <p className="text-[#f5f5f0]/80 text-lg leading-relaxed">
                    {TIMELINE_DATA[activeEra].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Horizontal Track */}
          <div className="relative z-10">
            <div
              className="flex gap-4 overflow-x-auto pb-6 pt-4 snap-x [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {TIMELINE_DATA.map((era, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setActiveEra(index)}
                  onClick={() => setActiveEra(index)}
                  className={`flex-shrink-0 w-40 md:w-48 text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden group snap-start ${
                    activeEra === index
                      ? "bg-[#f5f5f0] text-[#2c2c1e] border-[#f5f5f0] shadow-lg scale-105"
                      : "bg-transparent text-[#f5f5f0]/60 border-[#f5f5f0]/20 hover:border-[#f5f5f0]/50 hover:text-[#f5f5f0]"
                  }`}
                >
                  <div
                    className={`text-xs font-bold uppercase tracking-widest mb-2 transition-colors ${activeEra === index ? "text-[#5A5A40]" : "text-[#f5f5f0]/40 group-hover:text-[#f5f5f0]/60"}`}
                  >
                    Era {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <div
                    className={`font-serif text-lg md:text-xl transition-colors ${activeEra === index ? "text-[#2c2c1e]" : "text-[#f5f5f0]"}`}
                  >
                    {era.year}
                  </div>
                  {activeEra === index && (
                    <motion.div
                      layoutId="activeTimelineIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#5A5A40]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Fade edges for scroll indication */}
            <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-[#2c2c1e] to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#2c2c1e] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#5A5A40]/40"></span>
              <span className="text-sm font-bold uppercase tracking-widest text-[#5A5A40]">
                Collections
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2c1e] mb-4">
              Cultural Categories
            </h2>
            <p className="text-[#2c2c1e]/70 text-lg">
              Delve into our curated collections spanning centuries of Nigerian
              heritage, artistry, and tradition.
            </p>
          </div>
          <Link
            to="/gallery"
            className="hidden md:flex items-center gap-2 text-[#5A5A40] hover:text-[#2c2c1e] font-medium uppercase text-sm tracking-widest transition-colors pb-2 border-b border-transparent hover:border-[#2c2c1e]"
          >
            View All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {CATEGORIES.map((category, i) => {
            const getGridClass = (index) => {
              if (index === 0) return "md:col-span-2 md:row-span-2";
              if (index === 1) return "md:col-span-2 md:row-span-1";
              if (index === 2) return "md:col-span-1 md:row-span-1";
              if (index === 3) return "md:col-span-1 md:row-span-1";
              if (index === 4) return "md:col-span-2 md:row-span-1";
              if (index === 5) return "md:col-span-2 md:row-span-1";
              return "md:col-span-1 md:row-span-1";
            };

            return (
              <Link
                key={category.name}
                to={`/gallery?category=${category.name}`}
                className={`group relative overflow-hidden rounded-3xl ${getGridClass(i)}`}
              >
                <div className="absolute inset-0 bg-[#2c2c1e]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 ease-in-out"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Explore Collection
                    </span>

                    <div className="flex items-end justify-between">
                      <h3 className="text-2xl md:text-3xl font-serif text-white">
                        {category.name}
                      </h3>

                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to="/gallery"
            className="olive-button flex items-center gap-2 w-full justify-center"
          >
            View All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="mb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif text-cultural-ink mb-2">
              Featured Artifacts
            </h2>
            <p className="text-[#5A5A40]">Masterpieces of Nigerian history</p>
          </div>
          <Link
            to="/gallery"
            className="hidden md:flex items-center gap-2 text-[#5A5A40] hover:text-cultural-ink font-medium uppercase text-sm tracking-widest transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArtifacts.map((artifact) => (
            <Link
              key={artifact.id}
              to={`/artifact/${artifact.id}`}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[3/4] bg-cultural-sand">
                <img
                  src={artifact.imageUrl}
                  alt={artifact.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider text-[#5A5A40]">
                    {artifact.originTribe}
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-cultural-ink mb-2 group-hover:text-[#5A5A40] transition-colors">
                {artifact.name}
              </h3>
              <p className="text-cultural-ink/60 line-clamp-2 text-sm leading-relaxed">
                {artifact.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/gallery" className="olive-button flex items-center gap-2">
            View All Artifacts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Living Traditions Section */}
      <section className="mb-24 bg-cultural-ink rounded-[3rem] p-8 md:p-12 text-[#f5f5f0]">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-[#5A5A40]/30 rounded-xl text-cultural-sand">
                <Palette className="w-6 h-6" />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-cultural-sand">
                Living Traditions
              </span>
            </div>
            <h2 className="text-4xl font-serif mb-4">
              Craftsmanship & Artistry
            </h2>
            <p className="text-[#f5f5f0]/70 text-lg">
              Nigerian heritage is not just in the past; it lives on through
              generations of master artisans, weavers, and sculptors who keep
              ancient techniques alive today.
            </p>
          </div>
          <Link
            to="/gallery?category=Artifacts"
            className="px-6 py-3 rounded-full border border-[#f5f5f0]/30 hover:bg-[#f5f5f0]/10 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Explore Crafts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Aso Oke Weaving",
              desc: "Traditional Yoruba hand-loomed cloth, woven with vibrant colors and intricate patterns for special occasions.",
              img: asooke,
            },
            {
              title: "Bronze Casting",
              desc: "The ancient lost-wax casting technique, still practiced by the guild of bronze casters in Benin City.",
              img: bronze,
            },
            {
              title: "Pottery & Ceramics",
              desc: "From the historical Nok terracotta to modern Ladi Kwali pottery, shaping earth into functional art.",
              img: pottery,
            },
          ].map((craft, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden aspect-square"
            >
              <LazyImage
                src={craft.img}
                alt={craft.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-serif text-white mb-2">
                  {craft.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {craft.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
