/**
 * Created by Danik Tsyrkunov on 22.10.2014.
 */
window.onload=function(){
    popup = createPopup();
    head = cteateHead();
    input_bar = createInputBar();
    view_bar = createViewBar();
    status_bar = createStatusBar();
    xml_view = createXmlView();
    error_view = createErrorView();
    warnings_view = createWarningView();

    place(popup, head);
    place(popup, input_bar);
    place(popup, view_bar);
    place(popup, status_bar);
    place(popup, xml_view);
    place(popup, error_view);
    place(popup, warnings_view);

    place(document.body, popup);
    initDragListener("head");
};
