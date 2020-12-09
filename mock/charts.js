
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

module.exports = [
  // search classes
  {
    url: '/vue-element-admin/data/classes',
    type: 'get',
    response: () => {
      const info = {
        grade_options: [{
          value: '2017',
          label: '2017级'
        }, {
          value: '2018',
          label: '2018级'
        }, {
          value: '2019',
          label: '2019级'
        }, {
          value: '2020',
          label: '2020级'
        }],
        class_options: [{
          value: '1',
          label: '1班'
        }, {
          value: '2',
          label: '2班'
        }, {
          value: '3',
          label: '3班'
        }, {
          value: '4',
          label: '4班'
        }, {
          value: '5',
          label: '5班'
        }, {
          value: '6',
          label: '6班'
        }, {
          value: '7',
          label: '7班'
        }, {
          value: '8',
          label: '8班'
        }, {
          value: '9',
          label: '9班'
        }]
      }
      return {
        code: 20000,
        data: info
      }
    }
  }, {
    url: '/vue-element-admin/data/students',
    type: 'get',
    response: () => {
      Math.round(Math.random() * 10)
      const info = {
        seriesData: [{
          name: '小李',
          score: [randomNum(40, 50), randomNum(40, 50), randomNum(40, 50), randomNum(40, 60), randomNum(40, 70), randomNum(40, 60)]
        }, {
          name: '小红',
          score: [randomNum(60, 80), randomNum(60, 80), randomNum(60, 80), randomNum(60, 80), randomNum(60, 80), randomNum(60, 80)]
        }, {
          name: '小赵',
          score: [randomNum(80, 90), randomNum(80, 90), randomNum(80, 90), randomNum(80, 90), randomNum(80, 90), randomNum(80, 90)]
        }, {
          name: '小王',
          score: [randomNum(90, 100), randomNum(90, 100), randomNum(90, 100), 79, 89, 69]
        }],
        titleInfo: {
          title: 'kaoshi',
          legend: ['小李', '小红', '小赵', '小王'],
          xAxis: ['一考', '二考', '三考', '四考', '五考', '六考'],
          yAxis: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          yName: '分'
        }
      }
      return {
        code: 20000,
        data: info
      }
    }
  }, {
    url: '/vue-element-admin/data/exams',
    type: 'get',
    response: () => {
      Math.round(Math.random() * 10)
      const info = {
        exam_options: [{
          value: '1',
          label: '一月考'
        }, {
          value: '2',
          label: '二月考'
        }, {
          value: '3',
          label: '三月考'
        }]
      }
      return {
        code: 20000,
        data: info
      }
    }
  }
]
