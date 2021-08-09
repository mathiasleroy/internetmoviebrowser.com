<template>
  <v-container class="pt-0">
    <!--<h1>Account</h1>-->
    
<!--NOT SIGNED IN-->
    <!--this is now in accountmechanics.vue which is active on every page (v-show="$route.name == 'account'")-->
    
<!--LOGGED IN-->
    <div id="sign-out"  v-if="$root.user.uid"
    class="d-flex flex-column justify-space-around"
    >
      
      <v-tabs grow icons-and-text class="mb-5">
        <v-tab href="#tab-1"> Account <v-icon>mdi-account</v-icon> </v-tab>
        <v-tab href="#tab-2"> History <v-icon>mdi-history</v-icon> </v-tab>
        <v-tab href="#tab-3"> IMDb <v-icon>mdi-star</v-icon> </v-tab>
        
        <v-tab-item value="tab-1" class="pa-3"> 
          You are currently signed in with <u>{{$root.user.uemail}}</u>
          <div class="my-5">
            <v-btn block color="" @click="$root.logout()" > Sign Out </v-btn>
          </div>
        </v-tab-item>
        <v-tab-item value="tab-2" align="cente" class="pa-3">
          
          <v-container class="pt-0 d-flex flex-wrap" fluid>
              
            <v-row align="center" justify="center" >
              <!--<v-col cols="12">-->
              
                <v-card v-for="(imdbid, ii) in $root.user.uHistory.reverse()" :key="imdbid"
                class="ma-1"
                width="92" tile
                        v-if="$root.movies_dict[imdbid.replace('|','')]"
                >
                  
                  <v-list-item three-line class="px-0">
                    
                    <router-link :to="'/m/'+imdbid.replace('|','')" class="mr-3">
                      <v-img 
                        width="92" height="138"
                        :src="'https://image.tmdb.org/t/p/' + 'w92' + '/' + $root.movies_dict[imdbid.replace('|','')].PosterPath + '.jpg'" >
                      </v-img>
                    </router-link>
                  </v-list-item>
                </v-card>
            </v-row>
          </v-container>
          <!--
          <v-row no-gutters class="mt-1">
            
            <v-col class="col-auto ma-1" v-for="imdbid in $root.user.uHistory" >
              
              
                <router-link :to="'/m/'+imdbid.replace('|','')" class="mr-3">
                  <v-img 
                    v-if="$root.movies_dict[imdbid.replace('|','')]"
                    width="92" height="138"
                    :src="'https://image.tmdb.org/t/p/' + 'w92' + '/' + $root.movies_dict[imdbid.replace('|','')].PosterPath + '.jpg'" >
                  </v-img>
                </router-link>
                
            </v-col>
          </v-row>
          -->
        </v-tab-item>
        <v-tab-item value="tab-3" class="pa-3">
          
          Here you can import your IMDb ratings:
          
          <!--<h3 class="overline pt-3 pb-2">Import IMDb Ratings</h3>-->
          
          <section class="">
            <!--UPLOAD FILE-->
            <v-file-input class="mt-2"
            counter
            placeholder="Select your IMDBb ratings.csv file"
            show-size outlined
            @change="uploadCSV($event)"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" dark label small >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
                  
            <v-snackbar
            v-model="snackbarConfirmUploadCSV"
            :timeout="3000"
            top
            >
              {{snackbarMessage}}
              <v-icon class="success--text" v-if="snackbarMessage=='File uploaded correctly'">mdi-check</v-icon>
              <v-icon class="error--text" v-else>mdi-alert</v-icon>
            </v-snackbar>
            
            <h3 class="overline pt-3 pb-2">How to use this feature?</h3>
            <ol>
              <li>Go to <a target="_blank" href="https://www.imdb.com/">imdb.com</a></li>
              <li>Go to "Your Ratings" > click on <v-icon>mdi-dots-vertical</v-icon> > Export. This will download a csv file "ratings.csv"</li>
              <li>Select that file with this form and wait for confirmation.</li>
            </ol>
            
            <h3 class="overline pt-3 pb-0">Download helper</h3>
            <!--USER IMDB ID-->
            <v-text-field  prepend-icon="mdi-account-question" label="IMDb user Id" v-model="$root.user.uImdbId" ></v-text-field>
            <!--DOWNLOAD LINK-->
            <v-input v-if="$root.user.uImdbId" prepend-icon="mdi-download" >
              <a target="_blank" :href="'https://www.imdb.com/user/' + $root.user.uImdbId + '/ratings/export'">Download your IMDb ratings.csv</a>
            </v-input>
            
            
            <!--HELP-->
            <!--<div class="ml-5 fs-08">
                How to use this feature?
            </div>-->
                    <!--<div v-if="!($root.user.uRatingsList.length>0)" class="fs-08">-->
                    <!--<div class="fs-08">
                      <a class="" data-toggle="collapse" href="#hqluhfi" role="button" aria-expanded="false">
                        <i class="material-icons fs-08">info</i> How to use this feature?
                      </a>
                      <div class="collapse" id="hqluhfi">
                        We need your personal ratings file from IMDb.com
                        <small>
                          <ol>
                            <li>Go to <a target="_blank" href="https://www.imdb.com/">imdb.com</a></li>
                            <li>Go to "Your Ratings" > click on <i class="material-icons fs-08">more_vert</i> > Export </li>
                            <li>Drag & Drop the resulting <u>ratings.csv</u> file on this page</li>
                          </ol>
                        </small>
                      </div>
                    </div>-->
          </section>
        </v-tab-item>
      </v-tabs>
      
      
    </div>
  </v-container>
</template>

<style>
.theme--light.v-tabs>.v-tabs-bar
,.theme--light.v-tabs-items {
    background-color: inherit;
}
</style>

<script>
module.exports = {
  // ------------------------------------------------------- DATA
  data: function() {
    return {
      snackbarConfirmUploadCSV:false,
      snackbarMessage:'File uploaded correctly',
    }
  }, // /data: function() {
  
  // ------------------------------------------------------- METHODS
  methods: {
    uploadCSV(file){
      let that=this;
      
      // parse CSV -----
      Papa.parse(file, {
        header: true,
        dynamicTyping: true, // Converts numeric/boolean data
        complete: function(results) {
          
          console.log("Finished:", results);
          
          // [ "Const", "Your Rating", "Date Rated", 
  		    //   "Title", "URL", "Title Type", "IMDb Rating", "Runtime (mins)", 
  		    //   "Year", "Genres", "Num Votes", "Release Date", "Directors" ]
          if(results.meta.fields.length == 13 && results.meta.fields[12]=="Directors") {
           
            results.data.map(d => { 
              if(d.Const) {
                // that.myRatedImdbIds.push(+d.Const.replace('tt','')) ;         // removes tt and leading zeros
                // that.uRatingsDict[+d.Const.replace('tt','')] = d['Your Rating'] ;
                that.$root.user.uRatingsDict[d.Const] = d['Your Rating'] ;
                that.$root.user.uRatingsList.push(d.Const) ;
              }
            });
            
            console.log(that.$root.user.uRatingsDict)
            
            // push to firestore -----
            accountRef = db.collection('accounts').doc(that.$root.user.uid);
            // docRef.set({z:0}, {merge: true});
            accountRef.set({Ratings:that.$root.user.uRatingsDict}, {merge: true});
            // docRef.update('Ratings.'+ttx_nott, val);
      
            // l('IMDb ratings.csv file correctly loaded !!!')
            // $.snackbar({content: "IMDb ratings.csv loaded!", style: ""});
            
            // confirm snackbar -----
            that.snackbarMessage = 'File uploaded correctly';
            that.snackbarConfirmUploadCSV = true;
            
          }
          else{
            // $.snackbar({content: "Wrong file format", style: ""});
            that.snackbarMessage = 'Error during file upload';
            that.snackbarConfirmUploadCSV = true;
          }
          
          // // empty input -----
          // setTimeout(function() {
          //   that.file = null;
          // }, 10);
          
        }
      });

      // parse JSON -----
      // const reader = new FileReader();
      // reader.onload = e => { 
      //   console.log(e.target.result);
      // };
      // reader.readAsText(file);
      
    },
  }, // /methods: {
  
  // // ------------------------------------------------------- MOUNTED
  // mounted: function() {
  //   console.log('account mounted-----------------------')
  //   // let that=this;
  // }, // /mounted: function() {
}
</script>