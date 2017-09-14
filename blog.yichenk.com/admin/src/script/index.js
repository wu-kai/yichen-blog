
var vm = new Vue({
	el:'#app',
	data:{
		demo:'demo',
		label:'',
		title:'',
		ue:{},
		body:'',
		category:'',
		author:''
	},
	methods:{
		submit:function(){
			this.body = this.ue.getContent();
			var self = this;
			var blog = {
				title:self.title,
				label:self.label,
				category:self.category,
				body:self.body,
				author:self.author
			};
			console.log(blog);
			$.ajax({
				url:'/blog/createBlog',
				method:'POST',
				data:blog
			}).then(function(data,err){
				if(data&&data.status === 'success'){
					alert('创建成功');
					self.title = '';
					self.label = '';
					self.category = '';
					self.ue.setContent('');
				}
			})
		}
	},
	mounted:function() {
		this.ue = UE.getEditor('editor',{
			initialFrameHeight:250
		});
	}
});

