const countries = document.querySelector('datalist');
const search = document.querySelector('#searchcountry');
const date = document.querySelector('#date');
const countryName = document.querySelector('#countryName');
const confirmed = document.querySelector('.confirmed');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const chart = document.querySelector('.charts');

let dataChart = [];

const API_URL = "https://api.covid19api.com/summary";

async function covid(country) {
	const res = await fetch(API_URL);
	console.log(res)
	const data = await res.json();
	console.log(country)

	if (res.status === 4 || res.status ===200) {
		date.textContent = new Date(data.Date).toDateString();

		console.log(data.Global)
		if (country === '' || country === 'World') {
			const {TotalConfirmed,TotalRecovered,TotalDeaths,NewConfirmed,NewRecovered,NewDeaths} = data.Global;

		confirmed.children[1].textContent = TotalConfirmed;
		confirmed.children[2].textContent = NewConfirmed;
		recovered.children[1].textContent = TotalRecovered;
		recovered.children[2].textContent = NewRecovered;
		deaths.children[1].textContent = TotalDeaths;
		deaths.children[2].textContent = NewDeaths;
		countryName.textContent = 'The World';

	};

		
		data.Countries.forEach(item =>{
			const option = document.createElement('option');
			option.value = item.Country;
			option.textContent = item.Country;
			countries.appendChild(option)

			if (country === item.Country) {

		confirmed.children[1].textContent = item.TotalConfirmed;
		confirmed.children[2].textContent = item.NewConfirmed;
		recovered.children[1].textContent = item.TotalRecovered;
		recovered.children[2].textContent = item.NewRecovered;
		deaths.children[1].textContent = item.TotalDeaths;
		deaths.children[2].textContent = item.NewDeaths;
		countryName.textContent = item.Country;
	
			}
		})

	}
	else{
		chart.innerHTML = '<h2>Loading..</h2>';
	}
}
covid(search.value);

const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', (e)=>{
	e.preventDefault();
	covid(search.value);
	search.value = '';
})