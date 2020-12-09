import requestMock from '@/utils/requestMock'
import request from '@/utils/request'

export function getClassList() {
  return requestMock({
    url: '/vue-element-admin/charts/classes',
    method: 'get'
  })
}

export function getScore(grade, checkList) {
  return request({
    url: '/exams/students',
    method: 'get',
    params: {
      'grade': grade,
      'classId': checkList[0],
      'rank': 0
    }
  })
}

export function getRank(grade, checkList) {
  return request({
    url: '/exams/students',
    method: 'get',
    params: {
      'grade': grade,
      'classId': checkList[0],
      'rank': 1
    }
  })
}

// let classIds = ''
// const length = checkList.length
// for (let i = 0; i < length; i++) {
//   // eslint-disable-next-line eqeqeq
//   if (i !== 0) {
//     classIds += ','
//   }
//   classIds += checkList[i]
// }
