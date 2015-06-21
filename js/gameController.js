window.hexagonBG = window.hexagonBG || {}
window.hexagonBG.gameController = (function( element ){
	// Page setup for gameController

	// game graphics holder
	var $element= $("#mainGameDiv");
	var $canvas = $("<canvas class='gameCanvas'></canvas>")[0];
	var ctx 	= $canvas.getContext("2d");
	$element.append($canvas);
	var canvasWidth = 0;
	var canvasHeight =  0;

	// When the window is resized, recalculate size
	$(window).on("resize", function(event){
		hexagonBG.gameController.recalcCanvasSize();
		hexagonBG.gameController.recalcHexSizes();
		hexagonBG.gameController.redraw();
	});

	// Listen for events
	$(window).on("keydown", function(event){
		switch (event.key){
			case "Down":
				hexagonBG.gameController.panDown();
				break;
			case "Up":
				hexagonBG.gameController.panUp();
				break;
			case "Left":
				hexagonBG.gameController.panLeft();
				break;
			case "Right":
				hexagonBG.gameController.panRight();
				break;
		}
	});

	// Game constants
	var ASPECTRATIO = 16/9;
	var MINHEXCOLUMNS = 10;
	var MAXHEXCOLUMNS = 20;
	var FRAMESIZE = 10;
	
	// Game status
	var curColumns = 20;
 	var A, B, C, curHexSize;
 	var boardSize = 100;
 	var viewCenterX = Math.floor(boardSize/2);
 	var viewCenterY = Math.floor(boardSize/2);

	// Public methods
	var recalcCanvasSize = function(){
		var windowWidth 	= window.innerWidth 	- (2*FRAMESIZE)
		var windowHeight 	= window.innerHeight 	- (2*FRAMESIZE)
		var curAspectRatio 	= windowWidth / windowHeight;
		if (curAspectRatio >= ASPECTRATIO){
			canvasHeight = windowHeight;
			canvasWidth = canvasHeight * ASPECTRATIO;
		} else {
			canvasWidth = windowWidth;
			canvasHeight = canvasWidth / ASPECTRATIO;
		}
		$canvas.width = canvasWidth;
		$canvas.height = canvasHeight;
	}

	var recalcHexSizes = function(){
		// 1.5 seems to be the magic number that makes this work correctly
		C = $canvas.width / (curColumns*1.5)
		A = C*0.5;
		B = C*Math.sin((2*Math.PI) / 6);
	}

	var panLeft = function(){
		if (viewCenterX - curColumns/2 > 0){
			viewCenterX = viewCenterX -1;
		} else {
			// TODO show pan limit

		}
		redraw();
	}

	var panRight = function(){
		if (viewCenterX + curColumns/2 < boardSize){
			viewCenterX = viewCenterX +1;
		} else {
			// TODO show pan limit

		}
		redraw();
	}

	var panUp = function(){
		if (viewCenterY - (curColumns/(ASPECTRATIO*2)) > 0){
			viewCenterY = viewCenterY -1;
		} else {
			// TODO show pan limit

		}
		redraw();
	}

	var panDown = function(){
	if (viewCenterY + (curColumns/(2*ASPECTRATIO)) < boardSize){
			viewCenterY = viewCenterY +1;
		} else {
			// TODO show pan limit

		}
		redraw();
	}

	var zoom = function(zoomIn){

	}
	// Force this on load
	recalcCanvasSize();
	recalcHexSizes();

	// "Private" methods
	var redraw = function() {
		console.log(viewCenterX + "," + viewCenterY)
		// Preparation		
		ctx.save();
		
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgb(255,255,255)";
		ctx.fillStyle = "rgb(255,255,255)";

		// Clear the screen (should replace with dirtyRects sometime TODO)
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		hexagonBG.boardDraw.drawHexagonGrid(ctx,canvasWidth,canvasHeight,A,B,C);
			

		// Draw game elements

		// Cleanup and setup next frame
		ctx.restore();
	}


	

	requestAnimationFrame (redraw);

	return {
		recalcCanvasSize: recalcCanvasSize,
		recalcHexSizes: recalcHexSizes,
		redraw: redraw,
		panLeft: panLeft,
		panRight: panRight,
		panUp: panUp,
		panDown: panDown
	};
}) ();
