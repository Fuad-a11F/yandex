export interface ApiError {
  reason: string;
}

export interface AddNewChatRequestInterface {
  title: string;
}
export interface AddNewChatResponseInterface {
  id: number;
}

export interface GetAllChatsRequestInterface {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface GetAllChatsResponseInterface {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface AddUserToChatRequestInterface {
  users: number[];
  chatId: number;
}

export interface DeleteUserToChatRequestInterface {
  users: number[];
  chatId: number;
}
