export type ConversationProps = {
    id: number | string;
    title: string;
    date: Date;
}

const CONVERSATIONS: ConversationProps[] = [{
    id: 124,
    title: "Teste de uma conversa loka",
    date: new Date()
}];

export default CONVERSATIONS;
