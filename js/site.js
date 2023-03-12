const container = document.querySelector('.container');
const busca = document.querySelector('.box-busca button');
const boxTempo = document.querySelector('.box-tempo');
const detalhesTempo = document.querySelector('.tempo-detalhes');
const error404 = document.querySelector('.not-found');

busca.addEventListener('click', () => {
    const APIKey = '1575391f141ebdd4d228583e777f1db7';
    const city = document.querySelector('.box-busca input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            boxTempo.style.display = 'none';
            detalhesTempo.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn')
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn')

        const image = document.querySelector('.box-tempo img');
        const temperatura = document.querySelector('.box-tempo .temperatura');
        const descricao = document.querySelector('.box-tempo .descricao');
        const umidade = document.querySelector('.tempo-detalhes .umidade span');
        const vento = document.querySelector('.tempo-detalhes .vento span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = '/images/clear.png';
                break;

            case 'Rain':
                image.src = '/images/rain.png';
                break;

            case 'Snow':
                image.src = '/images/snow.png';
                break;

            case 'Clouds':
                image.src = '/images/cloud.png';
                break;

            case 'Haze':
                image.src = '/images/mist.png';
                break;

            default:
                image.src = '';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        boxTempo.style.display = '';
        detalhesTempo.style.display = '';
        boxTempo.classList.add('fadeIn');
        detalhesTempo.classList.add('fadeIn');
        container.style.height = "590px";

    });
})