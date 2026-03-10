from typing import Dict


def build_recommendation(reading: Dict) -> Dict[str, str]:
    ward = reading["ward"]
    if reading.get("pm10", 0) >= 250:
        return {
            "ward": ward,
            "reason": "PM10 is very high and indicates probable construction dust.",
            "recommendation": "Increase water spraying, cover debris, and audit nearby construction sites.",
        }
    if reading.get("no2", 0) >= 120:
        return {
            "ward": ward,
            "reason": "NO2 is very high and indicates traffic emissions.",
            "recommendation": "Introduce traffic diversion, stagger freight entry, and optimize signal timing.",
        }
    if reading.get("fire_hotspot"):
        return {
            "ward": ward,
            "reason": "Fire hotspot detected and linked to biomass burning risk.",
            "recommendation": "Send enforcement alert, investigate open burning, and deploy local response teams.",
        }
    if reading.get("so2", 0) >= 80:
        return {
            "ward": ward,
            "reason": "SO2 is high and suggests industrial pollution.",
            "recommendation": "Schedule stack inspection, verify scrubber operations, and review emission logs.",
        }
    return {
        "ward": ward,
        "reason": "No severe trigger breached, but conditions still need monitoring.",
        "recommendation": "Continue ward surveillance and community advisories while keeping mitigation teams on standby.",
    }
