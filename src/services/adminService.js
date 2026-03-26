const API_URL = import.meta.env.VITE_API_URL;

const getToken = () =>
  localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

const buildHeaders = () => {
  const token = getToken();
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

const parseListPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const normalizeUser = (user) => {
  const fullName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return {
    id: user?._id || user?.id || user?.email,
    name: fullName || "Unnamed User",
    email: user?.email || "No email",
    role: user?.role || "user",
    isActive: typeof user?.isActive === "boolean" ? user.isActive : true,
    createdAt: user?.createdAt || user?.joinedAt || null,
  };
};

export const getUsers = async () => {
  const endpoints = ["/users", "/users/all", "/admin/users"];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: buildHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      return parseListPayload(payload).map(normalizeUser);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(lastError?.message || "Unable to fetch users");
};
