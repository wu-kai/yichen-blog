<template>
    <header>
        <nav id="blog-nav" class="navbar navbar-default navbar-fixed-top">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <img alt="Brand" src="">
                </a>
            </div>
            <ul class="nav navbar-nav">
                <li  :class="active === 'home'?'route-active':''" class="navbar-left">
                    <router-link to="home">Home</router-link>
                </li>
                <li :class="active === 'blog'?'route-active':''" class="navbar-left">
                    <router-link to="blog">Blog</router-link>
                </li>
                <!--<li :class="active === 'chart'?'route-active':''" class="navbar-left">-->
                    <!--<router-link to="chart">Hchart</router-link>-->
                <!--</li>-->
                <!--<li :class="active === 'bbChart'?'route-active':''" class="navbar-left">-->
                    <!--<router-link to="bbChart">bbChart</router-link>-->
                <!--</li>-->
                <!--<li :class="active === 'about'?'route-active':''" class="navbar-left">-->
                    <!--<router-link to="about">About</router-link>-->
                <!--</li>-->
            </ul>
            <form class="navbar-form navbar-right" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search" />
                </div>
            </form>
        </nav>
    </header>
</template>

<script>
	export default {
		name: 'main-nav',
		data: function () {
			return {
				active: 'home'
			}
		},
		watch: {
			'$route': function (to) {
				this.active = to.name;
			}
		}
	}
</script>

<style lang="less" scoped>
    nav{
        padding: 10px 150px;
    }
    nav#blog-nav{
        background: #000000 url('../../images/bg2.jpg') 5px -300px no-repeat !important;
        background-size:110% 10%;
        border-bottom: none;
        z-index: 1;
        a{
            color: #fff !important;
            font-size: 16px;
        }
    }
</style>