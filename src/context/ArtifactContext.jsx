// src/context/ArtifactContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getArtifacts } from "../services/artifactService";

const ArtifactContext = createContext();

export function ArtifactProvider({ children }) {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllArtifacts = async () => {
      try {
        setLoading(true);
        const data = await getArtifacts();
        setArtifacts(data);
      } catch (err) {
        console.error("❌ Error fetching artifacts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArtifacts();
  }, []);

  const refreshArtifacts = async () => {
    setLoading(true);
    try {
      const data = await getArtifacts(true); 
      setArtifacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArtifactContext.Provider value={{ artifacts, loading, error, refreshArtifacts }}>
      {children}
    </ArtifactContext.Provider>
  );
}

export function useArtifacts() {
  const context = useContext(ArtifactContext);
  if (!context) {
    throw new Error("useArtifacts must be used within an ArtifactProvider");
  }
  return context;
}