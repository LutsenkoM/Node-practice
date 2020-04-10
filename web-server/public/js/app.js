console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('forecast');
const messageTwo = document.getElementById('location');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.innerText = 'Loading...';
  messageTwo.innerText = '';

  fetch('http://localhost:2000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerText = data.error;
      } else {
        messageOne.innerText = data.forecast;
        messageTwo.innerText = data.location;
      }

    });
  });


});
