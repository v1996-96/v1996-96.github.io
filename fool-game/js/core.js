function core(){
if ((whoseParty=="player") && (whoseTurn=="computer")) {
  var numberCardsCanThrow=0;
  var cardMustBeThrowed=cardsSub[cardNumberSub];
  var cardsCanThrow = new Array();
  var bufer3={};
  var a=strrev(cardMustBeThrowed);
  if (!cardNumberComp==0) {
    for (var i=1; i<=cardNumberComp; i++) {
	  var b=strrev(cardsComp[i]);
	  if ((a[0]==b[0]) && (!(b[0]==trump))) {
	    var c=parseInt(cardMustBeThrowed);
		var d=parseInt(cardsComp[i]);
		if (d>c) {
		  numberCardsCanThrow++;
		  cardsCanThrow[numberCardsCanThrow]=cardsComp[i];
		}
	  } 
	  if ((!(a[0]==trump)) && (b[0]==trump)) {
	    numberCardsCanThrow++;
	    cardsCanThrow[numberCardsCanThrow]=cardsComp[i];
	  }
	  if ((a[0]==trump) && (b[0]==trump)) {
	    c=parseInt(cardMustBeThrowed);
		d=parseInt(cardsComp[i]);
		if (d>c) {
		  numberCardsCanThrow++;
		  cardsCanThrow[numberCardsCanThrow]=cardsComp[i];
		}
	  }
	}
	if (numberCardsCanThrow>=1) {
	  for (i=1; i<=numberCardsCanThrow; i++) {
	    a=strrev(cardsCanThrow[i]);
		if (a[0]==trump) {
	      var index=cardsCanThrow[i];
	      bufer3[index]=(parseInt(cardsCanThrow[i])) * 10;
	    } else {
		  var index=cardsCanThrow[i];
	      bufer3[index]=(parseInt(cardsCanThrow[i]));
	    }
	  }
	  var min=cardsCanThrow[1];
	  for (i=1; i<=numberCardsCanThrow; i++) {
	    var index=cardsCanThrow[i];
	    if (bufer3[index]<bufer3[min]) {
		  min=cardsCanThrow[i];
		}
	  }
	  thrownCard=min;
	  throwMaked();
	} else {
	  take=true;
	  takeCards();
	}
  }
}
//esli partia computera
if ((whoseParty=="computer") && (whoseTurn=="computer")) {
//esli pervii hod
var bufer4={};
  if ((cardNumberComp>1) && (cardNumberSub==0)) { 
    for (i=1; i<=cardNumberComp; i++) {
	  var a=strrev(cardsComp[i]);
	  if (a[0]==trump){
	    var index=cardsComp[i];
		bufer4[index]=(parseInt(cardsComp[i]))*10;
	  } else {
	    index=cardsComp[i];
		bufer4[index]=parseInt(cardsComp[i]);
		}
	}
	var min=cardsComp[1];
    for (i=2; i<=cardNumberComp; i++) {
	  index=cardsComp[i];
      if (bufer4[index]<bufer4[min]) {
	    min=cardsComp[i];
	  }
	}
    thrownCard=min;
	throwMaked();
  } else {
  if ((cardNumberComp==1) && (cardNumberSub==0)) {
    thrownCard=cardsComp[1];
	throwMaked();
  }
//esli ne pervii hod
  if ((cardNumberComp>=1) && (cardNumberSub>0) && (cardNumberOn>0)) {
	var number=0;
	var bufer6=new Array();
	for (i=1; i<=cardNumberSub; i++) {
	  number++;
	  bufer6[number]=parseInt(cardsSub[i]);
	}
	for (i=1; i<=cardNumberOn; i++) {
	  number++;
	  bufer6[number]=parseInt(cardsOn[i]);
	}
//izbavitisea ot odinakovih kart v massive cardsOnDesk
    var ind=new Array();
	var cardsOnDesk=new Array();
    for (i=6; i<=14; i++) {
	  ind[i]=0;
	}
	var numberCardsOnDesk=0;
	for (i=1; i<=number; i++) {
	  var index=bufer6[i];
	  if (ind[index]==0) {
	    numberCardsOnDesk++;
		cardsOnDesk[numberCardsOnDesk]=bufer6[i];
		ind[index]=1;
	  }
	}
//proveriaem mojet li podkinuti comp
	var numberCardsCanBeThrowed=0;
	var cardsCanBeThrowed=new Array();
	for (i=1; i<=cardNumberComp; i++) {
	  var a=parseInt(cardsComp[i]);
	  for (j=1; j<=numberCardsOnDesk; j++) {
		var b=parseInt(cardsOnDesk[j]);
		if (a==b) {
		  numberCardsCanBeThrowed++;
		  cardsCanBeThrowed[numberCardsCanBeThrowed]=cardsComp[i];
		}
	  }
	}
  if (numberCardsCanBeThrowed>1) {
    var bufer5={};  
	for (i=1; i<=numberCardsCanBeThrowed; i++) {
	  var a=strrev(cardsCanBeThrowed[i]);
	  if (a[0]==trump) {
	    var index=cardsCanBeThrowed[i];
		bufer5[index]=(parseInt(cardsCanBeThrowed[i])) * 10;
	  } else {
	    var index=cardsCanBeThrowed[i];
		bufer5[index]=parseInt(cardsCanBeThrowed[i]);
	  }
	}
	var min=cardsCanBeThrowed[1];
	for (i=2; i<=numberCardsCanBeThrowed; i++) {
	  index=cardsCanBeThrowed[i];
	  if (bufer5[index]<bufer5[min]) {
	    min=cardsCanBeThrowed[i];
	  }
	}
	thrownCard=min;
	throwMaked();
  }
  if (numberCardsCanBeThrowed==1) {
    thrownCard=cardsCanBeThrowed[1];
	throwMaked();
  }
  if (numberCardsCanBeThrowed==0) {
    otb=true;
	setTimeout(function(){otboi();},320);
  }
  }  
  }
}
}