import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../src/components/Layout";
import { Home } from "../src/pages/Home";
import { Gallery } from "../src/pages/Gallery";
import { ArtifactDetail } from "../src/pages/ArtifactDetail";
import { Admin } from "../src/pages/Admin";
import { Login } from "../src/pages/Login";
import { Map } from "../src/pages/Map";
import { History } from "../src/pages/History";
import { ArtifactProvider } from "../src/context/ArtifactContext";

export default function App() {
  return (
    <Router>
      <ArtifactProvider> {/* Wrap all routes with the provider */}
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
      </ArtifactProvider>
    </Router>
  );
}