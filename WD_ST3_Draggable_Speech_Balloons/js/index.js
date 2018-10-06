$(function () {
	const main = $('#main');
	const urlPhp = 'php/dataBase.php';
	const key = {
		replaceContent: "replaceContent=",
		addNewDraggableToJson: "addNewDraggableToJson=",
		removeElementById: "removeElementById=",
		addNewСoordinationToJson: "addNewСoordinationToJson="
	}
	getInfoAboutDraggableFromJson();

	main.on("dblclick", function(event) {
        $.ajax({
			type : 'POST',
			url : urlPhp,
			data : 'getId=',
			success: function(ressponce) {
				ressponce++;
				const div = $(`
				<div class="draggable" id="${ressponce}">
					<p></p>
					<input type="text" class="dragInput" value="corner">
				</div>`)
				.appendTo("main")
				.css({
					"left": event.pageX + 'px',
					"top": event.pageY + 'px'
				})
				.bind()
				.draggable({
					containment: ".main",
		 			scroll: false
				 });	
				let ballon = {	
					id: ressponce,
					positionX : event.pageX,
					positionY : event.pageY,
					content : "corner",
					deleted : false
				};
				recordInBase(key.addNewDraggableToJson, JSON.stringify(ballon)); 
				$("div input:text").first().focus();
			}
		});	
	});

	main.on("dblclick", '.draggable', function(event) {
		$(this).find('input').attr("type", "text").focus().val($(this).text().trim());
		event.stopPropagation();
	});

	$(document).on("blur", "input.dragInput", function(event) {
		const target = $(event.target);
		const value = target.val();
		const id = $(this).parent().attr('id');
		if (value.length == 0) {
			$(`#${id}`).remove();
			recordInBase(key.removeElementById, id);
			return;
		}
		target.attr("type", "hidden");
		target.parent().find('p').text(value);
			let obj = {
				id: id,
				content: value
			};
			recordInBase(key.replaceContent, JSON.stringify(obj));
	}); 	

	$(document).on("keyup", function(event) {
			const enter = 13;
			const escape = 27;
			const target = $(event.target);

		if (event.which === enter) {	
			const value = target.val(); 
			if (value.length == 0) {
				const id = target.parent().attr('id');
				$(`#${id}`).remove();
				recordInBase(key.removeElementById, id);
				return;
			}
			target.val(value);
			target.attr("type", "hidden");
			target.parent().find('p').text(value);
			const indexId = target.parent().attr('id');
			let obj = {
				id: indexId,
				content: value
			};
			recordInBase(key.replaceContent, JSON.stringify(obj));
			return;
		} 
		if (event.which === escape) {
			const value = $(event.target).val();
			$(event.target).val(value);
			$(event.target).attr("type", "hidden");
		}
	});

	function getInfoAboutDraggableFromJson() {
		$.ajax({
			type : 'POST',
			url : urlPhp,
			data : 'getInfoAboutDraggableFromJson=',
			success: function (ressponce) {
				let obj = $.parseJSON(ressponce);
				for (let value in obj) {
					if( !obj[value].deleted ) { 
						const div  = $(
							`<div class="draggable">
								<p>${obj[value].content}</p>
								<input type="hidden" class="dragInput">
							</div>`)
						.appendTo("main")
						.attr("id", obj[value].id)
						.css({
							left: obj[value]['positionX'] + 'px',
							top: obj[value]['positionY'] + 'px'
						})
						.bind()
						.draggable({
							containment: ".main", 
							scroll: false
						});
					}
				}

				$('.draggable').draggable({
					stop: function(event, ui) {
						const obj = `${ui.position.left},${ui.position.top},${event.target.id}`;
						recordInBase(key.addNewСoordinationToJson, obj)
					}
				});	
			}
		});
	};

	function recordInBase(key, obj) {
		console.log("obj - " + obj.id + obj.content);
		$.ajax({
			type : 'POST',
			url : urlPhp,
			data : `${key}` +  obj,
			success: function(ressponce) {
				console.log("ressponce - " + ressponce)
			}
		});
	}

});