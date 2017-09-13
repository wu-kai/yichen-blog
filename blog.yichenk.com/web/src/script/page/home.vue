<template>
    <div id="home">
        <demo1></demo1>
    </div>
</template>

<script>
	export default {
		name: 'home',
		components: {
			'demo1':{
				template:'<div>demo1</div>'
            },
        }
	}
</script>

<style lang="less" scoped>
    #home{
        margin-top: 30px;
    }
</style>