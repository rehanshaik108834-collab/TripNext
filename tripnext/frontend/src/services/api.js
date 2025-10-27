import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('session_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear session and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('session_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  createSession: async (sessionId) => {
    const response = await api.post('/auth/session', {}, {
      headers: { 'X-Session-ID': sessionId }
    });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Trips API
export const tripsAPI = {
  getAll: async () => {
    const response = await api.get('/trips');
    return response.data;
  },
  getById: async (tripId) => {
    const response = await api.get(`/trips/${tripId}`);
    return response.data;
  },
  create: async (tripData) => {
    const response = await api.post('/trips', tripData);
    return response.data;
  },
  update: async (tripId, tripData) => {
    const response = await api.put(`/trips/${tripId}`, tripData);
    return response.data;
  },
  delete: async (tripId) => {
    const response = await api.delete(`/trips/${tripId}`);
    return response.data;
  },
};

// Destinations API
export const destinationsAPI = {
  getByTripId: async (tripId) => {
    const response = await api.get(`/destinations/trip/${tripId}`);
    return response.data;
  },
  create: async (tripId, destinationData) => {
    const response = await api.post(`/destinations/trip/${tripId}`, destinationData);
    return response.data;
  },
  update: async (destinationId, destinationData) => {
    const response = await api.put(`/destinations/${destinationId}`, destinationData);
    return response.data;
  },
  delete: async (destinationId) => {
    const response = await api.delete(`/destinations/${destinationId}`);
    return response.data;
  },
};

// Flights API
export const flightsAPI = {
  getByTripId: async (tripId) => {
    const response = await api.get(`/flights/trip/${tripId}`);
    return response.data;
  },
  create: async (tripId, flightData) => {
    const response = await api.post(`/flights/trip/${tripId}`, flightData);
    return response.data;
  },
  update: async (flightId, flightData) => {
    const response = await api.put(`/flights/${flightId}`, flightData);
    return response.data;
  },
  delete: async (flightId) => {
    const response = await api.delete(`/flights/${flightId}`);
    return response.data;
  },
};

// Expenses API
export const expensesAPI = {
  getByTripId: async (tripId) => {
    const response = await api.get(`/expenses/trip/${tripId}`);
    return response.data;
  },
  create: async (tripId, expenseData) => {
    const response = await api.post(`/expenses/trip/${tripId}`, expenseData);
    return response.data;
  },
  update: async (expenseId, expenseData) => {
    const response = await api.put(`/expenses/${expenseId}`, expenseData);
    return response.data;
  },
  delete: async (expenseId) => {
    const response = await api.delete(`/expenses/${expenseId}`);
    return response.data;
  },
};

export default api;