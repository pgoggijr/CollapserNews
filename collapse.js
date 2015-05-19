comments = [];
rows = document.getElementsByClassName("comhead");
//console.log(document.getElementsByClassName("comhead"));

rows = Array.prototype.filter.call(rows, function (item) {
	if(item.className == "comhead") {
		return item;
	}
});

rows.forEach(function (item) {
	var swag = document.createElement("SPAN");
	var textNode = document.createTextNode("[+]");
	swag.appendChild(textNode);
	item.insertBefore(swag, item.childNodes[0]);
});

//debug
console.log(rows);