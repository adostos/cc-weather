<template>
    <div class="location">
        <p>Location</p>

        <the-search-box />

        <article>
            <ul
                v-for="(town, index) in $store.state.weather"
                :key="index"
            >
                <li>
                    <router-link
                        class="town_name"
                        :to="{ name: 'WeatherReport', params: { town } }"
                    >
                        {{ town.name }}

                        <span class="town_temp">
                            {{ Math.round(town.current.temp) }}°C
                        </span>
                    </router-link>
                </li>
            </ul>
        </article>
    </div>
</template>

<script>
import TheSearchBox from '../components/TheSearchBox'

    export default {
        components: { TheSearchBox },
        mounted() {
            this.$store.dispatch('getWeatherData')
        }
    }
</script>

<style lang="scss" scoped>

.location {
    margin: 0 auto;
    padding-top: 2em;

    width: 500px;
    max-width: 100%;
    height: 90vh;

    border-radius: 20px 20px 0 0;
    background-color: white;
    box-shadow: 0 -7px 20px rgba(121, 121, 121, .5);
}

p {
    margin-bottom: 1.5em;
    color: #888;
}

article {
    margin-top: 2em;

    ul {
        list-style: none;
    }
}

li {
    margin: 0 auto;
    margin-bottom: 10px;

    width: 90%;
    max-width: 250px;

    text-align: left;

    .town_name {
        color: #555;
        text-decoration: none;
        
        &:hover, &:focus {
            color: #888;
        }
    }

    .town_temp {
        float: right;
        opacity: .7;
    }
}
</style>