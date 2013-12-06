/**
 * Created with JetBrains WebStorm.
 * User: samuel
 * Date: 13-12-6
 * Time: 下午11:49
 * To change this template use File | Settings | File Templates.
 */

jQuery.extend(jQuery.easing,{
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}
});

$(document).ready(function () {
	// ---
	var current_width = $(window).width(),
		$am = $('#admin_sm'),
		$as = $('#admin_ss'),
		$nameField = $('#name_field'),
		sm_width = $am.width(),
		ss_width = $as.width(),
		showInfoRadom = parseInt(Math.random() * 10 + 1),
		radomShow = false,
		tempText = '',
		$infoList = [$am, $as];



	if (showInfoRadom % 2 === 1) {
		radomShow = true;
	}
	window.setTimeout(function(){
		$am.data('fotoname','Samuel Shen').css({
			'left': ((current_width / 2 - sm_width/2) + 80) + 'px'
		}).fadeIn(600, function () {
			$am.animate({'left': '-=50px'}, 300, 'easeInBack');
		});
		$as.data('fotoname','Smily Liang').css({
			'left': ((current_width / 2 - ss_width/2) - 80) + 'px'
		}).fadeIn(600, function () {
			$as.animate({'left': '+=50px'}, 300, 'easeInBack');
		});

		if (radomShow) {
			tempText =$as.data('fotoname');
			$as.css('z-index', '10');
			$am.css('z-index', '0');
		} else {
			tempText =$am.data('fotoname');
			$as.css('z-index', '0');
			$am.css('z-index', '10');
		}
		
		$nameField.hide().attr('old_value',tempText).text(tempText).fadeIn(300);
	},1200);

	$('.author_pic').mouseover(function () {
		$(this).addClass('hover');
		$nameField.text($(this).data('fotoname'));
	}).mouseout(function () {
		$(this).removeClass('hover');
		$nameField.text($nameField.data('old_value'));
	});


});