Geral= new Meteor.Collection("geral");
Tweets= new Meteor.Collection("tweets");
Session.set("screen","initialScreen"); // initial, dashboard, term

Template.termoSpecs.tweets=function(){
    return Tweets.find({termos_encontrados: {"$in":[Session.get("termo")] }}).fetch()
};
  Template.termoSpecs.termo=function(){
    return Session.get("termo");
};
  Template.initialDashboard.observedTerms=function(){
    return Geral.findOne().termos_observados;
};
  Template.main.termo= function () {
    return (Session.get("screen")==="termoScreen");
};
  Template.main.initial= function () {
    return (Session.get("screen")==="initialScreen");
};
  Template.main.dashboard= function () {
    return (Session.get("screen")==="dashboardScreen");
};
  Template.termoSpecs.events({
    'click #voltarDashboard': function(){
        Session.set("screen","dashboardScreen");
    },
    'click #buscarTweets': function(){
        console.log(Session.get("termo"));
    },
    'click .row': function(){
        ttthis=this;
    },
});
  Template.tweetController.glyphs1=function(){
    return ["star","ok","user","pencil"];
};
  Template.tweetController.glyphs2=function(){
    return ["plus","asterisk","minus"];
};
  Template.tweetController.events({
    'click .glyphicon': function(e){
        //Tweets.update({_id:this._id},{"$addToSet":{"tags_msg":e.target.className.split("-")[1]}});
        tid=e.target.id;
        termo=Session.get("termo");
        glyph=this+"";
        caminho="tags_msg."+termo;
        Tweets.update({_id:tid},{"$addToSet":{eval(caminho):glyph}});
    },
});
  Template.initialPresentation.events({
    'click .btn': function () {
        Session.set("screen","dashboardScreen"); // initial, dashboard, term
    },
});
  Template.initialDashboard.events({
    'click .btn-default': function () {
        novo_termo=$("#formGroupInputLarge").val();

        itemDB={termo:novo_termo,stats:{n_msgs:0},adicionado_em:new Date(),primeira_msg_de:new Date()};
        
        Geral.update({_id:Geral.findOne()._id},{"$push":{"termos_observados":itemDB}});
        $("#formGroupInputLarge").val("");
    },
    'click .btn-success':function(){
        tthis=this;
        Session.set("termo",this.termo);
        Session.set("screen","termoScreen");
    }
});
