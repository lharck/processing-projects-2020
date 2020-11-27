var cell = []
var squareSize = 28
var currentRow = 13, currentCol = 5
var numOf
var direction = "left"
var currentPosition
var canPlaceBlock = true
var currentFrameRate = 3

var cols, rows

function setup() {
	canvas = createCanvas(260, 420) //creates html canvas element

	cols = floor(width / squareSize)
	rows = floor(height / squareSize)
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var position = new boardPosition(i, j)
			cell.push(position)
		}
	}
	cell[(currentRow + 1) * cols + 3].state = 1
	cell[(currentRow + 1) * cols + 4].state = 1
	cell[(currentRow + 1) * cols + 5].state = 1
}



function draw() {
	frameRate(currentFrameRate) // 1 FPS
	canPlaceBlock = true
	movePiece()

	//draw board positions
	for (var i = 0; i < cell.length; i++) {
		if (i >= 0) {
			if (cell[i].state == 0)
				cell[i].makeEmpty()
			else if (cell[i].state == 3)
				cell[i].test()
			else
				cell[i].makeOccupied()
		}
		cell[i].show()
	}
}

//-----------------------------------------------------------------------------------

function movePiece() {
	currentCol = (direction == "left") ? currentCol -= 1 : currentCol += 1;

	var currentPositions = getCurrentPositions()

	for (var i = 0; i <= currentPositions.length - 1; i++) {
		var previousPosition;
		var onEnd = currentPositions[i] == (cols * currentRow) + 8 || currentPositions[0] == (cols * currentRow);

		if (currentPositions[i] == (cols * currentRow) + 8) {
			direction = "left"
			previousPosition = currentPositions[i] - 1
		}
		else if (currentPositions[i] == (cols * currentRow)) {
			direction = "right"
			previousPosition = currentPositions[i] + 1
		}
		if (direction == "left" && !onEnd)
			previousPosition = currentPositions[i] + 1
		else if (direction == "right" && !onEnd)
			previousPosition = currentPositions[i] - 1

		print(previousPosition)
		cell[previousPosition].state = 0;
		cell[currentPositions[i]].state = 1;


		currentPosition = currentPositions[i]

	}
}

function getCurrentPositions() {
	indexes = []

	for (var i = 0; i <= 2; i++) {
			indexes.push((cols * currentRow) + currentCol)
	}
	return indexes
}


//-----------------------------------------------------------------------------------

//class for the board positions
function boardPosition(i, j) {
	this.state = 0
	var fillRect = 50

	this.show = function () {
		var x = i * squareSize
		var y = j * squareSize
		stroke(50)
		fill(fillRect)
		var rectangle = rect(x, y, squareSize, squareSize)
	}

	this.makeOccupied = function () {
		fillRect = color(96, 157, 255)
	}

	this.makeEmpty = function () {
		fillRect = 60
	}

	this.test = function () {
		fillRect = 0
	}
}

//-----------------------------------------------------------------------------------

function placeBlock() {
	if (canPlaceBlock) {
		canPlaceBlock = false
		if (cell[currentPosition + 9].state != undefined) {
			if (cell[currentPosition + 9].state == 1) {
				currentRow--
				currentFrameRate = currentFrameRate + .8
			}
		}
	}
}
function mouseClicked() {
	placeBlock()
}

function keyPressed(key) {
	if (key.code == "Space") {
		placeBlock()
		return false
	}
	return true
}