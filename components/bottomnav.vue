<template>
  <v-bottom-navigation app grow class="bt-1-lightgrey"
    >
    <!--v-model="bottomNav" -->
    
    <v-btn value="movies" to='/' @click="$root.selectView = 'all'">
      <span>Movies</span>
      <v-icon>mdi-movie-roll</v-icon>
    </v-btn>

    <v-btn value="account" to='/account'>
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    
    <v-btn value="settings" to='/settings'>
      <span>Settings</span>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    
    <v-btn value="about" to='about'>
      <span>About</span>
      <v-icon>mdi-information</v-icon>
    </v-btn>
    
  </v-bottom-navigation>
</template>


<script>

// const debouncetimeout=500;

module.exports = {
  data: function() {
    return {
    }
  },
    
  // // ------------------------------------------------------- MOUNTED
  // mounted: function() {
  //   console.log('bottomnav mounted')
  // }, // /mounted: function() {
  
}
</script>

<style>
.bt-1-lightgrey{
  border-top: 1px solid #ddd;
}
</style>