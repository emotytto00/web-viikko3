import {baseUrl} from './variables.js';
import {restaurantRow, restaurantModal} from './components.js';

const fetchData = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data. Status: ' + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
    });
};

export {fetchData};

document.addEventListener('DOMContentLoaded', function () {
  const restaurantList = document.getElementById('restaurant-list');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  function fetchRestaurants() {
    fetchData(baseUrl)
      .then((data) => {
        console.log('Data received from API:', data);
        displayRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error.message);
      });
  }

  function displayRestaurants(restaurants) {
    if (!Array.isArray(restaurants)) {
      console.error('Invalid data format: Expected an array.');
      return;
    }
    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement('div');
      restaurantItem.classList.add('restaurant');
      restaurantItem.textContent = restaurant.name;
      restaurantItem.addEventListener('click', () => {
        fetchMenu(restaurant.id);
      });
      restaurantList.appendChild(restaurantItem);
    });
  }

  function fetchMenu(restaurantId) {
    const menuUrl = `${baseUrl}/${restaurantId}/menu`;
    fetchData(menuUrl).then((menu) => {
      displayModal(menu);
    });
  }

  function displayModal(menu) {
    modalContent.innerHTML = restaurantModal(menu.restaurant, menu.menu);
    modal.style.display = 'block';
  }

  fetchRestaurants();
});
