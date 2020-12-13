import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api_key: '01d173fa50230c4e27143afd37a8ce86',
        query: '',
        towns: [
            { 'name': 'Bratislava', 'lon': 17.11, 'lat': 48.15 },
            { 'name': 'Košice', 'lon': 21.33, 'lat': 48.67 },
            { 'name': 'Michalovce', 'lon': 21.92, 'lat': 48.75 },
            { 'name': 'Koromľa', 'lon': 22.29, 'lat': 48.72 },
            { 'name': 'Humenné', 'lon': 21.92, 'lat': 48.72 },
            { 'name': 'Sobrance', 'lon': 22.18, 'lat': 48.74 }
        ],
        // towns = ['Bratislava', 'Humenné', 'Koromľa', 'Košice', 'Michalovce', 'Sobrance']
        weather: [],
    },
    mutations: {
        searchCity(state, value) {
			state.query = value
		},
    },
    actions: {
        getWeatherData(context) {
            context.state.weather = []
            context.state.towns.map(town => {
                axios
                    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${town.lat}&lon=${town.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${context.state.api_key}`)
                    .then(response => {
                        let weatherResponse = response.data
                        weatherResponse.name = town.name
                        weatherResponse.country = "Slovakia"
                        context.state.weather.push(weatherResponse)
                    })
                    .catch(error => {
                        alert('Please wait...', error)
                    })
            })
        },
        
    },
})
