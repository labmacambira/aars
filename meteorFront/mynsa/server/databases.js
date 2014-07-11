Geral= new Meteor.Collection("geral");
Tweets= new Meteor.Collection("tweets");
// descomente a primeira linha para zerar BD
// ou tudo para adicionar BD dummy (bom para testes)

Tweets.remove({});
Geral.remove({});
date1=new Date(2014,6,2, 23,10,0,0);
date2=new Date(2014,5,1, 21,11,0,0);
date3=new Date(2014,3,6, 20,1,0,0);
termos_observados=[{termo:"#aao0",stats:{n_msgs:5},adicionado_em:date1,primeira_msg_de:date2},
                    {termo:"#testeteste",stats:{n_msgs:0},adicionado_em:new Date(),primeira_msg_de:new Date()},
                    {termo:"#participabr",stats:{n_msgs:15},adicionado_em:date3,primeira_msg_de:date2},
                    {termo:"#testeteste2",stats:{n_msgs:78},adicionado_em:date1,primeira_msg_de:date3}];

Geral.insert({   termos_observados:termos_observados,
                 stats:{n_msgs:562,n_autores:23,n_usuarios:4}
            });
termos_observados.forEach(function(teach){
    Geral.insert(teach);
});
