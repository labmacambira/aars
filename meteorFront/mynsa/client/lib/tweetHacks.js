Session.set("locked",0);
Session.set("lockPeriod",1);
Session.set("moment",new Date());

updateTerms=function(){
    locked=Session.get("locked");
    if(locked===1){
        lockPeriod=Session.get("lockPeriod");
        moment=Session.get("moment");
        if(((new Date()-moment)/1000) > lockPeriod){
            locked=0;
        }
    }
    if(locked===0){
        novo_termo=$("#formInputLarge").val();
        novo_termo_=novo_termo.trim();
        if(novo_termo_.length > 0){
            Session.set("locked",1);
            Session.set("moment",new Date());
                itemDB={termo:novo_termo_.toLowerCase(),adicionado_em:new Date()};
                Termos.insert(itemDB,function(){
                    Meteor.call("updateStream");
                });
                $("#formInputLarge").val("");
        } else {
            alert("adicione novo termo");
        }

    } else {
        total=lockPeriod-(new Date()-moment)/1000;
        
        alert("aguarde o tempo necessario: " + total/(60*60)+" horas");
    }

};
