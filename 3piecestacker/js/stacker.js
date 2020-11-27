var cell = []
var squareSize = 28
var currentRow = 13, currentCol = 7
var direction = "left"
var currentPosition = 0
var canPlaceBlock = true
var currentFrameRate = 7
var num_cells_left = 3
var cols, rows
var PLAYING = 0, GAME_OVER = 1
var GameState = PLAYING;
 
function setup() {
	canvas = createCanvas(320, 420) 

	//creating the grid/'cells' on the grid
	cols = floor(width / squareSize)
	rows = floor(height / squareSize)
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var position = new boardPosition(i, j)
			cell.push(position)
		}
	}

	//creating the intial cells on the bottom row
	cell[(currentRow + 1) * cols + 4].state = 1
	cell[(currentRow + 1) * cols + 5].state = 1
	cell[(currentRow + 1) * cols + 6].state = 1
}



function draw() {


	if(GameState == PLAYING){
		frameRate(currentFrameRate)
		canPlaceBlock = true // stops user from pressing down buttons when theyre not supposed to
		movePiece() //moves the blocks on the current row
	}

	//draw board positions based on their current state
	for(var i = 0; i < cell.length; i++) {
		if (i >= 0) {
			if (cell[i].state == 0)
				cell[i].makeEmpty()
			else
				cell[i].makeOccupied()
		}
		cell[i].show()
	}


	if(GameState == GAME_OVER)
	{		
		fill(0, 102, 153);
		textSize(25);
		text("   GAME OVER. \nPress 'R' to restart", width/6, height/2);
	}


}

//-----------------------------------------------------------------------------------

function movePiece() {
	currentCol = (direction == "left") ? currentCol -= 1 : currentCol += 1;
	var currentStartPosition = (cols * currentRow)+ currentCol

	 //clears the previous positions that are farther than three away from the current position simulating a moving effect
	if(direction == "left"){
		var currentEnd = (cols * currentRow) + currentCol + num_cells_left
		for(i = currentEnd; i <= (cols * currentRow) + 10; i++)
			cell[i].state = 0
	}
	else{
		currentEnd = (cols * currentRow)+ currentCol - num_cells_left
		for(i = currentEnd; i >= (cols * currentRow); i--)
			cell[i].state = 0
	}

	//change direction if on ends of row
	if(currentStartPosition == (cols * currentRow))
		direction = "right"
	else if(currentStartPosition == (cols * currentRow)+10)
		direction = "left"

	//display the current cells
	cell[currentStartPosition].state = 1;
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
}

//-----------------------------------------------------------------------------------

function placeBlock() {
	for(i = (cols * currentRow); i <=  (cols * currentRow) +11; i++ ){
		if(cell[i].state == 1){
			if(!cell[i+11].state == 1){
				num_cells_left--
				cell[i].state = 0
			}
		}
	}
	checkGameOver()
	currentRow--
	currentFrameRate += 1.5
}

function resetGame()
{
	for(i = 0; i < cell.length-12; i++)
	{
		cell[i].state = 0
	}
	currentFrameRate = 5
	num_cells_left = 3
	GameState = PLAYING
	currentRow = 13, currentCol = 7
}

function checkGameOver(){
	if(num_cells_left <= 0)
		GameState = GAME_OVER;
}
function mouseClicked() {
	placeBlock()
}
function keyPressed(key) {
	if (key.code == "Space") {
		placeBlock()
		return false
	}
	else if(key.code == "KeyR"){
		resetGame();
	}
	return true
}
