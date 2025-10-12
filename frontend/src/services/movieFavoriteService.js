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


export const addFavoriteMovie = (movieData, token) =>
  request('/favorites', 'POST', movieData, token);

export const removeFavoriteMovie = (movieId, token) =>
  request(`/favorites/${movieId}`, 'DELETE', null, token);

export const getFavoriteMovies = (token) =>
  request('/favorites', 'GET', null, token);

export const checkFavoriteMovie = (movieId, token) =>
  request(`/favorites/check/${movieId}`, 'GET', null, token);
