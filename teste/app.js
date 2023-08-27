// // Substitua 'YOUR_API_KEY' pela sua chave de API da OpenWeatherMap
const apiKey = 'add92f5fe6da5ae6a4e38ce37b72590f';

// const searchButton = document.getElementById('searchButton');
// const cityInput = document.getElementById('cityInput');
// const weatherData = document.getElementById('weatherData');

// searchButton.addEventListener('click', () => {
//     const cityName = cityInput.value;

//     if (cityName) {
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//             .then(response => response.json())
//             .then(data => {
//                 const temperature = (data.main.temp - 273.15).toFixed(2); // Convert to Celsius
//                 const weatherDescription = data.weather[0].description;
//                 const cityName = data.name;
//                 const iconCode = data.weather[0].icon;

//                 const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

//                 weatherData.innerHTML = `
//                     <h2>${cityName}</h2>
//                     <p>Temperature: ${temperature}°C</p>
//                     <p>Weather: ${weatherDescription}</p>
//                     <img src="${iconUrl}" alt="Weather Icon">
//                 `;
//             })
//             .catch(error => {
//                 weatherData.innerHTML = '<p>Erro ao buscar previsão.</p>';
//             });
//     }
// });
// Substitua 'YOUR_API_KEY' pela sua chave de API do OpenWeatherMap
// const apiKey = 'YOUR_API_KEY';

// : Esta é a função que criamos para obter a localização do usuário.
function getUserLocation() {
    // Verifica se o navegador suporta a API de geolocalização. Se for suportado, o código dentro do bloco if será executado.
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(latitude)

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        const cityName = data.name;

                        console.log(`Você está na cidade de ${cityName}`);
                    })
                    .catch(error => {
                        console.log("Erro ao obter o nome da cidade:", error);
                    });
            },
            function(error) {
                console.log("Erro ao obter a localização:", error.message);
            }
        );
    } else {
        console.log("Geolocalização não suportada neste navegador.");
    }
}

// Chama a função para obter a localização do usuário quando necessário
getUserLocation();
