const axios = require('axios');

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function underscoreToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const newKey = underscoreToCamel(key);
      result[newKey] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

async function getSeries() {
  try {
    const response = await axios.get(`${backendUrl}/invoke`, {
      headers: {
        "ngrok-skip-browser-warning": "skip"
      },  
      crossDomain: true
    });
    const series = response.data;
    const camelCaseSeries = convertKeysToCamelCase(series);
    return camelCaseSeries.sort((a, b) => a.seriesName.localeCompare(b.seriesName));
  } catch (error) {
    console.error('Error fetching series data:', error);
    throw error;
  }
}

module.exports = getSeries;
