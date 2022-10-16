/**
 * 如果需要修改为正常上线模式，请注释下面mock的import代码
 * **/
// import "@/mock/index"
import API from "./API.js"
import axios from 'axios'
// 请在下方实现自己的后端通信函数
export function get_message_list() {
    var ret = []
    axios.get(API.GET_MESSAGE_LIST.path).then(function (response) {
        for (var message in response.data.data) {
            var item = response.data.data[message]
            ret.push({
                title: item.title,
				message: item.content,
				user: item.user,
				timestamp: item.timestamp * 1000
            })
        }
    }).catch(function (error) {
        console.log(error.message)
    })
    return ret
}