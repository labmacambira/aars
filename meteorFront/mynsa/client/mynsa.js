Geral= new Meteor.Collection("geral");
Session.set("screen","initialScreen"); // initial, dashboard, term
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
});

  Template.main.events({
    'click input': function () {
      // template data, if any, is available in 'this'
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
