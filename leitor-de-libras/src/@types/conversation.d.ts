type MeetProps = {
    id: string;
    title: string;
    date: Date;
    guestName?: string;
    chatId?: string;
}

type Msg = {
    message: string;
    date: Date;
    from: "owner" | "guest";
}
