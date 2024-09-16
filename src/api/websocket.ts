import { getChatToken } from "../services/chat.ts";
import { UserDtoInterface } from "../interface/api/authApiInterface.ts";

const webSocketTransport = async (chatId: number, user: UserDtoInterface) => {
  const resp = await getChatToken(chatId);

  if (!resp) return;

  if (!("token" in resp)) return;

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${resp.token}`,
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

    try {
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
    } catch (e) {
      console.error(e);
    }
  });

  socket.addEventListener("error", () => {
    console.log("Ошибка");
  });
};

export default webSocketTransport;
