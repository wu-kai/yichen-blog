<template>
    <header>
        <nav>
            <ul>
                <li :class="active === 'home'?'route-active':''"><router-link to="home">Home</router-link></li>
                <li :class="active === 'blog'?'route-active':''"><router-link to="blog">Blog</router-link></li>
                <li :class="active === 'chart'?'route-active':''"><router-link to="chart">Hchart</router-link></li>
                <li :class="active === 'bbChart'?'route-active':''"><router-link to="bbChart">bbChart</router-link></li>
                <li :class="active === ''?'route-active':''">About</li>
            </ul>
        </nav>
    </header>
</template>

<script>
	export default {
		name: 'main-nav',
        data:function(){
			return {
				active:'home'
            }
        },
        watch:{
        	'$route':function (to){
        		this.active = to.name;
			}
        }
	}
</script>

<style lang="less" scoped>
    header{
        background:#716f89;
        color:#fff;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height: 30px;
        z-index: 999;
    }
    nav li{
        display:inline-block;
        cursor:pointer;
        padding: 0 10px;
        line-height: 30px;
        a{color:#fff;}
    }
    nav li:hover{
        background: #a89ea3;
    }
    .route-active{
        background: #a89ea3;
    }
</style>