$(document).ready(function() {
	
	recalculateGrid();
	var clickable = true;
	var currentInRow = 0;

	function calculateAllowedInGrid()
	{
		var boxWidthWithMargins = 220;
		var currentWidth = $(window).width();
		if (currentWidth > 1196) {
			currentWidth = 1196;
		}
		currentWidth -= 40;
		var allowedInGrid = currentWidth / boxWidthWithMargins;
		allowedInGrid = Math.floor(allowedInGrid);
		return allowedInGrid;
	}

	function recalculateGrid()
	{
		var boxWidthWithMargins = 220;
		var counter = 1;
		var top     = 0;
		var left    = 0;

		allowedInGrid = calculateAllowedInGrid();
		console.log('tu')
		currentInRow = allowedInGrid;
		$('.image-holder').each(function() {
			var current = $(this);
			if (!current.hasClass('mark-hide')) {
				current.removeClass('display-scaled');
				current.addClass('display-normal');
				// console.log('animira')
				current.animate({'top':  top + 'px', 'left': left + 'px'}, 500, function() {
					
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
			if (current.is(':last-child')) {
				clickable = true;
			}
		});
	}
	$(document).on('click', '.tag-links', function() {
		if (clickable) {
			clickable = false;
			var data = $(this).data();
			$('.image-holder').each(function() {
				var current = $(this);
				if (!current.hasClass('tag-' + data.tag)) {
					current.addClass('mark-hide');
				} else {
					current.removeClass('mark-hide');
				}
			});
			recalculateGrid();
		}
	});
	

	$( window ).resize(function() {
		allowedInGrid = calculateAllowedInGrid();
		if (allowedInGrid != currentInRow) {
			recalculateGrid();	
		}
	});
});