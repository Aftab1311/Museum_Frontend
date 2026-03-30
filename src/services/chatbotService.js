const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to get chatbot response.");
  }

  return response.json();
};

export const askMuseumAssistant = async ({ message, history = [] }) => {
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  if (!trimmedMessage) {
    throw new Error("Message cannot be empty.");
  }

  const response = await fetch(`${API_URL}/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: trimmedMessage,
      history,
    }),
  });

  const data = await handleResponse(response);
  return data.reply;
};
