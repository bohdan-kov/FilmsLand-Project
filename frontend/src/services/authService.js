const API_BASE_URL = 'http://localhost:5001';

const getHeaders = (token, isFormData = false) => {
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response, errorMessage = 'Request failed') => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorMessage);
  }
  return response.json();
};

const createRequestConfig = (method, data, token, isFormData = false) => ({
  method,
  headers: getHeaders(token, isFormData),
  ...(data && !isFormData && { body: JSON.stringify(data) }),
  ...(data && isFormData && { body: data }),
});

const request = async (endpoint, method = 'GET', data = null, token = null, isFormData = false) => {
  const config = createRequestConfig(method, data, token, isFormData);
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse(response);
};

export const uploadPhoto = (file, token) => {
  const formData = new FormData();
  formData.append('photo', file);
  return request('/authorization/upload-photo', 'POST', formData, token, true);
};

export const register = (data) => request('/authorization/registration', 'POST', data);
export const login = (data) => request('/authorization/login', 'POST', data);
export const getProfile = (token) => request('/authorization/profile', 'GET', null, token);