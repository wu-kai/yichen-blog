<template>
    <header>
        <nav>
            <ul>
                <li>Home</li>
                <li>Blog</li>
                <li>About</li>
            </ul>
        </nav>
    </header>
</template>

<script>
	export default {
		name: 'main-nav',
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
    }
    nav li{
        display:inline-block;
    }
</style>