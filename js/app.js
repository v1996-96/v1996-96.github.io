/* -------------------------------------------------------------

	(c) Copyright 2015 Trushin Victor. All rights reserved.

------------------------------------------------------------- */

var App = {
	initMainPage : function(){
		this.MainPage_slider.init();
	},

	initSingleProject : function( galleryJSON ){
		this.SingleProject_Gallery.init( galleryJSON );
		this.SingleProject_Top();
	},

	/* ----------------- Main Page --------------------*/

	MainPage_slider : {
		init : function(){
			this.prepareSections();
			this.activateLinks();
			this.activateScroll();
			if( this.checkWindowSize() ){
				$("body").css("overflow", "hidden");
			} else {
				$("body").css("overflow", "visible");
			}
			this.onWindowResize();
		},

		sections : [],

		current : "",

		animation : false,

		freeze : 400,

		touchStart : 0,

		prepareSections : function(){
			var o = this;
			$("html, body").animate({scrollTop: top}, 20);

			$("body > section").each(function(n, el){
				if( $(el).attr("id") != "" && $(el).attr("id") != undefined ){
					o.sections.push( "#" + $(el).attr("id") );
				} else {
					$(el).attr("id", "section" + n);
					o.sections.push( "#section" + n );
				}
			});

			for (var i = 0; i < o.sections.length-1; i++) {
				$(o.sections[i]).find(".arr").attr("href", o.sections[i+1]);
			}

			this.current = this.sections[0];
		},

		activateLinks : function(){
			var o = this;
			$("a.arr[href^='#']").on("click", function( e ){
				e.preventDefault();
				var element = $(this).attr("href");
				var offset = $( element ).offset();
				var top = offset.top;

				if( $.inArray(element, o.sections) >= 0 && !o.animation ){
					o.animation = true;
					$("html, body").animate({scrollTop: top}, 300, function(){ 
						setTimeout(function(){ o.animation = false; }, o.freeze); 
						o.current = element; 
					});
				}
			});
		},

		activateScroll : function(){
			var o = this;
			$(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
				if(o.checkWindowSize()){
					event.preventDefault();
					var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
					if (delta < 0) {
						o.moveDown();
			        } else {
						o.moveUp();
			        }
				}
		    });

		    $(document).on('keyup', function(e){
		    	if(o.checkWindowSize()){
		    		if(e.keyCode == 38) o.moveUp();
		    		if(e.keyCode == 40) o.moveDown();
		    	}
		    });

		    $(document).on('touchstart', function(e){
		    	if(o.checkWindowSize()){
			    	o.touchstart = e.originalEvent.touches[0].pageX;
			    }
		    });
		    $(document).on('touchend', function(e){
		    	if(o.checkWindowSize()){
			    	var delta = e.originalEvent.changedTouches[0].pageX - o.touchstart;
			    	if (delta > 3) {
						o.moveDown();
			        } 
			        if (delta < -3) {
						o.moveUp();
			        }
			    }
		    });
		},

		moveDown : function(){
			var o = this;
			var currID = $.inArray(this.current, this.sections);
			if(currID+1 < this.sections.length && !this.animation){
				var top = $(this.sections[currID+1]).offset().top;
				this.animation = true;
				$("html, body").animate({scrollTop: top}, 300, function(){ 
					setTimeout(function(){ o.animation = false; }, o.freeze); 
					o.current = o.sections[currID+1]; 
				});
			}
		},

		moveUp : function(){
			var o = this;
			var currID = $.inArray(this.current, this.sections);
			if(currID-1 >= 0 && !this.animation){
				var top = $(this.sections[currID-1]).offset().top;
				this.animation = true;
				$("html, body").animate({scrollTop: top}, 300, function(){ 
					setTimeout(function(){ o.animation = false; }, o.freeze); 
					o.current = o.sections[currID-1]; 
				});
			}
		},

		checkWindowSize : function(){
			var wHeight = $(window).outerHeight(true);
			var wWidth = $(window).outerWidth(true);

			if(wHeight <= 1000 && wHeight >= 560 && wWidth > 800){
				return true;
			} else {
				return false;
			}
		},

		onWindowResize : function(){
			var o = this;
			$(window).on("resize", function(){
				if( o.checkWindowSize() ){
					$("body").css("overflow", "hidden");
				} else {
					$("body").css("overflow", "visible");
				}
			});
		}
	},

	MainPage_animation : function(){
		if( $("#top").hasClass("animated") ){
			$("#top .case").addClass("new");
			setTimeout(function(){
				$("#top h1 span").addClass("new");
				setTimeout(function(){ $("#top h2 span").addClass("new"); }, 300);
			}, 300);
		}
	},

	/* --------------- Single Project -----------------*/

	SingleProject_Gallery : {
		init : function( galleryJSON ){
			this.loadImages( galleryJSON );
		},

		loadImages : function( galleryJSON ){
			var o = this;
			var data = JSON.parse( galleryJSON );
			console.log(data);
			var img = [];
			for(var i = 0; i < data.length; i++)
			{
				img[i] = {};
				img[i] = new Image();
				img[i].src = data[i]["img_url"];
				img[i].onload = function(){
					if($("#g_loading")) $("#g_loading").remove();
					$("#wookmark").append('<a class="gallery_group" href="'+this.src+'"><img src="'+this.src+'" /></a>');
					$('#wookmark').wookmark();
					o.openEvent();
				}
			}
		},

		openEvent : function(){
			$("a.gallery_group").unbind("click").on("click", function(e){
				e.preventDefault();
				var img_url = $(this).attr("href");

				var img = new Image();
				img.src = img_url;
				img.onload = function(){
					$("#modal img").attr("src", img.src);
					$("#modal").modal();
				}
			});
		}
	},

	SingleProject_Top : function(){
		var el = $("#photo");
		var img = new Image();
		img.src = $(el).attr("data-src");
		img.onload = function(){
			$(el).fadeOut(200, function(){
				$(el).css("background-image", "url("+img.src+")");
				$(el).children("#top_loading").remove();
				$(el).fadeIn(200);
			});
		}
	}


}