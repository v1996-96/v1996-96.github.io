jQuery.preloadImages = function (){
	var images = (typeof arguments[0] == 'object') ? arguments[0] : arguments;
	for (var i = 0; i < images.length; i++) {
		jQuery("<img>").attr("src",images[i]);
	}
}
$(document).ready(function(){
	getLeaderSheetD();
	var turnPossible=true;
	var score=0;
	var moveCount=0;
	var takeCount=0;
	var compTakeCount=0;
	$.preloadImages("img/6c.png","img/7c.png","img/8c.png","img/9c.png","img/10c.png","img/11c.png","img/12c.png","img/13c.png","img/14c.png","img/6d.png","img/7d.png","img/8d.png","img/9d.png","img/10d.png","img/11d.png","img/12d.png","img/13d.png","img/14d.png","img/6h.png","img/7h.png","img/8h.png","img/9h.png","img/10h.png","img/11h.png","img/12h.png","img/13h.png","img/14h.png","img/6s.png","img/7s.png","img/8s.png","img/9s.png","img/10s.png","img/11s.png","img/12s.png","img/13s.png","img/14s.png","img/back.png","img/darkness.png","img/background1.png","img/background2.png","img/background3.png","img/background4.png","img/background5.png","img/background6.png","img/load.gif");
	slideUp=false;
	$("#info").html("<div id='hello'>Добро пожаловать<br><br><p>Введите Ваше имя: <input type=text id='name' maxlength='14'></p><br><button id='startGame' style='font-size : 14pt;'>Начать игру</button></div>");
	$("#startGame").click(function(){
		slide="hello";
		name=$("#name").val();
		$("#info").slideUp(1500,function(){slideUp=true; startGame(); dalagateEvent(); $("#info").html("");});
	});
	function changeBack(){
		slide="changeBack"; 
		$("#info").html("<div id='changeBackWindow'><center>Выберите фон игрового стола<br><table cellspacing=10><tr><td id='back1' class='backSelect' style='background:url(img/background1.png);'></td><td id='back2' class='backSelect' style='background:url(img/background2.png);'> </td><td id='back3' class='backSelect' style='background:url(img/background3.png);'> </td></tr><tr><td id='back4' class='backSelect' style='background:url(img/background4.png);'> </td><td id='back5' class='backSelect' style='background:url(img/background5.png);'> </td><td id='back6' class='backSelect' style='background:url(img/background6.png);'> </td></tr></table>Выберите фон страницы<br><input id='backColor' type='color' value='#00ffff' width=15 height=15><button id='colorConfirm'>Подтвердить</button></center></div>");
		$("#info").slideDown(1500,function(){slideUp=false;});
	}
	function changeName(){
		slide="changeName"; 
		$("#info").html("<div id='changeNameWindow'><center>Введите Ваше имя<br><br><input maxlength='14' id='newName' type='text' value="+name+"><br><br><button id='newNameConf'style='font-size : 13pt;'>Подтвердить</button></center></div>");
		$("#info").slideDown(1500,function(){slideUp=false;});
	}
	function leaderSheet(){
		slide="leaderSheet";
		getLeaderSheetD();
		$("#info").html("<div id='leaders'><center>Таблица лидеров<div id='loader'><img src='img/load.gif'><br>Загрузка...</div></center></div>");
		$.ajax({complete:function(){
				setTimeout(function(){
				$("#loader").css("display","none");
				$("#leaders > center").append(leaderSheetD);
				$("#leaders table").css("width","230px").css("border-collapse","collapse");
				$("#leaders table th,#leaders table td").css("border","none");	
				$("#leaders table th").css("color","#fff").css("background-color","#ff8800");
				$("#leaders table tr:nth-of-type(even)").css("background-color","#f3f3f3");
				$("#leaders table tr:nth-of-type(odd)").css("background-color","#ddd");
				$("#leaders table td:last-child").css("text-align","left").css("font-weight","bolder");
				$("#leaders table td:first-child,#leaders table th:first-child").css("text-align","right");
				$("#leaders table td:nth-child(2)").css("text-align","center");},30);
			}
		});
		$("#info").slideDown(1500,function(){slideUp=false;});
	}
	function author(){
		slide="author"; 
		$("#info").html("<div id='authorWindow'><center><i>Подкидной Дурак  Версия: 2.5</i><br>Автор игры: Трушин Виктор<br>email: v1996-96@mail.ru<br>2013год</center></div>");
		$("#info").slideDown(1500,function(){slideUp=false;});
	}
	function dalagateEvent(){
		$("#new").click(function(){
			$("#game").html("");
			startGame();
		});
		$("#changeBack").click(function(){
			if((!(slide=="changeBack")) && (slideUp==false)){
				$("#info").slideUp(1500,function(){
					slideUp=true; 
					changeBack();
				});
			} else {
				if((slide=="changeBack") && (slideUp==false)){
					slideUp=true;
					$("#info").slideUp(1500,function(){$("#info").html("");})
				} else {
					if(slideUp){
						slideUp=false;
						changeBack();
					}
				}
			}
		});
		$("#changeName").click(function(){
			if((!(slide=="changeName")) && (slideUp==false)){
				$("#info").slideUp(1500,function(){
					slideUp=true; 
					changeName();
				});
			} else {
				if((slide=="changeName") && (slideUp==false)){
					slideUp=true;
					$("#info").slideUp(1500,function(){$("#info").html("");})
				} else {
					if(slideUp){
						slideUp=false;
						changeName();
					}
				}
			}
		});
		$("#leaderSheet").click(function(){
			if((!(slide=="leaderSheet")) && (slideUp==false)){
				$("#info").slideUp(1500,function(){
					slideUp=true; 
					leaderSheet();
				});
			} else {
				if((slide=="leaderSheet") && (slideUp==false)){
					slideUp=true;
					$("#info").slideUp(1500,function(){$("#info").html("");})
				} else {
					if(slideUp){
						slideUp=false;
						leaderSheet();
					}
				}
			}			
		});
		$("#author").click(function(){
			if((!(slide=="author")) && (slideUp==false)){
				$("#info").slideUp(1500,function(){
					slideUp=true; 
					author();
				});
			} else {
				if((slide=="author") && (slideUp==false)){
					slideUp=true;
					$("#info").slideUp(1500,function(){$("#info").html("");})
				} else {
					if(slideUp){
						slideUp=false;
						author();
					}
				}
			}
		});
		
		$("#back1").live("click",function(){
		$("#game").css("background","url(img/background1.png)"); 
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
		$("#back2").live("click",function(){
		$("#game").css("background","url(img/background2.png)"); 
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
		$("#back3").live("click",function(){
		$("#game").css("background","url(img/background3.png)"); 
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
		$("#back4").live("click",function(){
		$("#game").css("background","url(img/background4.png)"); 
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
		$("#back5").live("click",function(){
		$("#game").css("background","url(img/background5.png)"); 
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
		$("#back6").live("click",function(){
		$("#game").css("background","url(img/background6.png)"); 
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
		$("#colorConfirm").live("click",function(){
		var color=$("#backColor").val();
		$("body").css("background",color);
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
				$("#newNameConf").live("click",function(){
		name=$("#newName").val();
		if (!(name=="")){
			$("#playerName").html("Добро пожаловать, "+name+"!");
		} else {
			$("#playerName").html("Добро пожаловать!");
		}
		$("#info").slideUp(1500,function(){$("#info").html("")});
		slideUp=true;});
	}
});