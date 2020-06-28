
function main() {

(function () {
   'use strict';

    /*====================================
    Scroll Button
    ======================================*/

  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 50
            }, 900);
            return false;
          }
        }
      });

    /*====================================
    Navigation Bar Freeze
    ======================================*/
    
    $(window).bind('scroll', function() {
        var navHeight = $('tf-home').height() + 600;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    })
    
    /*====================================
    Music Visualiser
    ======================================*/
    
    $(document).ready(function () {
        
        function visualiser(element,object) {
              var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
              var audioElement = document.getElementById(element);
              var audioSrc = audioCtx.createMediaElementSource(audioElement);
              var analyser = audioCtx.createAnalyser();

              // Bind our analyser1 to the media element source.
              audioSrc.connect(analyser);
              audioSrc.connect(audioCtx.destination);

              // SVG
              var frequencyData = new Uint8Array(100);

              var svgHeight = '190';
              var svgWidth = '300';
              var barPadding = '1';

              function createSvg(parent, height, width) {
                 return d3.select(parent).append('svg').attr('height', height).attr('width', width);
              }

              var svg = createSvg(object, svgHeight, svgWidth);

              // Create our initial D3 chart.
              svg.selectAll('rect')
                 .data(frequencyData)
                 .enter()
                 .append('rect')
                 .attr('x', function (d, i) {
                    return i * (svgWidth / frequencyData.length);
                 })
                 .attr('width', svgWidth / frequencyData.length - barPadding);

              // Continuously loop and update chart with frequency data.
              function renderChart() {
                 requestAnimationFrame(renderChart);

                 // Copy frequency data to frequencyData array.
                 analyser.getByteFrequencyData(frequencyData);

                 // Update d3 chart with new data.
                 svg.selectAll('rect')
                    .data(frequencyData)
                    .attr('y', function(d) {
                       return svgHeight - d;
                    })
                    .attr('height', function(d) {
                       return d;
                    })
                    .attr('fill', function(d) {
                       return 'rgb(255, 0, 0)';
                    });
              }

              // Run the loop
              renderChart(); 
        }
        
        visualiser('audioElement1','#visualiser1')
        visualiser('audioElement2','#visualiser2')

    });
    
  	/*====================================
    Tour Locations Isotope Filter
    ======================================*/
    $(window).load(function() {
        var $container = $('#lightbox');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });
    
}());
}
main();

