Meteor.methods({
    updateStream: function() {
        termos=Termos.find().fetch();
        streama=[];
        termos.forEach(function(i){
            streama.push(i.termo);
        });
        //delete stream, T;
        console.log(streama);
        stream.request.abort();
        stream.request.destroy();
        stream.stop(); // stopa...
        delete stream,T;
        T = new TwitMaker({
            consumer_key:             tauth[INDICET].consumer_key,
            consumer_secret:          tauth[INDICET].consumer_secret, 
            access_token:             tauth[INDICET].access_token,
            access_token_secret:      tauth[INDICET].access_token_secret
        }); INCREMENTA();
        stream = T.stream('statuses/filter', { track: streama });
        stream.on('tweet',  Meteor.bindEnvironment(
            function (tweet) {
              console.log(tweet);
              insertTweet(tweet);
            })
        );
        //stream.resetStallTimer();
    },
    searchTwitter: function(term) {
      T.get('search/tweets', { q: term, count: 100 },
        Meteor.bindEnvironment(
          function(err, data, response) {
            data.statuses.forEach(function(i){
               insertTweet(i);
            });
          },
          function( error) {console.log( error);})
      );
    },
    fbUserData: getUserData,
    fbFriends:getFriends,
});
