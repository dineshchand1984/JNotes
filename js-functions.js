function AddNotes(){
	console.log(" function - addNewNote() : start");

	var taskstable = document.getElementById("taskstable");
	var taskrow = taskstable.insertRow();
	var cellId  = taskrow.insertCell(0);
	var cellTaskDesc = taskrow.insertCell(1);
	cellId.innerHTML = "<input type =\"checkbox\" class=\"taskid-row\"  />";
	cellTaskDesc.innerHTML = "<input class=\"taskdesc-row\" />";
	
	console.log(" function - addNewNote() : end");
}

function DeleteNotes(){
  console.log(" function - deleteNote() : start");

  var tasksTable = document.getElementById("taskstable");
  var numberOfNotes = tasksTable.rows.length - 1;
  for (var i = numberOfNotes; i > 0; i--) {
	 var row = tasksTable.rows[i];
	 var chkbox = row.getElementsByTagName('input')[0];
	 if( 'checkbox' == chkbox.type && true == chkbox.checked)
		tasksTable.deleteRow(i);
  }
  
  console.log(" function - deleteNote() : end");
}

function SaveNotes(){
	console.log(" function - saveNotes() : start");
	var taskstable    = document.getElementById("taskstable");
	var numberOfNotes = taskstable.rows.length - 1;
	console.log(" Number of notes : " + numberOfNotes);

	console.log(" function - saveNotes() : end");
}