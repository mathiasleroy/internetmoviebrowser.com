<template><div>
  
  
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app 
  elevate-on-scroll
  dark class=""
  :class="[$root.goDark ? 'gr-grey' : 'primary']"
  >
  <!--:class="[$root.goDark ? 'gr-grey' : 'gr-grey']"-->
    
    <v-toolbar-title>
      
      <v-app-bar-nav-icon v-if="$route.name=='movielist'" @click.stop="drawer1 = !drawer1"></v-app-bar-nav-icon>
      
      <router-link to="/" class="white--text" style="text-decoration:none;">
        <span class="hidden-sm-and-down pr-2">Movie Browser</span>
      </router-link>
        
    </v-toolbar-title>
  
    <v-text-field outlined flat dense light
      solo 
      rounded hide-details clearable
      prepend-inner-icon="mdi-magnify" label="Search" 
      class="px-1"
      
      v-bind:value="$root.selectSearch"
      v-on:input="debounceSearch($event)"
      >
    </v-text-field>
    
    <!--solo-inverted-->
    
    <!--<v-spacer></v-spacer>-->
    <!--<v-btn icon> <v-icon>mdi-account</v-icon> </v-btn>-->
    
    <!--<v-btn icon class="pr-2">-->
    <!--  <v-icon>mdi-account</v-icon>-->
    <!--</v-btn>-->
    
    <!--<v-btn icon class="pr-2">-->
    <!--  <v-icon>mdi-settings</v-icon>-->
    <!--</v-btn>-->
  
        <!--<template v-slot:extension>
          <v-tabs
            align-with-title
            background-color="transparent">
            
            <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`" >
              Tab {{ i }}
            </v-tab>
      
            <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i" >
              <v-card tile >
                <v-card-text>{{ i }}</v-card-text>
              </v-card>
            </v-tab-item>
            
          </v-tabs>
        </template>-->
        
  </v-app-bar>
  
<!-- DRAWER -->

      <v-navigation-drawer  v-if="$route.name=='movielist'"
      v-model="drawer1" :clipped="$vuetify.breakpoint.lgAndUp" app>
        
        <div class="text-center" justify="center">
          <v-btn-toggle v-if="$root.user.uid" class=""
          v-model="$root.selectView"
          mandatory borderless tile color="primary"
          >
            <v-btn value="watchlist" v-if="$root.user.uWatchList && $root.user.uWatchList.length"
            style="background-color:inherit">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <v-btn value="favorites" v-if="$root.user.uFavsList && $root.user.uFavsList.length"
            style="background-color:inherit">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn value="rated" v-if="$root.user.uRatingsList && $root.user.uRatingsList.length"
            style="background-color:inherit">
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn value="notrated" v-if="$root.user.uRatingsList && $root.user.uRatingsList.length"
            style="background-color:inherit">
              <v-icon>mdi-star-off</v-icon>
            </v-btn>
            <v-btn value="all"
            style="background-color:inherit">
              <v-icon>mdi-movie-roll</v-icon> 
            </v-btn>
          </v-btn-toggle>
          
          <v-btn-toggle v-else borderless tile color="primary" >
            <v-btn to="/account" style="background-color:inherit">
              <v-icon>mdi-bookmark</v-icon> </v-btn>
            <v-btn to="/account" style="background-color:inherit">
              <v-icon>mdi-heart</v-icon> </v-btn>
            <v-btn to="/account" style="background-color:inherit">
              <v-icon>mdi-star</v-icon> </v-btn>
            <v-btn to="/account" style="background-color:inherit">
              <v-icon>mdi-star-off</v-icon> </v-btn>
            <v-btn to="/account" style="background-color:inherit">
              <v-icon>mdi-movie-roll</v-icon> </v-btn>
          </v-btn-toggle>
          
            <!--<v-btn v-else to="/account">
              <v-icon>mdi-bookmark</v-icon>
              <v-icon>mdi-heart</v-icon>
              <v-icon>mdi-star</v-icon>
              <v-icon>mdi-star-off</v-icon>
              <v-icon>mdi-movie-roll</v-icon> 
            </v-btn>-->
            
        </div>
        
        <v-list dense expand  style="padding-bottom:5em;">
          
        
          <v-list-item class="mt-3">
            <v-list-item-content>
              <v-list-item-title class="overline">
                Presets
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pt-0">
            <v-list-item-content>
              <!--<v-row>-->
                <!--<v-col cols="3">-->
                  <v-btn v-for="ppp in $root.presets" 
                  small class="my-1"
                  @click="$root.setPreset=ppp.name;drawer1=null;">
                    {{ppp.title}}
                  </v-btn>
                <!--</v-col>-->
              <!--</v-row>-->
            </v-list-item-content>
          </v-list-item>
          
          <!--<v-list-group>-->
          <v-list-item  @click="$root.clearFilters()">
            <v-list-item-content>
              <v-list-item-title class="overline">
                Filters <small class="mx-auto">: {{$root.n_movies_viewable}}/{{$root.movies_listids.length}}</small>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-icon small color="red lighten-2">mdi-delete</v-icon> <!--CLEAR-->
            </v-list-item-action>
          </v-list-item>
          <!--</v-list-group>-->
          
          
          
          <template v-for="fff in filtersList" :key="fff">
            
            <v-list-group  v-if="fff.component"
            :key="fff.title"
            v-model="fff.active"
            :prepend-icon="'mdi-'+fff.icon" color='' active-class="primary--tex"
            no-action >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="fff.title"></v-list-item-title>
                </v-list-item-content>
              </template>
              
              
      
              <template v-if="fff.type == 'slider'">
                  <div class="pt-4 mt-5 mb-5 mx-4 pl-5">
                    <v-range-slider
                    :value="$root[fff.model1][fff.model2]" @change="($event) => {$root[fff.model1][fff.model2] = $event;
                        if(fff.model2=='year'){$root.selects.month=inits.month.slice(); $root.selects.day=inits.day.slice();} }"
                    :min="fff.min"
                    :max="fff.max"
                    :step="fff.step"
                    hide-details
                    thumb-label="always"
                    ></v-range-slider>
                    <!--thumb-color="transparent"-->
                    <!--:tick-labels="['All']"-->
                    <!-- 1 don't use v-model, it's not lazy https://github.com/vuejs/vue/issues/6914#issuecomment-503308023-->
                    <!-- 2 impossible to have custom stops -->
                    <!--<v-nouislider 
                    vmodel="$root.selects.year" 
                    :stops="[1900, 1920, 1940, 1960, 1970, 1980, 1990, 2000, 
                             2005, 2010, 2015, 2016, 2017, 2018, 2019, 2020]"
                    ></v-nouislider>-->
                    <template v-if="fff.title == 'Year'">
                      <v-switch
                        v-model="$root.selects.dvd"
                        label="Torrent"
                      ></v-switch>
                    </template>
                  </div>
              </template>
              
              <template v-else-if="fff.title == 'Votes'">
                  <div class="ml-5 pl-5 mt-0 mb-5 mr-2">
                    <v-row no-gutter>
                      <v-col cols="6">
                        <v-text-field type="number" :min="fff.min" :max="fff.max" 
                        v-model="$root.selects.votes[0]" 
                        label="Min"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field type="number" :min="fff.min" :max="fff.max" 
                        v-model="$root.selects.votes[1]" 
                        label="Max"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    
                    <!--<v-range-slider
                    :value="$root[fff.model1][fff.model2]" 
                    @change="($event) => {$root[fff.model1][fff.model2] = $event;"
                    :min="0"
                    :max="6"
                    :step="1"
                    hide-details
                    thumb-label="always"
                    ></v-range-slider>-->
                    
                  </div>
              </template>
              
              
              <template v-if="fff.component == 'date-picker'">
                  <div class="ml-5 pl-5 mt-3 mb-5 mr-2">
                    <!--cannot use date, because that returns a text, which is not compatible with selects.year-->
                    <v-row no-gutters>
                      <v-col cols="6">
                          <v-text-field type="number" v-model="$root.selects.year[0]" 
                          prepend-icon="mdi-clock-start" ></v-text-field>
                      </v-col><v-col class="px-1">
                          <v-text-field type="number" min="1" max="12" v-model="$root.selects.month[0]" 
                          ></v-text-field>
                      </v-col><v-col>
                          <v-text-field type="number" min="1" max="31" v-model="$root.selects.day[0]" 
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="6">
                          <v-text-field type="number" v-model="$root.selects.year[1]" 
                          prepend-icon="mdi-clock-end" ></v-text-field>
                      </v-col><v-col class="px-1">
                          <v-text-field type="number" min="1" max="12" v-model="$root.selects.month[1]" 
                          ></v-text-field>
                      </v-col><v-col>
                          <v-text-field type="number" min="1" max="31" v-model="$root.selects.day[1]" 
                          ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
              </template>
              
              <template v-else-if="fff.title == 'Genre'">
                  <div class="ml-5 mt-3 mb-5">
                    
                    <div v-for="genre in $root.genres_list.slice(0,22)" :key="genre">
                      <v-btn-toggle borderless dense style="background:inherit">
                        <!--<v-btn small text min-width=20 class="px-1 o-8" v-if="genreSearch_state[genre]!=-1"-->
                        <v-btn small text min-width=20 class="px-1 o-8" v-if="$root.selects.genre_list.indexOf('-'+genre)<0"
                        @click="searchGenre('add', '-', genre)">
                          <v-icon small>
                            mdi-minus-circle</v-icon>
                        </v-btn>
                        <v-btn small text min-width=20 class="px-1 o-8" v-else
                        @click="searchGenre('remove', '-', genre)">
                          <v-icon small color="error">
                            mdi-minus-circle</v-icon>
                        </v-btn>
                        
                        <!--<v-btn small text min-width=20 class="px-1 o-8" v-if="genreSearch_state[genre]!=1"-->
                        <v-btn small text min-width=20 class="px-1 o-8" v-if="$root.selects.genre_list.indexOf(genre)<0"
                        @click="searchGenre('add', '', genre)">
                          <v-icon small>
                            mdi-plus-circle</v-icon>
                        </v-btn>
                        <v-btn small text min-width=20 class="px-1 o-8" v-else
                        @click="searchGenre('remove', '', genre)">
                          <v-icon small color="success">
                            mdi-plus-circle</v-icon>
                        </v-btn>
                        
                        <!--<v-btn small text min-width=20 class="px-1" disabled style="color:inherit!important;">-->
                        <!--</v-btn>-->
                        <span class="ml-2">
                          {{genre}} 
                        </span>
                      </v-btn-toggle>
                      
                    </div>
                  </div>
              </template>
                            
              <!--<template v-else-if="fff.title == 'You'">
                  <div class="ml-5 mt-3 mb-5">
                      
                      
                  </div>
              </template>-->
                            
              

            </v-list-group>
            
          </template>
          
          
        </v-list>
        
      </v-navigation-drawer>
  
</div>
</template>


<style>
  .gr-blue{ /* made with https://www.css-gradient.com/ */
    background: #2479B5;
    background: -webkit-linear-gradient(top right, #2479B5, #1633E0);
    background: -moz-linear-gradient(top right, #2479B5, #1633E0);
    background: linear-gradient(to bottom left, #2479B5, #1633E0);
  }
  .gr-grey{
    background: #404040;
    background: -webkit-linear-gradient(bottom right, #404040, #454545);
    background: -moz-linear-gradient(bottom right, #404040, #454545);
    background: linear-gradient(to top left, #404040, #454545);
  }
  .gr-test{
    background: #4C5ACC;
    background: -webkit-linear-gradient(top left, #4C5ACC, #0F23C8);
    background: -moz-linear-gradient(top left, #4C5ACC, #0F23C8);
    background: linear-gradient(to bottom right, #4C5ACC, #0F23C8);
  }
</style>


<script>


module.exports = {
  props: ['propSearch'],
  data: function() {
    return {
      drawer1: null,
      filtersList: [
        // { icon: 'account', title: 'You',
        //   active: true, component: true,
        // },
        { icon: 'clock-outline', title: 'Year',
          active: true, component: true,
          type: 'slider', min:ranges.year[0], max:ranges.year[1], step:ranges.year[2],  model1: 'selects',  model2: 'year',
        },
        { icon: 'star', title: 'Score',
          active: true, component: true,
          type: 'slider', min:ranges.score[0], max:ranges.score[1], step:ranges.score[2],  model1: 'selects',  model2: 'score',
        },
        { icon: 'tag-multiple', title: 'Genre',
          active: true, component: 'xxxx',
        },
        { icon: 'timer', title: 'Runtime',
          active: false, component: true,
          type: 'slider', min:ranges.runtime[0], max:ranges.runtime[1], step:ranges.runtime[2], model1: 'selects',  model2: 'runtime',
        },
        { icon: 'account-group', title: 'Votes',
          active: false, component: true,
          type: 'numbers', min:ranges.votes[0], max:ranges.votes[1], step:ranges.votes[2], model1: 'selects',  model2: 'votes',
          // transform: ".replace('000000?','M').replace('000?','k').replace('?','')",
        },
        // { icon: 'flag', title: 'Country',
        //   active: true,
        //   component: 'xxxx',
        // },
        { icon: 'clock-outline', title: 'Precise Date',
          active: false, component: 'date-picker',
        },
        // { icon: 'flag', title: 'Countries',
        //   active: false,
        //   children: [
        //     { title: 'Import' },
        //     { title: 'Export' },
        //     { title: 'Print' },
        //     { title: 'Undo changes' },
        //     { title: 'Other contacts' },
        //   ],
        // },
        
        
                                            // {name:'Quick Presets', options:{ show:true} },
                                            // {name:'Runtime', options:{ show:true} },
                                            // {name:'Score', options:{ show:true} },
                                            // {name:'All Scores', options:{ show:false} },
                                            // {name:'Votes', options:{ show:true} },
                                            // {name:'Country', options:{ show:false} },
                                            // {name:'Watched', options:{
                                            //   show:true, 
                                            //   vif:"$root.myRatedImdbIds.length>0"}
                                            // },
                                            // {name:'DVD / Blu-ray',options:[] },
                                            // {name:'GlobalScore',options:[] },
                                            // {name:'Country',options:[] }
      ],
      // slidersteps:{
      //   year: [ 1900, 1920, 1940, 1960,         // steps of 20
      //           1970, 1980, 1990, 2000,         // steps of 10
      //           2005, 2010, 2015,               // steps of 5
      //           2016, 2017, 2018, 2019, 2020],  // steps of 1
      //   votes: [0, 
      //           50, 100, 
      //           500, 1000, 
      //           5000, 10000, 
      //           50000, 100000, 
      //           500000, 1000000],
      // },
      // genreSearch_state:{}, // -1=negative search / 0=nothing / 1=positive search
    }
  },
  
  // ------------------------------------------------------- COMPUTED
  computed: {
    // sortedGenres () {
    //   console.log('sortedGenres -----------------')
    //   console.log(this.$root.genres_dict)
    //   ggg = Object.keys(this.$root.genres_dict);
    //   console.log(ggg)
    //   console.log('----------------- sortedGenres')
    //     return ggg;
    // }
  }, // /computed: {
  
  
  // ------------------------------------------------------- WATCH
  watch: {
    propSearch: function(val, oldval){
      
      // // on clearFilters
      // if(!val){
      //   this.genreSearch_state = {};
      // }
      
      // todo, not needed yet, will be needed if genres are clickable.
      // should be more complex, testing if search contains strings like
      // $root.selectSearch.toUpperCase().indexOf((' '+genre).toUpperCase()) < 0 
      // || $root.selectSearch.toUpperCase().indexOf((' Genre:'+genre).toUpperCase()) < 0
      // $root.selectSearch.toUpperCase().indexOf((' -'+genre).toUpperCase()) < 0 
      //                         || $root.selectSearch.toUpperCase().indexOf((' GENRE:-'+genre).toUpperCase()) < 0 
    },
  }, // /watch: {
    
  
  // ------------------------------------------------------- METHODS
  methods: {
    searchGenre(addorclear, sign, genre){
      // console.log(addorclear, sign, genre)
      
      if(addorclear == 'add') {
        
        this.searchGenre('remove', '-', genre)
        this.searchGenre('remove', '', genre)
        this.$root.selects.genre_list.push(sign+genre);
        // // old method in selectSearch:
        // this.$root.selectSearch += ' Genre:'+sign+genre;
        
        // // save state -----
        // if(sign) this.genreSearch_state[genre] = -1;
        // else this.genreSearch_state[genre] = 1;
      }
      else if(addorclear == 'remove') {
        
        this.$root.selects.genre_list = this.$root.selects.genre_list.filter(dd => dd !== sign+genre);
        
        // // old method in selectSearch
        // this.$root.selectSearch = 
        //   replacei(
        //     replacei(
        //       this.$root.selectSearch, ' Genre:'+sign+genre, d => ''
        //       ), ' '+genre, d => ''
        //   );
        // // this.selectSearch     = this.selectSearch.replace(/( Genre:)[-]?\w+/g ,''); // todo should also match single genres
        
        // save state -----
        // this.genreSearch_state[genre] = 0;
      }
    },
    debounceSearch(val){
      // ll('debounceSearch: ' +val)
      // console.log('val',val)
      if(search_timeout) clearTimeout(search_timeout); // if triggered again before the timeout is over then it will start again
      var that=this;
      search_timeout = setTimeout(function() {
        that.$root.selectSearch = val || ''; // do not allow null
        // that.$emit('change-selectSearch', val)
        // ll('xxxxxxxxxxx')
      }, debounce_time);
    },
  }, // /methods: {
}
</script>
