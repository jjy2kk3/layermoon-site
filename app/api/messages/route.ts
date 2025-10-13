import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function GET(){
  const supa = getAdminClient();
  if (!supa) return NextResponse.json({ messages: [] });
  const { data, error } = await supa.from("messages").select("*").order("created_at",{ascending:false}).limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data });
}

export async function POST(req: NextRequest){
  const supa = getAdminClient();
  if (!supa) return NextResponse.json({ ok: true, message: { id:'local', name:'', email:'', content:'' } });
  const body = await req.json();
  const { data, error } = await supa.from("messages").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, message: data });
}
