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
        glifo=this+"";
        if(Tweets.find({"_id":tid,"tags_msg.glifo":glifo,"tags_msg.termo":termo}).count()) {
            console.log("jah tem");
            Tweets.update({"_id":tid},{"$pull":{tags_msg:{glifo:glifo,termo:termo}}});
        } else {
            console.log("n tem ainda ", tid, termo, glifo);
            Tweets.update({_id:tid},{"$addToSet":{tags_msg:{termo:termo,glifo:glifo}}});
        }
    },
});
//  Template.tglyph.color=function(e){
//        // ID do tweet, como pegar
//        termo=Session.get("termo");
//        glifo=this+"";
//        TT_=this;
//        return this;
//};
Template.tglyph.helpers({
  color: function (parentContext) {
    console.log(this); // profile.name data context
    console.log(parentContext); // profile data context
    this1=this;
    this2=parentContext;
    // busca se há o glifo this
    // no tweet this2._id
    // e termo no Session.get("termo")
    // se houver, volta cinza, se nao houver,
    // volta branco
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
