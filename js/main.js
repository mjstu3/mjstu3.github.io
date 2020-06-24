(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
	  $('#spinner').toggleClass('active');
  });

})(jQuery);


(function ($) {
	"use strict";
	$('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).addClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
	});

	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).removeClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
	});
    

})(jQuery);

function hidePreloader() {
	var preloader = $('.spinner-wrapper');
	preloader.fadeOut(500);
}

// open 
function open_link_for_code(link_code) {
	var out_url;
	var api_url = init_url_coder.concat("extension?code=").concat(link_code);
	$.get(api_url, function(data, status){		
		out_url=data;
		console.log(out_url);
		window.open(out_url);
	}); 
}

// close the open panel by displaying as none
function closeAll() {
	for (n = 0; n < num_menu_items; n++) {
		document.getElementById("panel-".concat(n)).style.display = "none";
	}
}

// open a panel corresponding to the menu item clicked
function menuOpen(i) {
	
	var current = document.getElementsByClassName("active");
	current[0].className = "";
	closeAll();
	
	console.log(document.getElementById("li-".concat(i)));

	document.getElementById("li-".concat(i)).className += " active";
	document.getElementById("panel-".concat(i)).style.display = "block";
		
	
}
