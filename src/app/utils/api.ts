const API_BASE_URL = 'http://localhost:3001/api';

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Save token to localStorage
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// API request wrapper with auth
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCurrentUser: () => apiRequest('/auth/me'),

  forgotPassword: (data: { email: string }) =>
    apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resetPassword: (data: { token: string; password: string }) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Booking API
export const bookingAPI = {
  create: (data: {
    tourPackage: string;
    tourDate: string;
    numberOfPeople: number;
    specialRequests?: string;
  }) =>
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserBookings: () => apiRequest('/bookings'),

  updateStatus: (id: string, status: string) =>
    apiRequest(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Message API
export const messageAPI = {
  getUserMessages: () => apiRequest('/messages'),

  sendMessage: (data: { receiverId?: string; content: string }) =>
    apiRequest('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  markAsRead: (id: string) =>
    apiRequest(`/messages/${id}/read`, {
      method: 'PATCH',
    }),
};

// Admin API
export const adminAPI = {
  getAllUsers: () => apiRequest('/admin/users'),
  getAllBookings: () => apiRequest('/admin/bookings'),
  getAllMessages: () => apiRequest('/admin/messages'),
};