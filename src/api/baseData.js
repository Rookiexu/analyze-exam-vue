import requestMock from '@/utils/requestMock'

export function getClassList() {
  return requestMock({
    url: '/vue-element-admin/data/classes',
    method: 'get'
  })
}
