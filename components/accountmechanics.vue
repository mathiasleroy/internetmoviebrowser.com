<template>
  
  <div class="px-3">
    
    <v-card raised max-width="400" class="mx-auto my-3"
    v-show="$route.name == 'account' && !$root.user.uid"
    >
      <v-card-text>
      
      <div id="firebaseui-auth-container" class="mt-4" ></div>
      
      <div class="mt-2">
        Creating an account will give you access to:
        <ul>
          <li>Save watchlist <v-icon>mdi-bookmark</v-icon></li>
          <li>Save favorite movies <v-icon>mdi-heart</v-icon></li>
          <li>Rate movies <v-icon>mdi-star</v-icon></li>
          <li>Save your preffered parameters</li>
          <li>Save filter presets</li>
        </ul>
      </div>
        <!--Open your account and personalise your searches, by creating your watchlist, adding your favourites, and rating  the movies you already watched.-->
      </v-card-text>
    </v-card>
  </div>

</template>

<style>
.firebaseui-container, .firebaseui-container *{
  background-color:inherit;
  color:inherit;
}
</style>

<script>
module.exports = {
  // ------------------------------------------------------- DATA
  data: function() {
    return {
      user:{
        uid: '',
        uemail: '',
        uImdbId: '',
        uWatchList: [],
        uFavsList: [],
        uRatingsList: [],
        uRatingsDict: {},
      },
      // uHideList: '',
    }
  }, // /data: function() {
  
  // ------------------------------------------------------- METHODS
  methods: {
    // logout(){
    //   // console.log('loggin out')
    //   firebase.auth().signOut().then(function() {
    //     console.log('logout complete');
    //   }, function(error) {
    //     console.log('logout error: ', error);
    //   });
    // }, // /logout(){
    // toggleWatchlist(ttx){
    //   if(this.uid){
    //     if(ttx){
    //       let index = this.uWatchList.indexOf(ttx);
    //       if(index<0) this.uWatchList.push(ttx); // add
    //       else this.uWatchList.splice(index, 1); // remove
          
    //       // push to firestore -----
    //       accountRef = firestore.collection('accounts').doc(this.uid);
    //       accountRef.set({z:0}, {merge: true});
    //       accountRef.update('WatchList', this.uWatchList);
          
    //       l('uWatchList', this.uWatchList);
    //     }
    //   }
    //   else{
    //     $('#modalAuth').modal('show');
    //   }
    // }, // /toggleWatchlist(){
  }, // /methods: {
  
  // ------------------------------------------------------- MOUNTED
  mounted: function() {
    // console.log('accountmechanics mounted')
    
    let that=this;
    
    // FIREBASE UI AUTHENTICATION ---------------------------------------
    // https://github.com/firebase/FirebaseUI-Web
    
    let uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return false;
        },
        // uiShown: function() {
        //   // The widget is rendered.
        //   // Hide the loader.
        //   document.getElementById('loader').style.display = 'none';
        // }
      },
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    // // The start method will wait until the DOM is loaded.
    
// if (ui.isPendingRedirect()) {
//   ui.start('#firebaseui-auth-container', uiConfig);
// }
    ui.start('#firebaseui-auth-container', uiConfig);
    
    initApp = function() {
      firebase.auth().onAuthStateChanged(function(user) {
        // console.log('onAuthStateChanged')
        // console.log('user',user)
        
        if (user) { // User is signed in
        
          ui.reset(); // 
          let displayName = user.displayName;
          let email = user.email;
          let emailVerified = user.emailVerified;
          let photoURL = user.photoURL;
          let uid = user.uid;
          let phoneNumber = user.phoneNumber;
          let providerData = user.providerData;
          let account = 'Anonymous';
          if(email) account = email;
          
          that.user.uid = uid;
          that.user.uemail = email;
          
          // console.log('user logged in', email)
          // user.getIdToken().then(function(accessToken) {
          //   l('accessToken',accessToken)
          // });
          
          
          // push to firestore -----
          let accountRef = db.collection('accounts').doc(uid);
          
          // SEND CURRENT RATINGS:
          // if(that.user.uRatingsDict) accountRef.set({Ratings:that.user.uRatingsDict}, {merge: true});
          
          
          // RESTORE DATA FROM FIRESTORE ACCOUNT -----
          accountRef.get().then(function(doc) {
            if (doc.exists) {
              d = doc.data();
              
              if(d.FavsList) that.user.uFavsList = d.FavsList;
              // if(d.HideList) that.user.uHideList = d.HideList;
              if(d.WatchList) that.user.uWatchList = d.WatchList;
              if(d.uImdbId)  that.user.uImdbId = d.uImdbId;
              if(d.History)  that.user.uHistory = d.History;
              
              if(d.Ratings)  that.user.uRatingsDict = d.Ratings;
              if(d.Ratings)  that.user.uRatingsList = Object.keys(d.Ratings);
              
              
              if(d.Settings){
                that.user.uSettings = d.Settings;
                
                // apply saved settings ---
                let sss = d.Settings;
                if(sss.defaultGoDark) {
                  ll('sss.defaultGoDark = ' +sss.defaultGoDark)
                  if(sss.defaultGoDark=='true') that.$root.goDark = true;
                  else if(sss.defaultGoDark=='false') that.$root.goDark = false;
                }
                if(sss.defaultSort) {
                  ll('sss.defaultSort = ' +sss.defaultSort)
                  that.$root.selectSort = sss.defaultSort;
                }
                if(sss.defaultView) {
                  ll('sss.defaultView = ' +sss.defaultView)
                  that.$root.selectView = sss.defaultView;
                }
                
              } 
              
              
              
              
              // LIMIT HISTORY -----
              let limit = 16;
              if(d.History && d.History.length>limit){ // todo also check if we are online, offline mode will make error
                // d.History.splice(0, d.History.length - limit)
                // accountRef.update('History', d.History);
                accountRef.update('History', uniq( d.History.map(d => d.split('|')[0]) ).slice(-limit));
              }
              
              // console.log('--emitting');
              that.$emit('user-change', that.user);
              // simpler but less clean:  $root.user = that.user;
              
            } 
            // else { console.log("No such document!"); }
          })
          // .catch(function(error) { console.log("Error getting document:", error); })
          ;
          
        } else { // User is signed out
          // that.user.uid = '';
          // that.user.uemail = '';
          that.user = {};
          ui.start('#firebaseui-auth-container', uiConfig); // show the  signin options again
        }
      }, function(error) {
        console.log('error',error);
      });
    };
    initApp();
  }, // /mounted: function() {
}
</script>
