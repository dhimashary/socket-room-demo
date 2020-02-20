<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="createRoom">
        <input type="text" v-model="roomName">
        <input type="submit">
      </form>
      <button class="ml-auto my-2 btn btn-primary">KLIK</button>
    </div>
    <div class="row">
      <div class="col-3 bg-primary" v-for="room in rooms" :key="room.id">
        <h5 class="text-white"> {{ room.name }}</h5>
        <button class="btn btn-success" @click="joinRoom(room.id)">JOIN</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

export default {
  name: 'Home',
  data () {
    return {
      roomName: '',
      rooms: []
    }
  },
  methods: {
    createRoom () {
      socket.emit('createRoom', {
        roomName: this.roomName,
        username: 'a'
      })
    },
    fetchRooms () {
      socket.emit('fetchRooms')
    },
    joinRoom (id) {
      socket.emit('joinRoom', {
        id,
        username: localStorage.getItem('username')
      })
    }
  },
  created () {
    socket.on('roomCreated', (room) => {
      this.rooms.push(room)
    })

    this.fetchRooms()

    socket.on('showRooms', (rooms) => {
      this.rooms = rooms
    })
    socket.on('roomJoined', (payload) => {
      console.log('anda sukses gabung ke room', payload)

      // kalian pindah room
      // kalian mutate state di vuex terkait detail roomnya
      // kalo ada player lain yang join room playernya nambah
    })
    socket.on('someoneJoined', (payload) => {
      console.log(payload, 'ada yang join')
    })
  }
}
</script>
