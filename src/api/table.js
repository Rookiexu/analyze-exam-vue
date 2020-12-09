import request from '@/utils/request'
import requestMock from '@/utils/requestMock'

export function getExamList(params) {
  return request({
    url: '/data/exams',
    method: 'get',
    params
  })
}

export function getStudentList(params) {
  return request({
    url: '/data/students',
    method: 'get',
    params
  })
}

export function getMockList(params) {
  return requestMock({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
