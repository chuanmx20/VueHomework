<template>
  <el-dialog
        v-bind="$attrs" 
        v-on="$listeners"
        style="text-align: center"
        title="发表"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :show-close=false
        width="80%">
    <el-form label-width="80px">
      <el-form-item label="标题">
        <!--请修改这两行注释中间的代码来输入消息标题-->
        <el-input placeholder="title" v-model="message.title"></el-input>
        <!--请修改这两行注释中间的代码来输入消息标题-->
      </el-form-item>
      <el-form-item label="内容">
        <!--请修改这两行注释中间的代码来输入消息内容-->
        <el-input  type="textarea" placeholder="message" v-model="message.content"></el-input>
        <!--请修改这两行注释中间的代码来输入消息内容-->
      </el-form-item>
      <el-form-item label="用户名">
        <!--请修改这两行注释中间的代码来输入用户名-->
        <el-input v-model="state.username"/>
        <!--请修改这两行注释中间的代码来输入用户名-->
        <span v-if="state.username_valid===false" style="color: red">请设置合法用户名!</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary"
                  :disabled="state.username_valid===false"
                  @click="submit"
                  >确 定</el-button>
      <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
    </span>
  </el-dialog>
</template>

<script>
import { post_new_message } from '../utils/communication'
// 请在下方设计实现自己的数据结构以及函数
export default {
	name: "PostDialog",
	props: {
		dialogVisible: {
			type: Boolean,
			default: () => true
		},
		state: {
			type: Object,
			default: () => {
				return {
					username: "",
					username_valid: false
				}
			}
		}
    },
    emits: ['shut','sent'],
	data(){
        return {
            visible: Boolean,
            message: {
                title: "",
                content: ""
            }
		}
	},
    methods: {
        handleClose(done) {
            this.$emit('shut')
            done()
        },
        submit() {
            this.visible = !this.visible
            let date = new Date()
            let cookie_life = 15; // minutes
            date.setTime(date.getTime() + cookie_life * 1000 * 60)
            document.cookie = "user" + "=" + escape(this.state.username) + ";expires=" + date.toGMTString()
            post_new_message(
                {
                    "title": this.message.title,
                    "content": this.message.content
                },
                this.after_post
            )
        },
        cancel() {
            this.visible = !this.visible
            this.message = {
                title: "",
                content: ""
            }
        },
        after_post() {
            this.$emit('sent')
        }
	},
	watch: { // 用于实时检测username是否合法
		"state.username": {
			handler(newName) {
                this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
                this.message.username = newName
			}
        },
        "visible": {
            handler() {
                this.$emit('shut')
            }
        }
    },
    mounted() {
        var cookie_list = document.cookie.split(";");
        for (var i in cookie_list) {
            var cookie = cookie_list[i].split("=");
            
            if (cookie[0] == 'user')
            {
                this.state.username = cookie[1]
                break
            }
        }
    }
}
</script>