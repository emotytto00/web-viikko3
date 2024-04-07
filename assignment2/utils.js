const fetchData = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
    });
};

export {fetchData};
