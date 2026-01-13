import { Request, Response } from "express";
import { csvWriter } from "../utils/csv.helper";
import fs from "node:fs";
import { unlink } from "node:fs/promises";

export class FormController {
  public async submitForm(req: Request, res: Response) {
    const { fullName, phoneNumber, email, physicalAddress, serviceType } =
      req.body;

    try {
      await csvWriter.writeRecords([
        {
          fullName,
          phoneNumber,
          email,
          physicalAddress,
          serviceType,
          createdAt: new Date().toISOString(),
        },
      ]);

      res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
      console.error("CSV write failed:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  public async getForm(req: Request, res: Response) {
    const csvPath = process.cwd() + "/data/submissions.csv";
    try {
      // const data = await fs.promises.readFile(csvPath, "utf-8");
      const csvPath = process.cwd() + "/data/submissions.csv";
      if (!fs.existsSync(csvPath)) {
        return res.status(404).json({ message: "File not found" });
      }

      res.status(200).json({ data: csvPath });
    } catch (error) {
      console.error("CSV read failed:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteForm(req: Request, res: Response) {
    try {
      const csvPath = process.cwd() + "/data/submissions.csv";
      if (!fs.existsSync(csvPath)) {
        return res.status(404).json({ message: "File not found" });
      }
      await unlink(csvPath);

      res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
      console.error("CSV delete failed:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
