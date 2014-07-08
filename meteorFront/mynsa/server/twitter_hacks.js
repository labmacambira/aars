var T = new TwitMaker({
//    consumer_key:         'iub8wm03f4sI4EMvxgdoicwIe',
//    consumer_secret:      'wlMxqHGSKjrKjhTPhQtkdR9bUnK7sZyjgsUEEcxDlHqoJCHO4D', 
//    access_token:         '18882547-183eFHigoFCYlZDh4IUSkVtsF6WM0CbX6yvu0Ah3a',
//    access_token_secret:  'YrWWp3GNudB7rXgHaj6cokJyXM6SW3GUTmO1tqoIYv6Y9'
    consumer_key:         'kj0HQGII7R1tfsAXhUcq6g',
    consumer_secret:      'LApqUqsuZmndSmOOt6erb6t72fCEe9B4BzSKCVIg', 
    access_token:         '18882547-ZsbjCGH2XeCyAzxeCtVHAh1esPvKIiMWyarUyy1JX',
    access_token_secret:  'BkW7shEXmTm7i7R9HbnP3ljGRfadzA1TBZNhHnDbmBGol'
});

insertTweet=function(tweet){
    text=tweet.text.replace(/[\.,-\/!$%\^&\*;?:{}=\-_`~()]/g,"   ").split(" ");
    termos_b=[];
    termos_e=[];
    termos.forEach(function(i){
        termos_b.push(i.termo);
        if(_.contains(text,i.termo)){
            termos_e.push(i.termo);
        }
    });
    dbItem={tweet:tweet,termos_buscados:termos_b,termos_encontrados:termos_e,tags_msg:[]};
    Tweets.insert(dbItem);
};


termos=Geral.findOne().termos_observados;
//termos=Configs.find({campo:"termos"}).fetch()[0].termos;
streama="";
termos.forEach(function(i){
    bar=((i.termo===termos[termos.length-1].termo) ? "" : "," );
    streama+=i.termo+bar;
});
console.log(streama);
stream = T.stream('statuses/filter', { track: streama });
stream.on('tweet',
  Meteor.bindEnvironment(
    function (tweet) {
        console.log(tweet);
        //Tweets.insert({tweet:tweet, termos:termos})
        insertTweet(tweet);
    },
    function( error) {console.log( error);}
  )
);


