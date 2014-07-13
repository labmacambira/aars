Tweets= new Meteor.Collection("tweets"); // para guardar cada tweet de interesse
Tags= new Meteor.Collection("tags"); // para guardar os tags de cada tweet
Termos= new Meteor.Collection("termos"); // para guardar os termos de interesse
TweetHacks= new Meteor.Collection("tweethacks"); // para dar conta da gambi com os tweets
TweetHacks.insert({item:"locked",value:0});
TweetHacks.insert({item:"lockPeriod",value:12*60*60});
// descomente a primeira linha para zerar BD
// ou tudo para adicionar BD dummy (bom para testes)
Tweets.remove({});
Termos.remove({});
termos_observados=[  {termo:"#aao0",adicionado_em:new Date()},
                     {termo:"#testeteste",adicionado_em:new Date()},
                     {termo:"#participabr",adicionado_em:new Date()},
                    {termo:"#governo",adicionado_em:new Date()}];
termos_observados.forEach(function(teach){
    Termos.insert(teach);
});
