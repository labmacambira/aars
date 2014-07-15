Tweets= new Meteor.Collection("tweets"); // para guardar cada tweet de interesse
Tags= new Meteor.Collection("tags"); // para guardar os tags de cada tweet
Termos= new Meteor.Collection("termos"); // para guardar os termos de interesse
// descomente a primeira linha para zerar BD
// ou tudo para adicionar BD dummy (bom para testes)
Tweets.remove({});
Termos.remove({});
termos_observados=[  {termo:"#aao0",adicionado_em:new Date()},
                     {termo:"#testeteste",adicionado_em:new Date()},
                    {termo:"#complexnetworks",adicionado_em:new Date()},
                    {termo:"#nlp",adicionado_em:new Date()},
                    {termo:"#naturallanguageprocessing",adicionado_em:new Date()},
                    {termo:"#eleicao",adicionado_em:new Date()},
                    {termo:"#forapsol",adicionado_em:new Date()},
                    {termo:"#forapt",adicionado_em:new Date()},
                    {termo:"#foradilma",adicionado_em:new Date()},
                    {termo:"#forapsdb",adicionado_em:new Date()},
                    {termo:"#foraaecio",adicionado_em:new Date()},
                    {termo:"#eleicoes",adicionado_em:new Date()},
                    {termo:"#ativismo",adicionado_em:new Date()},
                    {termo:"#democraciadireta",adicionado_em:new Date()},
                    {termo:"#democraciapura",adicionado_em:new Date()},
                    {termo:"#democraciareal",adicionado_em:new Date()},
                    {termo:"#realdemocracia",adicionado_em:new Date()},
                    {termo:"#democraciadiretadigital",adicionado_em:new Date()},
                    {termo:"#sempartido",adicionado_em:new Date()},
                    {termo:"#eumerepresento",adicionado_em:new Date()},
                    {termo:"#democraciadigital",adicionado_em:new Date()},
                     {termo:"#participabr",adicionado_em:new Date()},
                    {termo:"#governo",adicionado_em:new Date()},
                    //{termo:"participacao social",adicionado_em:new Date()},
                    //{termo:"linked data",adicionado_em:new Date()},
                    //{termo:"dados linkados",adicionado_em:new Date()},
                    //{termo:"dados abertos",adicionado_em:new Date()},
                    //{termo:"governo aberto",adicionado_em:new Date()},
                    {termo:"participacao",adicionado_em:new Date()}];
termos_observados.forEach(function(teach){
    Termos.insert(teach);
});
