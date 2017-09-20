<template>
    <div class="chart-list">
        <div class="chart-box">
            <h2>pieDemo</h2>
            <pie-demo></pie-demo>X#
        </div>
        <div class="chart-box">
            <h2>baseDemo</h2>
            <base-demo></base-demo>
        </div>
    </div>
</template>

<script>
	import baseDemo from '../component/bb-chart-baseDEMO.vue';
	import pieDemo from '../component/bb-chart-pieDEMO.vue';

	export default {
		name: '',
		data: function () {
			return {}
		},
		components: {
			baseDemo,
			pieDemo
		}
	}
</script>

<style lang="less" scoped>
    .chart-list {
        margin-top: 50px;
        h2{
            text-align: center;
            margin: 0;
        }
    }

    .chart-box {
        box-shadow: 0 0 20px 1px #c1c1c1;
        box-sizing: border-box;
        width: 100%;
        margin-top: 25px;
        padding: 10px;
    }
</style>