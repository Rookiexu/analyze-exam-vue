import mockRequest from '@/utils/requestMock'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function mockLogin(data) {
  return mockRequest({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function mockGetInfo(token) {
  return mockRequest({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: { token }
  })
}

export function mockLogout() {
  return mockRequest({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
