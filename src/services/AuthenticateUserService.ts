import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se email existe
        const user = await usersRepositories.findOne({
            email,
        });

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        //Verificar se senha esta correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        //Gerar token
        const token = sign(
            {
                email: user.email
            },
            "bda04bba66ea267907030fc2ed7b37e4",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );
        
        return token;
    }
}

export { AuthenticateUserService }