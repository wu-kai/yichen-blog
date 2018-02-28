<template>
    <div>
        <main-nav></main-nav>
        <div id="home">
            <div v-for="blog in blogList" class="blogList">
                <h2 v-text="blog.title"></h2>
                <div class="info">
                    <p v-text="'作者 : '+blog.author" class="author"></p>
                    <p v-text="'标签 : '+blog.label" class="label info-common"></p>
                    <p class="time info-common">时间 : {{blog.createTime | time}}</p>
                </div>
                <div class="content" v-html="blog.body"></div>
            </div>
        </div>
    </div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'home',
		data: function () {
			return {
				blogList: [],
				labels: []
			}
		},
		components: {
			'demo1': {
				template: '<div>demo1</div>'
			},
		},
		methods: {
			getList: function () {
				var self = this;
				axios.get('/blog/findAll').then(function (data) {
					if (data.status === 200) {
						self.blogList = self.blogList.concat(data.data);
					}
				})
			},
		},
		filters: {
			time: function (value) {
				var date = new Date(value),
					y    = date.getFullYear(),
					M    = date.getMonth(),
					d    = date.getDay(),
					h    = date.getHours(),
					m    = date.getMinutes(),
					s    = date.getSeconds();
				return date.toLocaleString();
			}
		},
		mounted: function () {
			this.getList();
		}
	}
</script>

<style lang="less" scoped>
    #home {
        margin: 200px auto 0;
        width: 60%;
        h1 {
            text-align: center
        }
        .blogList {
            background: #fff;
            padding: 10px;
            box-shadow: 0 0 15px 1px #d1d1d1;
            margin-top: 20px;
            h2 {
                text-align: center;
                margin: 0;
                font-size: 30px;
            }
            p {
                margin: 0;
            }
            .info{
                text-align: center;
            }
            .author {
                text-align: center;
                padding: 5px 0;
                font-size: 13px;
                color: #7c7c7c;
            }
            .info-common{
                font-size: 12px;
                color: #9e9e9e;
                display: inline-block;
                width: 49%;
                box-sizing: border-box;
                padding: 8px 10px;
            }
            .label {
                text-align: right;
            }
            .time {
                text-align: left;
            }
            .content {
                padding: 10px;
                border: 1px solid #e2e2e2;
            }
        }
    }
</style>