Meteor.methods({
    updateStream: function() {
        termos=Termos.find().fetch();
        streama=[];
        termos.forEach(function(i){
            streama.push(i.termo);
        });
        //delete stream, T;
        console.log(streama);
        //T = new TwitMaker({
        //    consumer_key:             tauth[INDICET].consumer_key,
        //    consumer_secret:          tauth[INDICET].consumer_secret, 
        //    access_token:             tauth[INDICET].access_token,
        //    access_token_secret:      tauth[INDICET].access_token_secret
        //}); INCREMENTA();
        stream.stop(); // stopa...
        stream.request.abort();
        stream.removeAllListeners();
        //stream.reconnect();
        stream = T.stream('statuses/filter', { track: streama });
        stream.on('tweet',  Meteor.bindEnvironment(
            function (tweet) {
              console.log(tweet);
              insertTweet(tweet);
            })
        );
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
});
