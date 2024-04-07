// index.js

// Callbacks
const handleClick = (ramenId) => {
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
      const ramenDetail = document.getElementById('ramen-detail');
      ramenDetail.innerHTML = `
        <img src="${ramen.image}" />
        <h2>${ramen.name}</h2>
        <h3>${ramen.restaurant}</h3>
        <p>${ramen.comment}</p>
        <p>Rating: ${ramen.rating}</p>
      `;
    })
    .catch(error => console.error('Error fetching ramen details:', error));
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const newRamen = {
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      image: formData.get('image'),
      rating: parseFloat(formData.get('rating')),
      comment: formData.get('comment')
    };
    displayNewRamen(newRamen);
    form.reset();
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.dataset.id = ramen.id; // Store the ramen id as a data attribute
        img.addEventListener('click', () => handleClick(ramen.id));
        ramenMenu.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramens:', error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
