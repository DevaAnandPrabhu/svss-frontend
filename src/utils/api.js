import axios from "axios";

const api = axios.create({
  baseURL: "https://svss-backend-5g0s.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("svss-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("svss-token");
      localStorage.removeItem("svss-user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login:    (data) => api.post("/auth/login",    data),
  register: (data) => api.post("/auth/register", data),
  getMe:    ()     => api.get("/auth/me"),
};

export const vehicleAPI = {
  getAll:  (params)    => api.get("/vehicles",        { params }),
  getById: (id)        => api.get(`/vehicles/${id}`),
  create:  (data)      => api.post("/vehicles",       data),
  update:  (id, data)  => api.put(`/vehicles/${id}`,  data),
  delete:  (id)        => api.delete(`/vehicles/${id}`),
};

export const appointmentAPI = {
  getAll:       (params)     => api.get("/appointments",              { params }),
  getById:      (id)         => api.get(`/appointments/${id}`),
  create:       (data)       => api.post("/appointments",             data),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  update:       (id, data)   => api.put(`/appointments/${id}`,        data),
  delete:       (id)         => api.delete(`/appointments/${id}`),
};

export const serviceAPI = {
  getAll:  ()         => api.get("/services"),
  getById: (id)       => api.get(`/services/${id}`),
  create:  (data)     => api.post("/services",      data),
  update:  (id, data) => api.put(`/services/${id}`, data),
  delete:  (id)       => api.delete(`/services/${id}`),
};

export const reportAPI = {
  getDashboard:   () => api.get("/reports/dashboard"),
  getTechnicians: () => api.get("/reports/technicians"),
  getServices:    () => api.get("/reports/services"),
};

export default api;