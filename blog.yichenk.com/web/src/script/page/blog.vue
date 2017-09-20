<template>
    <div id="home">
        <h1>Blog List</h1>
        <div v-for="blog in blogList" class="blogList">
            <h2 v-text="blog.title"></h2>
            <p v-text="'作者 : '+blog.author" class="author"></p>
            <p v-text="'标签 : '+blog.label" class="label"></p>
            <div class="content" v-html="blog.body"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
	export default {
		name: 'home',
        data:function(){
			return {
				blogList:[],
                labels:[]
            }
        },
		components: {
			'demo1':{
				template:'<div>demo1</div>'
            },
        },
        methods:{
			getList:function(){
				var self = this;
				axios.get('/blog/findAll').then(function(data){
					if(data.status === 200){
						self.blogList = self.blogList.concat(data.data);
						console.log(data);
						console.log(self.blogList);
                    }
				})
            },
        },
        mounted:function(){
			this.getList();
        }
	}
</script>

<style lang="less" scoped>
    #home{
        h1{text-align: center}
        margin-top: 30px;
        .blogList{
            background: #fff;
            padding: 10px;
            margin-top: 25px;
            box-shadow: 0 0 15px 1px #d1d1d1;
            h2{
                text-align: center;
                margin: 0;
                font-size: 30px;
            }
            p{
                margin: 0;
            }
            .author{
                text-align: center;
                padding: 5px 0;
                font-size: 13px;
                color: #7c7c7c;
            }
            .label{
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #9e9e9e;
            }
            .content{
                padding: 10px;
                border: 1px solid #e2e2e2;
            }
        }
    }
</style>