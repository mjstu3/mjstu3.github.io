var prev_request;
var DEV_MODE = true;

var init_url = "https://yf5t0d3jh3.execute-api.ap-southeast-2.amazonaws.com/dev/"

$.get(init_url, function(data, status){		
	if (status == "success"){
		console.log("Initialisation success");
	} else {
		console.log("Initialisation failure");
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


function autocomplete(inp, type) {
		/*the autocomplete function takes two arguments,
		the text field element and an array of possible autocompleted values:*/
		
		/*execute a function when someone writes in the text field:*/
		
				
		function run() {
				var input_value = encodeURIComponent(inp.value.trim());
			    if (input_value.length > 0) {
					var url = init_url.concat(type).concat("?search=").concat(input_value)
					var arr = [];
					var t0 = performance.now();
					if (prev_request) {
						prev_request.abort();
					}

					if (DEV_MODE) {console.log("Get request");}
					
					prev_request = $.get(url, function(data, status){		
							arr=data;
							if (DEV_MODE) {console.log("Stored in array");}
							createList();
							if (DEV_MODE) {console.log("Created list");}
							var t1 = performance.now();
							var output = url + " took " + (t1 - t0).toFixed(2) + " milliseconds.";
							if (DEV_MODE) {console.log(output);}
					}); 

					function createList() {
						var a, b, i, val = inp.value;
						/*close any already open lists of autocompleted values*/
						closeAllLists(inp);
						if (!val) { return false;}
						currentFocus = -1;		
						/*create a DIV element that will contain the items (values):*/
						a = document.createElement("DIV");
						a.setAttribute("id", inp.id + "-autocomplete-list");
						a.setAttribute("class", "autocomplete-items");
						/*append the DIV element as a child of the autocomplete container:*/
						inp.parentNode.parentNode.appendChild(a);

						var len = arr.length
						for (i = 0; i < len; i++) {
							/*check if the item starts with the same letters as the text field value:*/
							/*create a DIV element for each matching element:*/
						b = document.createElement("DIV");
							/*make the matching letters bold:*/
							var occ_rtnd = (arr[i]).toString();
							var occ_text = occ_rtnd.split(',')[0];
							b.innerHTML += occ_text;
							/*insert a input field that will hold the current array item's value:*/
							b.innerHTML += "<input type='hidden' value='" + occ_text + "'>";
							/*execute a function when someone clicks on the item value (DIV element):*/
							b.addEventListener("click", function(e) {
									/*insert the value for the autocomplete text field:*/
									inp.value = this.getElementsByTagName("input")[0].value;
									
									/*close the list of autocompleted values,
									(or any other open lists of autocompleted values:*/
									closeAllLists(inp);
							});
							a.appendChild(b);

						}
					}
				} else {
					closeAllLists(inp);
				}
		}

		inp.addEventListener("input", run);
   
  
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keyup", function(e) {
      var x = document.getElementById(this.id + "-autocomplete-list");
      if (x) { x = x.getElementsByTagName("div"); }
	  console.log(currentFocus);
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        if (currentFocus < x.length - 1) currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
		inp.select();
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
		if (currentFocus > 0) currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
		inp.select();
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) { x[currentFocus].click(); }
        }
      }
  });
  function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	    x[currentFocus].scrollIntoView();
  }
	
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
	
  
		
		/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(inp, e.target);
	});
}

function closeAllLists(inp, elmnt) {
	/*close all autocomplete lists in the document,
	except the one passed as an argument:*/
	var x = document.getElementsByClassName("autocomplete-items");
	for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		}
	}
	currentFocus = -1;
}

window.addEventListener('load', function () {
	autocomplete(document.getElementById("search-occ"), "anzsco")
}, false);

