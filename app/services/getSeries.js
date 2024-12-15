const axios = require('axios');

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
    const response = await axios.get('https://rapid-terribly-shrew.ngrok-free.app/invoke', {
      headers: {
        "ngrok-skip-browser-warning": "69420"
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
