import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin";
// export async function GET(request: NextRequest) {
//   try {
//     const supabase = await createClient()
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { data, error } = await supabase.from("users").select("*")

//     if (error) throw error

//     return NextResponse.json(data)
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Internal server error" },
//       { status: 500 },
//     )
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const supabase = await createClient()
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await request.json()

//     const { data, error } = await supabase.from("users").insert([body]).select()

//     if (error) throw error

//     return NextResponse.json(data[0], { status: 201 })
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Internal server error" },
//       { status: 500 },
//     )
//   }
// }

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from("users").select("*");
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log("POST /api/users route hit"); // ✅ top-level log

  try {
    const body = await request.json();
    console.log("Request body:", body);

    const { email, first_name, last_name, role } = body;

    if (!email || !first_name || !last_name || !role) {
      console.warn("Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Step 0️⃣: Check if user already exists in users table
    const { data: existingUser, error: dbCheckError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (dbCheckError && dbCheckError.code !== "PGRST116") {
      // some unexpected error
      console.error("DB check error:", dbCheckError);
      throw dbCheckError;
    }

    if (existingUser) {
      console.warn("User already exists:", email);
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 400 });
    }

    // Step 1️⃣: Create user in Supabase Auth
    console.log("Creating user in Supabase Auth...");
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: Math.random().toString(36).slice(-10) + "A1!", // temporary password
      email_confirm: true,
      user_metadata: { first_name, last_name, role },
    });

    if (authError || !authData?.user) {
      console.error("Auth creation failed:", authError);
      throw authError || new Error("Failed to create Auth user");
    }

    const authUser = authData.user;
    console.log("Auth user created successfully:", authUser.id);

    // Step 2️⃣: Insert user into "users" table
    console.log("Inserting user into users table...");
    const { data: dbUser, error: dbInsertError } = await supabaseAdmin
      .from("users")
      .insert([
        {
          id: authUser.id, // using Auth UUID as PK
          email,
          first_name,
          last_name,
          role,
          status: "active",
        },
      ])
      .select()
      .single();

    if (dbInsertError) {
      console.error("DB insertion error:", dbInsertError);
      throw dbInsertError;
    }

    console.log("User inserted into DB successfully:", dbUser);

    return NextResponse.json({ user: dbUser }, { status: 201 });
  } catch (err: any) {
    console.error("Unexpected error in POST /api/users:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

