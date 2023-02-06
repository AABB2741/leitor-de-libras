type MeetProps = {
    id: string;
    guestName?: string;
    title: string;
    date: Date;
    chatId: string;
}

type Msg = {
    message: string;
    date: Date;
    from: "owner" | "guest";
}
