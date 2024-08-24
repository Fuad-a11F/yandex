export const chats = [
  {
    avatar: "vite.svg",
    name: "Вадим",
    countNewMessages: 2,
    time: "12:00",
    isActive: true,
    lastMessage: "Изображение",
  },
  {
    avatar: "vite.svg",
    name: "Андрей",
    time: "13:00",
    lastMessage: "Друзья, у меня для вас особенный выпуск новостей!...",
    isYourMessage: true,
  },
  {
    avatar: "vite.svg",
    name: "Катя",
    countNewMessages: 1,
    time: "Пт",
    lastMessage: "В 2008 году художник Jon Rafman начал собирать...",
    isYourMessage: true,
  },
  {
    avatar: "vite.svg",
    name: "Катя",
    countNewMessages: 1,
    time: "Пт",
    lastMessage: "В 2008 году художник Jon Rafman начал собирать...",
  },
  {
    avatar: "vite.svg",
    name: "Катя",
    time: "Пт",
    lastMessage: "В 2008 году художник Jon Rafman начал собирать...",
  },
];
export const chatsWithNotActive = [
  {
    avatar: "vite.svg",
    name: "Вадим",
    countNewMessages: 2,
    time: "12:00",
    isActive: false,
    lastMessage: "Изображение",
  },
  {
    avatar: "vite.svg",
    name: "Андрей",
    time: "13:00",
    lastMessage: "Друзья, у меня для вас особенный выпуск новостей!...",
  },
  {
    avatar: "vite.svg",
    name: "Катя",
    countNewMessages: 1,
    time: "Пт",
    lastMessage: "В 2008 году художник Jon Rafman начал собирать...",
  },
];

export const messages = [
  {
    date: "19 june",
    messages: [
      {
        text: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей",
        time: "12:00",
        ownMessage: true,
      },
      {
        text: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей",
        time: "12:10",
        guestMessage: true,
      },
      { text: "hg", time: "12:10", guestMessage: true },
      { text: "hghgkh", time: "12:11", guestMessage: true },
      {
        text: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей\n",
        time: "12:15",
        guestMessage: true,
      },
    ],
  },
  {
    date: "21 june",
    messages: [
      { text: "fd4343f", time: "13:00", guestMessage: true },
      { text: "h23g", time: "13:10", guestMessage: true },
      { text: "h234g", time: "13:10", ownMessage: true },
      { text: "hg234hgfdgdfgkh", time: "13:11", ownMessage: true },
      { text: "dfg", time: "13:15", guestMessage: true },
      { text: "dfg", time: "13:15", guestMessage: true },
      { text: "dfg", time: "13:15", guestMessage: true },
    ],
  },
];
