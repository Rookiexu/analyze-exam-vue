import request from '@/utils/request'

export function editExamResult(params) {
  return request({
    url: '/edit/examResult',
    method: 'get',
    params
  })
}

export function editStudent(params) {
  return request({
    url: '/edit/student',
    method: 'get',
    params
  })
}

export function editExam(params) {
  return request({
    url: '/edit/exam',
    method: 'get',
    params
  })
}
