var data= {};
var squareSize = 80;
var nutri_map = [];
var light_map = [];
var meat_map = [];
var o2_map = [];
var co2_map = [];
var mapWidth;
var mapHeight;
var mapClicked = [];
var cells = [];
var cellsClicked = [];
var selectCellColor = 'None';
var selectMapType = 'Nutri';
var cellSize = 40;


function preload() {
	var url = 'https://raw.githubusercontent.com/p4vz/test/master/data.json'
	data = loadJSON(url);


}

function setup() {
    readData()
    background(250);
	createCanvas(squareSize*mapWidth+1000, squareSize*mapHeight+1);
	UI();

}

function draw() {
	drawBoard();
	drawCells()

}


function helloWorld(){
    console.log("hello world");
    document.getElementById('world').innerHTML = 'Hello world';
}


function readData(){
    nutri_map = data[0].nutri_map;
    mapWidth = nutri_map.length;
    mapHeight = nutri_map[1].length; 
    cells = data[1];
}


function drawBoard() {
	//background(255);
	if (selectMapType == 'Nutri'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (nutri_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize, j*squareSize, squareSize, squareSize);
			}
		}
	}	
	if (selectMapType == 'Light'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (light_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize, j*squareSize, squareSize, squareSize);
			}
		}
	}
	if (selectMapType == 'Meat'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (meat_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize, j*squareSize, squareSize, squareSize);
			}
		}
	}
	if (selectMapType == 'O2'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (o2_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize, j*squareSize, squareSize, squareSize);
			}
		}
	}
	if (selectMapType == 'CO2'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (co2_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize, j*squareSize, squareSize, squareSize);
			}
		}
	}
	//draw selected cell
	if (mapClicked != []) {
		noFill();
		stroke(250,180,25);
		strokeWeight(2);
		rect(mapClicked[0]*squareSize, mapClicked[1]*squareSize, squareSize, squareSize);
		strokeWeight(1);
	}
}
function drawCells(){
	for (let i = 0 ; i < cells.length; i++){
		stroke(0);
		size = cells[i].size;
		if (selectCellColor == "None"){
			cellColor = color(50);
		}
		if (selectCellColor == "Hunger Based"){
			cellColor = color(cells[i].food*200, 0, 0);
		}
		if (selectCellColor == "Food Preference Based"){
			cellColor = color(cells[i].nutridigest*200, cells[i].lightdigest*200, cells[i].meatdigest*200);
		}
		x = cells[i].coordx+cells[i].relx;
		y = cells[i].coordy+cells[i].rely;
		fill(cellColor)
		ellipse(x*squareSize, y*squareSize, size*cellSize, size*cellSize);
	}

	for (let i = 0; i < cellsClicked.length; i++){
		noFill();
		stroke(250,180,25);
		strokeWeight(2);
		x = cellsClicked[i].coordx+cellsClicked[i].relx;
		y = cellsClicked[i].coordy+cellsClicked[i].rely;
		size = cellsClicked[i].size;
		ellipse(x*squareSize, y*squareSize, size*cellSize, size*cellSize)

	}
	strokeWeight(1);
}

function UI () {
	selectCellColorSelect = createSelect();
	text('Cell coloring:', 900, 20)
    selectCellColorSelect.position(1000, 10);
    selectCellColorSelect.option('None');
    selectCellColorSelect.option('Hunger Based');
    selectCellColorSelect.option('Food Preference Based');
    selectCellColorSelect.changed(selectCellColorEvent);

    selectMapTypeSelect = createSelect();
    text('Map coloring:', 900, 78)
    selectMapTypeSelect.position(1000, 60);
    selectMapTypeSelect.option('Nutri');
    selectMapTypeSelect.option('Light');
    selectMapTypeSelect.option('Meat');
    selectMapTypeSelect.option('O2');
    selectMapTypeSelect.option('CO2');
    selectMapTypeSelect.changed(selectMapTypeEvent);


}

function selectCellColorEvent() {
	selectCellColor = selectCellColorSelect.value();
}

function selectMapTypeEvent() {
	selectMapType = 'Nutri'
	}

function mouseClicked() {
	cellsClicked = [];
	//check if a cell was selected
	for (let i = 0 ; i < cells.length; i++){
		let d = dist(mouseX, mouseY, (cells[i].coordx+cells[i].relx)*squareSize, (cells[i].coordy+cells[i].rely)*squareSize)
		if (d < cells[i].size*cellSize) {
			cellsClicked.push(cells[i]) //add cell to array of selected cells 
		}
	}
	//check to see if a map was clicked
	mapClicked = [];
	if (mouseX < squareSize*mapWidth && mouseY < squareSize*mapHeight){
		mapClicked = [floor(mouseX/squareSize), floor(mouseY/squareSize)];
	}
}
function mouseDragged() {
	//check to see if we are resizing window
	if (mouseX > squareSize*mapWidth-25 && mouseX < squareSize*mapWidth+25 &&
		mouseY > squareSize*mapHeight-25 && mouseY < squareSize*mapHeight+25){
		squareSize = mouseX/mapWidth; 
	}
}

function mouseWheel(event) {
if (mouseX < squareSize*mapWidth && mouseY < squareSize*mapHeight){
	squareSize += event.delta/50
}
}

function showCellInfo() {


}