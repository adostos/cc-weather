<template>
    <form class="searchBox" @keyup="searchTown()">
        <input
            type="text"
            v-model="query"
            placeholder="Search city..."
        />
    </form>
</template>

<script>
    export default {
        data() {
            return {
                'query': ''
            }
        },
        methods: {
            searchTown() {
                let input = this.query.toUpperCase();
                let li = document.getElementsByTagName('li');
                
                li.forEach( (element, index) => {
                    let textValue = element.textContent.toUpperCase()
                    
                    if (textValue.indexOf(input) > -1) {
                        li[index].style.display = "";
                    } else {
                        li[index].style.display = "none";
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
input {
    border: none;
    outline: none;
    border-radius: 3px;
    padding-left: 1.5em;

    width: 70%;
    max-width: 400px;
    height: 2.5em;

    background: {
        color: rgb(238, 237, 237);
        image: url('../assets/img/location.png');
        repeat: no-repeat;
        position-y: 50%; 
        position-x: 97%;
        size: 1.5em
    };

    &::placeholder {
        font-size: 1.1em;
        font-style: italic;
        opacity: .8;
    }
}
</style>