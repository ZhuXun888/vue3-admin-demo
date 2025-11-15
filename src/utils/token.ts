//封装本地存储 存储数据和读取数据的地方

// 本地存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 读取本地存储数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 本地存储删除数据方法 
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
