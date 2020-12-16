import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api_key: '806d90eba26abce6511d4c2daa4da2a1',
        query: '',
        count: 0,
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
        increment (state) {
            state.count += 1
        }
    },
    actions: {
        getWeatherData(context) {
            // vypnut if pre stalu aktualizaciu
            if (context.state.count === 0) {
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
                });
                context.commit('increment')
            }
        },
        
    },
})
