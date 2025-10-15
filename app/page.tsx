
'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Link2, PhoneCall } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

type LinkItem = { id: string; title?: string|null; url: string; note?: string|null; created_at?: string };

export default function Home(){
  const { t } = useI18n();
  const [links, setLinks] = useState<LinkItem[]>([]);
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/portfolio'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setLinks(d.links||[]);} catch{ setLinks([]);} })(); },[]);
  return (
    <div className="min-h-screen">
      <Header/>
      <section className="bg-gradient-to-b from-white to-neutral-100">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold">{t('hero_title')}</h1>
            <p className="mt-4 text-neutral-600">{t('hero_sub')}</p>
          </div>
          <div className="aspect-[4/3] rounded-3xl bg-neutral-200 grid place-items-center text-neutral-500">(Hero)</div>
        </div>
      </section>

      <section id="portfolio" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('portfolio_title')}</h2>
          <p className="text-neutral-600 mt-1 text-sm">{t('portfolio_hint')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {links.map(l => (
              <Card key={l.id}><CardHeader><CardTitle className="text-base">{l.title || "Listing"}</CardTitle><CardDescription className="truncate">{l.url}</CardDescription></CardHeader>
              <CardFooter><a href={l.url} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-600"><Link2 className="w-4 h-4"/> {t('portfolio_view')}</a></CardFooter></Card>
            ))}
            {links.length===0 && <div className="text-sm opacity-70">{t('portfolio_empty')}</div>}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">{t('contact_title')}</h2>
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
          <div className="opacity-70">{t('footer_privacy')} · {t('footer_terms')}</div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm(){
  const { t } = useI18n();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState(''); const [content,setContent]=useState(''); const [ok,setOk]=useState(false);
  async function submit(e:any){ e.preventDefault(); try{ const r=await fetch('/api/messages',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email,phone,content})}); if(r.ok){ setOk(true); setName(''); setEmail(''); setPhone(''); setContent(''); }}catch{} }
  return (<form className="mt-4 grid gap-3" onSubmit={submit}>
    <Input placeholder={t('contact_name')} value={name} onChange={(e:any)=>setName(e.target.value)} required/>
    <Input type="email" placeholder={t('contact_email')} value={email} onChange={(e:any)=>setEmail(e.target.value)} required/>
    <Input placeholder={t('contact_phone')} value={phone} onChange={(e:any)=>setPhone(e.target.value)}/>
    <Textarea placeholder={t('contact_notes')} value={content} onChange={(e:any)=>setContent(e.target.value)} rows={5}/>
    <Button>{t('contact_send')}</Button>{ok && <div className="text-sm text-green-600">{t('contact_ok')}</div>}
  </form>);
}
