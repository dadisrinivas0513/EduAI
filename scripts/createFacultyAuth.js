import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const { data, error } = await supabase.auth.admin.createUser({
  email: "faculty@eduai.demo",
  password: "EduAI@12345",
  email_confirm: true,
  user_metadata: {
    full_name: "EduAI Faculty",
    role: "faculty",
    department: "CSE",
  },
});

if (error) {
  console.error("Failed:", error.message);
  process.exit(1);
}

console.log("Faculty account created successfully!");
console.log("User ID:", data.user.id);