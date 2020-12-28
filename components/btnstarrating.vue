<template>

<!-- SIMPLE -->
<!--<v-btn icon class="ml-auto">-->
<!--  <v-icon>{{rrr}}</v-icon>-->
<!--</v-btn>-->

<!--
  if no rating
    grey star 
  else
    yellow star + badge with the value
  @click -> 5 stars (v-rating) + clear
-->

  <v-menu left offset-x  >
    
    <!--BTN-->
    <template v-slot:activator="{ on }">
      <v-btn icon class="ml-auto" v-on="on">
        <v-badge left bottom >
          <!-- modify with .v-badge__badge-->
          <template v-slot:badge v-if="rrr">
            {{rrr}}
            <!--<small class="o-6 fs-06">/5</small>-->
          </template> 
          <v-icon :class="{'yellow--text text--darken-2': rrr}">mdi-star</v-icon>
        </v-badge>
      </v-btn>
    </template>
    
    <!--POPUP-->
    <div class="d-flex elevation-24 white" >
      
      <v-btn tile text icon @click="rrr=null" v-if="rrr" class="align-self-center">
        <v-icon class="px-2" style="border-right:1px solid #cccccc;">mdi-close-circle</v-icon>
      </v-btn>
      
      <v-rating v-model="rrr" length="10" color="yellow darken-2" background-color="grey darken-1" dense hover clearable class="pa-1" size="20" ></v-rating>
      
    </div>
  </v-menu>
  
  <!--
  <v-menu left offset-x  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" class="ml-auto" >
        <v-badge left bottom >
          <template v-slot:badge v-if="$root.user.uRatingsDict && $root.user.uRatingsDict[imdbid]">{{$root.user.uRatingsDict[imdbid]}}
          </template>
          <v-icon :class="{'yellow--text text--darken-2': $root.user.uRatingsDict && $root.user.uRatingsDict[imdbid]}">mdi-star</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <div class="d-flex elevation-24 white" v-if="$root.user.uRatingsDict">
      <v-btn tile text icon @click="$root.user.uRatingsDict[imdbid]=null" v-if="$root.user.uRatingsDict[imdbid]" class="align-self-center">
        <v-icon class="px-2" style="border-right:1px solid #cccccc;">mdi-close-circle</v-icon>
      </v-btn>
      <v-rating
        v-model="$root.user.uRatingsDict[imdbid]" half-increments
        color="yellow darken-2" background-color="grey darken-1"
        dense hover clearable
        class="pa-1" size="40"
      ></v-rating>
    </div>
  </v-menu>-->

</template>

<style>

/* BADGES */
.v-application .v-badge__badge{
  left: 0px!important;
  bottom: -14px;
  opacity:1;
  background-color:transparent!important;
  color:inherit;
  font-size: 0.9em;
  font-weight:bold;
  text-align: center; width: 26px;
}

</style>

<script>
module.exports = {
  props: ['imdbid', 'rrr'],
  
  // // ------------------------------------------------------- DATA
  // data: function() {
  //   return {
  //     // thismovierating: null,
  //     // rrr: this.$root.user.uRatingsDict && this.$root.user.uRatingsDict[this.imdbid] ? 8 :  null,
  //   };
  // }, // /data: function() {
  
  // // ------------------------------------------------------- COMPUTED
  // computed: {
  //   // dummy(){ // this is just to be triggered at every change. Doesn't work without watcher
  //   //   return this.$root.user.uRatingsDict;
  //   // },
  // }, // /computed: {
    
  // ------------------------------------------------------- WATCH
  watch: {
    // dummy: function(val, oldval){ // console.log('val',val);
    //   console.log('dummy--------------------');
      
    //   // retrieve score
    //   this.thismovierating = this.$root.user.uRatingsDict && this.$root.user.uRatingsDict[this.imdbid] ? this.$root.user.uRatingsDict[this.imdbid] : null;
    //   console.log('this.thismovierating', this.thismovierating);
      
    // },
    rrr: function(val, oldval){ // console.log('val',val);
    // this.$root.user.uid
      if(this.$root.user.uid){
        
        if(val){
          ll('saving')
          
          // locally -----
          this.$root.user.uRatingsDict[this.imdbid] = val;
          
          // firestore -----
          accountRef = db.collection('accounts').doc(this.$root.user.uid);
          accountRef.set({z:0}, {merge: true});
          accountRef.update('Ratings.'+ this.imdbid, val);
          
        }
        else {
          ll('deleting', this.imdbid)
          
          // locally -----
          this.$root.user.uRatingsDict[this.imdbid] = null;
          
          // firestore -----
          accountRef = db.collection('accounts').doc(this.$root.user.uid);
          accountRef.update('Ratings.'+ this.imdbid, firebase.firestore.FieldValue.delete() );
        }
      } else {
        router.push('/account');
      }
    },
  }, // /watch: {

  // ------------------------------------------------------- MOUNTED
  // mounted: function() {
  //   console.log('btnstarrating mounted ----------------------');
  // }, // /mounted: function() {
  
};
</script>
