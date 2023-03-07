// FIXME: Ver o porquê o prisma não estar criando o tipo User
import { User } from "@prisma/client";

type UserLoginData = {
    email: string;
    password: string;
}

class CreateUserUseCase {
    async execute({ email, password }: UserLoginData): Promise<User> {

    }
}
