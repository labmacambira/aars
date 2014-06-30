if (Meteor.isClient) {
function makeFGraph(){
    //var fdata=session.get("tdata2").data;
    //tnodes=[];
    tnodes=Session.get("tdata2").data;
    node_dict={};
    for(var i=0; i<tnodes.length; i++){
        var amigo=tnodes[i];
        node_dict[amigo.id]=i;
    }
    tlinks=[];
    for(var i=0; i<II.length; i++){
        amigos=II[i];
        amizades_deles=DDATA[i].data;
        if(amigos.length ==! amizades_deles.length){
            console.log("numero de amigos nao igual ao numero de amizades");
        }
        for(var j=0; j<amigos.length; j++){
            amigo=amigos[j];
            indice1=node_dict[amigo.id];
            amizades=JSON.parse(amizades_deles[j].body).data;
            for(var k=0; k<amizades.length; k++){
                amizade=amizades[k];
                indice2=node_dict[amizade.id];
                tlinks.push({source:indice1, target:indice2});
            }
        }
    }
    return [tnodes,tlinks];
}
function drawFGraph(){
    tsvg=d3.select("#gsvg");
    W=tsvg.node().clientWidth;H=tsvg.node().clientHeight
    //tsvg.insert("rect").style("fill","red").attr("width","100%").attr("height","100%");
    //nodes=[{name:"pitchuca"},{name:"eu"},{name:"juvira"},{name:"penalva"}];
    //links=[{source:0,target:1},{source:1,target:2}];
    foobar=makeFGraph();
    nodes=foobar[0];
    links=foobar[1];
    force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        //.size(["100%", "100%"])
        .size([W, H])
        //.size(["100", "100"])
        .start();
links_ = tsvg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 2; });
color = d3.scale.category20();
nodes_ = tsvg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(3); })
      .call(force.drag);
nodes_.append("title")
      .text(function(d) { return d.name; });
force.on("tick", function() {
    links_.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes_.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
}

Amizades = new Meteor.Collection("amizades");
Foo = new Meteor.Collection("foo");
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
            return "amigos acessíveis: "+Session.get("namigos");
    } else {
        return undefined;
    }
  }
  Template.hello.greeting2_completo = function () {
    if(typeof Accounts.connection.userId()==="string"){
        return JSON.stringify(Session.get("tdata2"));
    } else {
        return undefined;
    }
  }

  Template.hello.greeting = function () {
    if(typeof Accounts.connection.userId()==="string"){
            return "Bem vindo. Dados primários: "+Session.get("gender")+", "+Session.get("email")+", atualizado: "+Session.get("updatedfb");
    } else {
        tdata=undefined;
        return "Faça Login";
    }
  };

  Template.hello.greeting_completo = function () {
    if(typeof Accounts.connection.userId()==="string"){
        return JSON.stringify(Session.get("tdata"));
        }
    else {
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
    'click #baixaAmizades': function () {
        btn = $("#baixaAmizades");
        btn.button('loading');
        console.log("aqui2");
        fdata=Session.get("tdata2");
        II=[];
        for(var i=0; i<fdata.data.length; i++){
            if( i%50 === 0 ){
                II.push([]);
            }
            var j=Math.floor(i/50);
            II[j].push(fdata.data[i]);
        }
        // pega os mutual friends
        DDATA=[];
        console.log("aqui3");
        for(var i=0; i<II.length; i++){
            Meteor.call('getMutualFriends',[II[i],i], function(err, data) {
                console.log(i);
                var ddata=data;
                DDATA.push(ddata);
                if(Session.get("mfriend_count")===undefined){
                    Session.set("mfriend_count",ddata.data.length);
                } else {
                    Session.set("mfriend_count",Session.get("mfriend_count")+ddata.data.length);
                    Session.set("mfriend_fract",Session.get("mfriend_count")/Session.get("namigos"));
                    if(Session.get("mfriend_count")===Session.get("namigos")){
                        //btn.button('reset');
                        //btn.attr("data-loading-text","baixadas amizades mútuas");
                        //btn.button('loading');
                        btn.text("Baixadas amizades mútuas");
                        btn.attr("class", "btn btn-danger btn-sm");
                    }
                }
            });
        }
        var foobar=Session.get("tdata").id;
        Amizades.insert({ fbid:foobar, amigos: fdata.data, amigos_agrupados: II, amizades : DDATA});
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
            drawFGraph();
            Session.set("vgraph",1);
        } else {
            d3.select("#gsvg").remove();
            Session.set("vgraph",undefined);
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
Amizades = new Meteor.Collection("amizades");
Foo = new Meteor.Collection("foo");
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
       getMutualFriends: function (tids_) {
            tids=tids_[0];
            //console.log(tids,tids.length,tids_[1]);
            console.log(tids_[1]);
            var foo=[];
            for(var i=0; i<tids.length; i++){
                console.log("me/mutualfriends/"+tids[i].id);
                foo.push({method:"GET",relative_url:"me/mutualfriends/"+tids[i].id})
}
            //console.log("foo: ", foo);
            tquery=JSON.stringify(foo);
            //console.log(tquery);
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
