// main.js

import {baseUrl} from './variables.js';
import {fetchData} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';

document.addEventListener('DOMContentLoaded', function () {
  const restaurantList = document.getElementById('restaurant-list');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  function fetchRestaurants() {
    fetchData(baseUrl)
      .then((data) => {
        displayRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error.message);
        displayErrorMessage(
          'Failed to fetch restaurants. Please try again later.'
        );
      });
  }

  function displayRestaurants(restaurants) {
    if (restaurants.length === 0) {
      displayErrorMessage('No restaurants found.');
      return;
    }

    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant) => {
      const restaurantItem = restaurantRow(restaurant);
      restaurantItem.addEventListener('click', () => {
        fetchMenu(restaurant.id);
      });
      restaurantList.appendChild(restaurantItem);
    });
  }

  function fetchMenu(restaurantId) {
    const menuUrl = `${baseUrl}/${restaurantId}/menu`;
    fetchData(menuUrl)
      .then((menu) => {
        displayModal(menu);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error.message);
        displayErrorMessage('Failed to fetch menu. Please try again later.');
      });
  }

  function displayModal(menu) {
    modalContent.innerHTML = restaurantModal(menu.restaurant, menu.menu);
    modal.style.display = 'block';
  }

  function displayErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    restaurantList.innerHTML = '';
    restaurantList.appendChild(errorMessage);
  }

  function filterRestaurantsByCompany(company) {
    fetchData(baseUrl)
      .then((data) => {
        const filteredRestaurants = data.filter(
          (restaurant) => restaurant.company === company
        );
        displayRestaurants(filteredRestaurants);
      })
      .catch((error) => {
        console.error('Error filtering restaurants:', error.message);
        displayErrorMessage(
          'Failed to filter restaurants. Please try again later.'
        );
      });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const company = event.target.dataset.company;
      filterRestaurantsByCompany(company);
    });
  });

  fetchRestaurants();
});
