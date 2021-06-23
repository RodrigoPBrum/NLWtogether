import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {

  //lib do express por default nao tem suporte a Erros async
  async handle(request: Request, response: Response) {
    const { name, email, admin } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin });

    return response.json(user);

  }
}

export { CreateUserController };

/**
 * server -> routes -> Controller -> Service (throw new Error)
 *
 */