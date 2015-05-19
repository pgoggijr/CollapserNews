var parents = function(item, n) {
    for(var i = 0; i < n; i++) {
        item = item.parentNode;
    }
    return item;
}

function getNextSpacer(curr) {
    var parent = parents(curr, 6);  
    var next_thing = parent.nextSibling.nextSibling
    var next_spacer = undefined;
    if(next_thing.getAttribute("class") == "athing") {
        next_spacer = next_thing
            .children[0]
            .children[0]
            .children[0]
            .children[0]
            .children[0]
            .children[0];
    }
    return next_spacer;
}

function hideBySpacer(spacer) {
    parents(spacer,6).setAttribute("style", "display:none;");
}

function showBySpacer(spacer) {
    parents(spacer,6),removeAttribute("style");
}

function collapse(event) {
    var item = event.target;
    var spacer = parents(item,4).children[0].children[0];
    var spacer_width = Number(spacer.getAttribute("width"));
    item.innerHTML = "[+]";

    /* hide this items comment */
    parents(item,2).nextSibling.nextSibling.setAttribute("style", "display:none;")

    /* hide child comments */
    while(spacer_width < Number(getNextSpacer(spacer).getAttribute("width"))) {
        spacer = getNextSpacer(spacer);
        hideBySpacer(spacer);
    }
}

comments = [];
rows = document.getElementsByClassName("comhead");

rows = Array.prototype.filter.call(rows, function (item) {
    if(item.className == "comhead") {
        return item;
    }
});

for(var i = 0;i < rows.length; i++) {
    var button = document.createElement("A");
    var textNode = document.createTextNode("[-]");
    button.setAttribute("id", "collapse-" + i)
    button.setAttribute("href", "javascript:void(0)")
    button.appendChild(textNode);
    rows[i].insertBefore(button, rows[i].childNodes[0]);
    button.addEventListener('click',collapse);
}
