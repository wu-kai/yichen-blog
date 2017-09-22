<template>
    <div>
        <div id="chart1"></div>
    </div>
</template>

<script>

	export default {
        mounted:function(){
			var chart = bb.generate({
				bindto: "#chart1",
				data: {
					type: "bar",
					columns: [
						["data1", 30, 200, 100, 170, 150, 250],
						["data2", 130, 100, 140, 35, 110, 50]
					],

				},
			});
			chart.axis.labels({
				x: "X",
				y: "Y"
			});
			chart.category(2, "Category 3");
			chart.categories([
				"Category 1", "Category 2"
			]);
        }
	}
</script>

<style lang="less" scoped>
#chart{
}
</style>