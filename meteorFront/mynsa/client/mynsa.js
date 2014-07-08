Session.set("screen","initialScreen"); // initial, dashboard, term

  Template.main.initial= function () {
    return (Session.get("screen")==="initialScreen");
};
  Template.main.dashboard= function () {
    return (Session.get("screen")==="dashboardScreen");
};

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
