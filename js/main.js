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

console.log('看源码了？我们可以成为朋友～\n\t\t互相学习交流可以向我们发邮件～\n或者加微信：Samuel_1112\n');

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
		objName = '';


	if (showInfoRadom % 2 === 1) {
		radomShow = true;
	}
	window.setTimeout(function(){
		$am.data({'fotoname':'Samuel Shen','comname':'sm'}).css({
			'left': ((current_width / 2 - sm_width/2) + 80) + 'px'
		}).fadeIn(600, function () {
			$am.animate({'left': '-=50px'}, 300, 'easeInBack');
		});
		$as.data({'fotoname':'Smily Liang','comname':'ss'}).css({
			'left': ((current_width / 2 - ss_width/2) - 80) + 'px'
		}).fadeIn(600, function () {
			$as.animate({'left': '+=50px'}, 300, 'easeInBack');
		});

		if (radomShow) {
			tempText =$as.data('fotoname');
			objName = $as.data('comname');
			$as.css('z-index', '10');
			$am.css('z-index', '0');
		} else {
			tempText =$am.data('fotoname');
			objName = $am.data('comname');
			$as.css('z-index', '0');
			$am.css('z-index', '10');
		}

		$nameField.hide().attr('old_value',tempText).text(tempText).fadeIn(300);

		$('#info').empty();
		var a_html = infoRender(objName);

		$('#info').attr('ca',objName).html(a_html).children().fadeIn(300);
	},1200);

	$('.author_pic').mouseover(function () {
		$(this).addClass('hover');
		$nameField.text($(this).data('fotoname'));
	}).mouseout(function () {
		$(this).removeClass('hover');
		$nameField.text($nameField.data('old_value'));
	}).click(function(){
		var $this = $(this),
			objName = $this.data('comname'),
			$info = $('#info');
			$nameField.text($(this).data('fotoname'));
			$nameField.data('old_value',$(this).data('fotoname'));
		if($info.attr('ca') !== objName){
			$this.css('z-index',10).siblings().css('z-index',0);
			var a_html = infoRender(objName);
			$info.children().fadeOut(200,function(){
				$info.empty().attr('ca',objName).html(a_html).children().fadeIn(300);
			});
		}

	});
});

function infoRender(name) {
	var infoOfAuthor = {
		'ss':{
			'blockContainerInfo': [
				{
					'text':{
						'title': 'About',
						'info': $('#template_ss').html(),
						'render': 'background-color: #ee6681;'
					}
				}
			]
		},
		'sm':{
			'blockContainerInfo': [
				{
					'text':{
						'title': 'About',
						'info':$('#template_sm').html(),
						'render': 'background-color: #2da7c5;'
					}
				}
			]
		}
	},
	HTML = '',
	currentAuthor,
	template = {
		'text': '<div class="text_field" style="display:none;"><h1>[%title%]</h1><div class="info">[%info%]</div></div>'
	};

	if(window.pageInfoHTML){
		if(window.pageInfoHTML[name]){
			return window.pageInfoHTML[name];
		}
	}

	currentAuthor = infoOfAuthor[name];

	// -- render page ...
	var blockInfo;
	for(var i= 0,len=currentAuthor.blockContainerInfo.length; i<len; i++){
		blockInfo = currentAuthor.blockContainerInfo[i];
		for(var j= 0 in blockInfo){
			HTML+= template[j].replace(/(\[%(.*?)%\])/igm,function(){
				return blockInfo[j][arguments[2]]||'';
			}).replace(/(\[%(.*?)%\])/igm,function(){
				return blockInfo[j][arguments[2]]||'';
			});
		}
	}

	window.pageInfoHTML = {};
	window.pageInfoHTML[name] = HTML;

	return HTML;
}