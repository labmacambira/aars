
if (Meteor.isClient) {
Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_friends', 'user_location', 'user_events',
            "user_relationships",
            'friends_events', 'friends_location', 'friends_about_me',
            'user_status', 'friends_status', 'read_friendlists'],
    }
});
 Template.hello.online=function(){
    if(typeof Accounts.connection.userId()==="string"){
        return 1;
    } else {
        return 0;
    }
}

  Template.hello.mfriends= function () {
    if(Session.get("mfriend_count")===undefined){
        return undefined;
    } else {
         return "conferidas amizades mútuas de " + Session.get("mfriend_count") + " amigos, "+(100*Session.get("mfriend_fract")).toFixed(2) + "%";
    }
}
  Template.hello.brick_width = function () {
    if(Session.get("mfriend_fract")===undefined){
        return 0;
    }  else {
        return Math.floor(200*Session.get("mfriend_fract"));
    }
}
  Template.hello.rendered = function(){
         Meteor.call('getUserData', function(err, data) {
            tdata=data;
            Session.set("name",tdata.name);
            Session.set("gender",tdata.gender);
            Session.set("email",tdata.email);
            Session.set("updatedfb",tdata.updated_time);
            Session.set("tdata",tdata);
         });
         Meteor.call('getFriends', function(err, data) {
            tdata2=data;
            Session.set("tdata2",data);
            Session.set("namigos",data.data.length);
         });
}
  Template.hello.greeting2 = function () {
    if(typeof Accounts.connection.userId()==="string"){
        if(Session.get("completo2")===undefined){
            return "amigos acessíveis: "+Session.get("namigos");
        } else {
            return JSON.stringify(Session.get("tdata2"));
        }
    } else {
        return undefined;
    }
  }

  Template.hello.greeting = function () {
    if(typeof Accounts.connection.userId()==="string"){


        if(Session.get("completo")===undefined){
            return "Bem vindo, "+Session.get("name")+", "+Session.get("gender")+", "+Session.get("email")+", atualizado: "+Session.get("updatedfb");
        } else {
            return JSON.stringify(Session.get("tdata"));
        }
    }
    else {
        tdata=undefined;
        return "Faça Login";
    }
  };
  Template.hello.info=function(){ 
    if(typeof Accounts.connection.userId()==="string"){
        var tinfo=Session.get("info");
        tinfo_=[];
        for(var x in tinfo){
            tinfo_.push(tinfo[x][1]);
}
        return tinfo_;
  } else {
        return undefined;
  }
}
  Template.hello.events({
    'click #completo': function () {
        if(Session.get("completo")===undefined){
            Session.set("completo",1);
        } else {
            Session.set("completo",undefined);
        }
    },
    'click #completo2': function () {
        if(Session.get("completo2")===undefined){
            Session.set("completo2",1);
        } else {
            Session.set("completo2",undefined);
        }
    },
    'click #baixaAmigos': function () {
        console.log("aqui2");
        fdata=Session.get("tdata2");
        var i=0;
        II=[];
        while(i<5){
            ii=fdata.data[i];
            II.push(ii.id);
            i++;
        }
        // pega os mutual friends
        Meteor.call('getMutualFriends',II, function(err, data) {
            ddata=data;
        });
        Meteor.call('batchTest', function(err, data) {
            cdata=data;
        });
},

    'click #bteste': function () {
        console.log("aqui");
         Meteor.call('batchTest', function(err, data) {
            bdata=data;
        });
},
    'click #gamizades': function () {
        if(Session.get("vgraph")===undefined){
            tsvg=d3.select("#gdiv").append("svg").attr("id","gsvg").attr("width","100%").attr("height","100%");
            Session.set("vgraph",1);
        } else {
            d3.select("#gsvg").remove();
            Session.set("vgraph",undefined);
        }
    },
    'click #amizades': function () {
        // para cada amigo
        tdict={};
        for(var j=0;j<tdata2.data.length;j++){
            JJJ=j;
            i=tdata2.data[j];
            //tdata2.data.forEach(function(i){
            console.log(i.id);
            // pega os mutual friends
             Meteor.call('getFFriends', i.id, function(err, data) {
                var tdata3=data[0];
                var tid=data[1];
                tdict[tid]=tdata3;
                // e aumenta o brick_width no mesmo fator
                if(Session.get("mfriend_count")===undefined){
                    Session.set("mfriend_count",1);
                } else {
                    Session.set("mfriend_count",Session.get("mfriend_count")+1);
                    Session.set("mfriend_fract",Session.get("mfriend_count")/Session.get("namigos"));
                }
             });
}
    },
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
        Session.set("completo",1);
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
function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}
Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}
Facebook.prototype.getUserData = function() {
    return this.query('me');
}
Facebook.prototype.getFriends = function() {
    //return this.query('me?fields=friends');
    return this.query('me/friends');
}
Facebook.prototype.getFFriends = function(tid) {
    console.log(tid+"AA");
    console.log(tid+'?fields=friends');
    return this.query('me/mutualfriends/'+tid);
}
    Meteor.methods({
       getMutualFriends: function (tids) {
            console.log(tids,tids.length);
            var foo=[];
            for(var i=0; i<tids.length; i++){
                foo.push({method:"GET",relative_url:"me/mutualfriends/"+tids[i]})
}
            console.log("foo: ", foo);
            tquery=JSON.stringify(foo);
            console.log(tquery);
            return Meteor.http.call("GET", 'https://graph.facebook.com/?batch='+tquery+'&access_token='+Meteor.user().services.facebook.accessToken+'&method=post'); 
        },
       batchTest: function () {
            return Meteor.http.call("GET", 'https://graph.facebook.com/?batch=[{"method":"GET","relative_url":"me"},{"method":"GET","relative_url":"me/friends?limit=50"}]&access_token='+Meteor.user().services.facebook.accessToken+'&method=post'); 
        },
       jsonTest: function () {
            return Meteor.http.call("GET", "http://0.0.0.0:5000/jsonMe/"); },
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
    getFriends: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFriends();
        return data;
    },
    getFFriends: function(tid) {
        console.log(tid);
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFFriends(tid);
        return [data,tid];
    },
});

  Meteor.startup(function () {
    // code to run on server at startup
});
}
