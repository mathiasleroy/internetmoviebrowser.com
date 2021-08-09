<template><div>
  
    <v-tabs centered class="mb-2"
    v-model="active_sort"
    >
    <!--this is not feasable because this method doesn't allow the 2nd click !-->
        <v-icon right v-if="sortOrder=='asc'">mdi-sort-ascending</v-icon>
        <v-icon right v-else>mdi-sort-descending</v-icon>
        
        <v-tab 
        v-for="sort in sorts"
        color="grey darken-2" text class="px-2" style="min-width: 10px;" 
        @click="setSort(sort.var)"
        >
          {{sort.name}}
        </v-tab>
    </v-tabs>
    <!--{{active_sort}}-->
        
    <v-container class="pt-0 d-flex flex-wrap" fluid>
        
      <v-row align="center" justify="center" >
        <!--<v-col cols="12">-->
        
          <v-card v-for="(imdbid, ii) in movies_filtered_listids" :key="imdbid"
          class="ma-1"
          width="310" tile
          >
            
            <v-list-item three-line class="px-0">
              
              <router-link :to="'/m/'+imdbid" class="mr-3">
                <v-img 
                  width="92" height="138"
                  :src="'https://image.tmdb.org/t/p/' + 'w92' + '/' + $root.movies_dict[imdbid].PosterPath + '.jpg'" >
                </v-img>
              </router-link>
              
              <v-list-item-content>
                <!--<div class="overline mb-4">OVERLINE</div>-->
                
                <v-list-item-title class="headline mb-1">
                  <router-link :to="'/m/'+imdbid" style="color:inherit;text-decoration:inherit;">
                    {{$root.movies_dict[imdbid ].Title}}
                  </router-link>
                </v-list-item-title>
                
                <v-list-item-subtitle>
                  <!--{{$root.movies_dict[imdbid].Year}}-->
                  {{$root.movies_dict[imdbid].ReleaseDate}}
                  <br> 
                  <span class="font-weight-light">
                    {{$root.movies_dict[imdbid].Genre}}
                  </span>
                </v-list-item-subtitle>
                
                <v-list-item-subtitle>
                  <!--<v-btn x-small depressed tile >Plot</v-btn>-->
                  <!--<v-btn x-small depressed tile >Trailer</v-btn>-->
                  <v-btn x-small depressed tile  class="mx-1" :to="'/m/'+imdbid">Details&rsaquo;</v-btn>
                </v-list-item-subtitle>
              </v-list-item-content>
        
        
              <div class="ml-auto d-flex flex-column justify-space-between pa-0 ma-0">
                <v-btn icon class="ml-auto" @click="$root.toggleUserList('watchlist',imdbid)">
                  <v-icon :class="{'orange--text': $root.user.uWatchList && $root.user.uWatchList.indexOf(imdbid)>-1}">mdi-bookmark</v-icon>
                </v-btn>
                <v-btn icon class="ml-auto" @click="$root.toggleUserList('favlist',imdbid)">
                  <v-icon :class="{'red--text': $root.user.uFavsList && $root.user.uFavsList.indexOf(imdbid)>-1}">mdi-heart</v-icon>
                </v-btn>
                
                <!--$root.user.uRatingsDict[imdbid]-->
                <template v-if="$root.user.uRatingsDict">
                  <btnstarrating :imdbid="imdbid" :key="imdbid" :rrr="$root.user.uRatingsDict[imdbid]"></btnstarrating>
                </template>
                <template v-else>
                  <v-btn icon class="ml-auto" to='/account'>
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                </template>
                
                
                
                
                
                <div class=""
                  style="width:0px;
                         height:0px;
                         border-left:50px solid transparent;"
                  v-bind:class="[!$root.movies_dict[imdbid].GlobalScore ? 'corner-unk' 
                    : $root.movies_dict[imdbid].GlobalScore >= $root.tresholds.global[0] ? 'corner-best' 
                    : $root.movies_dict[imdbid].GlobalScore >= $root.tresholds.global[1] ? 'corner-good' 
                    : $root.movies_dict[imdbid].GlobalScore >= $root.tresholds.global[2] ? 'corner-mid' 
                    : $root.movies_dict[imdbid].GlobalScore >= $root.tresholds.global[3] ? 'corner-bad' 
                    : 'corner-worse' ]"
                >
                  <span 
                    class="white--text font-weight-bold fs-08" 
                    style="margin-left:-25px; line-height:46px">
                    {{$root.movies_dict[imdbid].GlobalScore | tofixed0}}<small>%</small>
                  </span>
                </div>
              </div>
              
              
            </v-list-item>
        
            <!--<v-card-actions> <v-btn text>Button</v-btn> </v-card-actions>-->
            
          </v-card>
        
      
        <!--</v-col>-->
      </v-row>
    </v-container>
    
    
    
    
    <v-container class="" fluid>
      <v-pagination
      v-model="$root.pagination.currentPage"
      :length="Math.ceil($root.n_movies_viewable / $root.pagination.moviesPerPage)"
      total-visible="7"
      ></v-pagination>
    </v-container>
    
    <v-container class="" fluid>
      <v-row >
        <v-col cols="12" align="center" justify="center">
          <!--{{movies_filtered_listids.length}} / -->
          <span @click="topN(10)">{{$root.n_movies_viewable}}</span> / {{$root.movies_listids.length}}
        </v-col>
      </v-row>
    </v-container>
    
    <!--<v-container class="" fluid>
      <v-row >
        <v-col cols="12" align="center" justify="center">
          <v-btn @click="topN(3)">topN(3)</v-btn>
          <v-btn @click="topN(4)">topN(4)</v-btn>
          <v-btn @click="topN(5)">topN(5)</v-btn>
          <v-btn @click="topN(6)">topN(6)</v-btn>
          <v-btn @click="topN(7)">topN(7)</v-btn>
          <v-btn @click="topN(8)">topN(8)</v-btn>
          <v-btn @click="topN(9)">topN(9)</v-btn>
          <v-btn @click="topN(10)">topN(10)</v-btn>
        </v-col>
      </v-row>
    </v-container>-->
    
    
    
    <v-container class="" fluid>
      <v-row >
        <v-col cols="12" align="center" justify="center">
          
          <!-- ALERT ----------------------------------------------------------------->
          <div v-if="$root.selectSearch && $root.hasFilterActive">
          <!--<div v-if="$root.selectSearch">-->
            <v-alert icon="mdi-information" type="warning" dense >
              Some filters are still active.
              <a href="#" class="alert-link text-uppercase fs-08" @click="$root.clearFilters()">Clear all filters</a>
            </v-alert>
          </div>
          
        </v-col>
      </v-row>
    </v-container>
    
</div>
</template>


<style>
.normallinks, .normallinks a{
  color:inherit;
  text-decoration:inherit;
}
.active{
  border-bottom: 1px solid blue;
}

.br-4-best{border-right: #4CAF50 4px solid;}
.br-4-good{border-right: #A5BD28 4px solid;}
.br-4-worse{border-right: #F44336 4px solid;}
.br-4-mid{border-right: #FECB00 4px solid;}
.br-4-bad{border-right: #F9871B 4px solid;}
.br-4-unk{border-right: #6C757D 4px solid;}

.br-8-best{border-right: #4CAF50 8px solid;}
.br-8-good{border-right: #A5BD28 8px solid;}
.br-8-worse{border-right: #F44336 8px solid;}
.br-8-mid{border-right: #FECB00 8px solid;}
.br-8-bad{border-right: #F9871B 8px solid;}
.br-8-unk{border-right: #6C757D 8px solid;}

.bb-4-best{border-bottom: #4CAF50 4px solid;}
.bb-4-good{border-bottom: #A5BD28 4px solid;}
.bb-4-worse{border-bottom: #F44336 4px solid;}
.bb-4-mid{border-bottom: #FECB00 4px solid;}
.bb-4-bad{border-bottom: #F9871B 4px solid;}
.bb-4-unk{border-bottom: #6C757D 4px solid;}


.corner-best{ border-bottom: 30px solid #4CAF50;}
.corner-good{ border-bottom: 30px solid #A5BD28;}
.corner-worse{border-bottom: 30px solid #F44336;}
.corner-mid{  border-bottom: 30px solid #FECB00;}
.corner-bad{  border-bottom: 30px solid #F9871B;}
.corner-unk{  border-bottom: 30px solid #6C757D;}
</style>




<script>
module.exports = {
  components: {
    'btnstarrating': httpVueLoader('components/btnstarrating.vue'),
  },
  props: ['propSetPreset','propSelectSort'],
  
  // ------------------------------------------------------- DATA
  data: function() {
    return {
      // who: 'world'
      
      sortKey: 'Rank',
      sortOrder: 'asc',
      
      active_sort:0,
      sort_list:['Rank', 'GlobalScore', 'Votes', 'date'], // could be avoided but makes finding active sort 
      sorts:[
        {var:'Rank', name:'Trending'},
        {var:'GlobalScore', name:'Score'},
        {var:'Votes', name:'Votes'},
        {var:'date', name:'Date'},
      ],
      loading: 1,
      // lastSort: '',
    }
  }, // /data: function() {
  
  // ------------------------------------------------------- MOUNTED
  mounted: function() {
    // console.log('movielist mounted')
    
    // READ URL PARAMS ---------------------------------------
    //    n            '30k'/'10k'/'1k'/'100' 
    //    clear        bool
    //    preset       string cf presets list
    //    startdate    yyyy | yyyy-mm | yyyy-mm-dd
    //    enddate      yyyy | yyyy-mm | yyyy-mm-dd | today
    //    dvd|torrent  true/1/false/0
    //    search       string
    //    genre        csv
    //    scoremin     number 0-100
    //    scoremax     number 0-100
    //    imdbmin      number 1-10
    //    imdbmax      number 1-10
    //    rtmin rtmax
    //    mcmin mcmax
    //    lbxdmin lbxdmax
    //    votesmin votesmax
    //    sort         SCORE,Trending,Votes,Critics Score,Popular Score,Controversial,Realease Date,IMDb,Rotten Tomatoes,Metacritic,Letterboxd
    //    order        asc | *
    //  examples:
    //    https://internetmoviebrowser.com/#/?clear=1&search=%22Quentin%20Tarantino%22%20-natural%20-romance%20-Dusk%20-city%20-Whole%20-grindhouse&n=10k
    //    https://internetmoviebrowser.com/#/?clear=1&search=%22Yorgos%20Lanthimos%22&n=10k
    //    all marvels https://internetmoviebrowser.com/#/?clear=1&genre=Action&search=Marvel
    //    https://internetmoviebrowser.com/#/?clear=1&imdbmin=7.5&imdbmax=7.9
    //    underrated on RT : https://internetmoviebrowser.com/#/?clear=1&sort=Rotten%20Tomatoes&order=asc&scoremin=48&rtmax=40&votesmin=50000
    
    let that=this.$root;
    
    //--- n
    // cf. app > mounted using window.location
    
    //--- clear
    if(this.$route.query.clear) that.clearFilters();
    
    // //--- preset
    // if(this.$route.query.preset) that.setPreset(this.$route.query.preset);
    
    //--- startdate
    if(this.$route.query.startdate){
      var startdate = this.$route.query.startdate.split('-').map(Number);
      if(startdate[0] && ranges.year[0] <= startdate[0] <= ranges.year[1]) {that.selects.year[0] = startdate[0];}
      if(startdate[1] && 1 <= startdate[1] <= 12) {that.selects.month[0] = startdate[1];}
      if(startdate[2] && 1 <= startdate[2] <= 31) {that.selects.day[0] = startdate[2];}
    }
    
    //--- enddate
    if(this.$route.query.enddate){
      if(this.$route.query.enddate=='today'){
        var td = new Date();
        that.selects.year[1] = td.getFullYear();
        that.selects.month[1] = td.getMonth()+1;
        that.selects.day[1] = td.getDate();
      } else {
        var enddate = this.$route.query.enddate.split('-').map(Number);
        if(enddate[0] && ranges.year[0] <= enddate[0] <= ranges.year[1]) {that.selects.year[1] = enddate[0];}
        if(enddate[1] && 1 <= enddate[1] <= 12) {that.selects.month[1] = enddate[1];}
        if(enddate[2] && 1 <= enddate[2] <= 31) {that.selects.day[1] = enddate[2];}
      }
    }
    
    //--- dvd
    if(this.$route.query.dvd=='true' || this.$route.query.dvd=="1")
      that.selects.dvd = true;
    else if(this.$route.query.torrent=='true' || this.$route.query.torrent=="1")
      that.selects.dvd = true;
    else if(this.$route.query.dvd=='false' || this.$route.query.dvd=="0")
      that.selects.dvd = false;
    else if(this.$route.query.torrent=='false' || this.$route.query.torrent=="0")
      that.selects.dvd = false;
      
    //--- search
    if(this.$route.query.search) that.selectSearch = this.$route.query.search;
    
    //--- genre
    if(this.$route.query.genre){
      var urlgenres = this.$route.query.genre.split(',');
      urlgenres.map( function(thisGenre) {
        // var pos = data_listGenres.indexOf(thisGenre);
        // if(pos>-1) that.filterGenre[pos] = true;
        // that.selects.genre_dict[thisGenre] = true;
        that.selects.genre_list.push(thisGenre);
      });
    }
    // //--- genre
    // if(this.$route.query.genreOr) that.genreOr = true;
    // // if(this.$route.query.n=='30k') 
        
    //--- scoremin scoremax
    if(this.$route.query.scoremin && +this.$route.query.scoremin>=ranges.score[0] && +this.$route.query.scoremin<=ranges.score[1])  
        that.selects.score[0] = +this.$route.query.scoremin;
    if(this.$route.query.scoremax && +this.$route.query.scoremax>=ranges.score[0] && +this.$route.query.scoremax<=ranges.score[1])  
        that.selects.score[1] = +this.$route.query.scoremax;
    // //--- imdbmin imdbmax
    // if(this.$route.query.imdbmin && +this.$route.query.imdbmin>=rangeimdb[0] && +this.$route.query.imdbmin<=rangeimdb[1])
    //     that.sliderImdb[0] = +this.$route.query.imdbmin;
    // if(this.$route.query.imdbmax && +this.$route.query.imdbmax>=rangeimdb[0] && +this.$route.query.imdbmax<=rangeimdb[1])  
    //     that.sliderImdb[1] = +this.$route.query.imdbmax;
    // //--- rtmin rtmax
    // if(this.$route.query.rtmin && +this.$route.query.rtmin>=rangert[0] && +this.$route.query.rtmin<=rangert[1])
    //     that.sliderRt[0] = +this.$route.query.rtmin;
    // if(this.$route.query.rtmax && +this.$route.query.rtmax>=rangert[0] && +this.$route.query.rtmax<=rangert[1])  
    //     that.sliderRt[1] = +this.$route.query.rtmax;
    // //--- mcmin mcmax
    // if(this.$route.query.mcmin && +this.$route.query.mcmin>=rangemc[0] && +this.$route.query.mcmin<=rangemc[1])
    //     that.sliderMc[0] = +this.$route.query.mcmin;
    // if(this.$route.query.mcmax && +this.$route.query.mcmax>=rangemc[0] && +this.$route.query.mcmax<=rangemc[1])  
    //     that.sliderMc[1] = +this.$route.query.mcmax;
    // //--- lbxdmin lbxdmax
    // if(this.$route.query.lbxdmin && +this.$route.query.lbxdmin>=rangelbxd[0] && +this.$route.query.lbxdmin<=rangelbxd[1])
    //     that.sliderLbxd[0] = +this.$route.query.lbxdmin;
    // if(this.$route.query.lbxdmax && +this.$route.query.lbxdmax>=rangelbxd[0] && +this.$route.query.lbxdmax<=rangelbxd[1])  
    //     that.sliderLbxd[1] = +this.$route.query.lbxdmax;
        
    //--- votesmin votesmax
    if(this.$route.query.votesmin && +this.$route.query.votesmin>=ranges.votes[0] && +this.$route.query.votesmin<=ranges.votes[1])
        that.selects.votes[0] = +this.$route.query.votesmin;
    if(this.$route.query.votesmax && +this.$route.query.votesmax>=ranges.votes[0] && +this.$route.query.votesmax<=ranges.votes[1])  
        that.selects.votes[1] = +this.$route.query.votesmax;
        
        
    //--- sort
    if(this.$route.query.sort) {
      // ll( Object.keys(data_sortOptions) ); // SCORE,Trending,Votes,Critics Score,Popular Score,Controversial,Realease Date,IMDb,Rotten Tomatoes,Metacritic,Letterboxd
      
      if( this.$route.query.sort.toUpperCase() == 'SCORE') 
        this.active_sort = this.sort_list.indexOf('GlobalScore');
      else if( this.$route.query.sort.toUpperCase() == 'TRENDING') 
        this.active_sort = this.sort_list.indexOf('Rank');
      else if( this.$route.query.sort.toUpperCase() == 'RANK') 
        this.active_sort = this.sort_list.indexOf('Rank');
      else if( this.$route.query.sort.toUpperCase() == 'DATE') 
        this.active_sort = this.sort_list.indexOf('date');
      else if( this.$route.query.sort.toUpperCase() == 'VOTES') 
        this.active_sort = this.sort_list.indexOf('Votes');
        
      else if( ['Rank', 'GlobalScore', 'Votes', 'date'].indexOf(this.$route.query.sort)>-1)
        this.active_sort = this.sort_list.indexOf(this.$route.query.sort);
      
      ll('query.sort -> ' + this.active_sort )
      
      // //order
      // if(this.$route.query.sort) {
      //   if(this.$route.query.order='asc') that.sortOrder = 'asc';
      //   else that.sortOrder = 'desc';
      // }
    }
    
    // /READ URL PARAMS ///////////////////////////////////////
    
    
  }, // /mounted: function() {
  
  // ------------------------------------------------------- WATCH
  watch: {
    active_sort: function(val, oldval){ // active a number, v-model of the tabs
                                        // , used to programmatically change the sort
      ll('active_sort change: ' + val)
      let key = this.sorts[val].var;
      ll(key)
      
      if(key != this.sortKey) // this is to avoid twice sort after click on new tab
                              // but you still need it in case sort is programmatically changed 
                              // e.g. url query / presets / ...
        this.setSort(key);
    },
    propSetPreset: function(val, oldval){
      ll('setPreset change: ' + val)
      this.setPreset(val);
    },
    propSelectSort: function(val, oldval){
      ll('selectSort change: ' + val)
      this.active_sort = this.sort_list.indexOf(val);
    },
    
  }, // /watch: {
  
  // ------------------------------------------------------- METHODS
  methods: {
    setPreset(preset){
      ll('setPreset('+preset+')');
      
      // PRESETS ========================
      if(preset=='trendinggood'){ // sort='trending' & score>70
        this.$root.clearFilters();
        this.$root.selects.score = [65, ranges.score[1]];
        this.active_sort = this.sort_list.indexOf('Rank');
      }
      // DEFAULT ---
      else if(preset=='bestrecent'){ // sort='score' & date = inits.year
        this.$root.clearFilters();
        this.$root.selects.year = inits.year;
        this.active_sort = this.sort_list.indexOf('GlobalScore');
      }
      // best 2 years --- = bestrecent
      else if(preset=='best2y'){ // sort='score' & date = inits.year
        this.$root.clearFilters();
        this.$root.selects.year = inits.year;
        this.active_sort = this.sort_list.indexOf('GlobalScore');
      }
      // best 3 months ---
      else if(preset=='best3m'){ // sort='score' & date = inits.year
        this.$root.clearFilters();
        
        var td = new Date();
        td.setDate(td.getDate()+1);
        var tdmin = new Date();
        tdmin.setDate(tdmin.getDate()-(3*31));
        this.$root.selects.year = [tdmin.getFullYear(),td.getFullYear()];
        this.$root.selects.month = [tdmin.getMonth()+1,td.getMonth()+1]; // index starts at 0
        this.$root.selects.day = [tdmin.getDate(),td.getDate()];
        
        this.active_sort = this.sort_list.indexOf('GlobalScore');
      }
      // UNK GEMS ---
      else if(preset=='unknowngems'){ // sort='score' & date = inits.year
        this.$root.clearFilters();
        this.$root.selects.year = [1980,thisYear]; // = until this year's 1st JAN
        this.$root.selects.votes = [0, 5000];
        this.$root.selects.score = [65, ranges.score[1]];
        this.active_sort = this.sort_list.indexOf('GlobalScore');
      }
      // CLASSICS ---
      else if(preset=='goodclassics'){ // sort='score' & date = inits.year
        this.$root.clearFilters();
        this.active_sort = this.sort_list.indexOf('Votes');
        this.$root.selects.score = [65, ranges.score[1]];
      }
      // LASTWEEK ---
      else if(preset=='lastweek'){
        // this.$root.clearFilters();
        var td = new Date();
        td.setDate(td.getDate()+1);
        var tdmin7 = new Date();
        tdmin7.setDate(tdmin7.getDate()-7);
        this.$root.selects.year = [tdmin7.getFullYear(),td.getFullYear()];
        this.$root.selects.month = [tdmin7.getMonth()+1,td.getMonth()+1]; // index starts at 0
        this.$root.selects.day = [tdmin7.getDate(),td.getDate()];
      }
      // LASTMONTH ---
      else if(preset=='lastmonth'){
        this.$root.clearFilters();
        var td = new Date();
        td.setDate(td.getDate()+1);
        var tdmin = new Date();
        tdmin.setDate(tdmin.getDate()-31);
        this.$root.selects.year = [tdmin.getFullYear(),td.getFullYear()];
        this.$root.selects.month = [tdmin.getMonth()+1,td.getMonth()+1]; // index starts at 0
        this.$root.selects.day = [tdmin.getDate(),td.getDate()];
        this.active_sort = this.sort_list.indexOf('GlobalScore');
      }
      // LASTYEAR ---
      else if(preset=='lastyear'){
        // this.$root.clearFilters();
        var td = new Date();
        td.setDate(td.getDate()+1);
        var tdmin = new Date();
        tdmin.setDate(tdmin.getDate()-365);
        this.$root.selects.year = [tdmin.getFullYear(),td.getFullYear()];
        this.$root.selects.month = [tdmin.getMonth()+1,td.getMonth()+1]; // index starts at 0
        this.$root.selects.day = [tdmin.getDate(),td.getDate()];
      }
      // // unanimous ---
      // else if(preset=='unanimous'){
      //   // this.$root.clearFilters();
      //   // OPEN the accordeon
      //   $('#All-Scores-button:contains("expand_more")').click();
      //   this.sliderImdb = [Math.round(1000*(tresholds[0]*9/10/10))/1000 +1 , rangeimdb[1]];
      //   this.sliderRt = [tresholds[0], rangert[1]];
      //   this.sliderMc = [tresholds[0], rangemc[1]];
      //   this.sliderLbxd = [tresholds[0]/20, rangelbxd[1]];
      //   // reset
      //   this.$root.selects.score = [ranges.score[0], ranges.score[1]];
      // }
      // //========================================================================
      // // MOODS ========================
      // else if(preset=='Adrenaline'){
      //   this.$root.selectSearch = '-Drama -Animation -Comedy -Family -Documentary -Music -History';
      //   this.filterGenre = new Array(data_listGenres.length).fill(false);
      //   this.genreOr = false;
      //         // var genres = 'Action Crime Thriller Adventure Fantasy Sci-Fi War Western Horror';
      //         // this.filterGenre = data_listGenres.map(d => genres.indexOf(d) > -1);
      //         // this.genreOr = true;
      // }
      // else if(preset=='Uplifting'){
      //   this.$root.selectSearch = '-Horror -Crime -Thriller -Action -Mystery -Sci-Fi -Western -Drama -"Adventure, Family, Fantasy" -"Adventure, Fantasy" ';
      //   this.filterGenre = new Array(data_listGenres.length).fill(false);
      //   this.genreOr = false;
      //   // var genres = 'Comedy music';
      //   // this.filterGenre = data_listGenres.map(d => genres.indexOf(d) > -1);
      // }
      // // else if(preset=='Sad'){
      // //   this.$root.selectSearch = '';
      // //   // var genres = '';
      // //   // this.filterGenre = data_listGenres.map(d => genres.indexOf(d) > -1);
      // //   // this.genreOr = true;
      // //   this.filterGenre = new Array(data_listGenres.length).fill(false);
      // // }
      // else if(preset=='all'){
      //   this.$root.selectSearch = '';
      //   this.filterGenre = new Array(data_listGenres.length).fill(false);
      //   this.genreOr = false;
      // }
    },
    
    setSort(key) {
        // default first order -----
        let order = 'desc';
        if(key == 'Rank') order = 'asc';
        
        // inverse order on second click -----
        if(key == this.sortKey) order = this.sortOrder == 'asc' ? 'desc' : 'asc';
        
        // save -----
        this.sortOrder = order;
        this.sortKey = key;
        // console.log('setSort:', order, key);
        
        // actual SORT of the lists -----
        let root = this.$root;
        // let t0_sortall = performance.now();
          this.sortMovieIds(root.movies_listids);
          if(root.user && root.user.uWatchList) this.sortMovieIds(root.user.uWatchList);
          if(root.user && root.user.uFavsList) this.sortMovieIds(root.user.uFavsList);
          if(root.user && root.user.uRatingsList) this.sortMovieIds(root.user.uRatingsList);
        // perf(t0_sortall, 'SORT ALL LISTS');
        
        // reset pagination -----
        this.$root.pagination.currentPage = 1;
    }, // /setSort(key) {
    
    sortMovieIds(val){
      // let t0_sort = performance.now();
      // ll('...SORTING ===--- ', val.length, this.sortKey, this.sortOrder)

      
        let that = this;
        let sortKey=this.sortKey;
        let sortOrder=this.sortOrder;
        let md = this.$root.movies_dict;
        
        // todo, if the key is the same + only the order changed, reverse function, might be faster.
        // if(this.lastSort.split('-')[1]==sortKey && this.lastSort.split('-')[2]!=sortOrder){
        //   ll('reverse');
        //   val.reverse(); // Why doesn't work ???
        // }
        if(0){}
        else if(sortOrder == 'asc'){
          val = val.sort((b,a) => (md[b] && md[b][sortKey] ? md[b][sortKey] : '') - (md[a] && md[a][sortKey] ? md[a][sortKey] : ''));
          // asc puts null at end ; desc puts them at the top so replace them with ''
        }
        else{
          val = val.sort((a,b) => (md[b] && md[b][sortKey] ? md[b][sortKey] : '') - (md[a] && md[a][sortKey] ? md[a][sortKey] : ''));
        }
        
      // perf(t0_sort, 'SORT')
    }, // /sortBy(val){
    
    
    topN(n){
      // keep only 5
      this.$root.pagination.moviesPerPage = n;
      
      
      // LOG TAGS & SCORES
      if(this.movies_filtered_listids.length>1){
        console.log('');
        console.log('this.movies_filtered_listids', this.movies_filtered_listids);
        taglist=[];
        list=['Top '+n+' #movies'];
        directors=[];
        actors=[];
        for(i=0;i<n;i++){
          // 1. #OnceUponATimeInHollywood 81%
          // 2. #ThePeanutButterFalcon 78%
          // 3. #GiveMeLiberty 74%
          // 4. #Luce 74%
          // 5. #TheNightingale 73%
          tag = this.$root.movies_dict[this.movies_filtered_listids[i]].Title.toString().replace(/\s/g, '').replace(/\./g, '') || '';
          // console.log(i+1 +'. #'+tag+' '+Math.round(this.$root.movies_dict[this.movies_filtered_listids[i]].GlobalScore)+'%');
          taglist.push(tag);
          list.push(i+1 +'. #'+tag+' '+Math.round(this.$root.movies_dict[this.movies_filtered_listids[i]].GlobalScore)+'%');
          directors.push(this.$root.movies_dict[this.movies_filtered_listids[i]].Director.replace(/\s/g, ''));
          actors.push(this.$root.movies_dict[this.movies_filtered_listids[i]].Actors.replace(/\s/g, ''));
        }
        console.log(list.join('\n'));
        console.log('#'+ taglist.join(' #').replace(/,/g, ' ') +'\n#'+ directors.join(' #').replace(/,/g, ' #') +'\n#'+ actors.join(' #').replace(/,/g, ' #'));
        console.log('Check out for more: https://internetmoviebrowser.com/#/?preset=lastmonth&votesmin=50');
        console.log('TAGS: https://www.tagsfinder.com/en-us/?hashtag=movies '+taglist.join(' ')+'&limit=30&country=us');
        // https://www.tagsfinder.com/en-us/?hashtag=movies%20jamesgray%20bradpitt%20adastra%20TwoLovers%20TheImmigrant%20TheLostCityofZ%20LittleOdessa%20cinephile%20JoaquinPhoenix%20MarionCotillard&limit=30&country=us&fs=off&fp=off&fg=off&custom=franzklainsek%20%20krysztofkieslowski%20%20connienikas%20&type=live
        console.log('');
      }
    }, // 
    
  }, // /methods: {
  
  
  // ------------------------------------------------------- COMPUTED
  // obj -> that.movies_dict[obj]
  computed: {
    movies_filtered_listids() {
      let t0_ALLFILTERS = performance.now();
      // console.log('...COMPUTING movies_filtered_listids')
      // console.log()
      
      let that = this;
      let root = that.$root;
      let mmm;
      
      // do not run filters if not everything is loaded
      if(root.movies_listids.length > root.movies_n*0.7){ // i.e. we can have 30% loss from doubles
        
        ll('...apply filters');
        
        // SELECTVIEW -----
        // console.log('root.selectView', root.selectView)
        // let mmm;
        if(root.selectView == 'all') {
          mmm = root.movies_listids;
        }
        else if(root.selectView == 'watchlist') {
          mmm = root.user.uWatchList;
        }
        else if(root.selectView == 'favorites') {
          mmm = root.user.uFavsList;
        }
        else if(root.selectView == 'rated') {
          mmm = root.user.uRatingsList;
        }
        else if(root.selectView == 'notrated') {
          let t0_notrated = performance.now();
          
          // ! This is super slow
          // mmm = root.movies_listids.filter(dd => root.user.uRatingsList.indexOf(dd) < 0);
          
          // a bit better (https://stackoverflow.com/questions/19957348/javascript-arrays-remove-all-elements-contained-in-another-array)
          mmm = root.movies_listids.filter(dd => !root.user.uRatingsList.includes(dd) );
          
          
          perf(t0_notrated, 'FILTER notrated');
        }
        // console.log('mmm', mmm)
        // console.log('mmm.length', mmm.length)  
        
        
      // FILTER - UNKOWN -------------------------------------------
        // for watchlist and favslist sometimes contains unknown
        mmm = mmm.filter(ttx => {
          return root.movies_dict.hasOwnProperty(ttx);
        });
        
      // FILTER - DATE START -------------------------------------------
        if(root.selects.year[0] != ranges.year[0] || root.selects.month[0] != inits.month[0] || root.selects.day[0] != inits.day[0]) {
          let t0_date_start = performance.now();
            let _start = new Date(root.selects.year[0]+'-'+root.selects.month[0]+'-'+root.selects.day[0]);
            if(_start) mmm = mmm.filter((d) => { return root.movies_dict[d].date >= _start; });  // inclusive
          perf(t0_date_start, 'FILTER date-start');
        } else{
          ll('x no filter date-start');
        }
          
      // FILTER - DATE END -------------------------------------------
        if(root.selects.year[1] != ranges.year[1] || root.selects.month[1] != inits.month[1] || root.selects.day[1] != inits.day[1]) {
          let t0_date_end = performance.now();
            let _end   = new Date(root.selects.year[1]+'-'+root.selects.month[1]+'-'+root.selects.day[1]);
            if(_end)   mmm = mmm.filter((d) => { return root.movies_dict[d].date <  _end; });    // exclusive
          perf(t0_date_end, 'FILTER date-end');
        } else{
          ll('x no filter date-end');
        }
      
      // FILTER - DVD/TORRENT -------------------------------------------
        if(root.selects.dvd){
          let t0_dvd = performance.now();
            mmm = mmm.filter((d) => {
              return ((root.movies_dict[d].DVD) && (new Date(root.movies_dict[d].DVD) < new Date()))                                  // 1) dvd date is defined + dvd date is before today
                    || root.movies_dict[d].date < (new Date(new Date().setFullYear(new Date().getFullYear() - 1))); // 2) or realease date is older than 1 year
            }); 
          perf(t0_dvd, 'FILTER dvd');
        } else{
          ll('x no filter dvd');
        }
      
      // FILTER - GENRE -------------------------------------------
        // genre_list will contain Genre names with or without minus sign e.g. ['Thriller','-War']
        if(root.selects.genre_list.length){
          let t0_genre = performance.now();
            root.selects.genre_list.map((genre,i) => {
              // check positive/negative ---
              let doRemove=0;
              if(genre.charAt(0)=='-'){
                doRemove = 1;
                genre = genre.replace('-','');
              }
              // negative ---
              if(doRemove){
                mmm = mmm.filter((d) => {
                  return root.movies_dict[d].Genre.indexOf(genre) < 0;
                });
              }
              // positive ---
              else{
                mmm = mmm.filter((d) => {
                  return root.movies_dict[d].Genre.indexOf(genre) > -1;
                });
              }
            });
          perf(t0_genre, 'FILTER genre');
        } else{
          ll('x no filter genre');
        }
        
        
      // FILTER - SCORE -------------------------------------------
        if (root.selects.score[0] > ranges.score[0]) {
          let t0_score_start = performance.now();
            mmm = mmm.filter((d) => { return root.movies_dict[d].GlobalScore && (root.movies_dict[d].GlobalScore >= root.selects.score[0]); });
          perf(t0_score_start, 'FILTER score-start');
        } else{
          ll('x no filter score-start');
        }
        if (root.selects.score[1] < ranges.score[1]) {
          let t0_score_end = performance.now();
            mmm = mmm.filter((d) => { return root.movies_dict[d].GlobalScore && (root.movies_dict[d].GlobalScore <= root.selects.score[1]); });
          perf(t0_score_end, 'FILTER score-end');
        } else{
          ll('x no filter score-end');
        }
      
      // FILTER - VOTES -------------------------------------------
        if (root.selects.votes[0] > ranges.votes[0]) {
          let t0_votes_start = performance.now();
            mmm = mmm.filter((d) => { return root.movies_dict[d].Votes && (root.movies_dict[d].Votes >= root.selects.votes[0]); });
          perf(t0_votes_start, 'FILTER votes-start');
        } else{
          ll('x no filter votes-start');
        }
        if (root.selects.votes[1] < ranges.votes[1]) {
          let t0_votes_end = performance.now();
            mmm = mmm.filter((d) => { return root.movies_dict[d].Votes && (root.movies_dict[d].Votes <= root.selects.votes[1]); });
          perf(t0_votes_end, 'FILTER votes-end');
        } else{
          ll('x no filter votes-end');
        }
      
      
      // FILTER - RUNTIME -------------------------------------------
        if (root.selects.runtime[0] > ranges.runtime[0]) {
          let t0_runtime_start = performance.now();
            mmm = mmm.filter((d) => { return root.movies_dict[d].Runtime && (root.movies_dict[d].Runtime >= root.selects.runtime[0]); });
          perf(t0_runtime_start, 'FILTER runtime-start');
        } else{
          ll('x no filter runtime-start')
        }
        if (root.selects.runtime[1] < ranges.runtime[1]) {
          let t0_runtime_end = performance.now();
            mmm = mmm.filter((d) => { return root.movies_dict[d].Runtime && (root.movies_dict[d].Runtime <= root.selects.runtime[1]); });
          perf(t0_runtime_end, 'FILTER runtime-end');
        } else{
          ll('x no filter runtime-end');
        }
        
      
        
      // FILTER - SEARCH -------------------------------------------
        // includes GENRE
  
        // console.log('root.selectSearch',root.selectSearch);
        if (root.selectSearch && root.selectSearch.length > 1 ) {
          let t0_search = performance.now();
    
          let words = root.selectSearch.match(/(?:[^\s"']+|['"][^'"]*["'])+/g) ; // split spaces except in quotes

          for (let i=0, len=words.length; i<len; i++) {
            var word = words[i];
            var key = '';
            
            //if word contain : then we have key:val
            if(word.indexOf(':') > -1) {
              key = word.split(":")[0];
              word = word.split(":")[1];
            }
              
            // remove quotes -----
            word = word.replace(/"/g,'').replace(/'/g,''); 
            // uppercase -----
            word = word.toUpperCase();
            
            // Check positive or negative -----
            let doRemove=0;
            if(word.charAt(0)=='-'){
              doRemove = 1;
              word = word.replace('-','');
            }
            
            // console.log('--CHECK--', key, word, doRemove)
            
            // 4 POSSIBILITIES : key/nokey + positive/negative
            // key: search only in that property
            // nokey: search in all properties
            // positive: keep all movie having that word in any property
            // negative: keep movies that dont have that word anywhere
            if(key==''){ // NO KEY -----
              if(doRemove==0){ // POSITIVE -----
                mmm = mmm.filter(ddd => 
                  Object.keys(root.movies_dict[ddd]).some( key => { 
                    // if(root.movies_dict[ddd][key]) console.log( root.movies_dict[ddd][key].toString().toUpperCase() );
                    if(root.movies_dict[ddd][key]) return root.movies_dict[ddd][key].toString().toUpperCase().indexOf(word) > -1;
                    else return 0; // avoid null values will be true
                  })
                );
              }
              else{ // NEGATIVE -----
                mmm = mmm.filter(ddd => 
                  Object.keys(root.movies_dict[ddd]).every( key => {
                    // if(root.movies_dict[ddd][key] && !(root.movies_dict[ddd][key].toString().toUpperCase().indexOf(word) < 0)) console.log( root.movies_dict[ddd][key] );
                    if(root.movies_dict[ddd][key]) return root.movies_dict[ddd][key].toString().toUpperCase().indexOf(word) < 0;
                    else return 1;
                  })
                );
              }
            } // /nokey
            // KEY -----
            else {
              if(doRemove==0){ // POSITIVE -----
                mmm = mmm.filter(ddd => {
                  // console.log(key, 'in', root.movies_dict[ddd][key]);
                  if(root.movies_dict[ddd][key]) return root.movies_dict[ddd][key].toString().toUpperCase().indexOf(word) > -1 ;
                  else return 0;
                });
              }
              else{ // NEGATIVE -----
                mmm = mmm.filter(ddd => {
                  if(root.movies_dict[ddd][key]) return root.movies_dict[ddd][key].toString().toUpperCase().indexOf(word) < 0 ;
                  else return 1;
                });
              }
              
            } // /key
          } // /for (let i=0, len=words.length; i<len; i++) {
          
          perf(t0_search, 'SEARCH');
        }
        
        
// todo bug
    // // SORT -----
    //       // root.movies_listids is supposed to be already sorted    todo
    //       // but it's not the case when using &sort=Votes, because thet sorted an empty array.
    //       // the solution would be to sort movies_listids after it reached movies_n
    //       // but that should be done in $root which has not access to sortMovieIds()...
    //       // or maybe run this only once, with a FORCE flag
    //       // after all has bee sorted 1x then it will not happen again when you just filter (chich doesn't require sorting)
    //       // we only require sorting if change: selectView | sortKey | sortOrder
    //       // we could store those 3 in a string and that string doesn't change then don't sort.
          
    //       // if(root.selectView != 'all') { //
    //     if(this.lastSort != root.selectView+'-'+this.sortKey+'-'+this.sortOrder) { //
    //       let t0_sort = performance.now();
          
    //         this.sortMovieIds(mmm);
    //         this.lastSort = root.selectView+'-'+this.sortKey+'-'+this.sortOrder;
    //         ll('lastSort=' + this.lastSort)
            
    //       perf(t0_sort, 'SORT');
    //     } else{
    //       ll('x no sort');
    //     }
        
      
      } else {
        this.loading = 1;
        ll('...waiting until all movies are loaded');
        mmm = root.movies_listids.slice(0 , 10);
      }
      
  // COUNT -----
      this.$root.n_movies_viewable = mmm.length;
      
      
  // PAGINATE -----
      let t0_paginate = performance.now();
        // mmm = mmm.slice(0 , 25);
        mmm = mmm.slice( (root.pagination.currentPage-1)*root.pagination.moviesPerPage 
                        ,(root.pagination.currentPage-1)*root.pagination.moviesPerPage + root.pagination.moviesPerPage);
      perf(t0_paginate, 'PAGINATE');
      
      
      perf(t0_ALLFILTERS, 'ALL-FILTERS');
      
      
      
      // scroll to top
      // window.location = '#'; // this deletes url params
      window.scrollTo(0,0);
      
      
      // this.topN(10);
      
      return mmm;
    }, // /movies_filtered_listids() {
    
    
  }, // /computed: {
}
</script>
