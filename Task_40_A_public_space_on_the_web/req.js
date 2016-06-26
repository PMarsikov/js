var selectElement = document.getElementById("fileList");
var textAreaElement = document.getElementById("textId");
var editBtn = document.getElementById("editBtn");
var saveBtn = document.getElementById("saveBtn");


/*
if (textAreaElement.disabled == false) {
  saveBtn.style.display = "inline";
  editBtn.style.display = "none";
} else {
  saveBtn.style.display = "none";
  editBtn.style.display = "inline";
}
*/
changeMode ("read");
function editMode() {
  changeMode ("edit");
}

loadFileList();

function changeMode (mode) {
  if (mode == "edit") {
    textAreaElement.disabled = false;
    saveBtn.style.display = "inline";
    editBtn.style.display = "none";
  } else if (mode == "read") {
    textAreaElement.disabled = true;
    saveBtn.style.display = "none";
    editBtn.style.display = "inline";
  }
  /*
  if (textAreaElement.disabled == false) {
    textAreaElement.disabled = true;
    saveBtn.style.display = "inline";
    editBtn.style.display = "none";
  } else {
    textAreaElement.disabled = true;
    saveBtn.style.display = "none";
    editBtn.style.display = "inline";
  }*/
}




function request(url, callback, method, text) {
  var req = new XMLHttpRequest();
  req.open(method, url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(null, req.responseText);
    else
      callback(new Error("Request failed: " + req.statusText), null);
  });
  if (method === "GET") {
    req.send(null);
  } else if (method === "PUT") {
    req.send(text);
  }
}

function loadFileList() {
  request("/", function(error, fileList) {
    if (error) throw error;
    var fileListArray = fileList.split('\n');
    for (var i = 0; i < fileListArray.length; i++) {
      var option = document.createElement("option");
      option.value = fileListArray[i];
      option.text = fileListArray[i];
      selectElement.add(option);
    }
    loadCurrnetFile();
  }, "GET");
}

function loadCurrnetFile () {
  var curOption = selectElement.value;
  request(curOption, function(error, fileText) {
    if (error) throw error; 
    textAreaElement.value = fileText;
  }, "GET");  
//  textAreaElement.disabled = true;
}

function saveChanges () {
  var curOption = selectElement.value;
  var curText = textAreaElement.value;
  request(curOption, function(error, fileText) {
    if (error) throw error; 
    textAreaElement.value = fileText;
  }, "PUT", curText);  
  loadCurrnetFile();
  changeMode ("read");
}
