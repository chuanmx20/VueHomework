<template>
  <div id="stage3">
    <!--修改下方的MessageList和PostDialog-->
    <MessageList :messageList=messageList />
    <PostDialog :dialogVisible=dialogVisible @shut="()=>dialogVisible=false" @sent="update_message_list" />
  </div>
</template>

<script>
import MessageList from "@/components/MessageList.vue"
import PostDialog from "@/components/PostDialog.vue"
import { get_message_list } from "../utils/communication"

export default {
	name: 'Stage3',
	components: {
		MessageList,
		PostDialog
	},
	// 请在下方设计自己的数据结构和函数，例如其中messageList是用于保存从后端获取到的消息列表，dialogVisible可以用于标识对话框是否显示（参见Vue对话框组件的属性列表）
	data(){
		return {
			messageList: [],
			dialogVisible: true,
		}
	},
	methods: {
		update_message_list() {
			this.messageList = get_message_list()
		}
	},
	mounted() {
		this.update_message_list()
	}
}
</script>