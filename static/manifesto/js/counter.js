let CNN =0;
let REP =0;
let NDTV =0;


function addCNN() {
    CNN++;
    console.log("CNN:"+CNN);
}
function addREP() {
    REP++;
    console.log("REP:"+REP);
}
function addNDTV() {
    NDTV++;
    console.log("NDTV:"+NDTV);   
}

function result() {
    if (CNN>NDTV && CNN>REP){
          document.getElementById("result-cnn").style.display = "block";
          document.getElementById("result-cnn").classList.toggle('card-img-top');
          document.getElementById("twitter-cnn").style.display ="block";
    }
    else if (NDTV>CNN && NDTV>REP){
        document.getElementById("result-ndtv").style.display = "block";
        document.getElementById("result-ndtv").classList.toggle('card-img-top');
        document.getElementById("twitter-ndtv").style.display ="block";
    }
    else if (REP>CNN && NDTV<REP){
        document.getElementById("result-rep").style.display = "block";
        document.getElementById("result-rep").classList.toggle('card-img-top');
        document.getElementById("twitter-republic").style.display ="block";
    }
    else if(NDTV==0 && CNN==0 && REP==0){
        alert("Invalid Selection");
    }
    else if(NDTV==CNN && CNN==REP && REP==NDTV){
        document.getElementById("result-rep").style.display = "block";
        document.getElementById("result-cnn").style.display = "block";
        document.getElementById("result-ndtv").style.display = "block";
        document.getElementById("multiple").classList.toggle('card-img-top');
        document.getElementById("twitter-all").style.display ="flex";
    }
    else if (REP==CNN){
        document.getElementById("result-rep").style.display = "block";
        document.getElementById("result-cnn").style.display = "block";
        document.getElementById("multiple").classList.toggle('card-img-top');
        document.getElementById("twitter-republic-cnn").style.display ="flex";
    }
    else if (NDTV==CNN){
        document.getElementById("result-ndtv").style.display = "block";
        document.getElementById("result-cnn").style.display = "block";
        document.getElementById("multiple").classList.toggle('card-img-top');
        document.getElementById("twitter-cnn-ndtv").style.display ="flex";
    }
    else if (NDTV==REP){
        document.getElementById("result-ndtv").style.display = "block";
        document.getElementById("result-rep").style.display = "block";
        document.getElementById("multiple").classList.toggle('card-img-top');
        document.getElementById("twitter-republic-ndtv").style.display ="flex";
    }
  }

  function disable(n,m){
    document.getElementById(m).classList.replace('btn-outline-primary', 'btn-primary');
    var nodes = document.getElementById(n).getElementsByTagName("button");
    for(var i=0; i<nodes.length; i++) {nodes[i].setAttribute("disabled","true");}
  }