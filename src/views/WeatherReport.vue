<template>
    <div class="main" v-if="town != null">
        <span>
            <img
                class="icon"
                :src="`https://openweathermap.org/img/wn/${this.town.current.weather[0].icon}.png`"
                alt="icon"
            />
            <br />
            <strong>{{ town.current.weather[0].main }}</strong>
        </span>

        <span class="main_temperature">
            <p class="temperature">{{ Math.round(town.current.temp) }}</p>
            <p style="padding-top: 12px">°C</p> 
        </span>

        <span style="padding-top:7px">
            <img class="icon_local" src="../assets/img/feel.png" alt="icon"><br />
            <p class="value" >
                {{ Math.round(town.current.feels_like) }}°C
            </p>
            <p class="note">Feels Like</p>
        </span>
        
        <span>
            <img class="icon_local" src="../assets/img/humidity.png" alt="icon"><br />
            <p class="value">{{ town.current.humidity }}%</p>
            <p class="note">Humidity</p>
        </span>

        <span>
            <p class="value">
                <img class="icon_local" src="../assets/img/pressure.png" alt="icon"><br />
                {{ town.current.pressure }}mBar
            </p>
            <p class="note">Pressure</p>
        </span>

        <span>
            <img class="icon_local" src="../assets/img/wind.png" alt="icon"><br />
            <p class="value">{{ town.current.wind_speed }} m/s</p>
            <p class="note">Wind</p>
        </span>

        <span>
            <img class="icon_local" src="../assets/img/sunrise.png" alt="icon"><br />
            <p class="value">{{ timeConvert(town.current.sunrise) }} AM</p>
            <p class="note">Sunrise</p>
        </span>

        <span>
            <img class="icon_local" src="../assets/img/sunset.png" alt="icon"><br />
            <p class="value">{{ timeConvert(town.current.sunset) }} PM</p>
            <p class="note">Sunset</p>
        </span>

        <span>
            <img class="icon_local" src="../assets/img/daytime.png" alt="icon"><br />
            <p class="value">{{ dayTime(town.current.sunrise, town.current.sunset) }}</p>
            <p class="note">Daytime</p>
        </span>
        
        <span class="forecast">
            <img
                class="icon"
                :src="`https://openweathermap.org/img/wn/${this.town.daily[0].weather[0].icon}.png`"
                alt="icon"
            />
            <br />
            <p class="value">{{ dateBuilder(1) }}</p>
            <p class="note">
                {{ Math.round(town.daily[0].temp.max) }}°C↑
                {{ Math.round(town.daily[0].temp.min) }}°C↓
            </p>
        </span>

        <span class="forecast">
            <img
                class="icon"
                :src="`https://openweathermap.org/img/wn/${this.town.daily[1].weather[0].icon}.png`"
                alt="icon"
            />
            <br />
            <p class="value">{{ dateBuilder(2) }}</p>
            <p class="note">
                {{ Math.round(town.daily[1].temp.max) }}°C↑
                {{ Math.round(town.daily[1].temp.min) }}°C↓
            </p>
        </span>

        <span class="forecast">
            <img
                class="icon"
                :src="`https://openweathermap.org/img/wn/${this.town.daily[2].weather[0].icon}.png`"
                alt="icon"
            />
            <br />
            <p class="value">{{ dateBuilder(3) }}</p>
            <p class="note">
                {{ Math.round(town.daily[2].temp.max) }}°C↑
                {{ Math.round(town.daily[2].temp.min) }}°C↓
            </p>
        </span>
    </div>
</template>

<script>
    export default {
        props: [ 'town' ],
        methods: {
            timeConvert(unix_timestamp) {
                let date = new Date(unix_timestamp * 1000);
                let hours = date.getHours();
                (hours > 11 ? hours = hours - 12 : hours)
                let minutes = "0" + date.getMinutes();

                return `${hours}:${minutes.substr(-2)}`
            },
            dayTime(sunrise, sunset) {
                let sunR = this.timeConvert(sunrise);
                let sunS = this.timeConvert(sunset);

                sunR = sunR.split(':')
                sunS = sunS.split(':')

                let hours = (parseInt(sunS[0]) + 12) - sunR[0]
                let minutes = Math.abs(sunS[1] - sunR[1])

                return `${hours}h ${minutes}m`
            },
            emitTownName(town) {
                if (town != null) { 
                    this.$root.$emit('town-name', town.name)
                    this.$root.$emit('town-country', town.country)
                }
            },
            dateBuilder(value) {
                const today = new Date();
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + value);

                let day = days[tomorrow.getDay()];
                let date = tomorrow.getDate()

                return `${day}, ${date}`
            },
        },
        mounted() {
            this.emitTownName(this.town)
        },
    }
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: 0 auto;
    padding: 10px 30px 10px;

    width: 100%;
    max-width: 500px;

    background-color: white;
    box-sizing: border-box;
    letter-spacing: -1px;
}

span {
    width: 27%;
    margin-bottom: 25px;
}

.icon {
    margin: 0 auto;
    width: 50px;
}

.main_temperature {
    display: flex;
    justify-content: center;

    .temperature {
        font-size: 4.5em;
        margin-left: 17px;
    }
}

.icon_local {
    margin: 0 auto;
    height: 25px;
    padding-bottom: 5px;
}

.forecast {
    box-shadow: 2px 3px 8px 3px rgba($color: #000000, $alpha: .1);
    border-radius: 10px;
    padding-bottom: 10px;
}

.value {
    color: #222;
    font-size: 15px;
    margin-bottom: 2px;
}

.note {
    color: rgba(153, 153, 153, 0.699);
    font-size: 10px;
}

</style>