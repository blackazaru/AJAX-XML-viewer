/**
 * Show or hide the element by id
 * @param id
 */
function show_hide(id){
    var obj = document.getElementById(id);
    if (obj.style.display == "none"){
        obj.style.display = "block";
    }else{
        obj.style.display = "none";
    }
}

/**
 * Drag the element with the given id
 * @param Id
 */
function initDragListener(Id) {
    var element = document.getElementById(Id);
    var offset = {x: 0, y: 0};

    function mouseDown(e) {
        offset.x = e.clientX - element.style.left.replace("px", "");
        offset.y = e.clientY - element.style.top.replace("px", "");
        window.addEventListener("mousemove", elementMove, true);
    }

    function elementMove(e) {
        // Do not drag when current active element is input or button
        if ( document.activeElement !== document.getElementById("input") ) {
            var div = element;
            div.style.position = "absolute";
            div.style.top = e.clientY - offset.y + "px";
            div.style.left = e.clientX - offset.x + "px";
        }
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
