const apiKey = 'add92f5fe6da5ae6a4e38ce37b72590f';

// onde vai ser renderizado os dados
const app_data = document.querySelector(".app_data")
const decricao_app = document.querySelector(".decricao_app")
const searchButton = document.querySelector(".searchButton")
const cityInput = document.querySelector(".cityInput")
const dia_mes = document.querySelector(".dia_mes")

const maximumScale = document.querySelectorAll ("#maximum-scale")
const ninmumScaale = document.querySelectorAll("#ninmum-scale")

// cria variavel que pegue o nome do dia da semana e o dia e nome do mes
const data = new Date();

const diaDasemana = data.getDay();
// array com os nomes dos dias da semana
const  diasDasemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const diaAtual = diasDasemana[diaDasemana]
console.log(diaAtual)
// agora para o dia do mes
const numeroDomes = data.getMonth();
// Array com os nomes dos meses
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const mesAtual = meses[numeroDomes]
console.log(numeroDomes)
console.log(mesAtual)


dia_mes.innerHTML = `
<span>${diaAtual}, ${numeroDomes} ${mesAtual}</span>
`


searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    cityName = cityInput.value;
    // recebe o valor do input
    // verificar se tem dado no input se tiver vai executar se nao nao vai
    if(cityName){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data =>{

            const iconCode = data.weather[0].icon
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            const temperature = (data.main.temp - 273.15).toFixed(2); 
            const localCity =  data.name
            const pais = data.sys.country
            const nuvemDescricao = data.weather[0].description
            
            // estado do vento
            // humildade
            // visibilidade,
            // pressao atimosferica

            // colocar os  dados na tela
            app_data.innerHTML = `
            <div class="app_data">
                <img class="img_app" src=${iconUrl} alt="img">
                <span class="temperatura">${temperature}<span class="modelo_temperatura">℃</span></span>
                <h2>${nuvemDescricao}</h2>
                <div class="foorter">
                <span>Today </span>
                <span>${diaAtual}, ${numeroDomes} ${mesAtual}</span>
                <div class="local">
                <p>${localCity}, ${pais}</p>
                </div>
                </div>
                </div>
                `
            })
    }
    
})
