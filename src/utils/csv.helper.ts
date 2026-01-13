import fs from "fs";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";

const dataDir = path.join(process.cwd(), "data");
const csvPath = path.join(dataDir, "submissions.csv");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Check if CSV file exists
const fileExists = fs.existsSync(csvPath);

// Create CSV writer
export const csvWriter = createObjectCsvWriter({
  path: csvPath,
  header: [
    { id: "fullName", title: "Full Name" },
    { id: "phoneNumber", title: "Phone Number" },
    { id: "email", title: "Email" },
    { id: "physicalAddress", title: "Physical Address" },
    { id: "serviceType", title: "Service Type" },
    { id: "createdAt", title: "Created At" },
  ],
  append: fileExists, // append only if file already exists
});
