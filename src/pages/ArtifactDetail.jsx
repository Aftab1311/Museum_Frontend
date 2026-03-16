import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, MapPin, Tag, Layers } from "lucide-react";
import { useEffect } from "react";
import { useArtifacts } from "@/src/context/ArtifactContext";

export function ArtifactDetail() {
  const { id } = useParams();
  const { artifacts, loading } = useArtifacts();
  
  const artifact = artifacts?.find((a) => a.id === id || a._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-[#5A5A40] tracking-wide animate-pulse">
          Loading artifact details...
        </p>
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-serif text-cultural-ink mb-4">
          Artifact Not Found
        </h2>
        <p className="text-[#5A5A40] mb-6">
          The artifact you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-[#5A5A40] hover:text-cultural-ink transition-colors text-sm uppercase tracking-widest font-medium underline underline-offset-4"
        >
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Link
        to="/gallery"
        className="inline-flex items-center gap-2 text-[#5A5A40] hover:text-cultural-ink transition-colors mb-8 text-sm uppercase tracking-widest font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Image */}
        <div className="relative">
          <div className="sticky top-24 rounded-[2rem] overflow-hidden bg-cultural-sand shadow-sm border border-cultural-sand">
            <img
              src={artifact.imageUrl}
              alt={artifact.name}
              className="w-full h-auto object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x750?text=Image+Not+Available';
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center py-8">

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-4 py-1.5 bg-cultural-sand rounded-full text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
              {artifact.category}
            </span>

            <span className="px-4 py-1.5 border border-[#5A5A40]/20 rounded-full text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
              {artifact.originTribe}
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-serif text-cultural-ink mb-8 leading-tight">
            {artifact.name}
          </h1>

          <div className="grid grid-cols-2 gap-6 mb-12 py-8 border-y border-[#5A5A40]/10">

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#5A5A40] mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-1">
                  Origin
                </p>
                <p className="text-cultural-ink font-serif text-lg">
                  {artifact.originTribe}
                </p>
              </div>
            </div>

            {artifact.yearDiscovered && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#5A5A40] mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-1">
                    Discovered
                  </p>
                  <p className="text-cultural-ink font-serif text-lg">
                    {artifact.yearDiscovered}
                  </p>
                </div>
              </div>
            )}

            {artifact.material && (
              <div className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-[#5A5A40] mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-1">
                    Material
                  </p>
                  <p className="text-cultural-ink font-serif text-lg">
                    {artifact.material}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-[#5A5A40] mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-1">
                  Category
                </p>
                <p className="text-cultural-ink font-serif text-lg">
                  {artifact.category}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-cultural-ink mb-4">
                Description
              </h3>
              <p className="text-cultural-ink/80 leading-relaxed font-light text-lg">
                {artifact.description}
              </p>
            </div>

            {artifact.historicalSignificance && (
              <div>
                <h3 className="text-2xl font-serif text-cultural-ink mb-4">
                  Historical Significance
                </h3>
                <p className="text-cultural-ink/80 leading-relaxed font-light text-lg">
                  {artifact.historicalSignificance}
                </p>
              </div>
            )}
          </div>

          {/* Optional: Show related artifacts from same tribe */}
          {artifacts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#5A5A40]/10">
              <h3 className="text-xl font-serif text-cultural-ink mb-4">
                More from {artifact.originTribe}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {artifacts
                  .filter(a => a.originTribe === artifact.originTribe && a.id !== artifact.id)
                  .slice(0, 3)
                  .map(related => (
                    <Link
                      key={related.id}
                      to={`/artifact/${related.id}`}
                      className="group block"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-cultural-sand mb-2">
                        <img
                          src={related.imageUrl}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                          }}
                        />
                      </div>
                      <p className="text-xs font-medium text-cultural-ink truncate">
                        {related.name}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}