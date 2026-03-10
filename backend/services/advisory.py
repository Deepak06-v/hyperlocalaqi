def get_health_advisory(aqi: float) -> str:
    if aqi <= 50:
        return "Good: air quality is satisfactory for most people."
    if aqi <= 100:
        return "Moderate: unusually sensitive people should limit prolonged outdoor exertion."
    if aqi <= 200:
        return "Sensitive groups should reduce outdoor activity."
    return "Avoid outdoor exposure and use protective measures if travel is necessary."
