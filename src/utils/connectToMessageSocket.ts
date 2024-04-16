import { MessageItemProps } from '@/components/message/message.ts'
import { ChatController } from '@/controllers/ChatController.ts'
import store from '@/core/Store.ts'

const chatController = new ChatController()

export default async (userId: number, chatId: number) => {
  let token = ''

  await chatController.getToken(chatId).then((resp) => {
    token = resp.token
  })

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
  )

  socket.addEventListener('open', () => {
    console.log(`Соединение установлено c чатом ${chatId}`)

    if (socket) {
      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      )
    }
  })

  const ping = setInterval(() => {
    socket?.send(JSON.stringify({ type: 'ping' }))
  }, 10000)

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)

    if (Array.isArray(data)) {
      store.set('messages', JSON.parse(event.data))
    }
    if (data.type === 'message') {
      const messages = store.getState().messages
      const message: MessageItemProps = JSON.parse(event.data)

      message.time = new Date().toISOString()

      store.set('messages', [message, ...messages])
    }
    if (data.type === 'user connected') {
      const messages = store.getState().messages
      const message: MessageItemProps = JSON.parse(event.data)

      message.time = new Date().toISOString()
      message.content = `Юзер с id: ${message.content} присоединился к чату`

      store.set('messages', [message, ...messages])
    }
  })

  socket.addEventListener('close', () => {
    clearInterval(ping)
  })

  return socket
}
