<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/login">Login</router-link> | -->

      <router-link to="/">Map</router-link> |

      <router-link to="/about">Visual</router-link> |

      <!-- <router-link to="/error">404</router-link> -->
    </div>

    <router-view id="my-router-view"/>
  </div>
</template>

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
</style>
