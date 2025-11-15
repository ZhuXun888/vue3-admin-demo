//仓库的大仓库
import { createPinia } from "pinia"; //引入pinia
const pinia = createPinia();//创建pinia实例（大仓库）
export default pinia;//对外暴露：入口文件需要安装pinia才能使用（引入注册使用）
