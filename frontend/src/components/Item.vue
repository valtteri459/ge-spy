<template>
  <v-container fluid class='page'>
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <v-card>
            <v-card-title><h1 class='.font-weight-medium .display-3' mr-2>{{name}}</h1><v-spacer></v-spacer><span>item ID: {{$route.params.id}}</span></v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 pa-2>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs2>
                <v-card-media
                  :src='imgPrfx + $route.params.id'
                  height='125px'
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs10>
                <h1>Statistics</h1>
                <h4 class='grey--text'>updated {{Math.floor(Math.abs(new Date() - this.timeStamp)/1000/60)}} minutes ago</h4>
                  <table style='width:100%'>
                    <tr>
                      <td><b>Current price:</b></td><td>{{osbOverall.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>Trade volume (3h):</b></td><td>{{(buy_quantity + sell_quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>Sell price:</b></td><td>{{osbSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>Buying quantity(3h):</b></td><td>{{buy_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>Buy price:</b></td><td>{{osbBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>Sell quantity(3h):</b></td><td>{{sell_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>Store price:</b></td><td>{{storePrice}} gp</td>
                      <td><b>GE limit:</b></td><td>{{geLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                  </table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 pa-2>
        <v-card>
          <v-card-title>
            <h2>Price graph</h2>
          </v-card-title>
          <v-card-text>
            <div style='width: 100%;overflow:hidden' v-if='!loading'>
              <chartjs-line :labels='mylabels' :datasets='mydatasets' :option="myoption"></chartjs-line>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import limits from '@/assets/limits.js'
export default {
  name: 'item',
  data () {
    return {
      loading: true,
      name: '',
      members: false,
      storePrice: 0,
      timeStamp: 0,
      osbOverall: 0,
      osbBuy: 0,
      osbSell: 0,
      buy_quantity: 0,
      sell_quantity: 0,
      imgPrfx: '',
      geLimit: 0,
      mylabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      mydatasets: [{
        label: 'Sell price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
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
          mode: 'label'
        },
        title: {
          display: true,
          position: 'bottom',
          text: 'Item price chart'
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
      this.loading = true
      this.axios.get('/api/imagePrefix').then(resultData => {
        this.imgPrfx = resultData.data.imagePrefix
        this.axios.get('/api/item/' + this.$route.params.id).then(resData => {
          this.axios.get('/api/itemHistory/' + this.$route.params.id + '/' + new Date().getTime()).then(graphData => {
            var elem = resData.data
            this.name = elem.name
            this.member = elem.members === 1
            this.storePrice = elem.storePrice
            this.timeStamp = elem.timeStamp
            this.osbOverall = elem.osbOverall
            this.osbBuy = elem.osbBuy
            this.osbSell = elem.osbSell
            this.buy_quantity = elem.buy_quantity
            this.sell_quantity = elem.sell_quantity
            this.geLimit = limits.filter(filterRow => filterRow.item === elem.name)[0].limit
            this.mylabels = graphData.data.map(elem => {
              var cdate = new Date(elem.timeStamp)
              return cdate
            })
            this.mydatasets[0].data = graphData.data.map(elem => {
              return elem.osbSell
            })
            this.mydatasets[1].data = graphData.data.map(elem => {
              return elem.osbBuy
            })
            this.mydatasets[2].data = graphData.data.map(elem => {
              return elem.osbOverall
            })
            this.loading = false
          }).catch(e => console.lo(e))
        }).catch(e => console.log(e))
      }).catch(e => console.log(e))
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
