import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, secretKey);

const students = [
  ["323132910069", "Karanam Karthik", "karthikkaranam2004@gmail.com"],
  ["323132910001", "ADIMULAM ROHIT SAI NAVEEN", "rohitsainaveen25@gmail.com"],
  ["323132910003", "Akramani Prasad", "prasadakramani9@gmail.com"],
  ["323132910056", "Indukuri siva rama raju", "Sivaramarajuindukuri6@gmail.com"],
  ["323132910036", "Dadi Srinivas", "dadisrinivas93911@gmail.com"],
  ["323132910171", "Rayapati Narayana Sai kushi", "rayapatikushi8@gmail.com"],
  ["323132910172", "DURGA PRASAD SWAMY RENAM", "renamswami@gmail.com"],
  ["323132910184", "Sita Ramudu Seeram", "sitaramuduseeram@gmail.com"],
  ["323132910186", "Seneti Manasa", "manasaseneti21@gmail.com"],
  ["323132910018", "BELLAMKONDA HRUSHIKESH", "bellamkondahrushikesh3@gmail.com"],
  ["323132910035", "Chintada Goutami", "chintadagowthami689@gmail.com"],
  ["323132910032", "Chatti vaasudev", "vasudevchatti21@gmail.com"],
  ["323132910034", "CH.Rakesh reddy", "rakireddy913@gmail.com"],
  ["323132910033", "Chilla Naresh", "chillanareshreddy09@gmail.com"],
  ["323132910046", "Garbhana Satish babu", "Garbhanasatishbabu@gmail.com"],
  ["323132910053", "Guddeti Soma Sekhar", "somasekharguddeti81@gmail.com"],
  ["323132910224", "Alajangi Bhanu Sai Pranav", "bhanupranav130@gmail.com"],
  ["323132910226", "Bhisetti Ramesh", "rameshbhisetti@gmail.com"],
  ["323132910002", "A Dhanushram", "dhanushram.1025@gmail.com"],
  ["323132910022", "DEVALLA BHARATH", "bharathdevalla0@gmail.com"],
];

let created = 0;
let existing = 0;
let failed = 0;

for (const [registration_number, full_name, email] of students) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: registration_number,
    email_confirm: true,
    user_metadata: {
      full_name,
      registration_number,
      role: "student",
    },
  });

  if (error) {
    if (
      error.message.toLowerCase().includes("already") ||
      error.message.toLowerCase().includes("exists")
    ) {
      console.log(`EXISTS  ${registration_number} - ${full_name}`);
      existing++;
    } else {
      console.log(`FAILED  ${registration_number} - ${error.message}`);
      failed++;
    }
  } else {
    console.log(`CREATED ${registration_number} - ${full_name}`);
    created++;
  }
}

console.log("\n==============================");
console.log(`Created : ${created}`);
console.log(`Existing: ${existing}`);
console.log(`Failed  : ${failed}`);
console.log("==============================");