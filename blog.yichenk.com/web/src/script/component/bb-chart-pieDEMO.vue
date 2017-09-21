<template>
    <div>
        <div id="chart2"></div>
        <div id="chart3"></div>
    </div>
</template>

<script>

	var test = [];
	var chart3Columns = {
		Window: [
			["x", "Window 7", "Window XP", "Window Vista", "Window 8.1"],
			["number", 1500, 600, 200, 200]
		],
		BSD: [
			["x", "OpenBSD"],
			["number", 300],
		],
		IOS: [
			["x", "IOS 6", "IOS 5"],
			["number", 300, 100],
		],
		Linux: [
			["x", "Linux(Ubuntu)", "Linux"],
			["number", 600, 200],
		],
		OSX: [
			["x", "OS X 10.5 Leopard", "OS X", "OS X 10.6 Snow Leopard", "OS X 10.8 Mountain Lion", "OS X 10.9 Mavericks"],
			["number", 600, 600, 600, 300, 100],
		],
		unknown: [
			["x", "unknown"],
			["number", 2400],
		],
	};
	var count = 8600;
	export default {
		mounted: function () {
			var chart2 = bb.generate({
				bindto: "#chart2",
				data: {
					columns: [
						["Window", 2500],
						["BSD", 300],
						["IOS", 400],
						["Linux", 800],
						["OSX", 2200],
						["unknown", 2400],
					],
					type: "pie",
					onclick: function (d, i) {

						chart3.load({
							columns: chart3Columns[d.id],
							unload: test
						});

						test = [];

						_.each(chart3Columns[d.id], function (data) {
							test.push(data[0]);
						});

					}

				},
				pie: {
					label: {
						show: true,
						format: function (value, ratio, id) {
							return Math.floor((value / count) * 100) + '%';
						},
						threshold: 0,

						// set ratio callback. Should return ratio value
						ratio: function (d, radius, h) {
							return 1.7;
						},
					},
					expand: false,
					padAngle: [0.01]
				},
				tooltip: {
					format: {
						title: function (d) {
							return 'Data ' + d;
						},
						value: function (value, ratio, id) {
							var format = id === 'data1' ? d3.format(',') : d3.format('$');
							return format(value);
						}
					}
				},

			});
			var chart3 = bb.generate({
				bindto: "#chart3",
				data: {
					x: "x",
					type: "bar",
					columns: [],

				},
				axis: {
					rotated: true,
					x: {
						type: "category",
					},
					y: {
						tick: {
							format: function (d) {
								return d + 'k'
							},
							rotate: 50
						},
					}
				}
			});
		}
	}
</script>

<style lang="less" scoped>
    #chart {
    }
</style>