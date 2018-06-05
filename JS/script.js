console.log("conneted");

var toDoList = [];//array
var clickID;
//1. thêm to-do mới

function addNewToDo(toDoText,toDoDesc){
	var date = new Date();
	var toDoItem = {
		id: date.getTime(),
		title: toDoText,
		description: toDoDesc,
		completed: false,
	};//Object
	toDoList.push(toDoItem);
	$('ul').append('<li id="'+toDoItem.id+'"><span class="delete"><i class="fa fa-trash" aria-hidden="true"></i></span><span class="info" data-toggle="modal" data-target="#myModal1"><i class="fa fa-info" aria-hidden="true"></i></span> <span class="check"><i class="fa fa-check-square" aria-hidden="true"></i></span>'+toDoText+'</li>');
	saveToDoList();
}
//2. tạo danh sách to-do vào localStorage
function saveToDoList(){
	if (localStorage) {
		localStorage.setItem("ToDoList",JSON.stringify(toDoList));
	}
}
//3. đọc to-do list từ localStorage
function loadToDoList(){
	$('ul').html('');
	if (localStorage && localStorage.getItem("ToDoList")){
         toDoList = JSON.parse(localStorage.getItem("ToDoList"));
         toDoList.forEach(function(toDoItem){
            if (toDoItem.completed) {
              $('ul').append('<li id="'+toDoItem.id+'" class="completed"><span class="delete"><i class="fa fa-trash" aria-hidden="true"></i></span><span class="info" data-toggle="modal" data-target="#myModal1"><i class="fa fa-info" aria-hidden="true"></i></span> <span class="check"><i class="fa fa-check-square" aria-hidden="true"></i></span>'+toDoItem.title+'</li>');
            }else{
              $('ul').append('<li id="'+toDoItem.id+'"><span class="delete"><i class="fa fa-trash" aria-hidden="true"></i></span><span class="info" data-toggle="modal" data-target="#myModal1"><i class="fa fa-info" aria-hidden="true"></i></span> <span class="check"><i class="fa fa-check-square" aria-hidden="true"></i></span>'+toDoItem.title+'</li>');
            }
         });
	}
}


loadToDoList();

//4. sự kiện nhấn vào 1 to-do,chuyển trạng thái complete
$('ul li').find('span[class="check"]').click(function(){
  $(this).parent().toggleClass('completed');
  var id = $(this).attr('id');
  for (var i = 0; i < toDoList.length; i++) {
			if(toDoList[i].id == id){
				console.log("Found ad:"+i);
				toDoList[i].completed = !toDoList[i].completed;
				saveToDoList();
				break;
			}
		}
});
//5. nhấn delete
$('ul li').find('span[class="delete"]').click(function(){
	$(this).parent().slideUp(500,function(){
		var id = $(this).attr('id');
		for (var i = 0; i < toDoList.length; i++) {
			if(toDoList[i].id == id){
				//console.log("Found ad:"+i);
				toDoList.splice(i,1);
				saveToDoList();
				break;
			}
		}
		$(this).remove();
		// xóa bỏ to-do khỏi mảng
	})
})
//6. ấn input để nhập to-do mới
// $('.fa-plus').click(function(){
// 	$('#container input').fadeToggle(500);
// })

//7. xử lý thêm to-do mới
$('#container input').keypress(function(e){
	if(e.which === 13){
		var toDoText = $(this).val();
		$(this).val('');
		addNewToDo(toDoText);
	}
})
//.Them moi bang btn-plus
$('.btn-save').click(function(){
	var toDoText = $('.form-group').find('input[name="title"]').val();
	var toDoDesc = $('.form-group').find('textarea[name="description"]').val();
	addNewToDo(toDoText,toDoDesc);

	// $('.modal').attr("style", 'display:none');
})

//.Edit todoItem
$('ul li').find('span[class="info"]').click(function(){
	var id = $(this).parent().attr('id');
	clickID = id;
	console.log(clickID);
	for (var i = 0; i < toDoList.length; i++) {
			if(toDoList[i].id == id){
				var title = toDoList[i].title;
				var description = toDoList[i].description;
				console.log(title);
				console.log(description);
				$('.form-group1').find('input[name="title"]').attr("value", title);
				$('.form-group1').find('textarea[name="description"]').html(description);
				return clickID;
			}
		}
})


$('.btn-save1').click(function(){
	var toDoText = $('.form-group1').find('input[name="title"]').val();
	var toDoDesc = $('.form-group1').find('textarea[name="description"]').val();
	console.log(toDoText);
	console.log(toDoDesc);
	var id = clickID;
	console.log(id);
	for (var i = 0; i < toDoList.length; i++) {
			if(toDoList[i].id == id){
				toDoList[i].title = toDoText;
				toDoList[i].description = toDoDesc;
				break;
			}
		}
	saveToDoList();
	location.reload();
	// $('.modal').attr("style", 'display:none');
})

