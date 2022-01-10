<template>
  <div id="login">
    <!-- 登录标题 -->
    <p class="login-title">👩‍💻Mywat | by YiLiang👨‍💻</p>
    <!-- 输入用户名 -->
    <div id="userNameBox">
      <span>UserName</span>
      <input id="userName" placeholder="请输入用户名" v-model="userName" />
    </div>
    <!-- 输入密码 -->
    <div id="passwordBox">
      <span>PassWord</span>
      <input id="password" placeholder="请输入密码" v-model="passWord" />
    </div>
    <!-- 登录按钮 -->
    <div class="login-button" @click="handleLogin"><p style="text-align: center">登录</p></div>
  </div>
</template>

<script>
import Socket from '../utils/socket.io.js';
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      passWord: '',
      isconnected: false,
      Socket: null,
    };
  },
  methods: {
    handleLogin() {
      if (this.userName === '' || this.password === '') {
        alert('用户名或密码不能为空');
        return;
      }
      this.Socket = new Socket(this.userName, this.passWord);
      // console.log(this__proto__);
      console.log(this.Socket);
      this.$bus.Socket = this.Socket;
      // if (this.Socket.state === 'connected') {
      //   this.$router.push('/chat');
      // }
    },
  },
  watch: {
    Socket: {
      handler(newVal, oldVal) {
        if (newVal.state === 'connected') {
          this.$router.push('/chat');
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
/* 登录框标题 */

/* 登录框的大盒子 */
#login {
  font-size: 24px;
  position: absolute;
  width: 20rem;
  height: 10rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login-title {
    text-align: center;
  }
  #userNameBox {
    position: relative;
    #userName {
      position: absolute;
      padding: 6px;
      right: 5px;
      height: 12px;
      width: 180px;
    }
  }
  #passwordBox {
    margin-top: 4px;
    position: relative;
    #password {
      position: absolute;
      padding: 6px;
      right: 5px;
      height: 12px;
      width: 180px;
    }
  }
  /* 登录按钮 */
  .login-button {
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px auto;
  }
  .login-button:hover {
    background-color: tomato;
  }
}
</style>
