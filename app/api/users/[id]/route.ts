// import { supabaseAdmin } from "@/lib/supabase/admin";
// import { createClient } from "@/lib/supabase/server"
// import { type NextRequest, NextResponse } from "next/server"

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const supabase = await createClient()
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { error } = await supabase.from("users").delete().eq("id", params.id)

//     if (error) throw error

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Internal server error" },
//       { status: 500 },
//     )
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // 👈 params is a Promise in Next.js 15
) {
  const { id } = await context.params; // 👈 must await it
  console.log("DELETE route hit for user ID:", id);

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  try {
    // Step 1: Delete user from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (authError) {
      console.error("Auth deletion error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Step 2: Delete from users table
    const { error: dbError } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("DB deletion error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    console.log("✅ User successfully deleted:", id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Unexpected DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

