<template>
  <q-page class="column flex flex-center">
      <div class="">
          <h2>{{ status }}</h2>
      </div>
      <div>
        <h2>{{ time }}</h2>
        <h2>{{ number }}</h2>
      </div>
      <!-- <div>
        <img
          alt="Quasar logo"
          src="~assets/arc5_logo_1linered.png"
          style="width: 400px; height: 78px"
        >
      </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  data: () => {
    return {
      time: null,
      number: null,
      error: null,
      status: 'closed'
    }
  },
  methods: {
    connect () {
      let socket = new WebSocket('ws://localhost:1880/ws/example/1')

      // Connection opened
      socket.addEventListener('open', (event) => {
        socket.send('Hello Server!')
        this.status = 'open'
      })

      // Listen for messages
      socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data)
        const msg = JSON.parse(event.data)
        this.time = msg.timestamp
        this.number = msg.number
      })

      // Listen for possible errors
      socket.addEventListener('error', (event) => {
        console.log('WebSocket error: ', event)
        this.time = 'error'
        socket.close()
      })

      socket.addEventListener('close', (event) => {
        socket = null
        this.time = '---'
        this.status = 'closed'
        setTimeout(this.connect, 5000)
      })
    }
  },
  mounted: function () {
    this.connect()
  }
})
</script>
