<template>
    <div id="app">
        <div id="nav">
            <router-link to="/login">Login</router-link> |

            <router-link to="/">Map</router-link> |

            <router-link to="/about">Visual</router-link> |

            <router-link to="/error">404</router-link>
        </div>

        <router-view id="my-router-view" />

        <button @click="es5()" class="button-es">es5</button>
        <button @click="es6()" class="button-es2">es6</button>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            sideBarShowFlag: false,
            timer: "",
            // that: this,
        };
    },

    methods: {
        es5: function () {
            console.log(this, "es55555555555");
        },
        /* es5(){
            console.log(this,'es55555555555');
        }, */
        es6: () => {
            console.log(this, "es666666666666");  //undefined
        },
    },
};
</script>


<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    height: 100%;
}

#nav {
    /* padding: 30px; */

    height: 10%;
    padding-top: 15px;
    /* border: #42b983 3px solid; */
    background-color: darkgray;
    box-sizing: border-box;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

/* #my-router-view{
  height: 90%;
} */
.button-es {
    z-index: 999;
    position: fixed;
    top: 200px;
    left: 300px;
}
.button-es2 {
    z-index: 999;
    position: fixed;
    top: 220px;
    left: 330px;
}
</style>
