export const getCountryFlag = (country) => {
  const flags = {
    'Argentina': '🇦🇷',
    'Brazil': '🇧🇷',
    'China': '🇨🇳',
    'Egypt': '🇪🇬',
    'Ethiopia': '🇪🇹',
    'France': '🇫🇷',
    'Ghana': '🇬🇭',
    'India': '🇮🇳',
    'Indonesia': '🇮🇩',
    'Italy': '🇮🇹',
    'Ivory Coast': '🇨🇮',
    'Japan': '🇯🇵',
    'Kenya': '🇰🇪',
    'Lebanon': '🇱🇧',
    'Mexico': '🇲🇽',
    'Morocco': '🇲🇦',
    'Nigeria': '🇳🇬',
    'Pakistan': '🇵🇰',
    'Poland': '🇵🇱',
    'Russia': '🇷🇺',
    'Somalia': '🇸🇴',
    'South Africa': '🇿🇦',
    'Spain': '🇪🇸',
    'Thailand': '🇹🇭',
    'Ukraine': '🇺🇦'
  };
  
  return flags[country] || '🌍';
};
