$(function () {
	$('#draggable').draggable({snap:true, containment: ".main", scroll: false});
	const main = $('#main');
	const draggable = $('.draggable');
	const enter = 13;
	const escape = 27;
	getDrag();

	// Create div on the mouse position
	main.on("dblclick", function(event) {
		return; // залипает даблклик на мышке
		const div = $('<div class="draggable><p>corner</p><input type="hidden" class="dragInput" value=""> </div>')// ui-widget-content btn btn-primary" data-toggle="modal" data-target="#exampleModal"
		.appendTo("main")
		.css({
			"left": event.pageX + 'px',
			"top": event.pageY + 'px'
		})
		.bind()
		.draggable({snap:true, containment: ".main", scroll: false});	

		let indexId = div.index();
		let jsonData = {	
			id: indexId,
			positionX : event.pageX,
			positionY : event.pageY,
			content : "corner"
		};
		addNewDraggToJson(jsonData);	
	});

	main.on('mouseup','.draggable', function(eventObject) {
		console.log('вы отпустили кнопку с обьекта под номером' + eventObject.target);
	});

	$("#test").on("click", function() {
		let id = 1;
		deleteElemntWithJson(id);
	});

	// show input dbclick
	main.on("dblclick", '.draggable', function(event) {
		$(this).find('input').attr("type", "text").focus().val($(this).text().trim());
		event.stopPropagation();
	});

	main.on("blur", '.draggable', function(event) {
		$(event.target).attr("type", "hidden");
		const value = $(event.target).val();
		$(event.target).parent().find('p').text(value);
		alert("focusout");
	});

	$(document).keyup(function(event) {
		main.off('blur', '.draggable');
		/*event.stopPropagation();*/
		if (event.which === enter) {	
			let value = $(event.target).val();
			alert(value);
			if(value.length > 70){
				value = value.slice(0, 70);
				alert("max length 70 symbol");
			}
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

			let indexId = $(event.target).index();
			saveChangesInBlock(indexId, value);
		} 
		if (event.which === escape) {
			alert("check esc");
			let value = $(event.target).val();
			$(event.target).val(value);
			$(event.target).attr("type", "hidden");
		}
	});
	//  Check resize window
	/*$(window).resize( function(event) {
		$(".mainResize").text("Width: "+ window.innerWidth + ", height" +window.innerHeight);
	});*/
	function saveChangesInBlock (id, content) {
		let informationOnTheBlock = [];
		informationOnTheBlock[0] = id;
		informationOnTheBlock[1] = content;
		$.ajax({
			type : 'POST',
			url : 'php/dataBase.php',
			data : 'informationOnTheBlock=' + informationOnTheBlock,
			success: function(response) {
				alert (response);
			}
		});
	};
	
	function deleteElemntWithJson(id) {
		$.ajax({
			type : 'POST',
			url : 'php/dataBase.php',
			data : 'removeIdElement=' + id,
			success: function(response) {
				alert(response);
			},
		});
	};

	function getDrag() {
		$.ajax({
			type : 'POST',
			url : 'php/dataBase.php',
			data : 'getDrag=',
			success: function (ressponce) {
				let obj = $.parseJSON( ressponce );
				for (let value in obj) {
					console.log(obj[value]['id']);
					const div  = $('<div class="draggable "><p>' + obj[value]['content'] +' </p><input type="hidden" class="dragInput"> </div>')
					.appendTo("main")
					.css({
						"left": obj[value]['positionX'],
						"top": obj[value]['positionY']
					})
					.bind()
					.draggable({snap:true, containment: ".main", scroll: false});
				}
			}
		});
	};

	function addNewDraggToJson (jsonData) {
		let objData = JSON.stringify(jsonData);
		$.ajax({
			type : 'POST',
			url : 'php/dataBase.php',
			data : 'objData1=' + objData,
			success: function (ressponce) {
			},
			error: function () {
				alert("error : AddNewDraggToJson");
			}
		});
		return false;
	};

	function test(test) {
		console.log("то что вернулось с php - " + test + " type - " +typeof(test));
		var obj = $.parseJSON( test );
		for (let value in obj ) {
			console.log(obj[value]['id']);
			console.log(obj[value]['positionX']);
			console.log(obj[value]['positionY']);
			console.log(obj[value]['content']);
		}
	};
});

