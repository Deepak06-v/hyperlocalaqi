const API_BASE_URL = window.API_BASE_URL || "http://localhost:8000";

window.fetchCurrentAQI = async function () {
  try {
    console.log("Fetching current AQI from:", `${API_BASE_URL}/aqi/current`);
    const response = await axios.get(`${API_BASE_URL}/aqi/current`);
    console.log("Current AQI response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch current AQI:", error.message);
    return [];
  }
};

window.fetchForecast = async function () {
  try {
    console.log("Fetching forecast from:", `${API_BASE_URL}/aqi/predict`);
    const response = await axios.get(`${API_BASE_URL}/aqi/predict`);
    console.log("Forecast response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch forecast:", error.message);
    return [];
  }
};

window.fetchSources = async function () {
  try {
    console.log("Fetching sources from:", `${API_BASE_URL}/pollution/source`);
    const response = await axios.get(`${API_BASE_URL}/pollution/source`);
    console.log("Sources response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch sources:", error.message);
    return [];
  }
};

window.fetchRecommendations = async function () {
  try {
    console.log("Fetching recommendations from:", `${API_BASE_URL}/recommendations`);
    const response = await axios.get(`${API_BASE_URL}/recommendations`);
    console.log("Recommendations response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch recommendations:", error.message);
    return [];
  }
};
