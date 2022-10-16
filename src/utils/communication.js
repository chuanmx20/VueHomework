/**
 * 如果需要修改为正常上线模式，请注释下面mock的import代码
 * **/
// import "@/mock/index"
import API from "./API.js"
import axios from 'axios'
// 请在下方实现自己的后端通信函数
export function get_message_list() {
    axios.get(API.GET_MESSAGE_LIST.path).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.log(error.message)
    })
    return []
}