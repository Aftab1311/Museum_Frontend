const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get the current token
const getToken = () => {
  return localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
};

// Helper function to handle response
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getArtifacts = async () => {
  try {
    const token = getToken();
    
    const res = await fetch(`${API_URL}/artifacts`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse(res);
    // The API returns an array directly
    if (Array.isArray(data)) {
      return data.map((artifact) => ({
        ...artifact,
        id: artifact._id, // Map _id to id for consistency
      }));
    } else {
      console.warn("Unexpected API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    throw error;
  }
};

export const getArtifactById = async (id) => {
  try {
    const token = getToken();
    
    const res = await fetch(`${API_URL}/artifacts/${id}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse(res);
    
    return {
      ...data,
      id: data._id,
    };
  } catch (error) {
    console.error(`Error fetching artifact ${id}:`, error);
    throw error;
  }
};

export const createArtifact = async (formData) => {
  try {
    const token = getToken();
    
    const res = await fetch(`${API_URL}/artifacts`, {
      method: "POST",
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });

    const data = await handleResponse(res);
    
    return {
      ...data,
      id: data._id,
    };
  } catch (error) {
    console.error("Error creating artifact:", error);
    throw error;
  }
};

export const updateArtifact = async (id, formData) => {
  try {
    const token = getToken();
    
    const res = await fetch(`${API_URL}/artifacts/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });

    const data = await handleResponse(res);
    
    return {
      ...data,
      id: data._id,
    };
  } catch (error) {
    console.error(`Error updating artifact ${id}:`, error);
    throw error;
  }
};

export const deleteArtifact = async (id) => {
  try {
    const token = getToken();
    
    const res = await fetch(`${API_URL}/artifacts/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    return await handleResponse(res);
  } catch (error) {
    console.error(`Error deleting artifact ${id}:`, error);
    throw error;
  }
};