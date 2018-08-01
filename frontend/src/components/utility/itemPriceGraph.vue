<template>
  <v-card>
    <v-card-title v-if="!hidehead">
      <h2>Price graph</h2>
    </v-card-title>
    <v-card-text>
      <div style='width: 100%;max-width:1700px; overflow:hidden;min-width:0' v-if='!loading'>
        <chartjs-line :labels='mylabels' :datasets='mydatasets' :option="myoption" :bind="true"></chartjs-line>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'item',
  props: ['datas', 'loading', 'hidehead'],
  data () {
    return {
      mylabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      mydatasets: [{
        label: 'Sell price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#00BCD4',
        borderColor: '#00BCD4',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#00BCD4',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#00BCD4',
        pointHoverBorderColor: '#00BCD4',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
        spanGaps: false
      },
      {
        label: 'Buy price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#FFB300',
        borderColor: '#FFB300',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FFB300',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FFB300',
        pointHoverBorderColor: '#FFB300',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 20, 40, 41, 66, 25, 80],
        spanGaps: false
      },
      {
        label: 'Average price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#43A047',
        borderColor: '#43A047',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#43A047',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#43A047',
        pointHoverBorderColor: '#43A047',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 20, 40, 41, 66, 25, 80],
        spanGaps: false
      }],
      myoption: {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          'mode': 'label',
          callbacks: {
            label: (tooltipItem, data) => {
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + this.formatNum(tooltipItem.yLabel) + ' coins'
            }
          }
        },
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time'
          }]
        }
      }
    }
  },
  methods: {
    updateData () {
      this.mylabels = this.datas.map(elem => {
        var cdate = new Date(elem.timeStamp)
        return cdate
      })
      this.mydatasets[0].data = this.datas.map(elem => {
        return elem.osbSell || null
      })
      this.mydatasets[1].data = this.datas.map(elem => {
        return elem.osbBuy || null
      })
      this.mydatasets[2].data = this.datas.map(elem => {
        return elem.osbOverall || null
      })
    },
    formatNum (inNum) {
      return inNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  watch: {
    datas: function (val) {
      this.updateData()
    }
  },
  mounted: function () {
    this.updateData()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
