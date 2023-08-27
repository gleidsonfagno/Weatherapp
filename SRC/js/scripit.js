const apiKey = '3aa2cbf6f660275526f10a86df02bc47'; // Substitua pelo seu API Key
const cardes = document.querySelectorAll(".carde");
const app_data = document.querySelector(".app_data");
const searchButton = document.querySelector(".searchButton");
const dias = document.querySelector(".dias");
const cityInput = document.getElementById("cityInput");
const humidade = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const visibilidade = document.querySelector(".visibility");
const pressao = document.querySelector(".pressure")
// console.log(cardes)


// cria variavel que pegue o nome do dia da semana e o dia e nome do mes
const data = new Date();
const diaDasemana = data.getDay();
// array com os nomes dos dias da semana
const diasDasemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const diaAtual = diasDasemana[diaDasemana]
// console.log(diaAtual)
// agora para o dia do mes
const numeroDomes = data.getMonth();
// Array com os nomes dos meses
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const mesAtual = meses[numeroDomes]

const diaDoMes = data.getDate();
console.log(diaDoMes); // Isso imprimirá o dia do mês em número

console.log(mesAtual)
console.log(numeroDomes)

// if (cityName == "") {
//     // Se o campo de pesquisa estiver vazio, mostra a mensagem de erro
//     alert("Por favor, insira o nome da cidade.")
// }
// ogora vou fazer o requisicao 
searchButton.addEventListener("click", (event) => {
    event.preventDefault()

    const cityName = cityInput.value// Obtém o valor do input de pesquisa
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastList = data.list;
            // essa parte vai ficar com a principal da tela
            console.log(data)
            const teperatura = forecastList[0].main.temp
            const temp = Math.floor(teperatura);
            const pais = data.city.name
            const icone = forecastList[0].weather[0].icon;
            const iconeUrl = `http://openweathermap.org/img/wn/${icone}.png`;

            app_data.innerHTML = `
            <img src=${iconeUrl} alt="">
            <span class="temperatura">${temp}<span class="modelo_temperatura">℃</span></span>
            <h2>Chuva</h2>
            <div class="foorter">
                <span>Hoje</span>
                <span class="dia_mes">${diaAtual}, ${diaDoMes} ${mesAtual}</span>
                <div class="local">
                <p>${pais}</p>
                </div>
            </div>
    
            `
            // os dados do vento e etc.:
            const humidity = data.list[0].main.humidity;
            const visibility = data.list[0].visibility;
            const pressure = data.list[0].main.pressure;
            const speed = data.list[0].wind.speed;

           // Função para formatar a visibilidade para milhas
            function formatVisibilidadeParaMilhas(visibilidadeMetros) {
                const visibilidadeMilhas = visibilidadeMetros / 1609.34; // Conversão de metros para milhas
                const visibilidadeFormatada = visibilidadeMilhas.toFixed(1); // Formatação com um dígito decimal
                return visibilidadeFormatada ;
            }
            
            // Obtém a visibilidade da API
            // const visibilidadeMetros = data.list[0].visibility;
            
            // Formata e exibe a visibilidade em milhas
            const visibilidadeFormatada = formatVisibilidadeParaMilhas(visibility);
            console.log("Visibilidade: " + visibilidadeFormatada);

            wind.innerHTML= `
            <span>Wind status</span>
            <h2>${speed}<span class="edit">mph</span></h2>
            <div>
            <img src="SRC/img/HeavyCloud.png" alt="">
            <span>WSW</span>
            </div>
            `
            // :umidadade
            humidade.innerHTML = `
            <span>Humidity</span>
            <h2>${humidity}<span  class="edit">%</span></h2>
                <div class="porcentagem">
                            <div>0</div>
                            <div>50</div>
                            <div>100</div>
                </div>
            <div class="humidity-bar">
                <div class="progress">
                </div>
            </div>
            <span class="porcentagem_float">%</span>
            `
            // visibilidade
            visibilidade.innerHTML = `
            <span>Visibility</span>
            <h2>${visibilidadeFormatada}<span  class="edit">miles</span></h2>

            `
            // pressao
            pressao.innerHTML= `
            <span>Air Pressure</span>
            <h2>${pressure}<spna  class="edit">mb</spna></h2>

            `
            const progressBar = document.querySelector(".progress");
            progressBar.style.width = `${humidity}%`;

            // Limpa a lista de resultados antes de adicionar os novos resultados
            dias.innerHTML = "";

            for (let i = 0; i < forecastList.length; i +=8) {
                const datas = forecastList[i].dt;
                // 2. Obtendo a Data da Previsão:
                // A linha const forecastDate = new Date(forecastList[i].dt * 1000); cria um objeto Date com base no valor de dt (data e hora em segundos desde 01 de janeiro de 1970) fornecido pela API. Multiplicamos por 1000 para obter o valor em milissegundos, que é o formato esperado pelo construtor do Date.
                const forecastDate = new Date(datas * 1000)
                const dia = forecastDate.toLocaleDateString("pt-BR", { weekday: "long" });
                // 3. Obtendo o Nome do Dia da Semana:
                // A linha const day = forecastDate.toLocaleDateString('pt-BR', { weekday: 'long' }); utiliza o método toLocaleDateString() para formatar a data como uma string legível. O segundo argumento é um objeto que especifica opções de formatação. Usamos 'pt-BR' para o idioma brasileiro e { weekday: 'long' } para obter o nome completo do dia da semana (por exemplo, "segunda-feira").
                const temperatureMax = forecastList[i].main.temp_max;
                const temperatureMin = forecastList[i].main.temp_min;
                const weatherIcon = forecastList[i].weather[0].icon;
                // Se você deseja mostrar apenas a parte inteira da temperatura (removendo a parte decimal), você pode usar a função Math.floor() para arredondar o número para baixo. Isso irá resultar na parte inteira da temperatura.
                const parteInteiraMax = Math.floor(temperatureMax);
                const parteInteiraMin = Math.floor(temperatureMin);
                const icone2Url = `http://openweathermap.org/img/wn/${weatherIcon}.png`;


                // essa parte vai colora os proximos dias da previsao
                const forecastItem = document.createElement('div');
                    forecastItem.innerHTML = `
                            <p>${dia} </p>
                            <div class="img"><img src=${icone2Url} alt="Previsão do Tempo"></div>
                            <div class="teperatura">
                                <span class="maximum-scale">${parteInteiraMax}°C</span>
                                <span class="minimum-scale">${parteInteiraMin}°C</span>
                            </div>

                    `;
                    forecastItem.classList.add("carde");
                    dias.appendChild(forecastItem);
                    // dias.innerHTML = "forecastItem"
                }

        })
    cityInput.value = "";
})