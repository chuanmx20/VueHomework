<template>
  <div id="message-board">
    <el-container style="height:100%; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 10px">
        <el-button style="display: inline-block;margin-right: 15px;" v-on:click="postDialog.dialogVisible=true">
          <i class="el-icon-edit">发表</i>
        </el-button>
        <!--请修改这两行注释中间的代码完成"刷新"功能-->
        <el-button style="display: inline-block;margin-right: 15px;" @click="update_message_list" >
        <!--请修改这两行注释中间的代码完成"刷新"功能-->
          <i class="el-icon-refresh" style="object-fit: fill">刷新</i>
        </el-button>
      </el-header>

      <el-main>
        <!--请补全这两行注释中间的messagelist-->
		
        <MessageList :messageList=messageList />
        
		
        <!--请补全这两行注释中间的messagelist-->
      </el-main>

      <el-footer>@CST2022SE</el-footer>
    </el-container>
    <!--请补全这两行注释中间的PostDialog-->
    <PostDialog v-on:shut="shutPostDialog" v-on:sent="update_message_list" :dialogVisible="postDialog.dialogVisible"/>
    <!--请补全这两行注释中间的PostDialog-->
    <el-dialog
            style="text-align: center"
            :title="alertDialog.text"
            :visible.sync="alertDialog.dialogVisible"
            width="40%">
    </el-dialog>
  </div>
</template>

<script>
import MessageList from "@/components/MessageList"
import PostDialog from "@/components/PostDialog"
import { get_message_list } from "../utils/communication.js"
export default {
	name: "MessageBoard",
	components: {
		MessageList,
		PostDialog
	},
	// 请在下方设计自己的数据结构及函数来完成最终的留言板功能
	data(){
		return {
			postDialog:{
				dialogVisible:false
			},
			alertDialog:{
				"text":"",
				dialogVisible:false
			},
			state:{
				username:  "",
				username_valid:false
			},
            messageList: []
		}
	},
    methods: {
        shutPostDialog() {
            this.postDialog.dialogVisible = false
        },
        update_message_list() {
            this.messageList = get_message_list()
        }
    },
    watch: {
        
    },
    mounted() {
        this.update_message_list()
    }
}
</script>

<style scoped>
    #message-board{
        height: calc(100vh - 16px);
    }
    .message-tab{
        display: block;
        padding: 10px;
        text-align: left;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-footer {
        background-color: #7197c9;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
</style>
