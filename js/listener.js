/**
 * Show or hide the element by id
 * @param id
 */
function show(id){
    var obj = document.getElementById(id);
    if (obj.style.display == "none"){
        obj.style.display = "block";
        return 0
    }
    if (obj.style.display == "block"){
        hide(id)
        return 0
    }
}

function hide(id){
    var obj = document.getElementById(id);
    obj.style.display = "none";
}

/**
 * Drag the element with the given id
 * @param Id
 */
function initDragListener(Id) {
    var element = document.getElementById(Id);
    var element_popup = document.getElementById("popup");
    var offset = {x: 0, y: 0};

    function mouseDown(e) {
        offset.x = e.clientX - element_popup.style.left.replace("px", "");
        offset.y = e.clientY - element_popup.style.top.replace("px", "");
        window.addEventListener("mousemove", elementMove, true);
    }

    function elementMove(e) {
        var div = element_popup;
        div.style.position = "absolute";
        div.style.top = e.clientY - offset.y + "px";
        div.style.left = e.clientX - offset.x + "px";
    }

    function mouseUp() {
        window.removeEventListener("mousemove", elementMove, true);
    }

    function addListeners() {
        element.addEventListener("mousedown", mouseDown, false);
        window.addEventListener("mouseup", mouseUp, false);
    }

    addListeners();
}
