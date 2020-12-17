import request from '@/utils/request'

export function saveEvent(data) {
  const newVar = data.id != null ? data.id : 10
  return request({
    url: '/event/save/' + newVar,
    method: 'post',
    data
  })
}

export function deleteEvent(id) {
  return request({
    url: '/event/delete/' + id,
    method: 'get'
  })
}

export function findAllEvent() {
  return request({
    url: '/events',
    method: 'get'
  })
}
