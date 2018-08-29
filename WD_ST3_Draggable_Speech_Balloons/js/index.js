$(function () {

	$('#draggable').draggable({snap:true, containment: ".main", scroll: false});
	const main = $('#main');
	const draggable = $('.draggable');
	const html = $("html");
	const body = $("body");
	const enter = 13;
	const escape = 27;

	// Create div on the mouse position
	main.on("dblclick", function(event) {
		const div = $('<div class="draggable ui-widget-content btn btn-primary" data-toggle="modal" data-target="#exampleModal"><p>corner</p><input type="hidden" class="dragInput" value=""> </div>')
		.appendTo("main")
		.css({
				"left": event.pageX + 'px',
				"top": event.pageY + 'px'
			})
		.bind()
		.draggable({snap:true, containment: ".main", scroll: false});	
	});

	// show input dbclick
	main.on("dblclick", '.draggable', function(event) {
		$(this).find('input').attr("type", "text").focus().val($(this).text().trim());
		event.stopPropagation();
	});

	// 
	main.on("blur", '.draggable', function(event) {
		$(event.target).attr("type", "hidden");
		const value = $(event.target).val();
		$(event.target).parent().find('p').text(value);
		alert("focusout");
	});


	$(document).keyup(function(event) {
		if (event.which === enter) {	
			let value = $(event.target).val();
			value = value.slice(0, 70);
			alert(value);
			if (value.length < 36) {
				$(this).find('div').css("height", "20%");
			}
			if (value.length > 37) {
				$(this).find('div').css("height", "30%");
			}
			if (value.length > 58) {
				$(this).find('div').css("height", "37%");
			}
			$(event.target).val(value);
			$(event.target).attr("type", "hidden");
			$(event.target).parent().find('p').text(value);	
			event.stopPropagation();
		} 
		if (event.which === escape) {
			alert("esc");
			let value = $(event.target).val();
			$(event.target).val(value);
			$(event.target).attr("type", "hidden");
			event.stopPropagation();
		}

	});

	//  Check resize window
	/*$(window).resize( function(event) {
		$(".mainResize").text("Width: "+ window.innerWidth + ", height" +window.innerHeight);
	});*/
});

