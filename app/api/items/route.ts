import { NextRequest, NextResponse } from "next/server";
import { getAdminClient, isAllowed } from "@/lib/supabaseAdmin";

export async function GET(){
  const supa = getAdminClient();
  if (!supa) return NextResponse.json({ items: [] }); // fallback empty
  const { data, error } = await supa.from("items").select("*").order("created_at",{ascending:false});
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

export async function POST(req: NextRequest){
  const code = req.headers.get("x-admin-code");
  if (!isAllowed(code)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supa = getAdminClient(); if (!supa) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  const body = await req.json();
  const { data, error } = await supa.from("items").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function PUT(req: NextRequest){
  const code = req.headers.get("x-admin-code");
  if (!isAllowed(code)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supa = getAdminClient(); if (!supa) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  const body = await req.json();
  const { data, error } = await supa.from("items").update(body).eq("id", body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
