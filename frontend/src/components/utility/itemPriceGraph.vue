<template>
  <v-card style="height: 100%;display:flex;flex-direction:column">
    <v-card-title v-if="!hidehead">
      <h2>Price graph</h2>
    </v-card-title>
    <v-card-text style="flex-grow:1;display:flex;flex-direction:column">
      <div style='width: 100%;flex-grow:1;display:flex;flex-direction:column' v-if='!loading'>
        <div style="flex-grow:1;padding:0px;margin:0px;border:0px;display: flex;">
          <chartjs-line :labels='mylabels' :datasets='mydatasets' :option="myoption" :bind="true" style="flex:1;width:100%;"></chartjs-line>
        </div>
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
        maintainAspectRatio: false,
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
            type: 'time',
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                let newValue = value
                const suffixes = ['', 'K', 'M', 'B', 'T']
                let suffixNum = 0
                while (newValue >= 1000) {
                  newValue /= 1000
                  suffixNum++
                }

                newValue = newValue.toPrecision(3)

                newValue += suffixes[suffixNum]
                return newValue
              }
            }
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
* {
   box-sizing: border-box;
  min-width:0;
   max-width:100%;
   max-height:100%;
  overflow:hidden;
 }
</style>
