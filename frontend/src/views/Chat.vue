<template>
  <section class="chat">
            <!-- <div>
                <label> <input type="radio" value="food" v-model="topic" />Food</label>
                <label><input type="radio" value="dogs" v-model="topic" />Dogs</label>
            </div> -->
            <h4>Chatting with {{recipient.userName}} </h4>
            <ul class="msgs">
                <li v-for="msg in msgs" :key="msg.id">
                    <span v-if="msg.senderId === user._id" class="me">{{msg.txt}}</span>
                    <span v-else-if="msg.senderId === recipient._id" class="him">{{msg.txt}}</span>
                    <span v-else class="general">{{msg.txt}}</span>
                </li>
            </ul>
            <form @submit.prevent="send">
                <div class="inputs flex">
                <input @input="whenInput" v-model="msg.txt" autocomplete="off" />
                <button>Send</button>
                </div>
            </form>
            <div style="background-color:yellow">
                {{status.txt}}
            </div>
        </section>
</template>

<script>
import MsgService from '../services/MsgService.js';

export default {
  name: 'Chat',
  data() {
    return {
      msg: {
        txt: '',
        senderId: '',
        senderName:'',
        recipientId: '',
        roomId: ''
      },
      roomId: '',
      user: {_id: null},
      recipient: {_id: null},
      msgs: MsgService.msgs,
      status: MsgService.status
      // topic: 'food'
    };
  },
  created() {
    // set recipient ID
    this.msg.recipientId = this.$route.params.recipientId
    // create ChatRoom ID
    var sortedIds = [this.$store.getters.loggedUser._id, this.msg.recipientId].sort();
    this.msg.roomId = sortedIds[0] + sortedIds[1];
    this.roomId = this.msg.roomId
    // set sender data
    this.user = this.$store.getters.loggedUser
    this.msg.senderName = this.user.userName
    this.msg.senderId = this.user._id;
    // activate socket in this room
    this.$socket.emit('chatRequest', this.msg); 
    // get recipient data for display on page
    this.$store.dispatch({type: 'getUserById', userId: this.msg.recipientId})
    .then(recipient => {
        this.recipient = recipient
        // remove 'new message' alerts
        var recipient = this.msg.recipientId
        this.$store.commit({type: 'removeNewMsgs', recipient})
        })
    // prevent alertBar
    this.$store.commit({type: 'onChatPage', onPage: true})
  },
  destroyed() {
    MsgService.destroy();
    this.$store.commit({type: 'onChatPage', onPage: false})
  },
  methods: {
    send() {
      // console.log('msg:', this.msg);
      // this.$socket.emit('chatRequest', this.msg)
      // MsgService.sendMsg(this.msg.txt);
      this.$socket.emit('chat newMessage', this.msg);
      this.msg.txt = '';
    },
    whenInput() {
      // MsgService.sendStatus('Someone is typing...')
    }
  },
  sockets: {
    ['chat message'](data) {
      this.msgs.push(data);
      this.$store.dispatch({type: 'recievedMsg', msg: data})
    }
  },
  computed: {
      
    // recipient() {
    //     return this.$route.params.recipientId
    // }
  }
  // watch: {
  //     topic(newVal) {
  //         MsgService.setTopic(newVal);
  //     },
  //     'status.txt'() {
  //         setTimeout(()=>{
  //             this.status.txt = '';
  //         }, 1000)
  //     }
  // }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font: 13px Helvetica, Arial;
}
form {
  background: #0e0f10;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
form input {
  border: 0;
  padding: 5px 10px;
  width: 90%;
  margin: 0;
  color: #ffe75a;
  font-family: 'Courier New', Courier, monospace
}
form button {
  width: 9%;
  background: #ffe75a;
  border: none;
  padding: 10px;
  border-radius: 4px
}
.msgs {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.msgs li {
  padding: 5px 10px;
  text-align: left;
  margin: 0 auto
}
.msgs li:nth-child(odd) {
  background: #dfe5f1;
}
.chat {
  margin-top: 50px;
  width: 80%;
}
h4 {
    margin: 5px
}
.me {
    font-weight: 600;
    color: green;
    margin-left: 10px;
}
.general {
    color: gray
}
.him {
    color: black
}
</style>
 