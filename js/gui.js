function createButton(name){
    var button = document.createElement("button");
    button.innerHTML = name;
    return button
}

function createLink(name){
    var a = document.createElement("a");
    a.innerHTML = name;
    return a
}

function place(a, b){
    a.appendChild(b);
}

function createDiv(id){
    var div = document.createElement("div");
    div.id = id;
    return div
}

function createInput(id){
    var input = document.createElement("input");
    input.id = id;
    return input
}

function createPopup(){
    var popup = createDiv("popup");
    popup.className = "popup";
    popup.style.top = "0";
    popup.style.left = "0";
    return popup;
}

function createInputBar(){
    var input_bar = createDiv();
    input_bar.className = "div1";
    var input = createInput("input");
    input.setAttribute("placeholder","file.xml");
    var buttonGet = createButton("Get");
    buttonGet.setAttribute("onclick", "loadXMLDoc();");
    place(input_bar, input);
    place(input_bar, buttonGet);
    return input_bar
}

function createViewBar(){
    var view_bar = createDiv();
    view_bar.className = "div1";
    place(view_bar, document.createTextNode("Views : "));

    var link_xml = createLink("XML - 0");
    link_xml.id = "xml";
    link_xml.setAttribute("onclick","show_hide('xml_view')");
    place(view_bar, link_xml);
    place(view_bar, document.createTextNode(" | "));


    var link_errors = createLink("Errors - 0");
    link_errors.id = "errors";
    link_errors.setAttribute("onclick","show_hide('error_view')");
    place(view_bar, link_errors);
    place(view_bar, document.createTextNode(" | "));


    var link_warnings = createLink("Warnings - 0");
    link_warnings.id = "warnings";
    link_warnings.setAttribute("onclick","show_hide('warnings_view')");
    place(view_bar, link_warnings);

    return view_bar
}

function createStatusBar(){
    var status_bar = createDiv();
    status_bar.className = "div1";
    place(status_bar, document.createTextNode("Status : Ready"));
    status_bar.id = "status";

    return status_bar
}

function createXmlView(){
    var xml_view = createDiv("xml_view");
    xml_view.className = "div1 info_panel";
    xml_view.style.display = "none";
    var pre = document.createElement("pre");
    pre.id = "value";
    place(xml_view, pre);

    return xml_view
}

function createErrorView(){
    var error_view = createDiv("error_view");
    error_view.className = "div1 info_panel";
    error_view.style.display = "none";

    return error_view
}

function createWarningView(){
    var warnings_view = createDiv("warnings_view");
    warnings_view.className = "div1 info_panel";
    warnings_view.style.display = "none";

    return warnings_view
}


