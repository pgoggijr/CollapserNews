/* return parent n of HTMLitem item */
function parents(item, n) {
    for(var i = 0; i < n; i++) {
        item = item.parentNode;
    }
    return item;
}

/* given a comment spacer, return the spacer for the next comment */
function getNextSpacer(curr) {
    var parent = parents(curr, 6);
    var next_thing = parent.nextSibling.nextSibling
    var next_spacer = undefined;

    if(next_thing != null && next_thing.getAttribute("class") == "athing") {
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

/* collapse comment and subcomments corresponding to the pressed collapse button */
function collapse(event) {
    var item = event.target;
    var spacer = parents(item,4).children[0].children[0];
    var spacer_width = Number(spacer.getAttribute("width"));
	var text = parents(item,2).nextSibling.nextSibling;

    if(item.getAttribute("collapsed") == "true") {
    	item.innerHTML = "[-]";
	    item.setAttribute("collapsed",false);

    	/* show this items comment */
    	text.style.display = "initial";

	    /* sometimes replies are next to, rather than inside the comment */
	    if(text.nextSibling != null && text.nextSibling.getAttribute("class") == "reply") {
	    	text.nextSibling.style.display = "initial";
	    }

    	/* show child comments */
    	while(spacer_width < Number(getNextSpacer(spacer).getAttribute("width"))) {
    		var comment;
    		spacer = getNextSpacer(spacer);
		    comment = parents(spacer,6);

		    /* show only if this item collapsed it */
		    if(comment.getAttribute("collapser") == item.id) {
			    comment.style.display = "initial";
			    comment.removeAttribute("collapser");
			}
    	}

    } else {
	    item.innerHTML = "[+]";
	    item.setAttribute("collapsed",true);

	    /* hide this items comment */
	    text.style.display = "none";

	    /* sometimes replies are next to, rather than inside the comment */
	    if(text.nextSibling != null && text.nextSibling.getAttribute("class") == "reply") {
	    	text.nextSibling.style.display = "none";
	    }

	    /* hide child comments */
	    while(spacer_width < Number(getNextSpacer(spacer).getAttribute("width"))) {
	    	var comment;
	        spacer = getNextSpacer(spacer);
		    comment = parents(spacer,6);
		    comment.style.display = "none";
		    if(!comment.getAttribute("collapser")) {
			    comment.setAttribute("collapser", item.id);
		    }
	    }
	}
}

/* initialize collapse buttons */
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
    button.setAttribute("id", "collapse-" + i);
    button.setAttribute("href", "javascript:void(0)");
    button.appendChild(textNode);
    rows[i].insertBefore(button, rows[i].childNodes[0]);
    button.addEventListener('click',collapse);
    button.setAttribute("collapsed",false);
}
