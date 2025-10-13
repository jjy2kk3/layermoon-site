"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Link2, PhoneCall } from "lucide-react";

type LinkItem = { id: string; title?: string|null; url: string; note?: string|null; created_at?: string };

export default function Home(){
  const [links, setLinks] = useState<LinkItem[]>([]);
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/portfolio'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setLinks(d.links||[]);} catch{ setLinks([]);} })(); },[]);
  return (
    <div className="min-h-screen">
      <Header/>
      <section className="bg-gradient-to-b from-white to-neutral-100">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl md:text-5xl font-semibold">Stage faster. Sell better.</motion.h1>
            <p className="mt-4 text-neutral-600">Greater Seattle home staging—vacant, partial, Airbnb. Furniture + styling rentals.</p>
          </div>
          <div className="aspect-[4/3] rounded-3xl bg-neutral-200 grid place-items-center text-neutral-500">(Hero)</div>
        </div>
      </section>

      <section id="portfolio" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Recent Projects (Links)</h2>
          <p className="text-neutral-600 mt-1 text-sm">Add Redfin/Zillow links in Admin → Portfolio.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {links.map(l => (
              <Card key={l.id}><CardHeader><CardTitle className="text-base">{l.title || "Listing"}</CardTitle><CardDescription className="truncate">{l.url}</CardDescription></CardHeader>
              <CardFooter><a href={l.url} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-600"><Link2 className="w-4 h-4"/> View</a></CardFooter></Card>
            ))}
            {links.length===0 && <div className="text-sm opacity-70">No links yet.</div>}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Tell us about your project</h2>
            <ContactForm/>
          </div>
          <div className="p-6 bg-neutral-50 border rounded-2xl">
            <h3 className="font-medium">Contact</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> hello@layermoon.com</div>
              <div className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> 206-555-0123</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 text-sm flex justify-between">
          <div>© {new Date().getFullYear()} Layer Moon Staging.</div>
          <div className="opacity-70">Privacy · Terms</div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState(''); const [content,setContent]=useState(''); const [ok,setOk]=useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>){ e.preventDefault(); try{ const r=await fetch('/api/messages',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email,phone,content})}); if(r.ok){ setOk(true); setName(''); setEmail(''); setPhone(''); setContent(''); }}catch{} }
  return (<form className="mt-4 grid gap-3" onSubmit={submit}>
    <Input placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} required/>
    <Input type="email" placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} required/>
    <Input placeholder="Phone (optional)" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPhone(e.target.value)}/>
    <Textarea placeholder="Notes" value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)} rows={5}/>
    <Button>Send</Button>{ok && <div className="text-sm text-green-600">Submitted.</div>}
  </form>);
}
