// auth fb do gk no localhost:
// id: 670669796332705
// key: 0f24e7e8ad8028f609319e390794e770
// no aars.meteor.com:
// id: 293574867488230
// key: a125ab84e3e4a336011cdd40a89865d2

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
            return Meteor.http.call("GET", "http://0.0.0.0:5000/jsonMe/"); },
    });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
