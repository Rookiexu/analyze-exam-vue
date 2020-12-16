import request from '@/utils/request'

export function getClassList() {
  return request({
    url: '/data/classes',
    method: 'get'
  })
}

export function getScore(grade, checkList) {
  let classList = ''
  let i = 0
  for (const argumentsKey of checkList) {
    if (i++ !== 0) {
      classList += ','
    }
    classList += argumentsKey
  }

  return request({
    url: '/student/exams',
    method: 'get',
    params: {
      'grade': grade,
      'classId': classList,
      'rank': 0
    }
  })
}

export function getRank(grade, checkList) {
  let classList = ''
  let i = 0
  for (const argumentsKey of checkList) {
    if (i++ !== 0) {
      classList += ','
    }
    classList += argumentsKey
  }

  return request({
    url: '/student/exams',
    method: 'get',
    params: {
      'grade': grade,
      'classId': classList,
      'rank': 1
    }
  })
}
