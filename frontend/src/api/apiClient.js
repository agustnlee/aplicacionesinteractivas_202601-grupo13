const API_URL = "/api";

const apiClient = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token");
    
    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        ...(body && { body: JSON.stringify(body) })
    });

     // 204 no content 
    if (res.status === 204) return null;

    if (!res.ok) {
        const error = await res.json().catch(() => ({ mensajes: ["Error desconocido"] }));
        throw error;
    }

    return res.json();
};

export default apiClient;