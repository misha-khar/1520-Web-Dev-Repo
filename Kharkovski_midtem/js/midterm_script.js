window.addEventListener("load", setup);
var fileUploadBtn;
var saveDataBtn;
var loadDataBtn;
var dataTypeDropdown;
var avgOutput;
var minOutput;
var maxOutput;
var dataDiv;
// delete below later
var outputBox;

function setup() {
    configDOMRefs();
    configDOMListeners();
}

const configDOMRefs = () => {
    fileUploadBtn = document.getElementById("file_upload_btn");
    saveDataBtn = document.getElementById("save_data_btn");
    loadDataBtn = document.getElementById("load_data_btn");
    dataTypeDropdown = document.getElementById("data_type_dropdown");
    avgOutput = document.getElementById("average_output");
    minOutput = document.getElementById("min_output");
    maxOutput = document.getElementById("max_output");
    dataDiv = document.getElementById("data_div");
    // delete below later
    outputBox = document.getElementById("outputBox");
}

const configDOMListeners = () => {
    fileUploadBtn.addEventListener("change", fileUploadFunc);
    saveDataBtn.addEventListener("click", saveDataFunc);
    loadDataBtn.addEventListener("click", loadDataFunc);
}

function fileUploadFunc() {
    let fr = new FileReader();
    fr.readAsText(fileUploadBtn.files[0]);
    fr.onload = function () {
        outputBox.innerHTML = fr.result;
    }
}

function saveDataFunc() {
    alert("test");
}

function loadDataFunc() {
    alert("test");
}


