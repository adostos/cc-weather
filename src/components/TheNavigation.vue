<template>
    <div id="nav">

        <span class="weather">
            <router-link
                class="date"
                to="/weather"
                style="color:#777"
            >
                {{ dateBuilder() }} |
                {{ timeBuilder() }}
            </router-link>
        </span>

        <span class="location" :style="`height:${heightNav}px`">
            <router-link to="/">
                {{ name }}, {{ country }}
                <img src="../assets/img/location2.png" alt="loc">
            </router-link>
        </span>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'Search City',
                country: 'Country',
                heightNav: '',
            }
        },
        methods: {
            dateBuilder() {
                let today = new Date();
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                
                let day = days[today.getDay()]
                let month = months[today.getMonth()]
                let date = today.getDate();
                let year = today.getFullYear();

                return `${day}, ${date} ${month} ${year}`
            },
            timeBuilder() {
                let time = new Date();
                let hours = time.getHours();
                let minutes = time.getMinutes();

                let formattedTime
                if (hours > 12) {
                    hours = hours - 12
                    formattedTime = `${hours}:${minutes}PM`
                } else {
                    formattedTime = `${hours}:${minutes}AM`
                }

                return formattedTime
            },
            heightNavBar() {
                let navH = document.getElementById('nav').clientHeight
                this.heightNav = navH
            }
        },
        mounted() {
            this.heightNavBar()
            this.$root.$on('town-name', data => (this.name = data))
            this.$root.$on('town-country', data => (this.country = data))
        }
    }
</script>

<style lang="scss" scoped>
@import '../main.scss';

#nav {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    width: 500px;
    max-width: 100%;
    height: 35px;

    background-color: white;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -20px 30px rgba(121, 121, 121, .5);

    a {
        text-decoration: none;
        color: rgb(0, 182, 228);
    }
}

.weather {
    padding: 9px 0 0 10px;
}

.date {
    font-size: 14px;
    opacity: .6;
}

.location {
    background-color: rgba(0, 183, 255, 0.164);
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    box-sizing: border-box;
    padding: 9px 15px 0 15px;
    letter-spacing: -1px;

    img {
        width: 15px;
    }
}

@media only screen and (max-device-width: 390px) {
    .date {
        font-size: 12px;
    }

    .location {
        font-size: 13px;
        padding-top: 10px;
    }
}

@media only screen and (max-device-width: 335px) {
    .date {
        font-size: 11px;
    }

    .location {
        font-size: 12px;
        padding-top: 12px;
    }
}

</style>