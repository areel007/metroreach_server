import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";

export class AdminController {
  public login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      return res.status(200).json({ token });
    }

    res.status(401).json({ message: "Invalid credentials" });
  }

  public downloadForm(req: Request, res: Response) {
    const filePath = path.join(__dirname, "../../data/submissions.csv");
    // res.download(filePath);
    res.status(200).json({ message: filePath });
  }

  public logout(req: Request, res: Response) {
    res.status(200).json({ message: "Logout successful" });
  }
}
