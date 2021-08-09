<template>
  <v-container fluid class="pt-0">
    <v-row justify="center">
      
      <v-card v-if="ddd.imdbID" tile max-width="800" >
        
        <v-card-title style="word-break: keep-all;">
          <v-row no-gutters>
            <v-col class="align-self-center" >
              
              <h1 class="display-1">
                {{ddd.Title}} <small>&nbsp;({{ddd.Year}})</small>
              </h1>
            </v-col>
            
              <v-col cols=1 class="d-flex flex-column justify-space-betwee pa-0 ma-0">
                <v-btn icon class="ml-auto" @click="$root.toggleUserList('watchlist',ddd.imdbID)">
                  <v-icon :class="{'orange--text': $root.user.uWatchList && $root.user.uWatchList.indexOf(ddd.imdbID)>-1}">mdi-bookmark</v-icon>
                </v-btn>
                <v-btn icon class="ml-auto" @click="$root.toggleUserList('favlist',ddd.imdbID)">
                  <v-icon :class="{'red--text': $root.user.uFavsList && $root.user.uFavsList.indexOf(ddd.imdbID)>-1}">mdi-heart</v-icon>
                </v-btn>
                
                <template v-if="$root.user.uRatingsDict">
                  <btnstarrating :imdbid="ddd.imdbID" :rrr="$root.user.uRatingsDict[ddd.imdbID]"></btnstarrating>
                </template>
                <template v-else>
                  <v-btn icon class="ml-auto">
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                </template>
                
              </v-col>
          
          </v-row>
          
        </v-card-title>
        <v-card-subtitle class="">
          <span class="">
            {{ddd.Genre}}
          </span> 
          <span class="ml-5">
            {{ddd.Runtime | toHHmm}}
          </span>
        </v-card-subtitle>
        
        <v-row no-gutters class="px-4" :class="{'o-7': $root.goDark}">
          <v-col cols="4" xs="4" sm="3" md="3" style="border-right:1px solid transparent;">
              <v-img @click="modalBigPoster = !modalBigPoster"
              :src="posterURL300"
              ></v-img>
              
              <v-dialog v-model="modalBigPoster" max-width="60vh" content-class="ma-2">
                <v-img 
                :src="posterURL780"
                ></v-img>
              </v-dialog>
              
          </v-col>
              
          <v-col class="embed-responsive">
            <iframe 
              class="embed-responsive-item"
              :src="this.trailerUrl" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              ></iframe>
            <!--<iframe style="position: absolute;"
              class="embed-responsive-item"
              frameborder="0" 
              allowfullscreen 
              :src="'//www.youtube.com/embed?listType=search&list=official%20english%20trailer%20'+ddd.Title+'%20'+ddd.Year+'&wmode=transparent&modestbranding=true'"
              ></iframe>-->
          </v-col>
        </v-row>
        
        <!-- SCORES -->
        <div :class="{'o-8': $root.goDark}" class="mt-1">
          <v-row class=" px-4 black--text o-9 font-weight-bold" no-gutters>
            <v-col class="py-0 text-center by-1">
              <div class="" :class="color.score">
                
                <v-avatar tile size="1em">
                <!--<div>-->
                <!--height=12 width=12 -->
                  <v-img src="assets/img/favicons/favicon-32x32.png" alt="Internet Movie Browser Logo"></v-img>
                <!--</div>-->
                </v-avatar>
                {{ddd.GlobalScore | tofixed0}}<small class="o-4">%</small>
              </div>
            </v-col>
          </v-row>
            
          <v-row class=" px-4 white--text font-weight-bold" no-gutters>
            <v-col class="py-0 text-center ">
              
              <a target="_blank" :href="'https://www.imdb.com/title/' + ddd.imdbID + '/'" class="ratingLink">
                <div class="" :class="color.imdb">
                  <v-avatar tile size="1em">
                    <v-img src="assets/img/icons/imdb.svg" alt="IMDb Logo"></v-img>
                  </v-avatar>
                  {{ddd.Rating_imdb | tofixed1}}<small class="o-4">/10</small>
                </div>
              </a>
              
            </v-col>
            <v-col class="py-0 text-center bl-1">
              <a target="_blank" :href="ddd.TomatoURL" class="ratingLink">
                <div class="" :class="color.rt">
                  <v-avatar tile size="1em">
                    <!--<v-img height="8" src="assets/img/icons/rt_84x24.png" alt="Rotten Tomatoes Logo"></v-img>-->
                    <v-img  src="assets/img/icons/rt.svg" alt="Rotten Tomatoes Logo"></v-img>
                  </v-avatar>
                  {{ddd.Rating_rt | tofixed0}}<small class="o-4">%</small>
                </div>
              </a>
            </v-col>
            <v-col class="py-0 text-center bl-1">
              <a target="_blank" :href="ddd.metacriticURL" class="ratingLink">
                <div class="" :class="color.mc">
                  <v-avatar tile size="1em">
                    <!--<v-img height="8" src="assets/img/icons/mc_90x24.png" alt="Metacritic Logo"></v-img>-->
                    <v-img src="assets/img/icons/mc.svg" alt="Metacritic Logo"></v-img>
                  </v-avatar>
                  {{ddd.Rating_mc | tofixed0}}<small class="o-4">%</small>
                </div>
              </a>
            </v-col>
            <v-col class="py-0 text-center bl-1 ">
              <a target="_blank" :href="'https://letterboxd.com/imdb/'+ddd.imdbID" class="ratingLink">
                <div class="" :class="color.lbxd">
                  <v-avatar tile size="1em">
                    <!--<v-img height="8" src="assets/img/icons/lbxd_151x16.png" alt="Letterboxd Logo"></v-img>-->
                    <v-img src="assets/img/icons/lbxd.svg" alt="Letterboxd Logo"></v-img>
                  </v-avatar>
                  {{ddd.Rating_lbxd | tofixed1}}<small class="o-4">/5</small>
                </div>
              </a>
            </v-col>
            
          </v-row>
        </div>
        
        <v-card-text class="text--darken-4">
          
          <v-col cols="12" sm="10" md="8">
            {{ddd.Plot}}
          </v-col>
          
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <!--<tr>
                  <td>Runtime</td>
                  <td>{{ddd.Runtime | toHHmm}}</td>
                </tr>-->
                <tr v-if="ddd.Votes">
                  <td>Votes</td>
                  <td>{{ddd.Votes | toThousands}}</td>
                </tr>
                <tr v-if="ddd.Director">
                  <td>Director</td>
                  <td>
                    <template v-for="(director,i) in ddd.Director.split(', ')" :key="director">
                      <span v-if="i!=0">, </span>
                      <a href="#" @click="$root.searchQuoted(director,'Director')">
                        {{director}}
                      </a>
                    </template> 
                  </td>
                </tr>
                <tr v-if="ddd.Actors">
                  <td>Actors</td>
                  <td>
                    <template v-for="(actor,i) in ddd.Actors.split(', ')" :key="actor">
                      <span v-if="i!=0">, </span>
                      <a href="#" @click="$root.searchQuoted(actor,'Actors')">
                        {{actor}}
                      </a>
                    </template>  
                  </td>
                </tr>
                
                
                <tr v-if="ddd.ReleaseDate">
                  <td>Release Date</td>   
                  <td>{{ddd.ReleaseDate | toFriendlyDate}}</td>
                </tr>
                <tr v-if="ddd.DVD">
                  <td>DVD/BluRay</td>    
                  <td>{{ddd.DVD | toFriendlyDate}}</td>
                </tr>
                
                <tr v-if="ddd.Production">
                  <td>Production</td>   
                  <td>{{ddd.Production}}</td>
                </tr>
                
                <tr v-if="ddd.Rated.indexOf('MPAA')>-1">
                  <td>MPAARating</td>   
                  <td>{{ddd.Rated | toFriendlyMpaa}}</td>
                </tr>
                    
                <tr v-if="ddd.Country">
                  <td>Country</td>   
                  <td>{{ddd.Country}}</td>
                </tr>
                
                <tr v-if="$root.options._1337x">
                  <td>Search Torrent</td>   
                  <td>
                    <a target="_blank" class="" :href="'https://1337x.to/search/'+ ddd.Title +' '+ ddd.Year +'/1/'">1337x.to</a>
                  </td>
                </tr>
                
              </tbody>
            </template>
          </v-simple-table>
                
        </v-card-text>
  
  
        <!--<v-card-actions>
          <v-btn
            color="orange"
            text
          >
            Share
          </v-btn>
    
          <v-btn
            color="orange"
            text
          >
            Explore
          </v-btn>
        </v-card-actions>-->
      </v-card>
      
    </v-row>
  </v-container>
</template>

<style>
/*
.hero-banner{
  background:red;
}
.multiply{
  mix-blend-mode: multiply;
}
.grayscale-100{ filter: grayscale(100%); }
.grayscale-80{ filter: grayscale(80%); }
.grayscale-60{ filter: grayscale(60%); }
.grayscale-40{ filter: grayscale(40%); }
.grayscale-20{ filter: grayscale(20%); }
*/
.embed-responsive {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 0;
}
.embed-responsive .embed-responsive-item, .embed-responsive embed, .embed-responsive iframe, .embed-responsive object, .embed-responsive video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.by-1{
  border-top:1px solid transparent;
  border-bottom:1px solid transparent;
}
.bl-1{
  border-left:1px solid transparent;
}
a.ratingLink{
  /*color:white;*/
  color:#333333;
  font-weight:bold;
  text-decoration: none;
}
  a.ratingLink:hover{
    opacity:.7;
    transition:all 0.2s ease;
  }

</style>

<script>
module.exports = {
  components: {
    'btnstarrating': httpVueLoader('components/btnstarrating.vue'),
  },
  
  
  // ------------------------------------------------------- DATA
  data: function() {
    return {
      // imdbid: this.$route.params.imdbID,
      //data_posterSizes = [ "w45", "w92", "w154", "w185", "w300", "w342", "w500", "w780", "original" ];:
      // posterSize: 300,
      modalBigPoster: false,
      // infokeys: {
      //   'Votes':'toThousands',
      //   'Director':null, 
      //   'Actors':null, 
      // },
      trailerUrl: 'xxx'
    };
  }, // /data: function() {
  
  // ------------------------------------------------------- WATCH
  watch: {
    ddd: function(val, oldval){
      
      this.trailerUrl = ''; // this will trigger an update
      if(this.ddd.Title) {
        q = 'official english trailer '+ this.ddd.Title +' '+ this.ddd.Year;
        console.log(q)
        searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+q+'&type=video&key=AIzaSyCofPi2OiMJVONwFhRBa3Vu0CrrfR0g_8Y'
        
        fetch(searchUrl)
          .then(response => response.json())
          .then(data => {
            videoId = data.items[0].id.videoId
            console.log(videoId) ;
        
            // videoId = '0-j1p-U7nKw';
            // videoId = 'AZGcmvrTX9M';
            this.trailerUrl = 'https://www.youtube.com/embed/'+videoId;
          });
      }
    },
  },
  
  // mounted () {
  //   q = 'official english trailer'+ this.ddd.Title +' '+ this.ddd.Year;
  //   console.log(q)
  //   searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+q+'&type=video&key=AIzaSyCofPi2OiMJVONwFhRBa3Vu0CrrfR0g_8Y'
    
  //   fetch(searchUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       videoId = data.items[0].id.videoId
  //       console.log(videoId) ;
    
  //       // videoId = '0-j1p-U7nKw';
  //       // videoId = 'AZGcmvrTX9M';
  //       trailerUrl = 'https://www.youtube.com/embed/'+videoId;
  //       // return trailerUrl;
  //       this.trailerUrl = trailerUrl;
  //     });
  // },
  
  
  
  // ------------------------------------------------------- COMPUTED
  computed: {
    ddd() {
      // GET ROUTE PARAM -----
      let imdbid = this.$route.params.imdbID; // e.g. tt8772262
      // let imdbid = this.imdbid; // e.g. tt8772262
      
      // TRIGGER UPDATE -----
      let dummy = this.$root.movies_listids[0];
      
      // SAVE ACCOUNT HISTORY -----
      if(this.$root.user.uid && imdbid){
        // let ts_second = (new Date()).toISOString().slice(0, 19);
        db.collection('accounts').doc(this.$root.user.uid)
          .update({ // adds elements to an array but only elements not already present
                    // -> add string |
            History: firebase.firestore.FieldValue.arrayUnion(imdbid+'|') 
          }) // .update('history'+'.'+ts_second, imdbid) // same but with an object.
          ;
        // the size of this array is limited on auth change
        
      }
      
      // SCROLL TO TOP -----
      window.scrollTo(0, 0);
      
      return this.$root.movies_dict[imdbid] || {};
    },
    // trailerUrl() {
    //   // youtube data api v3
    //   q = 'official english trailer'+ this.ddd.Title +' '+ this.ddd.Year;
    //   console.log(q)
    //   searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+q+'&type=video&key=AIzaSyCofPi2OiMJVONwFhRBa3Vu0CrrfR0g_8Y'
      
    //   fetch(searchUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //       videoId = data.items[0].id.videoId
    //       console.log(videoId) ;
      
    //       // videoId = '0-j1p-U7nKw';
    //       // videoId = 'AZGcmvrTX9M';
    //       trailerUrl = 'https://www.youtube.com/embed/'+videoId;
    //       this.trailerUrl = trailerUrl;
    //       return trailerUrl;
    //     });
    // },
    color(){
      return {
        // bg-unk bg-best bg-good bg-mid bg-bad bg-worse
        score: !this.ddd.GlobalScore ? 'bg-unk' 
                      : this.ddd.GlobalScore>=this.$root.tresholds.global[0] ? 'bg-best' 
                      : this.ddd.GlobalScore>=this.$root.tresholds.global[1] ? 'bg-good' 
                      : this.ddd.GlobalScore>=this.$root.tresholds.global[2] ? 'bg-mid' 
                      : this.ddd.GlobalScore>=this.$root.tresholds.global[3] ? 'bg-bad' 
                      : 'bg-worse',
        imdb: !this.ddd.Rating_imdb ? 'bg-unk' 
                      : this.ddd.Rating_imdb>=this.$root.tresholds.imdb[0] ? 'bg-best' 
                      : this.ddd.Rating_imdb>=this.$root.tresholds.imdb[1] ? 'bg-good' 
                      : this.ddd.Rating_imdb>=this.$root.tresholds.imdb[2] ? 'bg-mid' 
                      : this.ddd.Rating_imdb>=this.$root.tresholds.imdb[3] ? 'bg-bad' 
                      : 'bg-worse',
        rt: !this.ddd.Rating_rt ? 'bg-unk' 
                      : this.ddd.Rating_rt>=this.$root.tresholds.rt[0] ? 'bg-best' 
                      : this.ddd.Rating_rt>=this.$root.tresholds.rt[1] ? 'bg-good' 
                      : this.ddd.Rating_rt>=this.$root.tresholds.rt[2] ? 'bg-mid' 
                      : this.ddd.Rating_rt>=this.$root.tresholds.rt[3] ? 'bg-bad' 
                      : 'bg-worse',
        mc: !this.ddd.Rating_mc ? 'bg-unk' 
                      : this.ddd.Rating_mc>=this.$root.tresholds.mc[0] ? 'bg-best' 
                      : this.ddd.Rating_mc>=this.$root.tresholds.mc[1] ? 'bg-good' 
                      : this.ddd.Rating_mc>=this.$root.tresholds.mc[2] ? 'bg-mid' 
                      : this.ddd.Rating_mc>=this.$root.tresholds.mc[3] ? 'bg-bad' 
                      : 'bg-worse',
        lbxd: !this.ddd.Rating_lbxd ? 'bg-unk' 
                      : this.ddd.Rating_lbxd>=this.$root.tresholds.lbxd[0] ? 'bg-best' 
                      : this.ddd.Rating_lbxd>=this.$root.tresholds.lbxd[1] ? 'bg-good' 
                      : this.ddd.Rating_lbxd>=this.$root.tresholds.lbxd[2] ? 'bg-mid' 
                      : this.ddd.Rating_lbxd>=this.$root.tresholds.lbxd[3] ? 'bg-bad' 
                      : 'bg-worse',
      };
    },
    posterURL300() {
      return 'https://image.tmdb.org/t/p/w' + 300 + '/' + this.ddd.PosterPath + '.jpg';
    },
    // posterURL500() {
    //   return 'https://image.tmdb.org/t/p/w' + 500 + '/' + this.ddd.PosterPath + '.jpg';
    // },
    posterURL780() {
      return 'https://image.tmdb.org/t/p/w' + 780 + '/' + this.ddd.PosterPath + '.jpg';
    },
  }, // /computed: {
}
</script>