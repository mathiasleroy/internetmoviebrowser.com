<template>
    <v-container class="">
      <v-row>
        <v-col cols="12">
          
      <!--DISPLAY SETTINGS-->
          <h2 class="overline pt-5 pb-2">Display settings</h2>
          
          <v-switch v-model="$root.goDark" label="Dark Mode" ></v-switch>


      <!--ACCOUNT SETTINGS-->
          <h2 class="overline pt-5 pb-2">Account settings</h2>
          
          <div v-if="!$root.user.uid">
            For more settings, <router-link to="/account">create an account</router-link>
          </div>
          
          <div v-else>
            
            <!--<v-switch v-model="$root.user.uSettings.saveDarkMode" label="Save Dark/Light mode" 
            @change="if($event){saveAccountSetting('saveDarkMode',$root.goDark)} else{saveAccountSetting('saveDarkMode',null)}"
            ></v-switch>-->
            
              <!--v-model="defaultDarkMode"-->
            <v-select required
              item-value="val" item-text="name"
              :items="[{val:'null', name:'auto'}
              , {val:'true', name:'Dark'}
              , {val:'false', name:'Light'}
              ]"
              label="Default Light/Dark Mode"
              @change="saveAccountSetting('defaultGoDark',$event)"
              v-model="$root.user.uSettings.defaultGoDark"
            ></v-select>
            
            <v-select required
              item-value="val" item-text="name"
              :items="[
                {val:'Rank', name:'Trending'},
                {val:'GlobalScore', name:'Score'},
                {val:'Votes', name:'Votes'},
                {val:'date', name:'Date'},
              ]"
              label="Default Sort"
              @change="saveAccountSetting('defaultSort',$event)"
              v-model="$root.user.uSettings.defaultSort"
            ></v-select>
            
              <!--v-model="defaultView"-->
            <v-select required
              item-value="val" item-text="name"
              :items="[
                {val:'all', name:'All'}
              , {val:'watchlist', name:'Watchlist'}
              , {val:'favorites', name:'Favorites'}
              , {val:'rated', name:'Rated'}
              , {val:'notrated', name:'Not Rated'}
              ]"
              label="Default View"
              @change="saveAccountSetting('defaultView',$event)"
              v-model="$root.user.uSettings.defaultView"
            ></v-select>
            
            
            <!--<v-select
              v-model="preferedMovieSource"
              :items="['Torrent'
              , 'Legal Streaming (Netflix/Amazon/Google/Apple)'
              , 'Theaters'
              , 'Other'
              ]"
              label="Preferred Movie source"
              required
            ></v-select>
            <v-text-field v-if="preferedMovieSource=='Other'"
            label="other"
            v-model="preferedMovieSourceOther"></v-text-field>-->
              <!--
              :error-messages="selectErrors"
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
              -->
              
            <!--
            <h2 class="overline pt-5 pb-2">Polling</h2>
            
            <v-text-field label="Preferred Movie source" 
            v-model="$root.user.uSettings.preferedMovieSource"
            @change="saveAccountSetting('preferedMovieSource',$event)" 
            list="mouviesources"></v-text-field>
						<datalist id="mouviesources">
							<option value="Torrent">
							<option value="Legal Streaming">
							<option value="Theaters">
						</datalist>
              
            <v-text-field label="Preferred Media Player" 
            v-model="$root.user.uSettings.preferedMediaPlayer"
            @change="saveAccountSetting('preferedMediaPlayer',$event)" 
            list="mediaplayers"></v-text-field>
						<datalist id="mediaplayers">
							<option value="SMPlayer">
							<option value="VLC">
							<option value="MPV">
							<option value="XBMC/Kodi Player">
						</datalist>
            -->
            
            
          </div>
            
            
        
<!--<v-switch v-model="" label="Force Dark Mode" ></v-switch>-->

<!--todo Preferred watching method-->

<!--Save Presets-->
          
<!--<h2 class="overline pt-5 pb-2">Score</h2>-->
<!--Use IMBD / -->
<!--Use RT / -->
<!--Use MC / -->
<!--Use LBXD-->
            

          
            
        </v-col>
      </v-row>
      
      <!--<h1>Settings</h1>-->
    
      <!-- both visibility:hidden and display:none can be used,
           but the former can be used in CSS animations -->
      <!--<div style="visibility:hidden; opacity:0" class="dropzone"></div>-->
    
    
    </v-container>
</template>

<style>
/*div.dropzone{*/
  /* positions to point 0,0 - required for z-index */
/*  position: fixed; top: 0; left: 0; */
/*  z-index: 9999999999;               */
/*  width: 100%; height: 100%;         */
/*  transition: visibility 200ms, opacity 200ms;*/
/*	border: 11px dashed #60a7dc;*/
	/*background: rgb(96, 167, 220,.3);*/
    	/*not working: */
/*    	background: #60a7dc66; */
    	/*opacity: 0.1;*/
/*}*/
</style>

<script>
module.exports = {
  // ------------------------------------------------------- DATA
  data: function() {
    return {
      preferedMovieSource:null,
      preferedMovieSourceOther:'',
    }
  }, // /data: function() {


  // // ------------------------------------------------------- MOUNTED
  // mounted: function() {
  // }, // /mounted: function() {
    
    
  // ------------------------------------------------------- WATCH
  watch: {
    // preferedMovieSource: function(val, oldval){ // console.log('val',val);
    //   ll('preferedMovieSource change: ' +val);
    //   this.saveAccountSetting('preferredSource', val);
    // },
    // preferedMovieSourceOther: function(val, oldval){ // console.log('val',val);
    //   if(debounce_timeout) clearTimeout(debounce_timeout); // if triggered again before the timeout is over then it will start again
    //   var that=this;
    //   debounce_timeout = setTimeout(function() {
    //     ll('preferedMovieSourceOther change: ' +val);
    //     that.saveAccountSetting('preferredSource_Other', val);
    //   }, debounce_time);
    // },
  }, // /watch: {
  // ------------------------------------------------------- METHODS
  methods: {
    saveAccountSetting(key,val){
      ll('saveAccountSetting('+key+','+val+')');
      
      if(this.$root.user.uid ){
        db.collection('accounts').doc(this.$root.user.uid)
          .update('Settings.'+key, val)
          ;
      }
      
    },
  }, // /methods: {
};
</script>