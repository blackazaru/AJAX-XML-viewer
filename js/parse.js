/**
 * Created by Danik Tsyrkunov on 24.10.2014.
 */

function getXMLDoc(str) {
    var parseXml;

    if (typeof window.DOMParser != "undefined") {
        parseXml = function (xmlStr) {
            return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
        };
    } else if (typeof window.ActiveXObject != "undefined" &&
        new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXml = function (xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        };
    } else {
        throw new Error("No XML parser found");
    }
    return parseXml(str);
}
/**
 * Validations XML
 * @param xmlString
 * @returns {boolean}
 */

function tryParseXML(xmlString) {
    var parser = new DOMParser();
    var parsererrorNS = parser.parseFromString('INVALID', 'text/xml').getElementsByTagName("parsererror")[0].namespaceURI;
    var dom = parser.parseFromString(xmlString, 'text/xml');
    if (dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
        return false;
    }
    return true;
}

/**
 * Parse HTML characters
 * @param string
 * @returns {string}
 */

function escapeHtml(string) {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

/**
 * Writes errors and warnings in InfoBar
 * @param xml
 * @param tag
 * @param tag_linc
 * @param tag_view
 * @param name
 */

function parseError(xml, tag, tag_linc, tag_view, name){
    var col = xml.getElementsByTagName(tag).length;
    document.getElementById(tag_linc).innerHTML = name + " - " + col;
    for (var i = 0; i < col; i++) {
        var s = "";
        el = xml.getElementsByTagName(tag)[i];
        s = i + 1 + ")" +"  Code " + el.getAttribute("code") +" : "+ el.getAttribute("text") ;
        document.getElementById(tag_view).innerHTML += s + "<br>";
    }
    el = xml.getElementsByTagName(tag);
    for (var i = col - 1; i >= 0; i--) {
        el[i].parentNode.removeChild(el[i]);
    }
}

/**
 * Parse XML code to Text
 * @param text
 * @returns {string}
 */

function parceXML(text) {
    var xml = getXMLDoc(text);

    parseError(xml, "error", "errors", "error_view","Error");
    parseError(xml, "warning", "warnings", "warnings_view","Warnings");


    return new XMLSerializer().serializeToString(xml);
}

