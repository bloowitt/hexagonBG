window.gameController = (function( element ){
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
		gameController.recalcCanvasSize();
		gameController.recalcHexSizes();
	});

	// Game constants
	var ASPECTRATIO = 16/9;
	var MINHEXCOLUMNS = 10;
	var MAXHEXCOLUMNS = 20;
	var FRAMESIZE = 10;
	
	// Game status
	var curColumns = 20;
 	var A, B, C, curHexSize;

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
		C = $canvas.width / (curColumns+1)
		A = C*0.5;
		B = C*Math.sin((2*Math.PI) / 6);
	}

	// Force this on load
	recalcCanvasSize();
	recalcHexSizes();

	// "Private" methods
	var redraw = function() {
		// Preparation		
		ctx.save();
		// Clear the screen (should replace with dirtyRects sometime TODO)
		ctx.clearRect(0,0,canvasWidth,canvasHeight);

		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgb(255,255,255)";
		ctx.fillStyle = "rgb(255,255,255)";

		// Draw hexagons
		drawHexagonGrid(ctx,canvasWidth,canvasHeight,A,B,C);
		
		// Cleanup and setup next frame
		ctx.restore();
		requestAnimationFrame(redraw);
	}


	var drawHexagonGrid = function(canvasContext,width,height,A,B,C){
		// For 16/9 with an hexagon dead-center, this is correct
		var centerX = width/2;
		var centerY = height/2;
		var curDisplacementX = 0;
		var curDisplacementY = 0
		while (centerX-curDisplacementX >= 0){
			drawHexagonColumn(canvasContext,centerX+curDisplacementX,centerY+curDisplacementY, height, A, B, C);
			drawHexagonColumn(canvasContext,centerX-curDisplacementX,centerY+curDisplacementY, height, A, B, C);
			curDisplacementX = curDisplacementX +  C + A;
			if (curDisplacementY > 0){
				curDisplacementY = 0;
			} else {
				curDisplacementY = B;
			}
		}
	}

	var drawHexagonColumn = function(canvasContext, X, firstY, height, A, B, C){
		var numHexes = Math.ceil(height / (2*B))+1;
		for (var i = 0; i<=numHexes/2; i++){
			drawHexagon(canvasContext, X, firstY+i*2*B, A, B, C);
			drawHexagon(canvasContext, X, firstY-i*2*B, A, B, C);
		}

	}

	var drawHexagon = function(canvasContext,centerX,centerY, A,B,C){
		canvasContext.beginPath();
		canvasContext.moveTo(centerX-C, centerY);
		canvasContext.lineTo(centerX-A, centerY+B);
		canvasContext.lineTo(centerX+A, centerY+B);
		canvasContext.lineTo(centerX+C, centerY);
		canvasContext.lineTo(centerX+A, centerY-B);
		canvasContext.lineTo(centerX-A, centerY-B);
		canvasContext.lineTo(centerX-C, centerY);
		canvasContext.stroke();
	}

	requestAnimationFrame (redraw);

	return {
		recalcCanvasSize: recalcCanvasSize,
		recalcHexSizes: recalcHexSizes
	};
}) ();
