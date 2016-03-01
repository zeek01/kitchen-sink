(function(){
	document.querySelector('#menu').onmouseover = function(){
		document.querySelectorAll('input')[0].focus()
	}

	document.querySelector('#menu').onmouseout = function(){
		document.querySelectorAll('input')[0].blur()
	}

	var spritzController = null;

	var onFetchSuccessController = function(spritzText) {
		spritzController.startSpritzing(spritzText);
	};
	
	var onFetchError = function(error) {
		alert("Unable to Spritz: " + error.message);
	};
	
	var onStartSpritzClick = function(event) {
		var element = $(event.currentTarget);
		var url = "https://medium.com/mobile-growth/mobile-navigation-fb793fd05498#.r0pwdlypz"
		SpritzClient.fetchContents(url, onFetchSuccessController, onFetchError);
	};

	function showProgress(completed, total) {
		$("#wordNumber").text(completed);
		$("#wordTotal").text(total);
	}
	


// The default SpritzControler's options that could be customized:
//	
//	var spritzerOptions = {
//			"redicleWidth" : 	340,
//			"redicleHeight" : 	70,
//			"defaultSpeed" : 	250, 
//			"speedItems" : 		[250, 300, 350, 400, 450, 500, 550, 600], 
//			"controlButtons" : 	["pauseplay", "rewind", "back"],
//			"controlTitles" : {
//				"pause" : 		"Pause",
//				"play" : 		"Play",
//				"rewind" : 		"Rewind", 
//				"back" : 		"Previous Sentence"
//			}
//	};

	// Customized options
	var customOptions = {
			"redicleWidth" : 	320,									// Specify Redicle width
			"redicleHeight" : 	50,										// Specify Redicle height
			"defaultSpeed" : 	300, 									// Specify default speed
			"speedItems" : 		[100, 200, 300, 400, 500, 600], 		// Specify speed options
			"controlButtons" : 	["pauseplay"],								// Specify a single control button
			placeholderText: {
        startText: "pay attention",
        startTextColor: "#ffffff",
        endText: ""
		  },
			redicle: {
				textNormalPaintColor: "#fff",
        textHighlightPaintColor: "#cc0001", // Red ORP
        "backgroundColor": "#323132",
    		"redicleLineColor": "transparent"
    	}
	};
	


	var init = function() {
		$("#startSpritz").on("click", onStartSpritzClick);

		(function(){
			var element = $(event.currentTarget);
			var url = "https://medium.com/mobile-growth/mobile-navigation-fb793fd05498#.r0pwdlypz"
			SpritzClient.fetchContents(url, onFetchSuccessController, onFetchError);
		})()			

		// Construct a SpritzController passing the customization options
		spritzController = new SPRITZ.spritzinc.SpritzerController(customOptions);
		
		// Attach the controller's container to this page's "spritzer" container
		spritzController.attach($("#spritzer"));
		
		// Supply custom progress reporter
		spritzController.setProgressReporter(showProgress);
	};
	
	
	$(document).ready(function() {
		init();
	});

})();