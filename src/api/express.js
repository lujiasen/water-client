import request from '@/utils/request'

export function getExpressName (data) {
  return request({
    url: 'queryCompany',
    method: 'post',
    data
  })
}

export function getExpressInfo (data) {
  return request({
    url: 'queryLogisticsTrajectory',
    method: 'post',
    data
  })
}
