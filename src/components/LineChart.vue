<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['measures'],
    data () {
      return {
        timestamp: [],
        temperature: [],
        ph: [],
        kh: [],
        gh: [],
        nh4: [],
        no2: [],
        no3: [],
        cu: [],
        chartData: {
          labels: [],
          datasets: []
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true,
            onClick: function(e, legendItem) {
              var index = legendItem.datasetIndex;
              var ci = this.chart;
              var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

              ci.data.datasets.forEach(function(e, i) {
                var meta = ci.getDatasetMeta(i);

                if (i !== index) {
                  if (!alreadyHidden) {
                    meta.hidden = meta.hidden === null ? !meta.hidden : null;
                  } else if (meta.hidden === null) {
                    meta.hidden = true;
                  }
                } else if (i === index) {
                  meta.hidden = null;
                }
              });

              ci.update();
            },
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      convertDate($date) {
        let date1 = new Date($date);
        date1.setHours(date1.getHours() - 1);
        let dateLocale = date1.toLocaleString('fr-FR',{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          });
        
        return dateLocale;
      }
    },
    mounted () {
        this.measures.forEach(measure => {
                this.timestamp.push(this.convertDate(measure.createdAt));
                this.temperature.push(measure.measure_temperature);
                this.ph.push(measure.measure_ph);
                this.kh.push(measure.measure_kh);
                this.gh.push(measure.measure_gh);
                this.nh4.push(measure.measure_nh4);
                this.no2.push(measure.measure_no2);
                this.no3.push(measure.measure_no3);
                this.cu.push(measure.measure_cu);
            });
        this.chartData.labels = this.timestamp;
        this.chartData.datasets.push({
            label: 'Temperature',
            data: this.temperature,
            fill: false,
            borderColor: '#f5b342',
            backgroundColor: '#f5b342',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'PH',
            data: this.ph,
            fill: false,
            borderColor: '#75d97f',
            backgroundColor: '#75d97fF',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'KH',
            data: this.kh,
            fill: false,
            borderColor: '#99e0ff',
            backgroundColor: '#99e0ff',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'GH',
            data: this.gh,
            fill: false,
            borderColor: '#7a7be6',
            backgroundColor: '#7a7be6',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'NH4',
            data: this.nh4,
            fill: false,
            borderColor: '#686b59',
            backgroundColor: '#686b59',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'NO2',
            data: this.no2,
            fill: false,
            borderColor: '#596b68',
            backgroundColor: '#596b68F',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'NO3',
            data: this.no3,
            fill: false,
            borderColor: '#69596b',
            backgroundColor: '#69596b',
            borderWidth: 1
        });
        this.chartData.datasets.push({
            label: 'Cu',
            data: this.cu,
            fill: false,
            borderColor: '#8f7764',
            backgroundColor: '#8f7764',
            borderWidth: 1
        });
        this.renderChart(this.chartData, this.options);
    }
  }
</script>