type MeetProps = {
    id: number;
    title: string;
    date: Date;
    chatId?: number;
}

type Msg = {
    chatId: number;
    message: string;
    date: Date;
    from: "owner" | "guest";
}
