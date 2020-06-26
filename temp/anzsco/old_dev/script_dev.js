/*
//var init_url = "http://pweb2:8854/get-counted-pairs";

var arr;
var isScrolling;
var scrollStop = false;
var codes_list = [];
*/
var currentANZSCO = null;
/*
window.addEventListener('scroll', function ( event ) {

	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );
	scrollStop = false;

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		scrollStop = true;

	}, 66);

}, false);

$(document).ready(function () {
    $(document).on("keyup", function (event) {
        if (event.which == 13 && event.target.classList.contains("text-link")) {
            $(event.target).trigger('click');
        }
    });
});

document.body.addEventListener("load", addElements(0));

// function to handle api request and presentation of frames
function addElements(type) {
	$.get(url, function(data, status){		
		arr = data;
		console.log(arr);
		var len = arr.length;
		var prev_title = "";
		var cont_btn, split_btn, sub_btn, cont_div, split_div, sub_div, exact_arr;
		var first = true;
		var pre_split, split, last_split = false;
		
		if (type != 0) {
			arr = arr[1];
			exact_arr = arr[0];
		}
		for (var i = 0; i < len; i++) {
			if (arr[i][2].length > 2) {
				codes_list.push(parseInt(arr[i][2].trim()));
			}
		}
		if (type != 0) {
			document.getElementById("c1").innerHTML += '<p>Suggested Industries for "' + type + '"</p>'
			console.log(arr);
		} else {
			document.getElementById("c1").innerHTML += '<p>All Industries</p>'
		}
		for (var j = 0; j < exact_arr.length; j++) {
			add_inner_frame(exact_arr[j]);
		}
		frameLoop: for (var i = 0; i < len; i++) {
			var no_desc = false;
			var no_exc = false;
			if (arr[i][1] != prev_title) {
				sub_btn = document.createElement("BUTTON");
				sub_btn.setAttribute("class","button-all sub-button not-listed");
				sub_btn.setAttribute("data-code",null);
				sub_btn.tabIndex = -1;
				sub_btn.innerHTML += "Not Listed <div class=\"right-icon\"><i class=\"fa fa-chevron-right\"></i></div>";
				if (!first && split && !last_split) {
					split_div.appendChild(sub_btn);
					cont_div.appendChild(split_div);
					document.getElementById("c1").appendChild(cont_div);
				} else if (!first && !split && !pre_split && !last_split) {
					cont_div.appendChild(sub_btn);
					document.getElementById("c1").appendChild(cont_div);
				}
				first = false;
				if (arr[i][1] == "\\") {
					pre_split = false;
					split = false;
					last_split = true;
					split_div.style.borderBottom = "0px";
					continue frameLoop;
				} else {
					last_split = false;
				}
				
				if (pre_split == true) {
					split_btn = document.createElement("BUTTON");
					split_btn.setAttribute("class","button-all split-button split-collapsible");
					split_btn.innerHTML += arr[i][1] + "<div class=\"right-icon\"><i class=\"fa fa-chevron-down\"></i></div>";
					cont_div.appendChild(split_btn);
					split_div = document.createElement("DIV");
					split_div.setAttribute("class","content-all split-content");
					split = true;
				} else {
					cont_btn = document.createElement("BUTTON");
					cont_btn.setAttribute("class","button-all header-button header-collapsible interactable");
					cont_btn.innerHTML += arr[i][1] + "<div class=\"right-icon\"><i class=\"fa fa-chevron-down\"></i></div>";
					if (arr[i][2].length <= 2) {
						cont_btn.setAttribute("data-split", true);
					} else {
						cont_btn.setAttribute("data-split", false);
					}
					document.getElementById("c1").appendChild(cont_btn);
					cont_div = document.createElement("DIV");
					cont_div.setAttribute("class","content-all header-content");
					if (arr[i][2].length <= 2) {
						pre_split = true;
						continue frameLoop;
					}
				}
			} 
			function add_inner_frame(frame) {
				sub_btn = document.createElement("BUTTON");
				sub_btn.setAttribute("class","button-all sub-button sub-collapsible");
				sub_btn.setAttribute("data-code", parseInt(frame[2]));
				sub_btn.tabIndex = -1;
				sub_btn.innerHTML += frame[3] + "<div class=\"right-icon\"><i class=\"fa fa-chevron-down\"></i></div>";
				if (split == true) {
					split_div.appendChild(sub_btn);
				} else {
					cont_div.appendChild(sub_btn);
				}
				sub_div = document.createElement("DIV");
				sub_div.setAttribute("class","content-all sub-content");
				if (frame[2] != "4260" && frame[5].length > 0) {
					sub_div.innerHTML += "<h6>Industry Description</h6><p>" + frame[5] + "</p>";
				} else if (frame[5].length > 0) {
					var ds_list = frame[5].split("◦");
					var ds_groups = ds_list.slice(1, ds_list.length);
					var ds_out = ds_list[0] + "<ul>";
					for (var g = 0; g < ds_groups.length; g++) {
						ds_out += "<li>" + ds_groups[g] + "</li>";
					}
					ds_out += "</ul>";
					sub_div.innerHTML += "<h6>Industry Description</h6><p>" + ds_out + "</p>";
				} else {
					no_desc = true;
				}

				var exc = splitLines(frame[6]);

				var link_text = splitLines(frame[7]);
				var link_code = splitLines(frame[8]);
				var exc_output = "";
				var combined_text_len = 0;			
				for (var n = 0; n < exc.length; n++) {
					var texts = link_text[n].split(";");
					var codes = link_code[n].split(",");
					var new_texts = [];
					var new_codes = [];
					for (var l = 0; l < texts.length; l++) {
						if (codes_list.includes(parseInt(codes[l].trim()))) {
							if (texts[l].trim().length > 0 && codes[l].trim().length > 0) {
								new_texts.push(texts[l].trim());
								new_codes.push(parseInt(codes[l].trim()));
							}
						}
					}
					if (new_texts.length > 0) {
						exc_output += "<li><p>" + exc[n] + " ";
						for (var v = 0; v < new_texts.length; v++) {
							exc_output += "<a class=\"text-link\" onclick=\"openDataCode(" + new_codes[v] + ")\">" + new_texts[v] + "</a>";
							if (v < new_texts.length - 2) {
								exc_output += ", ";
							} else if (v < new_texts.length - 1) {
								exc_output += " or ";
							}
						}
						exc_output += "</p></li>";
					}
					combined_text_len += new_texts.length;
				}
				if (combined_text_len > 0) {
					sub_div.innerHTML += "<h6>Exclusions and References</h6>";
					sub_div.innerHTML += "<ul style=\"list-style-type:disc;\">" + exc_output + "</ul>";
				} else {
					no_exc = true;
				}
				select_btn = document.createElement("BUTTON");
				select_btn.setAttribute("class", "btn btn-primary btn-select");
				select_btn.innerHTML += "Select";
				if (no_desc == true && no_exc == true) {
					select_btn.setAttribute("style", "margin-top: 15px !important;");
				} 
				sub_div.appendChild(select_btn);
				sub_div.innerHTML += "<br/><br/>"
				if (frame[9] == "FALSE") {
					sub_btn.style.display = "None";
					sub_div.style.display = "None";
				}
			}
			add_inner_frame(arr[i]);
			
			if (split == true) {
				split_div.appendChild(sub_div);
				cont_div.appendChild(split_div);
			} else {
				cont_div.appendChild(sub_div);
				document.getElementById("c1").appendChild(cont_div);
			}
			prev_title = frame[1];
			
		}
		var final_nl_btn;
		final_nl_btn = document.createElement("BUTTON");
		if (last_split == false) {
			final_nl_btn.setAttribute("class", "button-all sub-button not-listed");
		
			final_nl_btn.setAttribute("data-code", null);
			final_nl_btn.tabIndex = -1;
			final_nl_btn.innerHTML += "Not Listed <div class=\"right-icon\"><i class=\"fa fa-chevron-right\"></i></div>";
			cont_div.appendChild(final_nl_btn);
		} 
		document.getElementById("c1").appendChild(cont_div);
		document.getElementById("c1").innerHTML += "<br/>";

		setupListeners();
	}); 
}

// function to handle click listeners
async function setupListeners() {
	var i;
	var coll = document.getElementsByClassName("header-collapsible");

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", async function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			var sub_buttons = content.childNodes;
			for (var n = 0; n < sub_buttons.length; n++) {
				if (this.getAttribute('data-split') == "true" && sub_buttons[n].classList.contains("split-content")) {
					var sub_children = sub_buttons[n].getElementsByClassName("sub-button");
					for (var k = 0; k < sub_children.length; k++) {
						if (sub_children[k]) {
							if (sub_children[k].classList.contains("active")) {
								sub_children[k].click();
							}
						}
					}
				}
			}
			for (var n = 0; n < sub_buttons.length; n++) {	
				if (sub_buttons[n].classList.contains("active")) {
					sub_buttons[n].click();
				}
			}
			if (content.style.maxHeight) {
				
				//content.style.paddingBottom = "0px";
				content.style.maxHeight = null;
								
				if (this.getAttribute('data-split') == "false") {
					
					var subs = content.getElementsByClassName("sub-button");
					for (n = 0; n < subs.length; n++) {
						subs[n].classList.remove("interactable");
					}
					
				} else {
					
					var splits = content.getElementsByClassName("split-button");
					
					for (n = 0; n < splits.length; n++) {
						splits[n].classList.remove("interactable");
					}
				
				}
				
				refreshIndexes();
				
			} else {
				
				if (this.getAttribute('data-split') == "false") {
					var subs = content.getElementsByClassName("sub-button");
					for (n = 0; n < subs.length; n++) {
						subs[n].classList.add("interactable");
					}
				} else {
					var splits = content.getElementsByClassName("split-button");
					for (n = 0; n < splits.length; n++) {
						splits[n].classList.add("interactable");
					}
				}
				refreshIndexes();

				//content.style.paddingBottom = "5px";
				content.style.maxHeight = (content.scrollHeight + 10) + "px";
			} 
		});
	}
	
	var splits = document.getElementsByClassName("split-collapsible");

	for (i = 0; i < splits.length; i++) {
		splits[i].addEventListener("click", async function() {
			this.classList.toggle("active");
			var content = this.parentElement;
			var sub_content = this.nextElementSibling;

			if (sub_content.style.maxHeight) {
				
				var subs = sub_content.getElementsByClassName("sub-button");
				for (n = 0; n < subs.length; n++) {
					if (subs[n].classList.contains("active")) {
						subs[n].click();
					}
					subs[n].classList.remove("interactable");
				}
				refreshIndexes();

				sub_content.style.maxHeight = null;
				content.style.maxHeight = content.scrollHeight + "px";

			} else {
				
				var subs = sub_content.getElementsByClassName("sub-button");
				for (n = 0; n < subs.length; n++) {
					subs[n].classList.add("interactable");
				}
				refreshIndexes();

				sub_content.style.maxHeight = (sub_content.scrollHeight) + "px";
				content.style.maxHeight = (content.scrollHeight + sub_content.scrollHeight + 20) + "px";
				content.previousElementSibling.classList.add("active");
			} 
		});
	}
	
	var subs = document.getElementsByClassName("sub-collapsible");

	for (i = 0; i < subs.length; i++) {
		subs[i].addEventListener("click", async function() {
			this.classList.toggle("active");
			var split_content = this.parentElement;
			var content = split_content.parentElement;
			var sub_content = this.nextElementSibling;
			if (sub_content.style.maxHeight) {
				var text_links = sub_content.getElementsByClassName("text-link");
				for (n = 0; n < text_links.length; n++) {
					text_links[n].classList.remove("interactable");
				}
				var selects = sub_content.getElementsByClassName("btn-select");
				for (n = 0; n < selects.length; n++) {
					selects[n].classList.remove("interactable");
				}
				refreshIndexes();
				
				sub_content.style.maxHeight = null;
				split_content.style.maxHeight = split_content.scrollHeight + "px";
				if (content.getAttribute('data-split') == "true") {
					content.style.maxHeight = content.scrollHeight + "px";
				}
				
			} else {
				
				var text_links = sub_content.getElementsByClassName("text-link");
				for (n = 0; n < text_links.length; n++) {
					text_links[n].classList.add("interactable");
				}
				var selects = sub_content.getElementsByClassName("btn-select");
				for (n = 0; n < selects.length; n++) {
					selects[n].classList.add("interactable");
				}
				refreshIndexes();
				
				sub_content.style.maxHeight = (sub_content.scrollHeight) + "px";
				split_content.style.maxHeight = (split_content.scrollHeight + sub_content.scrollHeight + 20) + "px";
				split_content.previousElementSibling.classList.add("active");
				if (content.previousElementSibling.getAttribute('data-split') == "true") {
					content.style.maxHeight = (content.scrollHeight + +split_content.scrollHeight + sub_content.scrollHeight + 20) + "px";
					content.previousElementSibling.classList.add("active");
				}				
			} 
		});
	}
	
	var not_listed = document.getElementsByClassName("not-listed");

	for (i = 0; i < not_listed.length; i++) {
		not_listed[i].addEventListener("click", async function() {
			document.getElementById("ANZSIC-Input").value = "";
			document.getElementById("ANZSIC-Input").focus();
			document.getElementsByClassName("btn-submit")[0].classList.add("disabled");
		});
	}
	
	var selects = document.getElementsByClassName("btn-select");

	for (i = 0; i < selects.length; i++) {
		selects[i].addEventListener("click", async function() {
			console.log(this.parentElement.previousElementSibling.innerText + " (" + this.parentElement.previousElementSibling.getAttribute('data-code') + ")");
			document.getElementById("ANZSIC-Input").value = this.parentElement.previousElementSibling.innerText;
			document.getElementById("ANZSIC-Input").focus();
			document.getElementsByClassName("btn-submit")[0].classList.remove("disabled");
		});
	}
	
}

// function to open a frame given a code
async function openDataCode(code) {
	var subs = document.getElementsByClassName("sub-collapsible");
	for (var i = 0; i < subs.length; i++) {
		if (subs[i].getAttribute('data-code') == parseInt(code)) {
			var wait = false;
			if (subs[i].style.display = "None") {
				wait = true;
				subs[i].style.display = "Block";
				subs[i].nextElementSibling.style.display = "Block";
			}
			if (!subs[i].parentElement.parentElement.previousElementSibling.classList.contains("active") && subs[i].parentElement.parentElement.previousElementSibling.getAttribute('data-split') == "true") {
				wait = true;
				subs[i].parentElement.parentElement.previousElementSibling.click();
			}
			if (!subs[i].parentElement.previousElementSibling.classList.contains("active")) {
				wait = true;
				subs[i].parentElement.previousElementSibling.click();
			}
			if (!subs[i].classList.contains("active")) {
				wait = true;
				subs[i].click();
			}
			if (wait) {
				await sleep(200);
			}
			subs[i].nextElementSibling.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'start' });
			await sleep(50);
			while (!scrollStop) {
				await sleep(50);
			}
			await sleep(50);
			if (document.getElementById("ANZSIC-Input").tabIndex != document.activeElement.tabIndex && document.activeElement.tabIndex != -1) {
				subs[i].focus();
			}
			break;
		}
	}
}

// function to handle indexing for accessibility
function refreshIndexes() {
	var i;
	var coll = document.getElementsByClassName("header-button");

	for (i = 0; i < coll.length; i++) {
		coll[i].tabIndex = -1;
	}
	
	var splits = document.getElementsByClassName("split-button");

	for (i = 0; i < splits.length; i++) {
		splits[i].tabIndex = -1;
	}
	
	var subs = document.getElementsByClassName("sub-button");

	for (i = 0; i < subs.length; i++) {
		subs[i].tabIndex = -1;
	}
	
	var selects = document.getElementsByClassName("btn-select");

	for (i = 0; i < selects.length; i++) {
		selects[i].tabIndex = -1;
	}
	
	var interactables = document.getElementsByClassName("interactable");

	for (i = 0; i < interactables.length; i++) {
		interactables[i].tabIndex = i + 1;
	}
	
	document.getElementById("ANZSIC-Input").tabIndex = i + 2;
	document.getElementsByClassName("btn-submit")[0].tabIndex = i + 3;
	
}

function splitLines(t) { return t.split(/\r\n|\r|\n/); }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

// ANZSCO input panel
function togglePanel() {
	if (document.getElementById("s1").style.width) {
		document.getElementById("s1").style.width = null;
		document.getElementById("occSubmit").style.display = "None";
		document.getElementById("openBtn").parentElement.classList.remove("active");
		document.getElementById("s1").style.paddingLeft = "0px";
		document.getElementById("s1").style.paddingRight = "0px";
	} else {
		document.getElementById("s1").style.width = "50vw";
		document.getElementById("occSubmit").style.display = "Block";
		document.getElementById("openBtn").parentElement.classList.add("active");
		document.getElementById("s1").style.paddingLeft = "30px";
		document.getElementById("s1").style.paddingRight = "30px";
	}
}

document.getElementById("openBtn").addEventListener("click", function (e) {
		togglePanel();
	});

document.getElementById("c1").addEventListener("click", function (e) {
		if (document.getElementById("s1").style.width) {
			togglePanel();
		}
	});

document.getElementById("c2").addEventListener("click", function (e) {
		if (document.getElementById("s1").style.width) {
			togglePanel();
		}
	});

async function submitANZSCO() {
	var current_url = "https://yf5t0d3jh3.execute-api.ap-southeast-2.amazonaws.com/dev";
	document.getElementById("c1").innerHTML = "";
	if (currentANZSCO) {
		init_url = current_url + "/get-counted-pairs?anzsco=" + currentANZSCO.getAttribute('data-code');
		addElements(currentANZSCO.getAttribute("data-text"));
		await sleep(100);
	}
	init_url = current_url + "/get-anzsic-frames";
	addElements(0);
	await sleep(100);
	togglePanel();
}

document.getElementById("occSubmit").addEventListener("click", function (e) {
		submitANZSCO();
	});