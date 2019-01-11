var data= {};
var squareSize = 40;
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
var cellSize = 20;
var mapOffsetX = 0;
var mapOffsetY = 0;
var mapDragged = false; 
var mouseToMapX;
var mouseToMapY;
var cellsGene = [];

function preload() {
	var url = 'https://raw.githubusercontent.com/p4vz/test/master/log/data9601.json'
	data = loadJSON(url);


}

function setup() {
    readData()
    background(250);
	createCanvas(squareSize*mapWidth+1000, squareSize*mapHeight+1);
	canvas.zIndex = "-1"

	UI();
	// newlist = retrieveAllFilesInFolder('1ExbF53G7B5Kt1ZQ5NRlXSboOdRCY36Dq')
	// console.log(newlist)
}

function draw() {
	clear();
	background(250);
	drawBoard();
	drawCells();
	whitePane();


}

window.onload = function(){
	var btnGene = document.getElementById("genealogyBtn")
	btnGene.addEventListener("click", generateGenealogy);

}
//document.getElementById("genealogyBtn").addEventListener("click", function(){
//  generateGenealogy();
//});

function helloWorld(){
    console.log("hello world");
    document.getElementById('world').innerHTML = 'Hello world';
}


function readData(){
    nutri_map = data[0].nutri_map;
    mapWidth = nutri_map.length;
    mapHeight = nutri_map[1].length;
    light_map = data[1][0].light_map;
    meat_map = data[2][0].meat_map;
    o2_map = data[3][0].o2_map;
    co2_map = data[4][0].co2_map;
    cells = data[5];
}


function drawBoard() {
	//background(255);
	if (selectMapType == 'Nutri'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (nutri_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize+mapOffsetX, j*squareSize+mapOffsetY, squareSize, squareSize);
			}
		}
	}	
	if (selectMapType == 'Light'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (light_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize+mapOffsetX, j*squareSize+mapOffsetY, squareSize, squareSize);
			}
		}
	}
	if (selectMapType == 'Meat'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (meat_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize+mapOffsetX, j*squareSize+mapOffsetY, squareSize, squareSize);
			}
		}
	}
	if (selectMapType == 'O2'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (o2_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize+mapOffsetX, j*squareSize+mapOffsetY, squareSize, squareSize);
			}
		}
	}
	if (selectMapType == 'CO2'){
		for ( let i = 0; i < mapWidth; i++) {
			for ( let j = 0; j < mapHeight; j++) {
				fill (co2_map[i][j]/5*255);
				stroke (0);
				rect(i*squareSize+mapOffsetX, j*squareSize+mapOffsetY, squareSize, squareSize);
			}
		}
	}
	//draw selected cell
	if (mapClicked != []) {
		noFill();
		stroke(250,180,25);
		strokeWeight(2);
		rect(mapClicked[0]*squareSize+mapOffsetX, mapClicked[1]*squareSize+mapOffsetY, squareSize, squareSize);
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
		ellipse(x*squareSize + mapOffsetX, y*squareSize + mapOffsetY, size*cellSize, size*cellSize);
	}

	for (let i = 0; i < cellsClicked.length; i++){
		noFill();
		stroke(250,180,25);
		strokeWeight(2);
		x = cellsClicked[i].coordx+cellsClicked[i].relx;
		y = cellsClicked[i].coordy+cellsClicked[i].rely;
		size = cellsClicked[i].size;
		ellipse(x*squareSize + mapOffsetX, y*squareSize + mapOffsetY, size*cellSize, size*cellSize)

	}
	strokeWeight(1);
}

function UI () {
	selectCellColorSelect = createSelect();
	//text('Cell coloring:', 900, 20)
    selectCellColorSelect.position(900, 10);
    selectCellColorSelect.option('None');
    selectCellColorSelect.option('Hunger Based');
    selectCellColorSelect.option('Food Preference Based');
    selectCellColorSelect.changed(selectCellColorEvent);

    selectMapTypeSelect = createSelect();
    //text('Map coloring:', 900, 78)
    selectMapTypeSelect.position(900, 60);
    selectMapTypeSelect.option('Nutri');
    selectMapTypeSelect.option('Light');
    selectMapTypeSelect.option('Meat');
    selectMapTypeSelect.option('O2');
    selectMapTypeSelect.option('CO2');
    selectMapTypeSelect.changed(selectMapTypeEvent);
}

function whitePane() {
		//draw white pane over the data
	fill(250);
	noStroke();
	rect(800,0,squareSize*mapWidth, squareSize*mapHeight+1)
}

function selectCellColorEvent() {
	selectCellColor = selectCellColorSelect.value();
}

function selectMapTypeEvent() {
	selectMapType = selectMapTypeSelect.value();
	}

function mouseClicked() {
	cellsClicked = [];
	//check if a cell was selected
	for (let i = 0 ; i < cells.length; i++){
		let d = dist(mouseX, mouseY, (cells[i].coordx+cells[i].relx)*squareSize+mapOffsetX, (cells[i].coordy+cells[i].rely)*squareSize+mapOffsetY)
		if (d < cells[i].size*cellSize) {
			cellsClicked.push(cells[i]) //add cell to array of selected cells 
		}
	}

	//check to see if a map was clicked
	mapClicked = [];
	if (mouseX > mapOffsetX && mouseX < squareSize*mapWidth+mapOffsetX && 
		mouseY > mapOffsetY && mouseY < squareSize*mapHeight+mapOffsetY){
		mapClicked = [floor((mouseX-mapOffsetX)/squareSize), floor((mouseY-mapOffsetY)/squareSize)];

	
	showCellInfo();
	showMapInfo()
	}
}

function mousePressed () {
	if (mouseX < squareSize*mapWidth && mouseY < squareSize*mapHeight){
		mapDragged = true; //for dragging the map around. lock the the map to the mouse
		mouseToMapX = mouseX - mapOffsetX;
		mouseToMapY = mouseY - mapOffsetY;
		console.log('poo'+mouseToMapX)
	} else{
		mapDragged = false;
	}

}

function mouseDragged() {
	//check to see if we are resizing window
	// if (mouseX > squareSize*mapWidth-25 && mouseX < squareSize*mapWidth+25 &&
	// 	mouseY > squareSize*mapHeight-25 && mouseY < squareSize*mapHeight+25){
	// 	squareSize = mouseX/mapWidth; 
	// }
	if (mapDragged == true) {
	mapOffsetX = mouseX - mouseToMapX; 
	mapOffsetY = mouseY - mouseToMapY;
	}
		// if (mouseX < squareSize*mapWidth && mouseX < 1000 && 
		// 	mouseY < squareSize*mapHeight && mouseY < 1000 ){
		// 	mapOffsetX

		// }

}

function mouseReleased() {
	mapDragged = false; //release a dragging map

}

function mouseWheel(event) {
if (mouseX < squareSize*mapWidth && mouseY < squareSize*mapHeight){
	squareSize += event.delta/50
}
}

function showCellInfo() {
	for (let i = 0; i < cellsClicked.length; i++){
		cellInfo = JSON.stringify(cellsClicked[i], null, 2)
		console.log(cellInfo);
		document.getElementById('cellInfo').innerHTML = cellInfo;
	}
}

function showMapInfo() {
		

	if (mapClicked != []){
		//console.log(mapClicked)
		nutriInfo = nutri_map[mapClicked[0]][mapClicked[1]];
		document.getElementById('mapInfo').innerHTML = 'Nutri: ' + nutriInfo.toFixed(2);
		lightInfo = light_map[mapClicked[0]][mapClicked[1]];
		document.getElementById('mapInfo').innerHTML += '</br>Light: ' + lightInfo.toFixed(2);
		meatInfo = meat_map[mapClicked[0]][mapClicked[1]];
		document.getElementById('mapInfo').innerHTML += '</br>Meat: ' + meatInfo.toFixed(2);
		o2Info = o2_map[mapClicked[0]][mapClicked[1]];
		document.getElementById('mapInfo').innerHTML += '</br>O2:&nbsp&nbsp&nbsp' + o2Info.toFixed(2);
		co2Info = co2_map[mapClicked[0]][mapClicked[1]];
		document.getElementById('mapInfo').innerHTML += '</br>CO2: ' + co2Info.toFixed(2);
	}
}


var root = {};
function generateGenealogy(){
	// using treant.js
	// if (cellsClicked == []){
	// 	//must click a cell!
	// }
	// if (cellsClicked.length > 1){
	// 	//make sure only one cell is selected
	// }
	if (cellsClicked.length != 1){
		let cell = cellsClicked[0]
		//cell.id is level n=0 id
		//cell.child_list is level n+1 id

		var config= [{
			container: "#OrganiseChart-simple"
		}];

	// 	while (cell.parent_id != 0){
	// 		cell = geneFindParent(cell)
	// 	}

	// 	for (let i = 0 ; i < cell.child_id.length; i++)
	// 		console.log(cell.id);
	// 		console.log(cell.parent_id);

	// }
		cellsGene = buildGeneVars();
		var temp = config.concat(root)
		var simpleChartConfig = temp.concat(cellsGene);
		console.log(simpleChartConfig);
		new Treant( simpleChartConfig );

	}
}

function geneFindParent (cellId){
	let parent = cells.find(o => o.id === cellId.parent_id)
	return (parent)
}
 
function buildGeneVars(){
	for (let i = 0 ; i < cells.length; i++){
		if (cells[i].parent_id == 0){
			cellsGene[i] = {}
			cellsGene[i].parent = root;
			cellsGene[i].text = {}
			cellsGene[i].text.name = cells[i].id
		} else{ 
			cellsGene[i] = {}
			cellsGene[i].text = {}
			temp = cellsGene.find(o => o.text.name === cells[i].parent_id);
			cellsGene[i].parent = temp; //
			cellsGene[i].text.name = cells[i].id


		}
	}
	return (cellsGene)
}	//cells.find(o => o.id === cells[i].parent_id) ////cells[i].parent_id 

// function geneBuildChildrenArray(cellId){
// 	let childrenId = cellId.child_list;
// 	for (let i = 0 ; i < children.length; i++){
// 		let children[i] = cells.find(o => o.id === cellId.parent_id)
// 	}
// return children

// }

// var api_key = '{AIzaSyB1ukf_BCaLvS-xFZfneOghjd6_XJOuzWY}';
// var folderId = '{1ExbF53G7B5Kt1ZQ5NRlXSboOdRCY36Dq}';
// var url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + api_key;
// var promise = $.getJSON( url, function( data, status){
//     // on success
// });
// promise.done(function( data ){
//     console.log(data)// do something with the data
//     console.log('ergerg')
// }).fail(function(){

// });




// function retrieveAllFilesInFolder(folderId, callback) {
//   var retrievePageOfChildren = function(request, result) {
//     request.execute(function(resp) {
//       result = result.concat(resp.items);
//       var nextPageToken = resp.nextPageToken;
//       if (nextPageToken) {
//         request = gapi.client.drive.children.list({
//           'folderId' : folderId,
//           'pageToken': nextPageToken
//         });
//         retrievePageOfChildren(request, result);
//       } else {
//         callback(result);
//       }
//     });
//   }
//   var initialRequest = gapi.client.drive.children.list({
//       'folderId' : folderId
//     });
//   retrievePageOfChildren(initialRequest, []);
// }