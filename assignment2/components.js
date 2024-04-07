const restaurantRow = (restaurant) => {
  const {name, address} = restaurant;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
  `;
  return row;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;
  const courses = menu.courses;
  let menuHtml = '<ul>';
  courses.forEach((menuItem) => {
    menuHtml += `<li>${menuItem.name}, ${menuItem.price || '?€'}. ${
      menuItem.diets
    }</li>`;
  });
  menuHtml += '</ul>';
  const modalContent = `
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${postalCode}, ${city}</p>
    <p>${phone}</p>
    <p>${company}</p>
    ${menuHtml}
  `;
  return modalContent;
};

export {restaurantRow, restaurantModal};
