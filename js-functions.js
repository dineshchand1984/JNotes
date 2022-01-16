function AddNotes( value = ""){
  console.log(" function - addNewNote() : start");

  var taskstable = document.getElementById("taskstable");
  var taskrow = taskstable.insertRow();
  var cellId  = taskrow.insertCell(0);
  var cellTaskDesc = taskrow.insertCell(1);
  cellId.innerHTML = "<input type =\"checkbox\" class=\"taskid-row\"  />";
  cellTaskDesc.innerHTML = "<input class=\"taskdesc-row\" value=\"" + value + "\" />";

  console.log(" function - addNewNote() : end");
}

function DeleteNotes( deleteAll = false){
  console.log(" function - deleteNote() : start");
  var tasksTable = document.getElementById("taskstable");
  var numberOfNotes = tasksTable.rows.length - 1;
  for (var i = numberOfNotes; i > 0; i--) {
     var row = tasksTable.rows[i];     
	 var chkbox = row.getElementsByTagName('input')[0];
	 if( ('checkbox' == chkbox.type && true == chkbox.checked) || deleteAll)
        tasksTable.deleteRow(i);
  }

  console.log(" function - deleteNote() : end");
}

function SaveNotes(){
  console.log(" function - saveNotes() : start");

  var taskstable    = document.getElementById("taskstable");
  var numberOfNotes = taskstable.rows.length - 1;
  console.log(" Number of notes : " + numberOfNotes);
  
  var db;
  var request = window.indexedDB.open("MyNotesDatabase", 1);
  request.onerror = function(event) {
	console.log("IndexDB not supported.");
  };
  request.onsuccess = function(event) {
	console.log("onsuccess Start.");
	console.log("Indexed DB already exists.");
	db = event.target.result;
	
	var transaction = db.transaction('mynotes', 'readwrite');
	var notesObjectStore = transaction.objectStore('mynotes');
	for (var i = numberOfNotes; i > 0; i--) {
		 var row = taskstable.rows[i];     
		 var noteElement = row.getElementsByTagName('input')[1];
		 console.log(noteElement.value + " getting inserted.");
		 var db_insert_request = notesObjectStore.add(noteElement.value);
		 db_insert_request.oncomplete = function() {
			console.log("Note added to the store", db_insert_request.result);
		};
	}
	console.log("onsuccess End.");
  };

  console.log(" function - saveNotes() : end");
}


function DeleteAll(){
	console.log(" function - DeleteAll() : start");
	var db;
	var request = window.indexedDB.open("MyNotesDatabase", 1);
	request.onerror = function(event) {
		console.log("IndexDB not supported.");
	};
	request.onsuccess = function(event) {
		console.log("onsuccess Start.");
		console.log("Indexed DB already exists.");
		db = event.target.result;
		
		if ( db.objectStoreNames.contains('mynotes')){ 
			var transaction = db.transaction('mynotes', 'readwrite');
			var notesObjectStore = transaction.objectStore('mynotes');
			notesObjectStore.clear();
		}
	}
	DeleteNotes(true);
	console.log(" function - DeleteAll() : end");
}

function loadNotes(){
	console.log(" function - loadNotes() : start");
	var db;
	var request = window.indexedDB.open("MyNotesDatabase", 1);
	request.onerror = function(event) {
		console.log("IndexDB not supported.");
	};
	
	request.onsuccess = function(event) {
		console.log("onsuccess Start.");
		console.log("Indexed DB already exists.");
		db = event.target.result;
		
		if ( db.objectStoreNames.contains('mynotes')){ 
			var transaction = db.transaction('mynotes', 'readonly');
			var notes = transaction.objectStore('mynotes');
			var existingNotesRequest = notes.getAll();
			existingNotesRequest.onsuccess = function() {
				console.log("No. of notes present in the store", existingNotesRequest.result.length);
				for ( var counter = 0; counter < existingNotesRequest.result.length; counter++){
					AddNotes(existingNotesRequest.result[counter]);
				}
			};
		}
	}

	request.onupgradeneeded = function(event) {
		console.log("onupgradeneeded Start.");	
		console.log("Indexed DB doesn't exist.");
		db = event.target.result;
		if ( ! db.objectStoreNames.contains('mynotes')){                         // if there's no "notes" store
			db.createObjectStore('mynotes', { autoIncrement : true });           // create it
			console.log("Objectstore notes doesn't exist, so created it.");
		}		
		console.log("onupgradeneeded End.");
	};	
	
	console.log(" function - loadNotes() : end");
}