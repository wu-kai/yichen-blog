<template>
  <div id="map">
    <div id="container"></div>
    <div class="shade"></div>
  </div>
</template>

<script>
  import china from '@/js/china.js';

  export default {
    name: 'Map',
    methods: {},
    mounted() {
      $.getJSON('https://data.jianshukeji.com/jsonp?filename=geochina/cities.json&callback=?', function (chinaCity) {

        var map = new Highcharts.Map('container', {
          title: {
            text: '我的足迹'
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          tooltip: {
            useHTML: true,
            formatter: function () {
              return this.point.name;
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: false
              },
              marker: {
                radius: 3
              }
            }
          },
          series: [{
            // 空数据列，用于展示底图
            mapData: Highcharts.maps['cn/china'],
            showInLegend: false
          }, {
            type: 'mappoint',
            name: '这些城市我曾去过',
            data: china.getData(chinaCity)
          }]
        });
      });
    }

  }
</script>

<style scoped>
  #map {
    height: 500px;
    position: relative;
  }

  #container {
    height: 100%;
  }

  .shade {
    position: absolute;
    width: 200px;
    height: 20px;
    background: #fff;
    bottom: 0;
    right: 0;
  }
</style>
