
var vm = new Vue({
	el:'#app',
	data:{
		demo:'demo',
		label:'',
		title:'',
		ue:{},
		body:'',
		author:'一尘'
	},
	methods:{
		submit:function(){
			console.log(this.ue.getContent());
		}
	},
	mounted:function() {
		this.ue = UE.getEditor('editor',{
			initialFrameHeight:450
		});
	}
});

