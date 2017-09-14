<template>
    <div id="home">
        <demo1></demo1>
        <div v-for="blog in blogList">
            <h3 v-text="'title:'+blog.title"></h3>
            <p v-text="'作者:'+blog.author"></p>
            <p v-text="'标签:'+blog.label"></p>
            <div v-html="blog.body"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
	export default {
		name: 'home',
        data:function(){
			return {
				blogList:[]
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
        margin-top: 30px;
    }
</style>