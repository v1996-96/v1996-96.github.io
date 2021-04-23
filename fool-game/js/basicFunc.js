function getrandom(min_random, max_random) {
  var range = max_random - min_random + 1;
  return Math.floor(Math.random()*range) + min_random;
}
function strrev(str) {
  return str.split("").reverse().join("");
}
function getCompTop(){
  var top=25;
  return top;
}
function getCompLeft(cardIndex){
  var blockWidth=cardNumberComp*86+(cardNumberComp-1)*10;
  if (blockWidth<960){
    var leftM = new Array();
	var startIndex=500-blockWidth/2;
	leftM[1]=startIndex;
	for (var i=2; i<=cardNumberComp; i++){
	  leftM[i]=leftM[i-1]+96;
	}
  } else {
    var leftM = new Array();
	var startIndex=10;
	var plusIndex=96-((blockWidth-980+cardNumberComp*2)/cardNumberComp);
	leftM[1]=startIndex;
	for (var i=2; i<=cardNumberComp; i++){
	  leftM[i]=leftM[i-1]+plusIndex;
	}
  }
  return leftM[cardIndex];
}
function getPlayerTop(){
  var top=420;
  return top;
}
function getPlayerLeft(cardIndex){
  var blockWidth=cardNumberPlayer*86+(cardNumberPlayer-1)*10;
  if (blockWidth<960){
    var leftM = new Array();
	var startIndex=500-blockWidth/2;
	leftM[1]=startIndex;
	for (var i=2; i<=cardNumberPlayer; i++){
	  leftM[i]=leftM[i-1]+96;
	}
  } else {
    var leftM = new Array();
	var startIndex=10;
	var plusIndex=96-((blockWidth-980+cardNumberPlayer*2)/cardNumberPlayer);
	leftM[1]=startIndex;
	for (var i=2; i<=cardNumberPlayer; i++){
	  leftM[i]=leftM[i-1]+plusIndex;
	}
  }
  return leftM[cardIndex];
}
function getSubCardTop(){
  var top=190;
  return top;
}
function getSubCardLeft(cardIndex){
  var leftM = new Array();
  var startIndex=30;
  leftM[1]=startIndex;
  for (var i=2; i<=cardNumberSub; i++){
  leftM[i]=leftM[i-1]+126;
  }
  return leftM[cardIndex];
}
function getOnCardTop(){
  var top=220;
  return top;
}
function getOnCardLeft(cardIndex){
  var leftM = new Array();
  var startIndex=60;
  leftM[1]=startIndex;
  for (var i=2; i<=cardNumberOn; i++){
  leftM[i]=leftM[i-1]+126;
  }
  return leftM[cardIndex];
}
function getDeckCardTop(cardIndex){
  if (remainingCards>1){
    var topM = new Array();
	var startIndex=190;
	topM[2]=startIndex;
	for (var i=3; i<=remainingCards; i++){
	  topM[i]=topM[i-1]+2;
	}
    return topM[cardIndex];  
  } else {return 0};  
}
function getDeckCardLeft(cardIndex){
  if (remainingCards>1){
    var leftM = new Array();
	var startIndex=850;
	leftM[2]=startIndex;
	for (var i=3; i<=remainingCards; i++){
	  leftM[i]=leftM[i-1]+2;
	}
    return leftM[cardIndex];  
  } else {return 0};  
}
function giveCard(cardId, anim){
    $(cardId).animate(anim,100,function(){
	  $(cardId).hide("clip",{},100,function(){
	    $(cardId).css("backgroundImage","url(img/"+cardId.slice(1)+".png)");
		$(cardId).show("clip",{},100);
	  });
	});
}
function changeScore(){
	score=parseInt((100*moveCount+100*compTakeCount)/(takeCount+1));
	$("#score > span").html(score);
}
function determineEvent(){
  for (var i=1; i<=cardNumberPlayer; i++){
    var bufer="#"+cardsPlayer[i];
    $(bufer).bind("mouseover",function(){
	  $(this).css('box-shadow','0 0 15px rgb(255,215,0)').css('marginTop','-10px');
	});
	$(bufer).bind("mouseout",function(){
	  $(this).css('box-shadow','').css('marginTop','');
	});
	$(bufer).bind("click",function(){
	  if(whoseTurn=='player'){thrownCard=$(this).attr("id"); throwMaked();}
	});
  }
}

function sortPlayerCards() {
if (cardNumberPlayer>1) {
var bufer1={};
var index="";
  for (var i=1; i<=cardNumberPlayer; i++) {
    var a=strrev(cardsPlayer[i]);
	if (a[0]==trump) {
	  index=cardsPlayer[i];
	  bufer1[index]=(parseInt(cardsPlayer[i])) * 10000;
	} else {
	  switch (a[0]) {
	    case "c" : 
		  index=cardsPlayer[i];
	      bufer1[index]=(parseInt(cardsPlayer[i])) * 1000; break;
		case "d" :
		  index=cardsPlayer[i];
	      bufer1[index]=(parseInt(cardsPlayer[i])) * 100; break;
		case "h" :
		  index=cardsPlayer[i];
	      bufer1[index]=(parseInt(cardsPlayer[i])) * 10; break;
		case "s" :
		  index=cardsPlayer[i];
	      bufer1[index]=(parseInt(cardsPlayer[i])) * 1; break;		
	  }
	}
  }
  for (i=cardNumberPlayer; i>1; i--) {
    for (j=i-1; j>=1; j--) {
	  var index1=cardsPlayer[i]; var index2=cardsPlayer[j];
	  if (bufer1[index1]<bufer1[index2]) {
	    var bufer=cardsPlayer[i]; cardsPlayer[i]=cardsPlayer[j]; cardsPlayer[j]=bufer;
	  }
	}
  }
}
}

function throwMaked() {
if ((!thrownCard=="") && (!otb) && (turnPossible)) {
  if (whoseTurn=="player") {
    function makeThrow() {
      for (var i=1; i<=cardNumberPlayer; i++) {
       if (cardsPlayer[i]==thrownCard) {
	     for (var j=i; j<=cardNumberPlayer-1; j++) {
	       cardsPlayer[j]=cardsPlayer[j+1];
	     }
	   }
	  }
	  cardNumberPlayer--;
    }
    if (whoseParty=="player") {
      if ((cardNumberSub==0) && (cardNumberOn==0)) {
	    makeThrow(); }
      if ((cardNumberSub>0) && (cardNumberOn>=0)) {
	    var indicator=false;
		var c=parseInt(thrownCard);
		for (var i=1; i<=cardNumberSub; i++) {
		  var a=parseInt(cardsSub[i]);
		  if (a==c) {
		    indicator=true;
			break;
		  }
		}
		if ((cardNumberOn>0) && (!(indicator))) {
		  for (i=1; i<=cardNumberOn; i++) {
		    var a=parseInt(cardsOn[i]);
			if (a==c) {
			  indicator=true;
			  break;
			}
		  }
		}
		if (indicator) {
		  makeThrow();
		} else {
		  thrownCard="";
		}
	  }
	}
	if (whoseParty=="computer") {
	  var card=cardsSub[cardNumberSub];
	  var cardRev=strrev(card);
	  var tCardRev=strrev(thrownCard);
	  if ((!(cardRev[0]==trump)) && (!(tCardRev[0]==trump))) {
	    if (cardRev[0]==tCardRev[0]) {
		  var a=parseInt(card);
		  var b=parseInt(thrownCard);
		  if (b>a) {
		    makeThrow();
		  } else {
		    thrownCard="";
		  }
		} else {
          thrownCard="";
		}		
	  }
	  if ((!(cardRev[0]==trump)) && (tCardRev[0]==trump)) {
	    makeThrow();
	  }
	  if ((cardRev[0]==trump) && (!(tCardRev[0]==trump))) {
	    thrownCard="";
	  }
	  if ((cardRev[0]==trump) && (tCardRev[0]==trump)) {
	    var a=parseInt(card);
		var b=parseInt(thrownCard);
		if (b>a) {
		  makeThrow();
		} else {
		  thrownCard="";
		}
	  }
	}
  } 
  if (whoseTurn=="computer") {
    for (i=1; i<=cardNumberComp; i++) {
	  if (cardsComp[i]==thrownCard) {
	    for (j=i; j<=cardNumberComp-1; j++) {
		  cardsComp[j]=cardsComp[j+1];
		}
	  }
	}
	cardNumberComp--;
  }
  if (!(thrownCard=="")) {
    if ((cardNumberSub==cardNumberOn) && (!(thrownCard==""))) {
	    cardNumberSub++;
	    cardsSub[cardNumberSub]=thrownCard;
		var topSub=getSubCardTop();
		var leftSub=getSubCardLeft(cardNumberSub);
		var bufer="#"+thrownCard;
		var animation={top:topSub,left:leftSub};
		$(bufer).css('box-shadow','').css('marginTop','').css("zIndex","2");
		$(bufer).animate(animation,300);
		$(bufer).css("backgroundImage","url(img/"+thrownCard+".png)");
		  if (whoseTurn=="computer"){
	        for (var i=1; i<=cardNumberComp; i++){
	          var topC=getCompTop();
		      var leftC=getCompLeft(i);
		      var bufer1="#"+cardsComp[i];
		      var animation={top:topC,left:leftC};
		      $(bufer1).animate(animation,100);
	        }
	      }
	      if (whoseTurn=="player"){
	        for (var i=1; i<=cardNumberPlayer; i++){
	          var topP=getPlayerTop();
		      var leftP=getPlayerLeft(i);
		      var bufer1="#"+cardsPlayer[i];
		      var animation={top:topP,left:leftP};
		      $(bufer1).animate(animation,100);
	        }
			$(bufer).unbind();
	      }
	  } else {
	    cardNumberOn++;
	    cardsOn[cardNumberOn]=thrownCard;
		var topOn=getOnCardTop();
		var leftOn=getOnCardLeft(cardNumberOn);
		var bufer="#"+thrownCard;
		var animation={top:topOn,left:leftOn};
		$(bufer).css('box-shadow','').css('marginTop','').css("zIndex","3");
		$(bufer).animate(animation,300);
		$(bufer).css("backgroundImage","url(img/"+thrownCard+".png)");
		  if (whoseTurn=="computer"){
	        for (var i=1; i<=cardNumberComp; i++){
	          var topC=getCompTop();
		      var leftC=getCompLeft(i);
		      var bufer1="#"+cardsComp[i];
		      var animation={top:topC,left:leftC};
		      $(bufer1).animate(animation,100);
	        }
	      }
	      if (whoseTurn=="player"){
	        for (var i=1; i<=cardNumberPlayer; i++){
	          var topP=getPlayerTop();
		      var leftP=getPlayerLeft(i);
		      var bufer1="#"+cardsPlayer[i];
		      var animation={top:topP,left:leftP};
		      $(bufer1).animate(animation,100);
	        }
			$(bufer).unbind();
	      }
	  }
  }
  // проверка конца игры div_id=congrats parent_div_id=info
  if ((remainingCards==0) && (cardNumberPlayer==0) && (cardNumberComp>0)) {
	turnPossible=false;
	sendNewPlayer(name,score);
    $("#info").html("<div id='congrats'><center>Вы выиграли!!!!<br><img src='img/win.png' height=140><br><button id='restart' style='font-size:13pt'>Новая игра</button></center></div>");
	slideUp=false;
	$("#restart").click(function(){
	  $("#info").slideUp(1500,function(){slideUp=true; $("#info").html(""); $("#game").html(""); startGame();})
	});
	$("#info").slideDown(1500);
  }
  if ((remainingCards==0) && (cardNumberPlayer>0) && (cardNumberComp==0)) {
	turnPossible=false;
    $("#info").html("<div id='congrats'><center>Вы проиграли :(<br><img src='img/lose.jpg' height=140><br><button id='restart' style='font-size:13pt'>Новая игра</button></center></div>");
	slideUp=false;
	$("#restart").click(function(){
	  $("#info").slideUp(1500,function(){slideUp=true; $("#info").html(""); $("#game").html(""); startGame();})
	});
	$("#info").slideDown(1500);
  }
  if ((remainingCards==0) && (cardNumberPlayer==0) && (cardNumberComp==0)) {
	turnPossible=false;
    $("#info").html("<div id='congrats'><center>Ничья<br><img src='img/nichia.jpg' height=140><br><button id='restart' style='font-size:13pt'>Новая игра</button></center></div>");
	slideUp=false;
	$("#restart").click(function(){
	  $("#info").slideUp(1500,function(){slideUp=true; $("#info").html(""); $("#game").html(""); startGame();})
	});
	$("#info").slideDown(1500);
  }
  if (!(thrownCard=="")) {
	if (whoseTurn=="player") {
		moveCount++;
		changeScore();
		whoseTurn="computer";
		setTimeout(function(){core();},310);
	} else {
		whoseTurn="player";
	}
  }
  thrownCard="";
 }
}

function otboi() {
if (otb) {
  function hideFieldOnCards(cardIndex){
    if(cardIndex>=1){
      var bufer="#"+cardsOn[cardIndex];
	  $(bufer).animate({left:-100},100,function(){
	    $(bufer).hide(); hideFieldOnCards(cardIndex-1);
	  });
    }
  }
  function hideFieldSubCards(cardIndex){
    if(cardIndex>=1){
	  var bufer1="#"+cardsSub[cardIndex];
	  $(bufer1).animate({left:-100},100,function(){
	    $(bufer1).hide(); hideFieldSubCards(cardIndex-1);
	  });
	}
  }
  hideFieldOnCards(cardNumberOn);
  hideFieldSubCards(cardNumberSub);
  cardNumberOn=0;
  cardNumberSub=0;
      if (whoseParty=="computer") {
	  if (!(remainingCards==0)) {
	  if (cardNumberComp<6) {
	    while ((cardNumberComp<6) && (remainingCards>0)) {
		  cardNumberComp++;
		  cardsComp[cardNumberComp]=deck[remainingCards];
		  remainingCards--;
		}
		for (var i=1; i<=cardNumberComp; i++){
		  var topC=getCompTop();
		  var leftC=getCompLeft(i);
		  var bufer1="#"+cardsComp[i];
		  var animation={top:topC,left:leftC};
		  if($(bufer1).attr("class")=="trumpCard"){$(bufer1).removeClass("trumpCard").css("backgroundImage","url(img/back.png)");}
		  $(bufer1).animate(animation,100);
		}
	  }
	  if (cardNumberPlayer<6) {
	    while ((cardNumberPlayer<6) && (remainingCards>0)) {
		  cardNumberPlayer++;
		  cardsPlayer[cardNumberPlayer]=deck[remainingCards];
		  remainingCards--;
		}
		sortPlayerCards();
		for (var i=1; i<=cardNumberPlayer; i++){
	      var topP=getPlayerTop();
		  var leftP=getPlayerLeft(i);
		  var bufer1="#"+cardsPlayer[i];
		  var animation={top:topP,left:leftP};
		  var topFirst=$(bufer1).css("top");
		  var leftFirst=$(bufer1).css("left");
		  topFirst=parseInt(topFirst);
		  leftFirst=parseInt(leftFirst);
		  if($(bufer1).attr("class")=="trumpCard"){$(bufer1).removeClass("trumpCard");}
		  if((topFirst<400)&&(leftFirst>780)){
		    giveCard(bufer1, animation);
		  } else {
		    $(bufer1).animate(animation,100);
		  }
	    }
		determineEvent();
	  }
	  }
	  whoseParty="player";
	  whoseTurn="player";
	  $("#take_otboi").html("отбой");
	  $("#take_otboi").unbind();
	  $("#take_otboi").bind("click",function(){if(cardNumberSub>0){otb=true; otboi();}});
	} else { 
	  if (!(remainingCards==0)) {
	  if (cardNumberPlayer<6) {
	    while ((cardNumberPlayer<6) && (remainingCards>0)) {
		  cardNumberPlayer++;
		  cardsPlayer[cardNumberPlayer]=deck[remainingCards];
		  remainingCards--;
		}
		sortPlayerCards();
		for (var i=1; i<=cardNumberPlayer; i++){
	      var topP=getPlayerTop();
		  var leftP=getPlayerLeft(i);
		  var bufer1="#"+cardsPlayer[i];
		  var animation={top:topP,left:leftP};
		  var topFirst=$(bufer1).css("top");
		  var leftFirst=$(bufer1).css("left");
		  topFirst=parseInt(topFirst);
		  leftFirst=parseInt(leftFirst);
		  if($(bufer1).attr("class")=="trumpCard"){$(bufer1).removeClass("trumpCard");}
		  if((topFirst<400)&&(leftFirst>780)){
		    giveCard(bufer1, animation);
		  } else {
		    $(bufer1).animate(animation,100);
		  }
	    }
		determineEvent();
	  }
	  if (cardNumberComp<6) {
	    while ((cardNumberComp<6) && (remainingCards>0)) {
		  cardNumberComp++;
		  cardsComp[cardNumberComp]=deck[remainingCards];
		  remainingCards--;
		}
		for (var i=1; i<=cardNumberComp; i++){
		  var topC=getCompTop();
		  var leftC=getCompLeft(i);
		  var bufer1="#"+cardsComp[i];
		  var animation={top:topC,left:leftC};
		  if($(bufer1).attr("class")=="trumpCard"){$(bufer1).removeClass("trumpCard").css("backgroundImage","url(img/back.png)");}
		  $(bufer1).animate(animation,100);
		}
	  } 
	  }
	  whoseParty="computer";
	  whoseTurn="computer";
	  setTimeout(function(){core();},450);
	  $("#take_otboi").html("беру");
	  $("#take_otboi").unbind();
	  $("#take_otboi").bind("click",function(){if(cardNumberSub>0){take=true; takeCards();}});
	}
 otb=false;
}
}

function takeCards() {
//dobaviti animatsiu!!!!!!!!!
  if ((take) && (whoseTurn=="player")) {
	takeCount++;
	changeScore();
    var j=1;
    for (i=cardNumberPlayer+1; i<=cardNumberSub+cardNumberPlayer; i++) {
	  cardsPlayer[i]=cardsSub[j];
	  j++;
	}
	cardNumberPlayer+=cardNumberSub;
	if (!cardNumberOn==0) {
	  j=1;
	  for (i=cardNumberPlayer+1; i<=cardNumberOn+cardNumberPlayer; i++) {
	    cardsPlayer[i]=cardsOn[j];
		j++;
	  }
	  cardNumberPlayer+=cardNumberOn;
	}
	sortPlayerCards();
	for (var i=1; i<=cardNumberPlayer; i++){
	  var topP=getPlayerTop();
	  var leftP=getPlayerLeft(i);
	  var bufer1="#"+cardsPlayer[i];
	  var animation={top:topP,left:leftP};
	  $(bufer1).css("zIndex",i);
	  $(bufer1).animate(animation,100);
	}	
	determineEvent();
	cardNumberOn=0;
	cardNumberSub=0;
	whoseParty="computer";
	whoseTurn="computer";
	$("#take_otboi").html("беру");
	$("#take_otboi").unbind();
	$("#take_otboi").bind("click",function(){if(cardNumberSub>0){take=true; takeCards();}});
	if ((cardNumberComp<6) && (remainingCards>0)) {
	    while ((cardNumberComp<6) && (remainingCards>0)) {
		  cardNumberComp++;
		  cardsComp[cardNumberComp]=deck[remainingCards];
		  remainingCards--;
		}
		for (var i=1; i<=cardNumberComp; i++){
	      var topC=getCompTop();
	      var leftC=getCompLeft(i);
	      var bufer1="#"+cardsComp[i];
	      var animation={top:topC,left:leftC};
		  if($(bufer1).attr("class")=="trumpCard"){$(bufer1).removeClass("trumpCard").css("backgroundImage","url(img/back.png)");}
	      $(bufer1).animate(animation,100);
	    }
	}
	core();
  } else {
  if ((take) && (whoseTurn=="computer")) {
	if(turnPossible){
		compTakeCount++;
		changeScore();
	}
    var j=1;
	for (i=cardNumberComp+1; i<=cardNumberSub+cardNumberComp; i++) {
	  cardsComp[i]=cardsSub[j];
	  j++;
	}
	cardNumberComp+=cardNumberSub;
	if (cardNumberOn>0) {
	  j=1;
	  for (i=cardNumberComp+1; i<=cardNumberOn+cardNumberComp; i++) {
	    cardsComp[i]=cardsOn[j];
		j++;
	  }
	  cardNumberComp+=cardNumberOn;
	}
	for (var i=1; i<=cardNumberComp; i++){
	  var topC=getCompTop();
	  var leftC=getCompLeft(i);
	  var bufer1="#"+cardsComp[i];
	  var animation={top:topC,left:leftC};
	  $(bufer1).css("backgroundImage","url(img/back.png)").css("zIndex",i);
	  $(bufer1).animate(animation,100);
	}
	cardNumberSub=0;
	cardNumberOn=0;
	whoseParty="player";
	whoseTurn="player";
	$("#take_otboi").html("отбой");
	$("#take_otboi").unbind();
	$("#take_otboi").bind("click",function(){if(cardNumberSub>0){otb=true; otboi();}});
	if ((cardNumberPlayer<6) && (remainingCards>0)) {
	    while ((cardNumberPlayer<6) && (remainingCards>0)) {
		  cardNumberPlayer++;
		  cardsPlayer[cardNumberPlayer]=deck[remainingCards];
		  remainingCards--;
		}
		sortPlayerCards();
		for (var i=1; i<=cardNumberPlayer; i++){
	      var topP=getPlayerTop();
		  var leftP=getPlayerLeft(i);
		  var bufer1="#"+cardsPlayer[i];
		  var animation={top:topP,left:leftP};
		  var topFirst=$(bufer1).css("top");
		  var leftFirst=$(bufer1).css("left");
		  topFirst=parseInt(topFirst);
		  leftFirst=parseInt(leftFirst);
		  if($(bufer1).attr("class")=="trumpCard"){$(bufer1).removeClass("trumpCard");}
		  if((topFirst<400)&&(leftFirst>780)){
		    giveCard(bufer1, animation);
		  } else {
		    $(bufer1).animate(animation,100);
		  }
	    }
		determineEvent();		
	}
  } 
  }
  take=false;
}