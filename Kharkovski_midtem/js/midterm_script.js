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
var rawData;
var fr;
var temp = new Array;
var wind = new Array;
var precip = new Array;
var stock = new Array;
var yAxisLabel;
var xAxisLabel = "Days Since Jan/01/2023";
var xAxisData = new Array;

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
    dataTypeDropdown.addEventListener("change", showData);
}

function fileUploadFunc() {
    fr = new FileReader();
    fr.readAsText(fileUploadBtn.files[0]);
    fr.onload = function () {
        rawData = fr.result;
        outputBox.innerHTML = "raw data: " + rawData;
        parseRawData(rawData);
    }
}

function parseRawData(dataSrc) {
    // var data = dataSrc;
    var data = dataSrc.split(/\s+/);
    // var data = dataSrc.replace( /\n/g, " " ).split( " " );
    // console.log(data);
    // console.log(data.length);
    for (let i = 0; i < data.length; i += 4) {
        temp.push(data[i]);
        wind.push(data[i + 1]);
        precip.push(data[i + 2]);
        stock.push(data[i + 3]);
    }
    let tmax = data.length / 4;
    console.log(tmax);
    for (let i = 0; i < tmax; i++) {
        xAxisData.push(i);
    }

    // console.log(temp);
    // console.log(wind);
    // console.log(precip);
    // console.log(stock);
    // showData();
}

function showData() {
    var dataType = dataTypeDropdown.value;
    if (dataType == "select") {
        alert("please select a type");
    } else {

        var dataToPlot;
        switch (dataType) {
            case "temp":
                dataToPlot = temp;
                yAxisLabel = "Temperature (oF)";
                break;
            case "wind":
                dataToPlot = wind;
                yAxisLabel = "Wind (mph))";
                break;
            case "precip":
                dataToPlot = precip;
                yAxisLabel = "Precipitation (in)";
                break;
            case "stock":
                dataToPlot = stock;
                yAxisLabel = "Stock Market (pts)";
                break;
            default:
                console.log("error");
                break;
        }
    }


}

function makeGraph() {


}

function saveDataFunc() {
    alert("test");


}

function loadDataFunc() {
    alert("loading data... existing data cleared");
    temp = new Array;
    wind = new Array;
    precip = new Array;
    stock = new Array;
    console.log(temp);
    console.log(wind);
    console.log(precip);
    console.log(stock);
}


