


var demo1 = {
	name:'demo1',
	age:1
};

var demoList = [];

function getAll(){
	$.get('/demo/findAll',function(data){
		demoList = data;
		console.log(demoList);
	});
}

function create(){
	$.post('/demo/createDemo',demo1).then(function(data){
		console.log(data);
		getAll()
	});
}

function deleteLast() {
	if (demoList.length === 0) {
		return false;
	}
	var last = demoList[demoList.length - 1];
	$.get('/demo/deleteDemoById/'+last._id)
		.then(function (data) {
			console.log(data);
			getAll();
		})
}

$('#createDemo').on('click',function(){
	create();
});

$('#deleteDemo').on('click',function(){
	deleteLast();
});

getAll();
