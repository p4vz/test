function setup() {
  // put setup code here
  helloWorld();
  readData();

}

function draw() {
  // put drawing code here
  ellipse(50, 50, 80, 80);
}



function helloWorld(){
    console.log("hello world");
    document.getElementById('world').innerHTML = 'Hello world';
}
var data= {};
function readData(){
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
  			data = this.response;
    		//var myObj = JSON.parse(this.responseText);
    		document.getElementById("demo").innerHTML = data;
    		var parsed = JSON.parse(data);
    		console.log(parsed[1][1]['parent_id'])
    		var nutri_map = JSON.parse(parsed[0]);
    		//var cells = JSON.parse(parsed[1]);

    		//numberOfCells = cells.length;
    		//console.log(numberOfCells)
    		//for (var i=0; i<numberOfCells; i++ ) {
    		//	cell[i] = JSON.parse(cells[i])
    		//}




    		//document.getElementById("nutri").innerHTML = parsed2.nutri_map;
    		//console.log(cells)

 		 }
	};
	xmlhttp.open("GET", "https://raw.githubusercontent.com/p4vz/test/master/data.json", true);
	xmlhttp.send();

}