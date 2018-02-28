<template>
    <div class="admin-box">
        <div id="particles-js"></div>
        <img class="logo" src="../../../images/logo.jpg" alt="">
        <div id="admin">
            <div class="list">
                <ol>
                    <li v-for="blog in blogList" :key="blog._id" v-text="blog.title" @click="selectBlog(blog)"></li>
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
                                <input id="author" class="form-control" type="text" placeholder="author"
                                       v-model="author">
                            </div>
                            <div class="form-group">
                                <label for="label">label:</label>
                                <input id="label" class="form-control" type="text" placeholder="多个标签请用空格隔开"
                                       v-model="label">
                            </div>
                            <div class="form-group">
                                <label for="category">category:</label>
                                <input id="category" class="form-control" type="text" placeholder="分类"
                                       v-model="category">
                            </div>
                        </form>
                    </div>

                    <textarea name="con_text" id="" style="width:500px;min-height:620px;display:none"></textarea>
                    <script id="editor" type="text/plain"></script>

                    <div class="btn btn-success submit" v-if="status==='add'" @click="submit">submit</div>
                    <div class="btn btn-success submit" v-if="status==='edit'" @click="edit">edit</div>
                    <div class="btn btn-danger submit" v-if="status==='edit'" @click="remove">remove</div>
                    <div class="btn btn-primary cancel" @click="cancel">cancel</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import _particlesJS from 'particles.js';
	import axios from 'axios'
	import _ from 'lodash'

	export default {
		name: 'admin',
		data: function () {
			return {
				demo: 'demo',
				label: '',
				title: '',
				ue: {},
				body: '',
				category: '',
				author: '',
				blogList: [],
				status: 'add'
			}
		},
		methods: {
			initData:function(){
				this.getList();
				this.label = '';
				this.title = '';
				this.body = '';
				this.category = '';
				this.author = '';
				this.ue.setContent('');
				this.status = 'add';
            },
			submit: function () {
				this.body = this.ue.getContent();
				var self = this;
				var blog = {
					title: self.title,
					label: self.label.split(' '),
					category: self.category,
					body: self.body,
					author: self.author || '一尘'
				};
				$.ajax({
					url: '/blog/createBlog',
					method: 'POST',
					data: blog
				}).then(function (data, err) {
					if (data && data.status === 'success') {
						alert('创建成功');
						self.initData();
					}
				})
			},
			edit: function () {
				this.body = this.ue.getContent();
				var self = this;
				var blog = {
					id: self.id,
					title: self.title,
					label: self.label.split(' '),
					category: self.category,
					body: self.body,
					author: self.author || '一尘'
				};
				axios.post('/blog/editBlog', blog)
					.then(function (data, err) {
						console.log(data);
						if (data && data.status === 200) {
							alert('修改成功');
							self.initData();
						}
					})
			},
			cancel: function () {
				this.initData();
			},
			getList: function () {
				var self = this;
				axios.get('/blog/findAll').then(function (data) {
					if (data.status === 200) {
						self.blogList = _.orderBy(data.data,['createTime'],['desc']);
					}
				});
			},
			selectBlog: function (b) {
				this.id = b._id;
				this.title = b.title;
				this.label = b.label.join(',');
				this.body = b.body;
				this.category = b.category;
				this.author = b.author;
				this.ue.setContent(b.body);
				this.status = 'edit';
			},
			remove:function(){
				var self = this;
				if(confirm('确认删除'+this.title+'?')){
					var id = this.id;
					axios.post('/blog/deleteBlogById',{id:id}).then(function (data) {
						console.log(data);
						if (data.status === 200) {
							self.initData();
                        }
					});
                }
            }
		},
		beforeCreate: function () {
			$('body').addClass('admin')
		},
		beforeMount: function () {
			this.getList();
			this.ue = UE.getEditor('editor', {
				initialFrameHeight: 250
			});
			particlesJS.load('particles-js', '/libStatic/particles.json', function () {
				console.log('callback - particles.js config loaded');
			});
		},
		beforeDestroy: function () {
			$('body').removeClass('admin')
		},
		mounted: function () {

		}

	}
</script>

<style lang="less" scoped>

    .admin-box {
        width: 100%;
        height: 100%;
        opacity: 0.88;
    }

    .logo {
        position: absolute;
        top: 10px;
        left: 20px;
        border-radius: 50%;
        z-index: -1;
    }

    #admin {
        color: #fffdfd;
        .content {
            width: 1200px;
            background: rgba(98, 98, 98, 0.44);
            padding: 20px 40px 10px 40px;
            border-right: 5px;
            box-shadow: 0 0 10px 1px #616161;
            position: absolute;
            left: 50%;
            margin-left: -600px;
            top: 80px;
        }
        .cancel {
            border: none;
            margin-top: 20px;
            margin-left: 20px;
        }
        .submit {
            margin-top: 20px;
        }
        > .list {
            position: absolute;
            left: 0;
            top: 120px;
            width: 140px;
            box-sizing: border-box;
            background: rgba(98, 98, 98, 0.44);
            border-right: 5px;
            padding: 10px 20px;
            box-shadow: 0 0 10px 1px #616161;
            min-height: 200px;
            ol{
                padding-left: 0;
                li{
                    cursor: pointer;
                    margin-top: 10px;
                    color: #b4674b;
                }
                li:hover{
                    color: #df825a;
                }
            }

        }
    }
</style>

<style>
    html > body.admin {
        background: url('../../../images/p_04.jpg') no-repeat center;
        background-size: cover;
    }
    @media (max-width: 1500px) {
        #admin .content{
            width: 800px;
            margin-left: -400px;
        }
    }
</style>