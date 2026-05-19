import requset from '@/utils/http'
export const getOrderAPI = (id) => {
  return requset({
    url: `/member/order/${id}`
  })
}