console.log('this is a client side js file');

const weatherForm = document.querySelector('.weatherForm');
const locationInput = weatherForm.querySelector('#location');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = locationInput.value;
  fetchWeather(location);
});

const fetchWeather = location => {
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.info);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.info;
      }
    })
    .catch(err => console.log(err));
};
