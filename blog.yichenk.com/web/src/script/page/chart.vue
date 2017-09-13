<template>
    <div class="box">
        <div id="chart1"></div>
        <div id="chart2"></div>
    </div>
</template>
<script>
	var Highcharts = require('highcharts');
	export default {
		name: '',
		mounted: function () {
			var chart1 = new Highcharts.Chart('chart1', {
				chart: {
					type: 'bar'
				},
				title: {
					text: 'chart1'
				},
				xAxis: {
					categories: ['win10', 'android', 'ios']
				},
				yAxis: {
					title: {
						text: 'usage amount'
					}
				},
				series: [{
					name: 'CN',
					data: [11, 8, 20]
				}, {
					name: 'KO',
					data: [8, 17, 13]
				}],
				credits:{ enabled:false },
				exporting: { enabled:false }
			})
			var chart2 = new Highcharts.Chart('chart2', {
				chart: {
					type: 'area'                         //指定图表的类型，默认是折线图（line）
				},
				title: {
					text: 'chart2'                //指定图表标题
				},
				xAxis: {
					categories: ['win10', 'android', 'ios']
				},
				yAxis: {
					title: {
						text: 'usage amount'
					}
				},
				series: [{
					name: 'CN',
					data: [15, 9, 14]
				}, {
					name: 'KO',
					data: [21, 6, 32]
				}],
				credits:{ enabled:false },
				exporting: { enabled:false }
			})
		}

	}
</script>

<style lang="less" scoped>

</style>