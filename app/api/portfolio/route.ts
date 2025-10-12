import { NextRequest, NextResponse } from "next/server";
import { getAdminClient, isAllowed } from "@/lib/supabaseAdmin";

export async function GET(){
  const supa = getAdminClient();
  const { data, error } = await supa.from("portfolio").select("*").order("created_at",{ascending:false});
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ links: data });
}

export async function POST(req: NextRequest){
  const code = req.headers.get("x-admin-code");
  if (!isAllowed(code)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const supa = getAdminClient();
  const { data, error } = await supa.from("portfolio").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ link: data });
}

export async function DELETE(req: NextRequest){
  const code = req.headers.get("x-admin-code");
  if (!isAllowed(code)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const supa = getAdminClient();
  const { error } = await supa.from("portfolio").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
