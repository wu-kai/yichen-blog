
var vm = new Vue({
	el:'#app',
	data:{
		demo:'demo'
	},
	method:{
		submit:submit
	},
	mounted:function() {
	}
});




function submit(){
	console.log(ue.getContent());
}

var ue = UE.getEditor('editor');
