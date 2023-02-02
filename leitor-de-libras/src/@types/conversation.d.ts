type ConversationProps = {
    id: number;
    title: string;
    date: Date;
    chatId?: number;
}

type Chat = {
    id: number;
    messages: Msg[];
}

type Msg = {
    chatId: number;
    content: string;
    date: Date;
    sentBy: "owner" | "guest";
}
