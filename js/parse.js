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
        if (tag == "error"){
            s = i + 1 + ")" + "  Code " + el.getAttribute("code") + " : " + el.getAttribute("text");
        }
        if (tag == "warning"){
            s = i + 1 + ")" +  el.getAttribute("text");
        }
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
    nodes=xml.childNodes;
    console.log(nodes);
    xmlString = highLightXML(nodes, "");
    return xmlString;
}
/**
 * Create <span class="span_class">value</span>
 * @param value
 * @param span_class
 * @returns {string}
 */
function wrap(value, span_class) {
    return "<span class='" + span_class + "'>" + escapeHtml(value) + "</span>";
}

/**
 * Colors attr and they value
 * @param node
 * @returns {string|*}
 * @constructor
 */
function NodeInText(node){
    attrs = node.attributes;
    result = wrap(node.nodeName, "tag") + (attrs.length > 0 ? " " : "");
    console.log(attrs);
    for(var i = 0; i<attrs.length; i++){
        result += wrap(attrs[i].nodeName,"attr");
        result += "=";
        result += wrap('"' + node.getAttribute(attrs[i].nodeName) + '"', "attr_value");
    }

    return result
}

/**
 * Colors code
 * @param nodes
 * @param offset
 * @returns {string}
 */
function highLightXML(nodes, offset){
    var result = '';
    for(var i = 0; i < nodes.length; i++){
        if (nodes[i].hasChildNodes()){
            result += offset + "&lt;" + NodeInText(nodes[i]) + "&gt; \n";
            result += highLightXML(nodes[i].childNodes, offset + "  ");
            result += offset + "&lt;&#x2F;" + wrap(nodes[i].nodeName, "tag") + "&gt; \n";
        }else if (nodes[i].nodeName == "#text" &&(!(!nodes[i].nodeValue || /^\s*$/.test(nodes[i].nodeValue)))){
            result += offset  + wrap(nodes[i].nodeValue, "text_code") + "\n";
        } else if(nodes[i].nodeName == "#comment") {
            result += offset +  wrap("<!-- " +nodes[i].nodeValue+ " --> \n" ,"comment");;
        }
    }
    console.log(result);
    return result
}

