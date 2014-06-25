if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Bem vindo.";
  };
  Template.hello.info=function(){ 
    var tinfo=Session.get("info");
    tinfo_=[];
    for(var x in tinfo){
        tinfo_.push(tinfo[x][1]);
}
    return tinfo_;
}
  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Meteor.startup(function () { 
        Meteor.call("jsonTest", function(error,results) {
            terr=error;
            tres=results;
            Session.set("info",tres.data.info);
        });
});
 

}

if (Meteor.isServer) {
    Meteor.methods({
       jsonTest: function () {
            //return Meteor.http.call("GET", "http://aarss.herokuapp.com/jsonMe/"); },
            return Meteor.http.call("GET", "http://0.0.0.0:5000/jsonMe/"); },
    });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
