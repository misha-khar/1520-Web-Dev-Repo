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
var tempArr = new Array;
var windArr = new Array;
var precipArr = new Array;
var stockArr = new Array;
var yAxisLabel;
var yAxisData;
var xAxisLabel = "Days Since Jan/01/2023";
var xAxisData = new Array;
var graphLabel;
var dataLoaded = false;

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
    if (!dataLoaded) {
        fr = new FileReader();
        fr.readAsText(fileUploadBtn.files[0]);
        fr.onload = function () {
            rawData = fr.result;
            parseRawData(rawData);
            if (dataTypeDropdown.value == 'select') {
            } else {
                showData();
            }
        }
    } else {
        tempArr = new Array;
        windArr = new Array;
        precipArr = new Array;
        stockArr = new Array;
        xAxisData = new Array;
        fr = new FileReader();
        fr.readAsText(fileUploadBtn.files[0]);
        fr.onload = function () {
            rawData = fr.result;
            parseRawData(rawData);
            if (dataTypeDropdown.value == 'select') {
            } else {
                showData();
            }
        }
    }
}

function parseRawData(dataSrc) {
    var data = dataSrc.split(/\s+/);
    // var data = dataSrc.replace( /\n/g, " " ).split( " " );
    for (let i = 0; i < data.length; i += 4) {
        tempArr.push(data[i]);
        windArr.push(data[i + 1]);
        precipArr.push(data[i + 2]);
        stockArr.push(data[i + 3]);
    }
    let tmax = data.length / 4;
    for (let i = 0; i < tmax; i++) {
        xAxisData.push(i);
    }
}

function showData() {
    if (dataTypeDropdown.value == "select") {
        console.log("please select a type");
    } else {
        switch (dataTypeDropdown.value) {
            case "temp":
                if (fileUploadBtn.files.length > 0 || dataLoaded) {
                    yAxisData = tempArr;
                }
                yAxisLabel = "Temperature (oF)";
                graphLabel = "Temperature History";
                break;
            case "wind":
                if (fileUploadBtn.files.length > 0 || dataLoaded) {
                    yAxisData = windArr;
                }
                yAxisLabel = "Wind (mph)";
                graphLabel = "Wind History";
                break;
            case "precip":
                if (fileUploadBtn.files.length > 0 || dataLoaded) {
                    yAxisData = precipArr;
                }
                yAxisLabel = "Precipitation (in)";
                graphLabel = "Precipitation History";
                break;
            case "stock":
                if (fileUploadBtn.files.length > 0 || dataLoaded) {
                    yAxisData = stockArr;
                }
                yAxisLabel = "Stock Market (pts)";
                graphLabel = "Stock Market History";
                break;
            default:
                console.log("error in showData");
                break;
        }
    }
    if (fileUploadBtn.files.length > 0 || dataLoaded) {
        makeGraph();
    }
}

function generateAvgMinMax() {
    var total = 0;
    var avg;
    var min = parseFloat(yAxisData[0]);
    var max = parseFloat(yAxisData[0]);
    for (let i = 0; i < yAxisData.length; i++) {
        let num = parseFloat(yAxisData[i])
        total += num;
        if (num < min) {
            min = num;
        }
        if (num > max) {
            max = num;
        }
    }
    avg = total / yAxisData.length;
    avgOutput.innerHTML = avg.toFixed(1);
    minOutput.innerHTML = min.toFixed(1);
    maxOutput.innerHTML = max.toFixed(1);
}

function makeGraph() {
    generateAvgMinMax();
    if (document.getElementById("myPlot")) {
        document.getElementById("myPlot").remove();
    }
    const graph = document.createElement("div");
    graph.setAttribute("id", "myPlot");
    graph.setAttribute("width", "100%");
    graph.setAttribute("max-width", "700px");
    dataDiv.appendChild(graph);
    var data = [{
        x: xAxisData,
        y: yAxisData,
        mode: "lines+markers"
    }];
    var layout = {
        title: {
            text: graphLabel,
        },
        xaxis: {
            title: {
                text: xAxisLabel,
            },
        },
        yaxis: {
            title: {
                text: yAxisLabel,
            }
        }
    };
    Plotly.newPlot("myPlot", data, layout);
}

function saveDataFunc() {
    if (fileUploadBtn.files.length > 0) {
        localStorage.setItem("rawData", rawData);
    }
}

function loadDataFunc() {
    if (localStorage.getItem('rawData') != null) {
        dataLoaded = true;
        tempArr = new Array;
        windArr = new Array;
        precipArr = new Array;
        stockArr = new Array;
        xAxisData = new Array;
        let rawData = localStorage.getItem('rawData');
        parseRawData(rawData);
        if (dataTypeDropdown.value == 'select') {
        } else {
            showData();
        }
    }
}


