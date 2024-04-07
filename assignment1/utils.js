const fetchData = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data. Status: ' + response.status);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Response is not in JSON format');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
      throw error;
    });
};
