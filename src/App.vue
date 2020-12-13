<template>
    <div id="app">
        <the-navigation v-if="!$route.meta.theNavigation" />
        <router-view />
    </div>
</template>

<script>
import TheNavigation from './components/TheNavigation'

    export default {
        components: {
            TheNavigation
        },
    }
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

body {
    background-color: rgb(0, 204, 255);
}

/* body {
    margin: 0 auto;
    background: url("./assets/img/bg.png") no-repeat;
    background-color: rgb(0, 204, 255);

    background: {
        top: 0
    };
} */

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    position:absolute;
    top:100vh;
    transform:translateY(-100%);
    width:100%;

}
</style>
