$(document).ready(function() {
	
	recalculateGrid();
	var clickable = true;
	function recalculateGrid()
	{
		var boxWidthWithMargins = 220;
		var currentWidth = $(window).width();
		if (currentWidth > 1196) {
			currentWidth = 1196;
		}
		currentWidth -= 40;
		var allowedInGrid = currentWidth / boxWidthWithMargins;
		var counter = 1;
		var top     = 0;
		var left    = 0;
		allowedInGrid = Math.floor(allowedInGrid);
		$('.image-holder').each(function() {
			var current = $(this);
			if (!current.hasClass('mark-hide')) {
				current.removeClass('display-scaled');
				current.addClass('display-normal');
				current.animate({'top':  top + 'px', 'left': left + 'px'}, 500, function() {
    				clickable = true;
  				});
				// current.css('top', top + 'px');
				// current.css('left', left + 'px');
				left += boxWidthWithMargins;
				counter++;
				if (counter > allowedInGrid) {
					top  += boxWidthWithMargins;
					left  = 0;
					counter = 1;
				}
			} else {
				current.removeClass('display-normal');
				current.addClass('display-scaled');
			}
		});

		$(document).on('click', '.tag-links', function() {
			if (clickable) {
				clickable = false;
				var data = $(this).data();
				$('.image-holder').each(function() {
					var current = $(this);
					if (!current.hasClass('tag-' + data.tag)) {
						// if (!current.hasClass('display-scaled')) {
						// 	current.addClass('display-scaled');
						// }
						// current.removeClass('display-normal');
						// current.removeClass('display-block');
						current.addClass('mark-hide')
						// current.removeClass('mark-s')
					} else {
						// if (!current.hasClass('display-normal')) {
						// 	// current.addClass('display-block');
						// 	current.addClass('display-normal');
						// }
						current.removeClass('mark-hide')
						// current.addClass('mark-hide')
					}
				});
				recalculateGrid();
			} else {
				console.log('nije')
			}
		});
	}

	$( window ).resize(function() {
  		recalculateGrid();
	});
});