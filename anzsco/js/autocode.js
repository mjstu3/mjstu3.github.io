
var init_url_coder = "http://pweb2:8855/"
var prev_request;
var DEV_MODE = true;
var currentFocus;
var num_menu_items = 2;

$.get(init_url_coder, function(data, status){		
	if (status == "success"){
		console.log("Initialisation success");
		hidePreloader();
	} else {
		console.log("Initialisation failure");
		hidePreloader();
	}
		
}); 

$.ajaxSetup({
	timeout:1000,
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		if (textStatus == 'timeout') {
				console.log("Request timeout");
		}
	}
});



function anzsco_search(inp_occ, inp_duties) {
	
	function reset() {
		inp_occ.value = "";
		inp_duties.value = "";
		currentFocus = -1;
		clearTable();
	}
	
	function clearTable() {
		var x = document.getElementById("results_body_occ");	
		x.innerHTML = "";
	}
	
	function run() {
		closeAllLists(inp_occ);
		var trimmed_occ = encodeURIComponent(inp_occ.value.trim());
		var trimmed_duties = encodeURIComponent(inp_duties.value.trim());
		var main_url = init_url_coder.concat("anzsco");
		
		if (trimmed_occ.length > 0 && trimmed_duties.length > 0) {
			main_url = main_url.concat("?occ=").concat(trimmed_occ).concat("&duties=").concat(trimmed_duties);
		} else if (trimmed_occ.length > 0) {
			main_url = main_url.concat("?occ=").concat(trimmed_occ)
		} else if (trimmed_duties.length > 0) {
			main_url = main_url.concat("?duties=").concat(trimmed_duties)
		}

		var arr = [];
		var t0 = performance.now();
		if (prev_request) {
			prev_request.abort();
		}

		if (DEV_MODE) {console.log("Get request");}

		prev_request = $.get(main_url, function(data, status){		
			arr=data.anzsco_output;
			if (DEV_MODE) {console.log("Stored in array");}
			createTable();
			if (DEV_MODE) {console.log("Created list");}
			var t1 = performance.now();
			var output = main_url + " took " + (t1 - t0).toFixed(2) + " milliseconds.";
			if (DEV_MODE) {console.log(output);}
		}); 

		function createTable() {
			
			clearTable();	
			if (!arr) { return false;}
			var table_body = document.getElementById("results_body_occ");	
			console.log(arr);
			var len = arr.length
			for (i = 0; i < len; i++) {

				var row = document.createElement("TR");
				row.setAttribute("class", "row100 body body-row");
				
				var code = document.createElement("TD");
				code.setAttribute("class", "cell100 column1");
				code.innerHTML += JSON.parse(arr[i]).code;
				row.appendChild(code);
				
				row.addEventListener("click", function(e) {
					open_link_for_code(e.path[1].firstChild.innerHTML);
				});
				
				var text = document.createElement("TD");
				text.setAttribute("class", "cell100 column2");
				text.innerHTML += JSON.parse(arr[i]).text;
				row.appendChild(text);
				
				var score = document.createElement("TD");
				score.setAttribute("class", "cell100 column3");	
				num = JSON.parse(arr[i]).combined_score.toFixed(3);	
				score.innerHTML += num;
				if (num < 0.001) {
					break;
				}
				row.appendChild(score);
				
				var arrow = document.createElement("TD");
				arrow.setAttribute("class", "cell100 column4");
				arrow.innerHTML += '<span class="fa fa-chevron-right entry-link"></span>';
				row.appendChild(arrow);
				
				table_body.appendChild(row);

			}
		} 
	}
	
	inp_occ.addEventListener("keyup", function(e) {
		if (e.keyCode == 13 && currentFocus == -1) {
			run();
		}
  	});
	
	inp_duties.addEventListener("keyup", function(e) {
      if (e.keyCode == 13) {
          //closeAllLists();
		  run();
        }
  	});

	document.getElementById("btn-search-occ").addEventListener("click", run);
	document.getElementById("btn-delete-occ").addEventListener("click", reset);
   
}

window.addEventListener('load', function () {
	anzsco_search(document.getElementById("search-occ"), document.getElementById("search-duties"))
}, false);



function code_search(inp_code) {
	
	function reset() {
		inp_occ.value = "";
		inp_duties.value = "";
		currentFocus = -1;
		clearTable();
	}
	
	function clearTable() {
		var x = document.getElementById("results_body_code");	
		x.innerHTML = "";
	}
	
	function run() {
		var trimmed_code = encodeURIComponent(inp_code.value.trim());
		var main_url = init_url_coder.concat("codes");
		
		if (trimmed_code.length) {
			main_url = main_url.concat("?code=").concat(trimmed_code);
		} 

		var arr = [];
		var t0 = performance.now();
		if (prev_request) {
			prev_request.abort();
		}

		if (DEV_MODE) {console.log("Get request");}

		prev_request = $.get(main_url, function(data, status){		
			arr=data.anzsco_output;
			console.log(arr);
			if (DEV_MODE) {console.log("Stored in array");}
			createTable();
			if (DEV_MODE) {console.log("Created list");}
			var t1 = performance.now();
			var output = main_url + " took " + (t1 - t0).toFixed(2) + " milliseconds.";
			if (DEV_MODE) {console.log(output);}
		}); 

		function createTable() {
			
			clearTable();	
			if (!arr) { return false;}
			var table_body = document.getElementById("results_body_code");	
			console.log(arr);
			var len = arr.length
			for (i = 0; i < len; i++) {

				var row = document.createElement("TR");
				row.setAttribute("class", "row100 body body-row");
				
				var code = document.createElement("TD");
				code.setAttribute("class", "cell100 column1");
				code.innerHTML += JSON.parse(arr[i]).code;
				row.appendChild(code);
				
				row.addEventListener("click", function(e) {
					open_link_for_code(e.path[1].firstChild.innerHTML);
				});
				
				var text = document.createElement("TD");
				text.setAttribute("class", "cell100 column2");
				text.innerHTML += JSON.parse(arr[i]).text;
				row.appendChild(text);
				
				var score = document.createElement("TD");
				score.setAttribute("class", "cell100 column3");	
				row.appendChild(score);
				
				var arrow = document.createElement("TD");
				arrow.setAttribute("class", "cell100 column4");
				arrow.innerHTML += '<span class="fa fa-chevron-right entry-link"></span>';
				row.appendChild(arrow);
				
				table_body.appendChild(row);

			}
		} 
	}
	
	inp_code.addEventListener("keyup", function(e) {
      if (e.keyCode == 13) {
		  run();
        }
  	});

	document.getElementById("btn-search-code").addEventListener("click", run);
	document.getElementById("btn-delete-code").addEventListener("click", reset);
   
}

window.addEventListener('load', function () {
	code_search(document.getElementById("search-code"))
}, false);