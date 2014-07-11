Geral= new Meteor.Collection("geral");
Tweets= new Meteor.Collection("tweets");
Session.set("screen","initialScreen"); // initial, dashboard, term

Template.termoSpecs.nTotal=function(){
    return Tweets.find({"termos_encontrados":Session.get("termo")}).count();
};
Template.termoSpecs.nOk=function(){
    return Tweets.find({"tags_msg.glifo":"ok","tags_msg.termo":Session.get("termo")}).count();
};
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
        alert("busca retroativa ainda não implementada");
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
        tid=e.target.id;
        termo=Session.get("termo");
        glifo=this+"";
        if(Tweets.find({"_id":tid,"tags_msg.glifo":glifo,"tags_msg.termo":termo}).count()) {
            Tweets.update({"_id":tid},{"$pull":{tags_msg:{glifo:glifo,termo:termo}}});
        } else {
            Tweets.update({_id:tid},{"$addToSet":{tags_msg:{termo:termo,glifo:glifo}}});
        }
    },
});
Template.tglyph.helpers({
  color: function (parentContext) {
    tid=parentContext._id;
    glifo=this+"";
    termo=Session.get("termo");
    if(Tweets.find({"_id":tid,"tags_msg.glifo":glifo,"tags_msg.termo":termo}).count()) {
        return "#bbb";
    } else {
        return "#fff";
    }
  }
});
  Template.initialPresentation.events({
    'click .btn': function () {
        Session.set("screen","dashboardScreen");
    },
});
  Template.initialDashboard.events({
    'click .btn-default': function () {
        novo_termo=$("#formGroupInputLarge").val();
        itemDB={termo:novo_termo,stats:{n_msgs:0},adicionado_em:new Date(),primeira_msg_de:new Date()};
        Geral.update({_id:Geral.findOne()._id},{"$push":{"termos_observados":itemDB}});
        $("#formGroupInputLarge").val("");
        Meteor.call("updateStream");
    },
    'click .btn-success':function(){
        Session.set("termo",this.termo);
        Session.set("screen","termoScreen");
    }
});
