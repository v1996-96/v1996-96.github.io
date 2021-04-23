function startGame(){
  turnPossible=true;
  showName();
  function showName(){
    if (!(name=="")){
      $("#playerName").html("Добро пожаловать, "+name+"!");
	} else {
	  $("#playerName").html("Добро пожаловать!");
	}
  }
	score=0;
	moveCount=0;
	takeCount=0;
	compTakeCount=0;
	$("#score > span").html(score);
  function showDeck(){
	  var url=deck[1]+".png";
	  $("#game").append("<div id="+deck[1]+" class='trumpCard' style=\'border : 1px solid black; border-radius:7px; height:120px; width:84px; background-image:url(img/"+url+"); position:absolute; top:190px; left:820px;\'></div>");
	  $("#game").append("<button id='take_otboi' style='position:absolute; top:365px; left:850px; height:30px; width:65px; font-size:14pt; z-index:0;'></button>");
	    for (var i=2; i<=remainingCards; i++){
		  var top=getDeckCardTop(i);
		  var left=getDeckCardLeft(i);
		  var bufer="<div id="+deck[i]+" style=\'border : 1px solid black; border-radius:7px; height:120px; width:84px; background-image:url(img/back.png); position:absolute; top:"+top+"; left:"+left+";\'></div>";
		  $("#game").append(bufer);
		}
	showCards(1);
    remainingCards=24;
  }
  function showCards(cardIndex){
    if (cardIndex<=6){
    var topP=getPlayerTop();
	var leftP=getPlayerLeft(cardIndex);
	var bufer="#"+cardsPlayer[cardIndex];
	var animation={top:topP,left:leftP};
	$(bufer).animate(animation,300,function(){
	  $(bufer).hide("clip",{},100,function(){
	    $(bufer).css("backgroundImage","url(img/"+cardsPlayer[cardIndex]+".png)").css("zIndex",cardIndex);
		$(bufer).show("clip",{},100);
		});
	  var topC=getCompTop();
	  var leftC=getCompLeft(cardIndex);
      var bufer1="#"+cardsComp[cardIndex];
	  var animation={top:topC,left:leftC};
	  $(bufer1).css("zIndex",cardIndex);
      $(bufer1).animate(animation,100,function(){showCards(cardIndex+1)});
    });
	} else {
	  if(whoseTurn=="computer"){core();};
	}
  }
  var indicator={};
  var b="";
  for (var i=6; i<=14; i++) {
    for (var j=1; j<=4; j++) {
	  switch (j) {
	    case 1: b="c"; break;
		case 2: b="d"; break;
		case 3: b="h"; break;
		case 4: b="s"; break;
	  }
	  bufer=i+b;
	  indicator[bufer]=0;
	}
  }
  deck = new Array();
  i=1;
  while (i<=36) {
    var a=getrandom(6,14);
	var b=getrandom(1,4);
	switch (b) {
	    case 1: b="c"; break;
		case 2: b="d"; break;
		case 3: b="h"; break;
		case 4: b="s"; break;
	  }
	bufer=a+b;
	if (indicator[bufer]==0) {
	  deck[i]=bufer;
	  indicator[bufer]=1;
	  i++;
	}
  }
  bufer=strrev(deck[1]);
  trump=bufer[0];
  cardsPlayer=new Array();
  cardsComp=new Array();
  j=1;
  for (i=36; i>24; i--) {
	switch (i) {
	  case 36: cardsPlayer[j]=deck[i]; break;
	  case 35: cardsComp[j]=deck[i]; j++; break;
	  case 34: cardsPlayer[j]=deck[i]; break;
	  case 33: cardsComp[j]=deck[i]; j++; break;
	  case 32: cardsPlayer[j]=deck[i]; break;
	  case 31: cardsComp[j]=deck[i]; j++; break;
	  case 30: cardsPlayer[j]=deck[i]; break;
	  case 29: cardsComp[j]=deck[i]; j++; break;
	  case 28: cardsPlayer[j]=deck[i]; break;
	  case 27: cardsComp[j]=deck[i]; j++; break;
	  case 26: cardsPlayer[j]=deck[i]; break;
	  case 25: cardsComp[j]=deck[i]; break;
	}	
  }
  cardNumberComp=6;
  cardNumberPlayer=6;
  remainingCards=36;
  sortPlayerCards();
  showDeck();
  minPl=15;
  minCo=15;
  for (i=1; i<=cardNumberPlayer; i++) {
    a=strrev(cardsPlayer[i]);
    if (a[0]==trump) {
	  b=parseInt(cardsPlayer[i]);
	  if (b<minPl) {
	    minPl=b;
	  }
	}
  }
  for (i=1; i<=cardNumberComp; i++) {
    a=strrev(cardsComp[i]);
	if (a[0]==trump) {
	  b=parseInt(cardsComp[i]);
	  if (b<minCo) {
	    minCo=b;
	  }
	}
  }
  if (minPl>minCo) {
    whoseParty="computer";
	whoseTurn="computer";
	$("#take_otboi").html("беру");
	$("#take_otboi").bind("click",function(){if(cardNumberSub>0){take=true; takeCards();}});
  }
  if ((minPl<minCo) || ((minPl==minCo) && (minPl==15))) {
    whoseParty="player";
	whoseTurn="player";
	$("#take_otboi").html("отбой");
	$("#take_otboi").bind("click",function(){if(cardNumberSub>0){otb=true; otboi();}});
  }
  cardNumberSub=0;
  cardNumberOn=0;
  cardsSub=new Array();
  cardsOn=new Array();
  thrownCard="";
  otb=false;
  take=false;
  determineEvent();
}