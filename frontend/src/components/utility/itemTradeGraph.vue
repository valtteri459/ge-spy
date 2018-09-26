<template>
  <v-card>
    <v-card-title>
      <h2>Trade volumes</h2>
    </v-card-title>
    <v-card-text>
      <div style='width: 100%;max-width:1700px; overflow:hidden' v-if='!loading'>
        <chartjs-bar :labels='mylabels' :datasets='mydatasets' :option="myoption" :bind="true"></chartjs-bar>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'item',
  props: ['datas', 'loading'],
  data () {
    return {
      mylabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      mydatasets: [{
        label: 'Buy quantity',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#F44336',
        borderColor: '#F44336',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#F44336',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#F44336',
        pointHoverBorderColor: '#F44336',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
        spanGaps: false
      },
      {
        label: 'Sell quantity',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#2196F3',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#2196F3',
        pointHoverBorderColor: '#2196F3',
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
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + this.formatNum(tooltipItem.yLabel)
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
      console.log(this.datas)
      this.mydatasets[0].data = this.datas.map(elem => {
        return elem.buy_quantity
      })
      this.mydatasets[1].data = this.datas.map(elem => {
        return elem.sell_quantity
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
