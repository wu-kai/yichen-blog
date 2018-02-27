<template>
    <div id="admin">
        <div class="list">
            <ol>
                <li>123</li>
            </ol>
        </div>
        <div class="content">
            <div>
                <div>
                    <form>
                        <div class="form-group">
                            <label for="title">Title:</label>
                            <input id="title" class="form-control" type="text" placeholder="title" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="author">author:</label>
                            <input id="author" class="form-control" type="text" placeholder="author" v-model="author">
                        </div>
                        <div class="form-group">
                            <label for="label">label:</label>
                            <input id="label" class="form-control" type="text" placeholder="多个标签请用空格隔开" v-model="label">
                        </div>
                        <div class="form-group">
                            <label for="category">category:</label>
                            <input id="category" class="form-control" type="text" placeholder="分类" v-model="category">
                        </div>
                    </form>
                </div>

                <textarea name="con_text" id="" style="width:500px;min-height:620px;display:none"></textarea>
                <script id="editor" type="text/plain"></script>

                <div class="btn btn-success submit" @click="submit">submit</div>
                <div class="btn btn-danger cancel" @click="submit">cancel</div>
            </div>
        </div>
    </div>
</template>

<script>
    
	export default {
		name: 'admin',
        data:function(){
			return {
				demo:'demo',
				label:'',
				title:'',
				ue:{},
				body:'',
				category:'',
				author:''
            }
        },
		methods:{
			submit:function(){
				this.body = this.ue.getContent();
				var self = this;
				var blog = {
					title:self.title,
					label:self.label.split(' '),
					category:self.category,
					body:self.body,
					author:self.author || '一尘'
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

	}
</script>

<style lang="less" scoped>
#admin{
    margin-top: 90px;
    color: #fffdfd;
    .content{
        width: 1200px;
        margin: 0 auto;
        background: rgba(120, 120, 120, 0.44);
        padding: 20px 40px 10px 40px;
        border-right:5px;
        box-shadow: 0 0 10px 1px #616161;
    }
    .cancel{
        border: none;
        margin-top: 20px;
        margin-left: 20px;
    }
    .submit{
        margin-top: 20px;
    }
}
</style>