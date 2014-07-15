Tweets= new Meteor.Collection("tweets");
Tags= new Meteor.Collection("tags"); // para guardar os tags de cada tweet
Termos= new Meteor.Collection("termos"); // para guardar os termos de interesse

Session.set("screen","initialScreen"); // initial, dashboard, term

Template.termoSpecs.nTotal=function(){
    return Tweets.find({"termos_encontrados":Session.get("termo")}).count();
};
Template.termoSpecs.nOk=function(){
    return Tweets.find({"tags_msg.glifo":"ok","tags_msg.termo":Session.get("termo")}).count();
};
Template.termoSpecs.tweets=function(){
    return Tweets.find({termos_encontrados: {"$in":[Session.get("termo")] }},{sort:{"tweet.id":-1}}).fetch();
};
  Template.termoSpecs.termo=function(){
    return Session.get("termo");
};
  Template.tweetDashboard.observedTerms=function(){
    return termos=Termos.find().fetch();
};
  Template.main.termo= function () {
    return (Session.get("screen")==="termoScreen");
};
  Template.main.initial= function () {
    return (Session.get("screen")==="initialScreen");
};
  Template.main.twitter= function () {
    return (Session.get("screen")==="twitterScreen");
};
  Template.main.facebook= function () {
    return (Session.get("screen")==="facebookScreen");
};
  Template.main.participabr = function () {
    return (Session.get("screen")==="participaScreen");
};
  Template.main.options= function () {
    return (Session.get("screen")==="optionsScreen");
};
  Template.termoSpecs.events({
    'click #voltarDashboard': function(){
        Session.set("screen","twitterScreen");
    },
    'click #buscarTweets': function(){
        Meteor.call("searchTwitter",Session.get("termo"));
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
  Template.initialOptions.events({
    'click .twitterChoice': function () {
        Session.set("screen","twitterScreen");
    },
    'click .faceChoice': function () {
        Session.set("screen","facebookScreen");
    },
    'click .participaChoice': function () {
        Session.set("screen","participaScreen");
    },
});
  Template.initialPresentation.events({
    'click .btn': function () {
        Session.set("screen","optionsScreen");
    },
});
  Template.tweetDashboard.events({
    'click .btn-default': updateTerms,
    'click .btn-success':function(){
        Session.set("termo",this.termo);
        Session.set("screen","termoScreen");
    }
});
