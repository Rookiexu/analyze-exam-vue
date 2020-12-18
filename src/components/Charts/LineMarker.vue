<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    seriesData: {
      type: String,
      default: 'seriesData'
    },
    titleInfo: {
      type: String,
      default: 'titleInfo'
    }
  },
  data() {
    return {
      chart: null,
      change: 1
    }
  },
  watch: {
    seriesData: {
      immediate: true,
      handler(curVal, oldVal) {
        console.log('seriesData', curVal, oldVal)
        if (curVal != null) {
          this.changeSeries(curVal)
        }
      }
    }, titleInfo: {
      immediate: true,
      handler(curVal, oldVal) {
        console.log('immediate', curVal, oldVal)
        if (curVal != null) {
          this.changeTitle(curVal)
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.initOption()
    }, changeSeries(series) {
      const result = new Array(series.length)
      for (let i = 0; i < series.length; i++) {
        const data = series[i]
        switch (i % 9) {
          case 1:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              label: {
                show: true
              },
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(137,189,27)',
                  borderColor: 'rgba(137,189,2,0.27)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 2:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              label: {
                show: true
              },
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(206,125,25)',
                  borderColor: 'rgba(172,116,34,0.27)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 3:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(219,50,51)',
                  borderColor: 'rgba(219,50,51,0.2)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 4:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              label: {
                show: true
              },
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(255,224,35)',
                  borderColor: 'rgba(135,103,38,0.27)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 5:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              label: {
                show: true
              },
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(215,15,212)',
                  borderColor: 'rgba(87,38,130,0.27)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 6:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(72,221,246)',
                  borderColor: 'rgba(69,173,173,0.2)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 7:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              label: {
                show: true
              },
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(0,250,141)',
                  borderColor: 'rgba(68,165,27,0.27)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          case 8:
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              label: {
                show: true
              },
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(255,255,255)',
                  borderColor: 'rgba(180,180,180,0.27)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
          default :
            result[i] = {
              name: data.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: true,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(255,117,117)',
                  borderColor: 'rgba(153,70,70,0.2)',
                  borderWidth: 12,
                  label: {
                    show: true
                  }
                }
              },
              data: data.score
            }
            break
        }
      }
      this.chart.setOption({ series: result })
    }, changeTitle(data) {
      this.chart.setOption({
        title: {
          text: data.title
        },
        legend: {
          data: data.legend
        },
        xAxis: [{
          data: data.xAxis
        }],
        yAxis: [{
          name: data.yName,
          data: data.yAxis,
          inverse: data.inverse,
          min: data.min
        }]
      })
    }, initOption() {
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: '等待加载数据中',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#47a1f6'
            }
          },
          formatter: function(params) {
            let res = params[0].axisValueLabel

            function getHtml(param) {
              const str = '<div style="float: left"><span style="background: ' + param.color + '; width: 11px; height: 11px; border-radius: 11px;float: left; margin: 5px 3px;"></span>' +
                param.seriesName + ':' + param.data + '&emsp;&emsp;</div>'
              return str
            }

            res += '<div style="clear: both">'
            for (let i = 0; i < params.length; i++) {
              res += getHtml(params[i])
              if (params.length > 11 && i % 2 === 1) {
                res += '</div><div style="clear: both">'
              }
              if (params.length <= 11) {
                res += '</div><div style="clear: both">'
              }
            }
            res += '</div>'
            return res
          }
        },
        legend: {
          type: 'scroll',
          pageIconColor: '#18ec22',
          top: 50,
          icon: 'diamond',
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 13,
          data: null,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          },
          selector: ['all', 'inverse']
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#F1F1F3'
            }
          },
          data: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120']
        }],
        yAxis: [{
          type: 'value',
          name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#F1F1F3'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: ['100', '80', '60', '40', '20', '10', '0']
        }],
        series: {
          showAllSymbol: true
        }

      })
    }
  }
}
</script>

