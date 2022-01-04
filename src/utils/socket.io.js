import io from 'socket.io-client';

class Socket {
  socket = null;
  userList = [];
  state = 'disconnected';
  constructor(userName, passWord) {
    console.log('passWord:', passWord);
    this.socket = io('ws://127.0.0.1:50461', {
      query: {
        name: userName,
        password: passWord,
      },
      reconnection: false,
    });
    this.socket.on('connect_error', (err) => {
      if ((err && err.message === 'INVALID_USERNAME') || err.message === 'INVALID_PASSWORD') {
        alert('认证失败！');
        return;
      }
      // 或者因为网络原因 服务端没启动 那么就显示认证失败
      alert('连接失败，请检查Webthis.socket服务器');
    });
    // 登陆成功
    this.socket.on('connect', () => {
      // 通过HTTP的GET请求获取历史聊天记录
      // fetch(path) 返回promise对象 然后进行接下来的回调
      // alert(`欢迎你！${userName}!`)
      // console.log(`用户${userName}登录了！`);
      window.localStorage.setItem('userName', userName);
      window.localStorage.setItem('passWord', passWord);
      // showChatroom();
      this.state = 'connected';
      console.log('.....');
      // fetch('/history')
      //   .then((res) => res.json())
      //   .then((history) => {
      //     // console.log('history:', history);
      //     history.forEach((item) => {
      //       // 确定history中哪条信息是之前自己发的 赋予其样式
      //       if (item.sender === userName) {
      //         item.isMsgMe = true;
      //       }
      //     });
      //     updateMessageList(history);
      //   });
    });
    // 存疑——这里在刷新页面（退出聊天室）时没有被触发
    this.socket.on('disconnect', (users) => {
      console.log(`${userName}下线了！`);
      // renderUserList(users);
      // 连接断开
    });
    // 03 接收广播消息——只要有登录用户发消息，服务端就会向所有客户端广播
    this.socket.on('receiveMessage', (message) => {
      console.log('received a broadcast message.', message);
      if (message.sender === userName) {
        message.isMsgMe = true; // 是本人发的则将属性赋为true
      }
      addMsg(message);
    });
    // 有人登录的消息——打印当前登录者的信息
    this.socket.on('online', (users) => {
      this.userList = users;
      console.log('online users', users);
      // renderUserList(users);
    });
  }

  on(event, callback) {
    this.this.socket.on('connect_error', (err) => {
      if ((err && err.message === 'INVALID_USERNAME') || err.message === 'INVALID_PASSWORD') {
        alert('认证失败！');
        return;
      }
      // 或者因为网络原因 服务端没启动 那么就显示认证失败
      alert('连接失败，请检查Webthis.socket服务器');
    });
    // 登陆成功
    this.socket.on('connect', () => {
      // 通过HTTP的GET请求获取历史聊天记录
      // fetch(path) 返回promise对象 然后进行接下来的回调
      // alert(`欢迎你！${userName}!`)
      // console.log(`用户${userName}登录了！`);
      window.localStorage.setItem('userName', userName);
      window.localStorage.setItem('passWord', passWord);
      showChatroom();
      fetch('/history')
        .then((res) => res.json())
        .then((history) => {
          // console.log('history:', history);
          history.forEach((item) => {
            // 确定history中哪条信息是之前自己发的 赋予其样式
            if (item.sender === userName) {
              item.isMsgMe = true;
            }
          });
          updateMessageList(history);
        });
    });
    // 存疑——这里在刷新页面（退出聊天室）时没有被触发
    this.socket.on('disconnect', (users) => {
      console.log(`${userName}下线了！`);
      renderUserList(users);
      // 连接断开
    });
    // 03 接收广播消息——只要有登录用户发消息，服务端就会向所有客户端广播
    this.socket.on('receiveMessage', (message) => {
      console.log('received a broadcast message.', message);
      if (message.sender === userName) {
        message.isMsgMe = true; // 是本人发的则将属性赋为true
      }
      addMsg(message);
    });
    // 有人登录的消息——打印当前登录者的信息
    this.socket.on('online', (users) => {
      console.log('online users', users);
      renderUserList(users);
    });
  }

  // this.socket.on('connect_error', (err) => {
  // 	if(err && err.message === 'INVALID_USERNAME' || err.message === 'INVALID_PASSWORD') {
  // 		alert('认证失败！');
  // 		return;
  // 	}
  // 	// 或者因为网络原因 服务端没启动 那么就显示认证失败
  // 	alert('连接失败，请检查Webthis.socket服务器')
  // })
  // // 登陆成功
  // this.socket.on('connect', () => {
  // 	// 通过HTTP的GET请求获取历史聊天记录
  // 	// fetch(path) 返回promise对象 然后进行接下来的回调
  // 	// alert(`欢迎你！${userName}!`)
  // 	// console.log(`用户${userName}登录了！`);
  // 	window.localStorage.setItem('userName', userName)
  // 	window.localStorage.setItem('passWord', passWord)
  // 	showChatroom()
  // 	fetch('/history').then(res => res.json()).then((history) => {
  // 		// console.log('history:', history);
  // 		history.forEach(item => {
  // 			// 确定history中哪条信息是之前自己发的 赋予其样式
  // 			if(item.sender === userName) {
  // 				item.isMsgMe = true
  // 			}
  // 		})
  // 		updateMessageList(history)
  // 	})
  // })
  // // 存疑——这里在刷新页面（退出聊天室）时没有被触发
  // this.socket.on('disconnect', (users) => {
  // 	console.log(`${userName}下线了！`);
  // 	renderUserList(users)
  // 	// 连接断开
  // })
  // // 03 接收广播消息——只要有登录用户发消息，服务端就会向所有客户端广播
  // this.socket.on('receiveMessage', (message) => {
  // 	console.log('received a broadcast message.', message);
  // 	if(message.sender === userName) {
  // 		message.isMsgMe = true// 是本人发的则将属性赋为true
  // 	}
  // 	addMsg(message)
  // })
  // // 有人登录的消息——打印当前登录者的信息
  // this.socket.on('online', (users) => {
  // 	console.log('online users', users);
  // 	renderUserList(users)
  // })
}

export default Socket;
