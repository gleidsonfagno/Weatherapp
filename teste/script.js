// const apiKey = 'add92f5fe6da5ae6a4e38ce37b72590f'; // Substitua pela sua chave de API

// const cityInput = document.getElementById('cityInput');
// const searchButton = document.getElementById('searchButton');
// const forecastData = document.getElementById('forecastData');

// searchButton.addEventListener('click', () => {
//     const city = cityInput.value;
//     if (city === '') return;

//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             const nextFiveDaysForecast = getNextFiveDaysForecast(data.list);
//             displayForecast(nextFiveDaysForecast);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });

// function getNextFiveDaysForecast(forecastList) {
//     const today = new Date().getDate();
    
//     const nextFiveDaysForecast = forecastList.filter(forecast => {
//         const forecastDate = new Date(forecast.dt * 1000);
//         return forecastDate.getDate() !== today && forecastDate.getHours() === 12;
//     });

//     return nextFiveDaysForecast.slice(0, 5);
// }

// function displayForecast(forecastList) {
//     // Resto do código para exibir as previsões
// }

// // Resto do código
