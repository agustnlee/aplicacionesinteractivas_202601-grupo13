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

    if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
    }
    if (res.status === 403) {
        const error = await res.json().catch(() => ({ mensajes: ["No tenés permiso para realizar esta acción."] }));
        throw { ...error, status: 403 };
    }

    if (res.status === 204 || res.status === 201 && res.headers.get("content-length") === "0") 
        return null;

    if (!res.ok) {
        const error = await res.json().catch(() => ({ mensajes: ["Error desconocido"] }));
        throw error;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
};

export default apiClient;