<template>
  <div class="chat">
    <div class="header" />
    <div class="main">
      <div v-for="(item,index) in info" class="info">
        <span :style="{float:item.float}">{{ item.content }}</span>
      </div>
    </div>
    <div class="footer">
      <div>
        <el-input
          v-model="word"
          placeholder="请输入内容"
          size="small"
          clearable
        />
      </div>
      <div class="footer_btn">
        <div><el-button type="primary" @click="sendInfo">发送</el-button></div>
        <div><el-button type="warning">清空</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnlineChat',
  data() {
    return {
      info: [{ 'content': 'KKK', 'float': 'left' }, { 'content': 'LL', 'float': 'left' }, { 'content': 'LL', 'float': 'right' }],
      word: ''
    }
  },
  mounted() {
    this.initWebSocket()
  },
  methods: {
    // 发送消息
    sendInfo() {
      if (!this.word || this.word == '') {
        return
      }
      this.info.push({ 'content': this.word, 'float': 'right' })
      this.websocketsend(this.word)
    },

    initWebSocket() { // 初始化weosocket
      const wsuri = 'ws://127.0.0.1:10000/plan/chat/socket/onlineUser/1'
      this.websocket = new WebSocket(wsuri)
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.websocketonmessage
      this.websocket.onclose = this.websocketclose
    },
    websocketonopen() { // 开启socket链接
      console.log('WebSocket连接成功')
    },
    websocketonerror(e) { // 错误
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage(e) { // 数据接收
      const res = e.data
      this.info.push({ 'content': res, 'float': 'left' })
    },
    websocketsend(agentData) { // 数据发送
      this.websocket.send(agentData)
    },
    websocketclose(e) { // 关闭
      console.log('connection closed (' + e.code + ')')
    }
  }
}
</script>

<style scoped>

  .main {
    width: 400px;
    height: 500px;
    border: 1px solid greenyellow;
    border-radius: 10px;
    margin: 10px auto;
    overflow-y: scroll;
  }

  .footer {
    width: 400px;
    margin: 10px auto;
  }

  .footer_btn {
    display: flex;
    justify-content: space-around;
  }

  .info {
    height: 36px;
    line-height: 36px;
    margin-bottom: 5px;

  }

  .info span {
    background-color: pink;
    border-radius: 8px;
    padding-left: 5px ;
    padding-right: 5px ;
  }

</style>
