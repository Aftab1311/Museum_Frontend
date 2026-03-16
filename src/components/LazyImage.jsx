import { useState } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      referrerPolicy="no-referrer"
    />
  );
};

export default LazyImage;