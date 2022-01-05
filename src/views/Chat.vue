<template>
  <div id="chatroom">
    <!-- 1-侧标栏 -->
    <div class="contact">
      <div class="contact-name">联系人列表</div>
      <ul class="contact-list">
        <!-- 通过从服务端拿到的userList列表更新这里 -->
        <li v-for="user in userList" :key="user" class="contact-item'">{{ user }}</li>
      </ul>
    </div>
    <!-- 2-单个聊天室的内容 -->
    <div class="main">
      <div class="header">群聊版本-v0</div>
      <div class="list">
        <template v-for="message in messageList">
          <div class="list-item" :key="message.time" v-if="message.isMsgMe">
            <div class="message">{{ message.content }}</div>
            <img class="avatar" src="../assets/img/favicon.ico" alt="" />
          </div>
          <div class="list-item-left" :key="message.time" v-else>
            <img class="avatar" src="../assets/img/favicon.ico" alt="" />
            <div class="message">{{ message.content }}</div>
          </div>
        </template>
      </div>
      <div class="footer">
        <textarea id="sendInput" name="text" v-model="sendInputValue"></textarea>
        <button id="send" @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Chat',
  data() {
    return {
      userList: [],
      messageList: [],
      sendInputValue: '',
      Socket: null,
    };
  },
  mounted() {
    console.log('chat:', this.$bus.Socket);
    this.Socket = this.$bus.Socket;
    this.userList = this.$bus.Socket.userList;
    this.$http.get('http://127.0.0.1:50461/history').then((res) => {
      console.log(res);
    });
  },
  watch: {
    Socket: {
      handler(newVal, oldVal) {
        console.log('Socket:', newVal, oldVal);
        this.userList = newVal.userList;
        this.messageList = newVal.messageList;
      },
      deep: true,
    },
  },
  methods: {
    sendMessage() {
      this.$bus.Socket.sendMessage(this.sendInputValue);
      this.sendInputValue = '';
    },
  },
};
</script>

<style lang="less" scoped>
#chatroom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border: 1px solid #ccc;
  margin: 0 auto;
  display: flex;
  background-color: #ececec;
}
.contact {
  width: 140px;
  height: 100%;
  background-color: #333;
  color: #fff;
  flex-shrink: 0; /*设置收缩比率，让较长的字不会*/
}
.contact-name {
  font-size: 24px;
  padding: 10px;
}
.contact-list {
  list-style: none;
  padding-left: 0;
}
.contact-item {
  border-bottom: 1px solid #666;
  padding: 16px;
}
/* 联系人细则部分 */
.main {
  flex-grow: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
}
.header {
  text-align: center;
  vertical-align: center;
  border-bottom: 1px solid #ccc;
  /* 把头部标题撑开 */
  padding: 10px;
}

/* 聊天者的细则 */
.list {
  flex-grow: 1;
  padding: 10px 0;
  overflow: auto; /* 如果有溢出 则可以滚动下滑 */
}
.list-item {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  word-break: break-all; /* 解决英文单词换行问题~涨知识！ */
}
.list-item .message {
  background-color: skyblue;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}
.list-item .avatar {
  width: 30px;
  height: 30px;
  margin-left: 5px;
}
/* 左侧联系人的对话框属性设置 */
.list-item-left {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  word-break: break-all; /* 解决英文单词换行问题~涨知识！ */
  justify-content: flex-start;
}
.list-item-left .avatar {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-left: 0px;
}
.list-item-left .message {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}
/* 底部输入框 */
.footer {
  display: flex;
  border-top: 1px solid #ccc;
  padding: 10px 0;
}
.footer textarea {
  /* 	flex-grow:让自己填满最大空间/设置和其他元素成倍数的空间占比
	这里的作用：把输入框撑开  */
  flex-grow: 1;
  border: 1px solid #ccc;
}
.footer button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0 20px;
  margin-left: 20px;
  border-radius: 4px;
}
</style>
