import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "../src/components/Layout";
import { ArtifactProvider } from "../src/context/ArtifactContext";

const Home = lazy(() => import("../src/pages/Home"));
const Gallery = lazy(() => import("../src/pages/Gallery"));
const ArtifactDetail = lazy(() => import("../src/pages/ArtifactDetail"));
const Admin = lazy(() => import("../src/pages/Admin"));
const Login = lazy(() => import("../src/pages/Login"));
const Map = lazy(() => import("../src/pages/Map"));
const History = lazy(() => import("../src/pages/History"));

export default function App() {
  return (
    <Router>
      <ArtifactProvider>
        <Suspense fallback={ <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-cultural-ink/20 border-t-cultural-ink rounded-full animate-spin"></div>
      </div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="history" element={<History />} />
              <Route path="artifact/:id" element={<ArtifactDetail />} />
              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<Login />} />
              <Route path="map" element={<Map />} />
            </Route>
          </Routes>
        </Suspense>
      </ArtifactProvider>
    </Router>
  );
}