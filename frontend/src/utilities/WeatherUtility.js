export const weatherIcons = {
    "01d": {
        icon: "/weatherIcons/01d.png",
        description: "clear sky (day)"
    },
    "01n": {
        icon: "/weatherIcons/01n.png",
        description: "clear sky (night)"
    },
    "02d": {
        icon: "/weatherIcons/02d.png",
        description: "few clouds(day)"
    },
    "02n": {
        icon: "/weatherIcons/02n.png",
        description: "few clouds(night)"
    },
    "03d": {
        icon: "/weatherIcons/03d.png",
        description: "scattered clouds"
    },
    "04d": {
        icon: "/weatherIcons/04d.png",
        description: "broken clouds"
    },
    "04n": {
        icon: "/weatherIcons/04n.png",
        description: "broken clouds(night)"
    },
    "09d": {
        icon: "/weatherIcons/09d.png",
        description: "shower rain"
    },
    "10d": {
        icon: "/weatherIcons/10d.png",
        description: "rain (day time)"
    },
    "10n": {
        icon: "/weatherIcons/10n.png",
        description: "rain (night time)"
    },
    "11d": {
        icon: "/weatherIcons/11d.png",
        description: "thunderstorm"
    },
    "13d": {
        icon: "/weatherIcons/13d.png",
        description: "snow"
    },
    "50d": {
        icon: "/weatherIcons/50d.png",
        description: "mist"
    },
};


export const aqiMapping = {
    0: 'Good',
    50: 'Moderate',
    100: 'Unhealthy for sensitive groups',
    150: 'Unhealthy',
    200: 'Very unhealthy',
    300: 'Hazardous',
};

export const directionMapping = {
    0: 'N',
    45: 'NE',
    90: 'E',
    135: 'SE',
    180: 'S',
    225: 'SW',
    270: 'W',
    315: 'NW',
};

export function getAqiRating(aqi) {
    if (aqi <= 50) return aqiMapping[0];
    if (aqi <= 100) return aqiMapping[50];
    if (aqi <= 150) return aqiMapping[100];
    if (aqi <= 200) return aqiMapping[150];
    if (aqi <= 300) return aqiMapping[200];
    return aqiMapping[300];
}

export function getDirection(angle) {
    if (angle <= 45) return directionMapping[0];
    if (angle <= 90) return directionMapping[45];
    if (angle <= 135) return directionMapping[90];
    if (angle <= 180) return directionMapping[135];
    if (angle <= 225) return directionMapping[180];
    if (angle <= 270) return directionMapping[225];
    if (angle <= 315) return directionMapping[270];
    return directionMapping[315];
}

export function convertMsToMph(speedInMs) {
    return (speedInMs * 2.237).toFixed(2); // 1 m/s = 2.237 mph
}

export function convertToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}