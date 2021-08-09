<template>
  <v-container class="">
    
    <v-card raised max-width="600" class="mx-auto mb-3 mt-0" >
      <v-card-text>
    
        <h2 class="font-weight-light text-uppercase subtitle-1">About</h2>
        <p>
          <!--WHAT-->
          Internet Movie Browser (IMB)
          <!--<b>I</b>nternet <b>M</b>ovie <b>B</b>rowser (IMB)-->
          <!--was brought to life-->
          was born in 2015 from 
<!--a love for movies and -->
          the need
          <!--started with the idea -->
          <!--for a tool that allows -->
          to <strong>find good movies, quickly and easily</strong>.
          
          <!--HOW-->
          <br>
          <!--IMB -->
          It
          combines movie ratings
          from 4 main websites 
          <span class="normallinks">(<a href="">IMDb</a>, <a href="">Rotten Tomatoes</a>, <a href="">Metacritic</a> & <a href="">Letterboxd</a>)</span>
          <!--are combined-->
          in <strong>one global score</strong>,
          <!--.-->
          that supports you in better identifying the best movies out there.
          <!--that helps you-->
          <!--identify the best movies out there.-->

          <br>
          IMB offers
          a <strong>unique interactive interface</strong>,
          <!--which allows to put together multiple filters-->
          <!--and see the results update on the fly.-->
          where multiple filters can be put together and the results are refreshed on the fly.
          <!--Sorting...-->
          
          <br>
          The database is updated on a daily basis showing always the latest trending movies.
          
          <br>
          <!--Open your account and personalise your searches, by creating your watchlist, adding your favourites, and rating  the movies you already watched.-->
          <!--We hope to make your passion for movies more enjoyable.-->
        </p>
        
        <p>
          This is an independent project, free of charge and without advertisements.
          <!--It's free and without ads.-->
        </p>
        
        <template v-if="!$root.user.uid">
        <!--To be able to save your watchlist, favorites and rate -->
        To get the most of IMB features, 
        <v-btn color="primary" to="/account">Open your account now</v-btn>
        </template>

        <!--explore visually movie datasets-->
        
      </v-card-text>
    </v-card>
    
    <!--<v-card raised max-width="400" class="mx-auto my-3" >-->
    <!--  <v-card-text>-->
    <!--    <h2 class="font-weight-light text-uppercase subtitle-1">Features</h2>-->
    <!--    <ul>-->
    <!--      <li><span class="pr-1">30</span>000 movies</li>-->
    <!--      <li></li>-->
    <!--      <li></li>-->
    <!--    </ul>-->
    <!--  </v-card-text>-->
    <!--</v-card>-->
    
    <v-card raised max-width="600" class="mx-auto my-3" >
      <v-card-text>
        <h2 class="font-weight-light text-uppercase subtitle-1">stay tuned</h2>
        
        
          <!-- https://simplesharingbuttons.com/#preview -->
          
          <!-- https://www.instagram.com/internetmoviebrowser/ 
          https://www.shareicon.net/pack/social-media-a-black-white
          -->
          
          <!--<ul class="share-buttons">-->
          
            <!--<li>-->
              <a class="mx-2" href="https://twitter.com/MovieBrowser" title="Twitter Page MovieBrowser" target="_blank">
                <img alt="Twitter Page icon Internet Movie Browser search engine" 
                  src="assets/img/social/twitter.svg" 
                  height="40" ></a>
            <!--</li>-->
            
            <!--<li>-->
              <a class="mx-2" href="https://www.instagram.com/internetmoviebrowser/" title="Instagram Page internetmoviebrowser" target="_blank">
                <img alt="Instagram Page icon Internet Movie Browser search engine" 
                  src="assets/img/social/instagram.svg" 
                  height="40" ></a>
            <!--</li>-->
            
            <!--<li>-->
              <a class="mx-2" href="https://www.facebook.com/iMovieBrowser/" title="Facebook Page iMovieBrowser" target="_blank">
                <img alt="Facebook Page icon Internet Movie Browser search engine" 
                  src="assets/img/social/facebook.svg" 
                  height="40" ></a>
            <!--</li>-->
            
            <!--<li>-->
              <!--<a href="https://www.linkedin.com/company/internet-movie-browser/" title="Linkedin Page internet-movie-browser" target="_blank">
                <img alt="Linkedin Page icon Internet Movie Browser search engine" 
                  src="assets/img/social/linkedin.svg" 
                  height="40" ></a>-->
            <!--</li>-->
          <!--</ul>-->
                          <!--
                          <li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Finternetmoviebrowser.com&quote=" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL)); return false;"><img alt="Share on Facebook" src="assets/img/social/black/images/flat_web_icon_set/black/Facebook.png" /></a></li>
                          <li><a href="https://twitter.com/intent/tweet?source=http%3A%2F%2Finternetmoviebrowser.com&text=:%20http%3A%2F%2Finternetmoviebrowser.com&via=moviebrowser" target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><img alt="Tweet" src="assets/img/social/black/images/flat_web_icon_set/black/Twitter.png" /></a></li>
                          <li><a href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Finternetmoviebrowser.com&description=" target="_blank" title="Pin it" onclick="window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL) + '&description=' +  encodeURIComponent(document.title)); return false;"><img alt="Pin it" src="assets/img/social/black/images/flat_web_icon_set/black/Pinterest.png" /></a></li>
                          <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Finternetmoviebrowser.com&title=&summary=&source=http%3A%2F%2Finternetmoviebrowser.com" target="_blank" title="Share on LinkedIn" onclick="window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img alt="Share on LinkedIn" src="assets/img/social/black/images/flat_web_icon_set/black/LinkedIn.png" /></a></li>
                          <li><a href="mailto:?subject=&body=:%20http%3A%2F%2Finternetmoviebrowser.com" target="_blank" title="Send email" onclick="window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL)); return false;"><img alt="Send email" src="assets/img/social/black/images/flat_web_icon_set/black/Email.png" /></a></li>
                          -->
            
      </v-card-text>
    </v-card>
    
    <v-card raised max-width="600" class="mx-auto my-3" >
      <v-card-text>
        <h2 class="font-weight-light text-uppercase subtitle-1">Contact</h2>
        <a class="" href="https://mathiasleroy.com">Mathias Leroy</a> / <a class="" href="https://twitter.com/mathiasleroy_">Twitter</a>
      </v-card-text>
    </v-card>
    
  </v-container>
</template>

<style>
.normallinks a{
  color:inherit;
  text-decoration:inherit;
}
</style>

<script>
</script>