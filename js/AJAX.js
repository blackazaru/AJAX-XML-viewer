/**
 * Created by Danik Tsyrkunov on 23.10.2014.
 */


/**
 * Cleans the windows of information
 */
function clear_view() {
    document.getElementById("value").innerHTML = "";
    document.getElementById("xml").textContent = "XML - 0";
    document.getElementById("error_view").innerHTML = "";
    document.getElementById("errors").textContent = "Errors - 0";
    document.getElementById("warnings_view").innerHTML = "";
    document.getElementById("warnings").textContent = "Warnings - 0";
}



function loadXMLDoc() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && tryParseXML(xmlhttp.responseText) == true) {
            if (xmlhttp.status == 200) {
                clear_view();
                document.getElementById("value").innerHTML = escapeHtml(parceXML(xmlhttp.responseText));
                document.getElementById("xml").textContent = "XML - " + xmlhttp.responseText.length;
                document.getElementById("status").innerHTML = "Status : Ok";
            }
        } else {
            clear_view();
            document.getElementById("status").innerHTML = "Status : INVALID";
        }
    }
    xmlhttp.open("GET", document.getElementById("input").value, true);
    xmlhttp.send();

}