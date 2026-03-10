const API_BASE_URL = window.API_BASE_URL || "http://localhost:8000";

export async function fetchCurrentAQI() {
  const response = await axios.get(`${API_BASE_URL}/aqi/current`);
  return response.data;
}

export async function fetchForecast() {
  const response = await axios.get(`${API_BASE_URL}/aqi/predict`);
  return response.data;
}

export async function fetchSources() {
  const response = await axios.get(`${API_BASE_URL}/pollution/source`);
  return response.data;
}

export async function fetchRecommendations() {
  const response = await axios.get(`${API_BASE_URL}/recommendations`);
  return response.data;
}
