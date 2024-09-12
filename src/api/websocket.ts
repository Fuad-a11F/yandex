import { getChatToken } from "../services/chat.ts";

const WebSocketTransport = async (chatid, user) => {
  const resp = await getChatToken(chatid);

  if (!("token" in resp)) return;

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatid}/${resp.token}`,
  );

  window.socket = socket;

  socket.addEventListener("open", () => {
    window.store.set({
      messages: [],
    });

    socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      }),
    );
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", (event) => {
    console.log("Получены данные", event.data);

    const data = JSON.parse(event.data);

    window.store.set({
      messages: [
        ...window.store.getState().messages,
        ...(Array.isArray(data) ? data.reverse() : [data]),
      ],
    });

    const zone = document.getElementById("message_chat");

    if (zone) {
      zone.scrollTop = zone?.scrollHeight + 30;
    }
  });

  socket.addEventListener("error", (event) => {
    console.log("Ошибка", event.message);
  });
};

export default WebSocketTransport;
