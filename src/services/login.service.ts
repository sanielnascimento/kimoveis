import { compare } from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iLoginRequest, iUserRepo } from "../interfaces";

const loginService = async (body: iLoginRequest): Promise<string> => {  
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const user: User | null = await userRepo.findOneBy({ email: body.email });

  if (!user) throw new AppError("Invalid credentials", 401);

  const passwordMatch: boolean = await compare(body.password, user.password);

  if (!passwordMatch) throw new AppError("Invalid credentials", 401);

  const token: string = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: user.id.toString(),
    }
  );

  return token;
};

export default loginService;