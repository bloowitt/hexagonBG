window.hexagonBG = window.hexagonBG || {}
window.hexagonBG.boardDraw = (function(){
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

	return {
		drawHexagonGrid: drawHexagonGrid
	}
}) ();