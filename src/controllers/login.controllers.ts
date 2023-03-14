import { Request, Response } from "express";
import { iLoginRequest } from "../interfaces";
import { loginService } from "../services";

const loginController = async (req: Request, res: Response): Promise<Response> => {
    const body: iLoginRequest = req.body;
    return res.json({ token: await loginService(body)})   
}

export default loginController;