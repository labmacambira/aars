tauth=[
    {consumer_key:         'iub8wm03f4sI4EMvxgdoicwIe',
    consumer_secret:      'wlMxqHGSKjrKjhTPhQtkdR9bUnK7sZyjgsUEEcxDlHqoJCHO4D', 
    access_token:         '18882547-183eFHigoFCYlZDh4IUSkVtsF6WM0CbX6yvu0Ah3a',
    access_token_secret:  'YrWWp3GNudB7rXgHaj6cokJyXM6SW3GUTmO1tqoIYv6Y9'},
    {consumer_key:         'kj0HQGII7R1tfsAXhUcq6g',
    consumer_secret:      'LApqUqsuZmndSmOOt6erb6t72fCEe9B4BzSKCVIg', 
    access_token:         '18882547-ZsbjCGH2XeCyAzxeCtVHAh1esPvKIiMWyarUyy1JX',
    access_token_secret:  'BkW7shEXmTm7i7R9HbnP3ljGRfadzA1TBZNhHnDbmBGol'},
    {consumer_key:         'uI8OdZKgtJ46fOsrZS17WWtHU',
    consumer_secret:      '5jYehAnT71Gg8GHBfRwAyzICGDs2c4Sr2TtITQ6ruyOPc3mQjx',
    access_token:         '2430470406-CU8OwLfbIaRCxBtpeR6KMMJRv51D2foYzSpGqYV',
    access_token_secret:  'LCyO9ik57ihGu6IHyE4gTXNWmclVhL9PXedHFANbnKTE8'},
    // deploy
    {consumer_key:         'U3gkdcw144pb3H315Vsmphne5',
    consumer_secret:      'jbuLKuamEaiNPXJfhfC9kaXYcoSSfRIgTldwuQYCcUJzEGNukU', 
    access_token:         '2430470406-45gX6ihMxnKQQmjX2yR1VoaTQIddgY5bT7OSOzT',
    access_token_secret:  'bHS4NkMwBFaysdVqnsT25xhNzZwEbM64KPdpRDB6RqZ2Z'},
    {consumer_key:       "mmsnjhnmeqaFOUkUTC46ONDBZ",
    consumer_secret:    "A0FS8xGk5GIHoaI8hzw5MJOyhgiD0B3vd6MRdiagDudZjbV0qD",
    access_token:       "2430470406-M0spmbsyfz3G1qY7YCZYR0Ye38CXeHQxNfLyqQo",
    access_token_secret:"O5B9rbgbAB9Gghbsp3y9HB95DAfiNs7YaR3Cj7IsTG5cm"},
    // DDD
    {consumer_key:       "cEqrKEMpzfsXvRxyEQB2IkHGk",
    consumer_secret:    "7xKo7H7vVrk0IjYfFDrr9YlOAqtu7etdSjtk4gPns1rS2Cskbk",
    access_token:       "2430470406-d8HrG3BM9V3EojLQtLM8B1dukvahggB2AAUP9dd",
    access_token_secret:"gNlB61F87lotCupJZRDAkMBz8rXMAIYqPienIN9HpBYwu"},
    {consumer_key:       "BsZXPv6Cl4gG8qS177IofLdo8",
    consumer_secret:    "PvXBGI308ocCUszngtsoy0ZbkR0jr8AmVTNlIIfpYfhqlvxc8S",
    access_token:       "2430470406-EDHzlKs35ao8GXMiQeGmaW2hJxkw0exfF0qL0Ck",
    access_token_secret:"P8q8YPhBBzAKmdR69ktTNIYDT2lgDg2SQ0zDuiieTtS7E"}
];
INCREMENTA=function(){INDICET=(INDICET+1)%3;};
//INCREMENTA=function(){INDICET=3+(INDICET)%2;}; // deploy
//INCREMENTA=function(){INDICET=5+(INDICET)%2;}; // ddd
INDICET=0; // uso interno
//INDICET=3; // deploy
//INDICET=5; //DDD
T = new TwitMaker({
    consumer_key:             tauth[INDICET].consumer_key,
    consumer_secret:          tauth[INDICET].consumer_secret, 
    access_token:             tauth[INDICET].access_token,
    access_token_secret:      tauth[INDICET].access_token_secret
});INCREMENTA();
insertTweet=function(tweet){
    if(Tweets.find({"tweet.id":tweet.id}).count()){
        console.log("tweet duplicado pelo streamer");
    } else {
        text=tweet.text.replace(/[\.,-\/!$%\^&\*;?:{}=\-_`~()]/g,"   ").toLowerCase().split(" ");
        termos_b=[];
        termos_e=[];
        termos.forEach(function(i){
            termos_b.push(i.termo);
            if(_.contains(text,i.termo)){
                termos_e.push(i.termo);
            }
        });
        dbItem={tweet:tweet,termos_buscados:termos_b,termos_encontrados:termos_e};
        Tweets.insert(dbItem);
    }
};
termos=Termos.find().fetch();
streama=[]
termos.forEach(function(i){
    streama.push(i.termo);
});
stream = T.stream('statuses/filter', { track: streama });
stream.on('tweet',
  Meteor.bindEnvironment(
    function (tweet) {
        insertTweet(tweet);
    },
    function( error) {console.log( error);}
  )
);
