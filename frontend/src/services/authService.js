const API_BASE_URL = 'http://localhost:5001'

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});


const request = async (endpoint, method = 'GET', data = null, token = null) => {
  const config = {
    method,
    headers: getHeaders(token),
    ...(data && { body: JSON.stringify(data) }),
  };

  console.log(`${API_BASE_URL}${endpoint}`);
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};


export const register = (data) => request('/authorization/registration', 'POST', data);
export const login = (data) => request('/authorization/login', 'POST', data);
export const getProfile = (token) => request('/authorization/profile', 'GET', null, token);