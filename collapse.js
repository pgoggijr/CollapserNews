comments = [];
rows = document.getElementsByClassName("athing");
console.log(document.getElementsByClassName("athing"));

for(var i = 0; i < rows.length; i++) {
	item = rows[i].insertCell(1); 
	item.innerHTML = "Hi";
}