import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useArtifacts } from "../context/ArtifactContext";
const ARTIFACTS_PER_PAGE = 4;

export function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTribe, setSelectedTribe] = useState(null);
  const [displayedArtifacts, setDisplayedArtifacts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { artifacts, loading, error } = useArtifacts();
  const allArtifacts = artifacts || [];

  const observerRef = useRef();
  const loaderRef = useRef();

  // Fetch all artifacts once
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter artifacts based on search, category, and tribe
  const filteredArtifacts = useMemo(() => {
    if (!Array.isArray(allArtifacts) || allArtifacts.length === 0) {
      return [];
    }

    return allArtifacts.filter((artifact) => {
      const matchesSearch =
        searchQuery === "" ||
        (artifact.name?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        ) ||
        (artifact.description?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        );

      const matchesCategory =
        !categoryFilter || (artifact.category || "") === categoryFilter;

      const matchesTribe =
        !selectedTribe || (artifact.originTribe || "") === selectedTribe;

      return matchesSearch && matchesCategory && matchesTribe;
    });
  }, [allArtifacts, searchQuery, categoryFilter, selectedTribe]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setDisplayedArtifacts(filteredArtifacts.slice(0, ARTIFACTS_PER_PAGE));
    setHasMore(filteredArtifacts.length > ARTIFACTS_PER_PAGE);
  }, [filteredArtifacts]);

  // Load more artifacts
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    const start = page * ARTIFACTS_PER_PAGE;
    const end = start + ARTIFACTS_PER_PAGE;
    const newArtifacts = filteredArtifacts.slice(0, end);

    setTimeout(() => {
      setDisplayedArtifacts(newArtifacts);
      setPage(nextPage);
      setHasMore(filteredArtifacts.length > end);
      setLoadingMore(false);
    }, 500); // Small delay to show loading state
  }, [page, filteredArtifacts, loadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  // Get unique categories from artifacts
  const availableCategories = useMemo(() => {
    const cats = new Set(allArtifacts.map((a) => a.category).filter(Boolean));
    return Array.from(cats);
  }, [allArtifacts]);

  // Get unique tribes from artifacts
  const availableTribes = useMemo(() => {
    const tribes = new Set(
      allArtifacts.map((a) => a.originTribe).filter(Boolean),
    );
    return Array.from(tribes);
  }, [allArtifacts]);

  // Skeleton loader for artifacts
  const ArtifactSkeleton = () => (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden border border-cultural-sand animate-pulse">
      <div className="aspect-[4/5] bg-cultural-sand/50"></div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-cultural-sand/50 rounded-full w-20"></div>
        <div className="h-6 bg-cultural-sand/50 rounded-lg w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-cultural-sand/50 rounded-full w-full"></div>
          <div className="h-4 bg-cultural-sand/50 rounded-full w-5/6"></div>
          <div className="h-4 bg-cultural-sand/50 rounded-full w-4/6"></div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-4 sm:px-6 lg:px-14 py-12"
    >
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-serif text-cultural-ink mb-4">
          Digital Gallery
        </h1>
        <p className="text-[#5A5A40] text-lg">
          Explore our extensive collection of Nigerian cultural artifacts,
          historical items, and traditional pieces.
        </p>
      </div>

      {/* Filters - Always visible */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-12 flex flex-col md:flex-row gap-6 items-center justify-between border border-cultural-sand">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-cultural-sand rounded-xl leading-5 bg-[#f5f5f0] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] focus:border-[#5A5A40] sm:text-sm transition-colors"
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm font-medium text-[#5A5A40] uppercase tracking-wider mr-2">
            <SlidersHorizontal className="w-4 h-4" /> Filters:
          </div>
          <select
            className="bg-[#f5f5f0] border border-cultural-sand text-cultural-ink text-sm rounded-xl block p-2.5 outline-none focus:ring-1 focus:ring-[#5A5A40] disabled:opacity-50"
            value={categoryFilter || ""}
            onChange={(e) => {
              if (e.target.value) {
                setSearchParams({ category: e.target.value });
              } else {
                setSearchParams({});
              }
            }}
            disabled={loading}
          >
            <option value="">All Categories</option>
            {availableCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="bg-[#f5f5f0] border border-cultural-sand text-cultural-ink text-sm rounded-xl block p-2.5 outline-none focus:ring-1 focus:ring-[#5A5A40] disabled:opacity-50"
            value={selectedTribe || ""}
            onChange={(e) => setSelectedTribe(e.target.value || null)}
            disabled={loading}
          >
            <option value="">All Tribes</option>
            {availableTribes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-24 bg-white rounded-3xl border border-red-200 mb-12">
          <div className="w-12 h-12 text-red-500 mx-auto mb-4 text-4xl">⚠️</div>
          <h3 className="text-xl font-serif text-cultural-ink mb-2">
            Error Loading Artifacts
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#5A5A40] text-white rounded-full hover:bg-[#42422f] transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Artifacts Grid */}
      {!error && (
        <>
          {displayedArtifacts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayedArtifacts.map((artifact) => (
                  <Link
                    key={artifact.id || artifact._id}
                    to={`/artifact/${artifact.id || artifact._id}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-cultural-sand"
                  >
                    <div className="relative overflow-hidden aspect-[4/5] bg-cultural-sand">
                      <img
                        src={artifact.imageUrl}
                        alt={artifact.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400x500?text=No+Image";
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-[#5A5A40]">
                          {artifact.category || "Uncategorized"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs font-semibold text-[#5A5A40] uppercase tracking-widest mb-2">
                        {artifact.originTribe || "Unknown Tribe"}
                      </div>
                      <h3 className="font-serif text-xl text-cultural-ink mb-3 group-hover:text-[#5A5A40] transition-colors leading-tight">
                        {artifact.name}
                      </h3>
                      <p className="text-cultural-ink/60 line-clamp-3 text-sm leading-relaxed mt-auto">
                        {artifact.description}
                      </p>
                    </div>
                  </Link>
                ))}

                {/* Loading skeletons for more items */}
                {loadingMore &&
                  Array.from({ length: 2 }).map((_, index) => (
                    <ArtifactSkeleton key={`skeleton-${index}`} />
                  ))}
              </div>

              {/* Loader trigger for infinite scroll */}
              {hasMore && (
                <div
                  ref={loaderRef}
                  className="flex justify-center items-center py-12"
                >
                  {loadingMore ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-[#5A5A40]">
                        Loading more artifacts...
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={loadMore}
                      className="flex items-center gap-2 px-6 py-3 bg-white border border-cultural-sand rounded-xl hover:bg-[#f5f5f0] transition-colors text-[#5A5A40] font-medium"
                    >
                      <ChevronDown className="w-5 h-5" />
                      Load More
                    </button>
                  )}
                </div>
              )}

              {/* Artifacts count */}
              <div className="text-center text-sm text-[#5A5A40] mt-8">
                Showing {displayedArtifacts.length} of{" "}
                {filteredArtifacts.length} artifacts
              </div>
            </>
          ) : (
            !loading && (
              <div className="text-center py-24 bg-white rounded-3xl border border-cultural-sand">
                <Search className="w-12 h-12 text-cultural-sand mx-auto mb-4" />
                <h3 className="text-xl font-serif text-cultural-ink mb-2">
                  No artifacts found
                </h3>
                <p className="text-[#5A5A40]">
                  Try adjusting your search or filters.
                </p>
                {(searchQuery || categoryFilter || selectedTribe) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTribe(null);
                      setSearchParams({});
                    }}
                    className="mt-4 px-4 py-2 text-sm text-[#5A5A40] hover:text-cultural-ink underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )
          )}

          {/* Loading skeletons for initial load */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: ARTIFACTS_PER_PAGE }).map((_, index) => (
                <ArtifactSkeleton key={`initial-skeleton-${index}`} />
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
