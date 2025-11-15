//封装一个函数：用于获取当时的时间是 早上|上午|下午|晚上
export const getTime = () => {
  let message
  const hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}