import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Edit2, Trash2 } from "lucide-react";

import {
  createArtifact,
  updateArtifact,
  deleteArtifact,
} from "@/src/services/artifactService";

import { useArtifacts } from "@/src/context/ArtifactContext";

const baseURL = import.meta.env.VITE_API_URL;

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("artifacts");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingArtifact, setEditingArtifact] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [editFileName, setEditFileName] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    originTribe: "",
    historicalSignificance: "",
    category: "",
    yearDiscovered: "",
    material: "",
    image: null,
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    originTribe: "",
    historicalSignificance: "",
    category: "",
    yearDiscovered: "",
    material: "",
    image: null,
  });

  const {
    artifacts,
    refreshArtifacts,
    loading: artifactsLoading,
  } = useArtifacts();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Verify admin access before allowing the user to interact with the dashboard
  useEffect(() => {
    const verifyAdmin = async () => {
      const token =
        localStorage.getItem("adminToken") ||
        sessionStorage.getItem("adminToken");

      if (!token) {
        navigate("/login", { replace: true });
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch(`${baseURL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Not authorized");
        }

        const profile = await res.json();
        if (profile.role !== "admin") {
          throw new Error("Not an admin");
        }

        setIsAuthorized(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminToken");
        navigate("/login", { replace: true });
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  // Handle form change for add modal
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form change for edit modal
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit new artifact
  // Submit new artifact
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    try {
      await createArtifact(data);
      await refreshArtifacts();
      setShowModal(false);
      alert("Artifact added successfully!");

      setFormData({
        name: "",
        description: "",
        originTribe: "",
        historicalSignificance: "",
        category: "",
        yearDiscovered: "",
        material: "",
        image: null,
      });
      setImagePreview(null);
      setFileName(null);
    } catch (error) {
      console.error(error);
      alert("Error adding artifact");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit edited artifact
  // Submit edited artifact
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const data = new FormData();

    Object.keys(editFormData).forEach((key) => {
      if (editFormData[key] !== null && editFormData[key] !== "") {
        data.append(key, editFormData[key]);
      }
    });

    try {
      await updateArtifact(editingArtifact.id, data);

      await refreshArtifacts();
      setShowEditModal(false);
      setEditingArtifact(null);
      alert("Artifact updated successfully!");

      setEditFormData({
        name: "",
        description: "",
        originTribe: "",
        historicalSignificance: "",
        category: "",
        yearDiscovered: "",
        material: "",
        image: null,
      });
      setEditImagePreview(null);
      setEditFileName(null);
    } catch (error) {
      console.error(error);
      alert("Error updating artifact");
    } finally {
      setIsUpdating(false);
    }
  };

  // Open edit modal with artifact data
  const openEditModal = (artifact) => {
    setEditingArtifact(artifact);
    setEditFormData({
      name: artifact.name || "",
      description: artifact.description || "",
      originTribe: artifact.originTribe || "",
      historicalSignificance: artifact.historicalSignificance || "",
      category: artifact.category || "",
      yearDiscovered: artifact.yearDiscovered || "",
      material: artifact.material || "",
      image: null,
    });
    setEditImagePreview(artifact.imageUrl || null);
    setEditFileName(null);
    setShowEditModal(true);
  };

  const handleDelete = async (artifact) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${artifact.name}"? This action cannot be undone.`,
      )
    ) {
      try {
        await deleteArtifact(artifact.id);
        await refreshArtifacts();
        alert("Artifact deleted successfully!");
      } catch (error) {
        console.error("Error deleting artifact:", error);
        alert("Error deleting artifact");
      }
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-cultural-ink/20 border-t-cultural-ink rounded-full animate-spin"></div>

        <p className="text-sm text-cultural-ink/70 tracking-wide animate-pulse">
          Checking Admin Access...
        </p>
      </div>
    );
  }

  // Prevent showing admin UI if the user is not authorized.
  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-cultural-ink mb-2">
              Admin Dashboard
            </h1>
            <p className="text-[#5A5A40]">
              Manage museum artifacts, categories, and users.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="olive-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Artifact
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-cultural-sand">
              <nav className="space-y-2">
                {[
                  { id: "artifacts", label: "Artifacts" },
                  { id: "categories", label: "Categories" },
                  { id: "users", label: "Users" },
                  { id: "settings", label: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-widest transition-colors ${
                      activeTab === tab.id
                        ? "bg-cultural-sand text-[#5A5A40]"
                        : "text-cultural-ink/60 hover:bg-[#f5f5f0] hover:text-cultural-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cultural-sand">
              {activeTab === "artifacts" && (
                <div>
                  <h2 className="text-2xl font-serif text-cultural-ink mb-6">
                    Manage Artifacts
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-cultural-sand">
                          <th className="pb-4 text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
                            Artifact
                          </th>
                          <th className="pb-4 text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
                            Category
                          </th>
                          <th className="pb-4 text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
                            Tribe
                          </th>
                          <th className="pb-4 text-xs font-bold uppercase tracking-widest text-[#5A5A40] text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cultural-sand">
                        {artifacts.map((artifact) => (
                          <tr
                            key={artifact.id}
                            className="hover:bg-[#f5f5f0]/50 transition-colors"
                          >
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-cultural-sand shrink-0">
                                  <img
                                    src={artifact.imageUrl}
                                    alt={artifact.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div>
                                  <p className="font-serif text-cultural-ink font-medium">
                                    {artifact.name}
                                  </p>
                                  <p className="text-xs text-cultural-ink/60 line-clamp-1 max-w-[200px]">
                                    {artifact.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <span className="px-3 py-1 bg-cultural-sand rounded-full text-[10px] font-bold uppercase tracking-wider text-[#5A5A40]">
                                {artifact.category}
                              </span>
                            </td>
                            <td className="py-4 text-sm text-cultural-ink">
                              {artifact.originTribe}
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditModal(artifact)}
                                  className="p-2 text-[#5A5A40] hover:bg-cultural-sand rounded-lg transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(artifact)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab !== "artifacts" && (
                <div className="text-center py-24">
                  <p className="text-[#5A5A40] font-medium uppercase tracking-widest text-sm">
                    {activeTab} management coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm font-sans">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-2xl">
              <h2 className="text-3xl font-serif text-stone-800">
                Add New Artifact
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Fill in the details below to add an artifact to the collection
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Artifact Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      placeholder="e.g., Golden Mask of Tutankhamun"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Origin Tribe *
                    </label>
                    <input
                      name="originTribe"
                      value={formData.originTribe}
                      placeholder="e.g., Ancient Egyptian"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Category *
                    </label>
                    <input
                      name="category"
                      value={formData.category}
                      placeholder="e.g., Ritual Object, Weapon, Jewelry"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Year Discovered
                    </label>
                    <input
                      name="yearDiscovered"
                      value={formData.yearDiscovered}
                      placeholder="e.g., 1922"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Material
                  </label>
                  <input
                    name="material"
                    value={formData.material}
                    placeholder="e.g., Gold, Wood, Bronze"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Description & Significance
                </h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Provide a detailed description of the artifact..."
                    rows={4}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all resize-none"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Historical Significance
                  </label>
                  <textarea
                    name="historicalSignificance"
                    value={formData.historicalSignificance}
                    placeholder="Explain the historical importance and cultural context..."
                    rows={3}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all resize-none"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Artifact Image
                </h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Upload Image *
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      handleChange(e);
                      // Store the file for preview
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                          setFileName(file.name);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />

                  {/* Custom upload button with preview */}
                  <div className="relative">
                    {!imagePreview ? (
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-8 h-8 mb-2 text-stone-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-stone-600 font-medium">
                          Click to upload image
                        </p>
                        <p className="text-stone-400 text-sm mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </label>
                    ) : (
                      <div className="space-y-3">
                        {/* Image Preview */}
                        <div className="relative rounded-xl overflow-hidden border border-stone-200">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFileName(null);
                              document.getElementById("image-upload").value =
                                "";
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* File name display */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200">
                          <svg
                            className="w-5 h-5 text-stone-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-stone-600 flex-1 truncate">
                            {fileName}
                          </span>
                          <label
                            htmlFor="image-upload"
                            className="text-sm text-olive-600 hover:text-olive-700 font-medium cursor-pointer"
                          >
                            Change
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t border-stone-100 sticky bottom-0 bg-white pb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-[#5a5a40] hover:bg-emerald-800 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    "Add Artifact to Collection"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setImagePreview(null);
                    setFileName(null);
                    setFormData({
                      name: "",
                      description: "",
                      originTribe: "",
                      historicalSignificance: "",
                      category: "",
                      yearDiscovered: "",
                      material: "",
                      image: null,
                    });
                  }}
                  className="px-6 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 font-medium text-stone-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm font-sans">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-2xl">
              <h2 className="text-3xl font-serif text-stone-800">
                Edit Artifact
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Update the details of the artifact
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Artifact Name *
                    </label>
                    <input
                      name="name"
                      value={editFormData.name}
                      placeholder="e.g., Golden Mask of Tutankhamun"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Origin Tribe *
                    </label>
                    <input
                      name="originTribe"
                      value={editFormData.originTribe}
                      placeholder="e.g., Ancient Egyptian"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Category *
                    </label>
                    <input
                      name="category"
                      value={editFormData.category}
                      placeholder="e.g., Ritual Object, Weapon, Jewelry"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Year Discovered
                    </label>
                    <input
                      name="yearDiscovered"
                      value={editFormData.yearDiscovered}
                      placeholder="e.g., 1922"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                      onChange={handleEditChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Material
                  </label>
                  <input
                    name="material"
                    value={editFormData.material}
                    placeholder="e.g., Gold, Wood, Bronze"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all"
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Description & Significance
                </h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    placeholder="Provide a detailed description of the artifact..."
                    rows={4}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all resize-none"
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Historical Significance
                  </label>
                  <textarea
                    name="historicalSignificance"
                    value={editFormData.historicalSignificance}
                    placeholder="Explain the historical importance and cultural context..."
                    rows={3}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-all resize-none"
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Artifact Image
                </h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Upload Image {!editImagePreview && "*"}
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="edit-image-upload"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      handleEditChange(e);
                      // Store the file for preview
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditImagePreview(reader.result);
                          setEditFileName(file.name);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />

                  {/* Custom upload button with preview */}
                  <div className="relative">
                    {!editImagePreview ? (
                      <label
                        htmlFor="edit-image-upload"
                        className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-8 h-8 mb-2 text-stone-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-stone-600 font-medium">
                          Click to upload new image
                        </p>
                        <p className="text-stone-400 text-sm mt-1">
                          PNG, JPG up to 10MB (Leave empty to keep current
                          image)
                        </p>
                      </label>
                    ) : (
                      <div className="space-y-3">
                        {/* Image Preview */}
                        <div className="relative rounded-xl overflow-hidden border border-stone-200">
                          <img
                            src={editImagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setEditImagePreview(null);
                              setEditFileName(null);
                              document.getElementById(
                                "edit-image-upload",
                              ).value = "";
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* File name display */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200">
                          <svg
                            className="w-5 h-5 text-stone-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-stone-600 flex-1 truncate">
                            {editFileName ||
                              (editImagePreview && "Current image")}
                          </span>
                          <label
                            htmlFor="edit-image-upload"
                            className="text-sm text-olive-600 hover:text-olive-700 font-medium cursor-pointer"
                          >
                            Change
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t border-stone-100 sticky bottom-0 bg-white pb-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`flex-1 bg-[#5a5a40] hover:bg-emerald-800 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer ${
                    isUpdating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isUpdating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Artifact"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingArtifact(null);
                    setEditImagePreview(null);
                    setEditFileName(null);
                    setEditFormData({
                      name: "",
                      description: "",
                      originTribe: "",
                      historicalSignificance: "",
                      category: "",
                      yearDiscovered: "",
                      material: "",
                      image: null,
                    });
                  }}
                  className="px-6 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 font-medium text-stone-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
