import { useState } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  placeholderClassName = "bg-cultural-sand/70",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  onLoad,
  ...imgProps
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (event) => {
    setLoaded(true);
    if (onLoad) onLoad(event);
  };

  return (
    <div className={`relative overflow-hidden ${className} ${wrapperClassName}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 animate-pulse ${placeholderClassName} transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out will-change-[opacity] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        referrerPolicy="no-referrer"
        {...imgProps}
      />
    </div>
  );
};

export default LazyImage;
