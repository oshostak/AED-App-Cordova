//calling onload function that enables the scriptу

window.onload=function(){



document.getElementById("navigation_menu").addEventListener("click", openNav);
document.getElementById("close_navigation").addEventListener("click", closeNav)

function openNav() {
  document.getElementById("side_navigation").style.width = "50%";
}

function closeNav() {
  document.getElementById("side_navigation").style.width = "0";
}

//enabling indexeddb and checking if it is supported by the browser

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let request = window.indexedDB.open("AssignmentsDatabase", 1),
	db,
	tx,
	store,
	index;

//checking for upgrade or creating a database

request.onupgradeneeded = function(e){
	let db = request.result,
		store = db.createObjectStore("assignmentsClass1", {keyPath: "aID" }),
		//store = db.createObjectStore("QuestionsStore",{
			//autoIncrement: true});
		index1 = store.createIndex("assignmentName", "assignmentName", {unique: false});
		index2 = store.createIndex("gradeInPoints", "gradeInPoints", {unique: false});
		index3 = store.createIndex("gradeInPercents", "gradeInPercents", {unique: false});
};

request.onerror = function(e){
	console.log('There was an error:' + e.target.errorCode);
};

// this function does most of the things - establishes a database and needed indexes + exports the data to the assignments table

request.onsuccess = function(e){
	db = request.result;
	tx = db.transaction("assignmentsClass1", "readwrite");
	store = tx.objectStore("assignmentsClass1");
	index1 = store.index("assignmentName");
	index2 = store.index("gradeInPoints");
	index3 = store.index("gradeInPercents");

	db.onerror = function(e){
		console.log("ERROR" + e.target.errorCode);
	}

	store.put({aID: 1, assignmentName : "Homework 1", gradeInPoints : "10/10", gradeInPercents : "100%", result: true});
	store.put({aID: 2, assignmentName : "Homework 2", gradeInPoints : "8/10", gradeInPercents : "80%", result: true});
	store.put({aID: 3, assignmentName : "Homework 3", gradeInPoints : "3/10", gradeInPercents : "30%", result: true});

	let assignment1 = store.get(1);
	let assignment2 = store.get(2);
	let assignment3 = store.get(3);

	assignment1.onsuccess = function(){
		document.getElementById("number1").innerHTML = assignment1.result.aID;
		document.getElementById("assignment1").innerHTML = assignment1.result.assignmentName;
		document.getElementById("gradePoints1").innerHTML = assignment1.result.gradeInPoints;
		document.getElementById("gradePercents1").innerHTML = assignment1.result.gradeInPercents;
	}

	assignment2.onsuccess = function(){
		document.getElementById("number2").innerHTML = assignment2.result.aID;
		document.getElementById("assignment2").innerHTML = assignment2.result.assignmentName;
		document.getElementById("gradePoints2").innerHTML = assignment2.result.gradeInPoints;
		document.getElementById("gradePercents2").innerHTML = assignment2.result.gradeInPercents;
	}

	assignment3.onsuccess = function(){
		document.getElementById("number3").innerHTML = assignment3.result.aID;
		document.getElementById("assignment3").innerHTML = assignment3.result.assignmentName;
		document.getElementById("gradePoints3").innerHTML = assignment3.result.gradeInPoints;
		document.getElementById("gradePercents3").innerHTML = assignment3.result.gradeInPercents;
	}

	tx.oncomplete = function(){
		db.close();
	}
}

// this function is enabled by clickin the "submit" button
// this enables FIRSTLY adding new data to the database and SECONDLY displaying it as a new row in the table

document.getElementById("publish_assignments").addEventListener("click", publishAssignments);

function publishAssignments(){

	var assignmentsTable = document.getElementById("assignments_table");
	var tableRow = assignmentsTable.insertRow(-1);
	var tableCell1 = tableRow.insertCell(0);
	var tableCell2 = tableRow.insertCell(1);
	var tableCell3 = tableRow.insertCell(2);
	var tableCell4 = tableRow.insertCell(3);

	let request = window.indexedDB.open("AssignmentsDatabase", 1),
	db,
	tx,
	store,
	index;

	newAssignmentName = document.getElementById("assignment_new").value;
	newGradePoints = document.getElementById("gradePoints_new").value;
	newGradePercents = document.getElementById("gradePercents_new").value;

	request.onsuccess = function(e){
		db = request.result;
		tx = db.transaction("assignmentsClass1", "readwrite");
		store = tx.objectStore("assignmentsClass1");
		index1 = store.index("assignmentName");
		index2 = store.index("gradeInPoints");
		index3 = store.index("gradeInPercents");

		store.put({aID: 4, assignmentName : newAssignmentName, gradeInPoints : newGradePoints, gradeInPercents : newGradePercents, result: true});

		let assignmentnew = store.get(4);

		assignmentnew.onsuccess = function(){
			tableCell1.innerHTML = assignmentnew.result.aID;
			tableCell2.innerHTML = assignmentnew.result.assignmentName;
			tableCell3.innerHTML = assignmentnew.result.gradeInPoints;
			tableCell4.innerHTML = assignmentnew.result.gradeInPercents;
			console.log(assignmentnew.result.assignmentName);
		}

		tx.oncomplete = function(){
			db.close();
		}

	}

}

}