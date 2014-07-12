Tweets= new Meteor.Collection("tweets"); // para guardar cada tweet de interesse
Tags= new Meteor.Collection("tags"); // para guardar os tags de cada tweet
Termos= new Meteor.Collection("termos"); // para guardar os termos de interesse
Foo=new Meteor.Collection("foo");
// descomente a primeira linha para zerar BD
// ou tudo para adicionar BD dummy (bom para testes)
//Tweets.remove({});
Termos.remove({});
date1=new Date(2014,6,2, 23,10,0,0);
date2=new Date(2014,5,1, 21,11,0,0);
date3=new Date(2014,3,6, 20,1,0,0);
termos_observados=[        {termo:"#aao0",adicionado_em:date1,primeira_msg_de:date2},
                     {termo:"#testeteste",adicionado_em:new Date(),primeira_msg_de:new Date()},
                    {termo:"#participabr",adicionado_em:date3,primeira_msg_de:date2},
                    {termo:"#testeteste2",adicionado_em:date1,primeira_msg_de:date3}];
termos_observados.forEach(function(teach){
    Termos.insert(teach);
});
