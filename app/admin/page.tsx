
'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link2, PlusCircle, Trash2, Warehouse, LogIn } from 'lucide-react';

type Item = { id: string; name: string; sku: string; category: string; color: string; size: string; price: number; status: string; image?: string|null; inbound?: string|null; };
type Message = { id: string; name: string; email: string; phone?: string|null; content: string; created_at?: string; };
type LinkItem = { id: string; title?: string|null; url: string; note?: string|null; created_at?: string; };
const CATEGORIES=['Sofas','Chairs','Rugs','Tables','Art','Decor','Dining','Bedroom'];
const COLORS=['Black','White','Gray','Beige','Ivory','Blue','Green','Brown','Other'];

function Gate({ onOk }:{ onOk:(code:string)=>void }){
  const [code,setCode]=useState('');
  return (<div className="min-h-[60vh] grid place-items-center">
    <Card className="w-full max-w-sm">
      <CardHeader><CardTitle>Admin Access</CardTitle><CardDescription>输入访问码进入后台</CardDescription></CardHeader>
      <CardContent><Input type="password" placeholder="Access code" value={code} onChange={(e:any)=>setCode(e.target.value)}/></CardContent>
      <CardFooter><Button className="w-full" onClick={()=>onOk(code)}><LogIn className="w-4 h-4 mr-2"/>进入</Button></CardFooter>
    </Card>
  </div>);
}

export default function Admin(){
  const [ok,setOk]=useState(false); const [adminCode,setAdminCode]=useState('');
  function verify(code:string){ if(!code) return; setAdminCode(code); setOk(true); }
  if(!ok) return <Gate onOk={verify}/>;
  const [tab,setTab]=useState<'inventory'|'portfolio'|'inbox'>('inventory');
  return (<section className="py-10"><div className="max-w-6xl mx-auto px-4">
    <div className="flex items-center justify-between mb-4"><h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="flex gap-2">
        <Button variant={tab==='inventory'?'default':'outline'} onClick={()=>setTab('inventory')}>Inventory</Button>
        <Button variant={tab==='portfolio'?'default':'outline'} onClick={()=>setTab('portfolio')}>Portfolio Links</Button>
        <Button variant={tab==='inbox'?'default':'outline'} onClick={()=>setTab('inbox')}>Inbox</Button>
      </div></div>
    {tab==='inventory' && <AdminInventory adminCode={adminCode}/>}
    {tab==='portfolio' && <AdminPortfolio adminCode={adminCode}/>}
    {tab==='inbox' && <AdminInbox/>}
  </div></section>);
}

function AdminInbox(){
  const [list,setList]=useState<Message[]>([]);
  React.useEffect(()=>{(async()=>{try{const r=await fetch('/api/messages'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setList(d.messages||[]);}catch(e){setList([]);}})();},[]);
  return (<Card><CardHeader><CardTitle>Messages</CardTitle><CardDescription>Contact 表单提交</CardDescription></CardHeader>
    <CardContent><div className="space-y-3">
      {list.map(m=>(<div key={m.id} className="border rounded-xl p-3"><div className="text-sm font-medium">{m.name} <span className="opacity-60">({m.email}{m.phone?` · ${m.phone}`:''})</span></div><div className="text-sm mt-1 whitespace-pre-wrap">{m.content}</div><div className="text-xs opacity-60 mt-1">{m.created_at}</div></div>))}
      {list.length===0 && <div className="text-sm opacity-70">暂无消息。</div>}
    </div></CardContent></Card>);
}

function AdminPortfolio({ adminCode }:{ adminCode:string }){
  const [links,setLinks]=useState<LinkItem[]>([]); const [url,setUrl]=useState(''); const [title,setTitle]=useState(''); const [note,setNote]=useState('');
  async function reload(){ try{const r=await fetch('/api/portfolio'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setLinks(d.links||[]);}catch(e){setLinks([]);} }
  React.useEffect(()=>{ reload(); },[]);
  return (<div className="space-y-4">
    <Card><CardHeader><CardTitle>添加 Redfin/Zillow 链接</CardTitle><CardDescription>粘贴房源链接，可附加标题/备注。</CardDescription></CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-2">
        <Input placeholder="URL (Redfin/Zillow)" value={url} onChange={(e:any)=>setUrl(e.target.value)}/>
        <Input placeholder="Title (optional)" value={title} onChange={(e:any)=>setTitle(e.target.value)}/>
        <Input placeholder="Note (optional)" value={note} onChange={(e:any)=>setNote(e.target.value)}/>
      </CardContent>
      <CardFooter><Button onClick={async()=>{ if(!url) return; await fetch('/api/portfolio',{method:'POST',headers:{'content-type':'application/json','x-admin-code':adminCode},body:JSON.stringify({url,title,note})}); setUrl(''); setTitle(''); setNote(''); reload();}}><PlusCircle className="w-4 h-4 mr-2"/>添加</Button></CardFooter>
    </Card>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {links.map(l=>(<Card key={l.id}><CardHeader><CardTitle className="text-base">{l.title||'Listing'}</CardTitle><CardDescription className="truncate">{l.url}</CardDescription></CardHeader>
        <CardFooter className="flex justify-between"><a href={l.url} target="_blank" className="text-blue-600 text-sm inline-flex items-center gap-2"><Link2 className="w-4 h-4"/>打开</a>
          <Button variant="outline" size="sm" onClick={async()=>{ await fetch(`/api/portfolio?id=${l.id}`,{method:'DELETE',headers:{'x-admin-code':adminCode}}); reload();}}><Trash2 className="w-4 h-4 mr-1"/>删除</Button>
        </CardFooter></Card>))}
    </div>
  </div>);
}

function AdminInventory({ adminCode }:{ adminCode:string }){
  const [items,setItems]=useState<Item[]>([]);
  const [newItem,setNewItem]=useState<any>({ name:'', category:'Sofas', color:'Black', size:'', price:0, inbound:'', sku:'' });
  function skuFromPattern(color:string, category:string, inbound:string, seq:number){ const c=(color?.[0]||'X').toUpperCase(); const dt=inbound?new Date(inbound):new Date(); const yy=String(dt.getFullYear()).slice(-2); const mm=String(dt.getMonth()+1).padStart(2,'0'); const t=(category?.[0]||'x').toLowerCase(); const s=String(seq).padStart(2,'0'); return `${c}${yy}${mm}${t}${s}`; }
  function nextSeqFor(dateStr:string,color:string,category:string){ const dt=dateStr?new Date(dateStr):new Date(); const yy=String(dt.getFullYear()).slice(-2); const mm=String(dt.getMonth()+1).padStart(2,'0'); const c=(color?.[0]||'X').toUpperCase(); const t=(category?.[0]||'x').toLowerCase(); const prefix=`${c}${yy}${mm}${t}`; const same=items.filter(i=>(i.sku||'').startsWith(prefix)); return same.length+1; }
  async function reload(){ try{ const r=await fetch('/api/items'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setItems(d.items||[]);} catch(e){ setItems([]);} }
  React.useEffect(()=>{ reload(); },[]);
  async function add(){ const seq=nextSeqFor(newItem.inbound,newItem.color,newItem.category); const sku=newItem.sku||skuFromPattern(newItem.color,newItem.category,newItem.inbound,seq); const body={...newItem, sku, status:'in'}; await fetch('/api/items',{method:'POST',headers:{'content-type':'application/json','x-admin-code':adminCode},body:JSON.stringify(body)}); setNewItem({ name:'', category:newItem.category, color:newItem.color, size:'', price:0, inbound:newItem.inbound, sku:'' }); reload(); }
  async function toggle(it:Item){ const body={...it, status: it.status==='in'?'out':'in'}; await fetch('/api/items',{method:'PUT',headers:{'content-type':'application/json','x-admin-code':adminCode},body:JSON.stringify(body)}); reload(); }
  return (<div className="space-y-6">
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><Warehouse className="w-5 h-5"/> Inventory</CardTitle></CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-6 gap-2">
          <Input placeholder="Name" value={newItem.name} onChange={(e:any)=>setNewItem({...newItem,name:e.target.value})}/>
          <select className="border rounded-lg px-3 py-2 text-sm" value={newItem.category} onChange={(e:any)=>setNewItem({...newItem,category:e.target.value})}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
          <select className="border rounded-lg px-3 py-2 text-sm" value={newItem.color} onChange={(e:any)=>setNewItem({...newItem,color:e.target.value})}>{COLORS.map(c=><option key={c}>{c}</option>)}</select>
          <Input placeholder="Size" value={newItem.size} onChange={(e:any)=>setNewItem({...newItem,size:e.target.value})}/>
          <Input type="number" placeholder="$/month" value={newItem.price} onChange={(e:any)=>setNewItem({...newItem,price:Number(e.target.value)})}/>
          <Input type="date" placeholder="Inbound" value={newItem.inbound} onChange={(e:any)=>setNewItem({...newItem,inbound:e.target.value})}/>
          <Input placeholder="SKU (auto optional)" value={newItem.sku} onChange={(e:any)=>setNewItem({...newItem,sku:e.target.value})}/>
        </div>
        <div className="mt-3"><Button onClick={add}><PlusCircle className="w-4 h-4 mr-2"/>Add Item</Button></div>
      </CardContent>
    </Card>
    <Card><CardHeader><CardTitle>Inventory List</CardTitle></CardHeader>
      <CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="py-2">SKU</th><th>Name</th><th>Cat</th><th>Color</th><th>Size</th><th>$/mo</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
        <tbody>{items.map(it=>(<tr key={it.id} className="border-b"><td className="py-2 font-mono">{it.sku}</td><td>{it.name}</td><td>{it.category}</td><td>{it.color}</td><td>{it.size}</td><td>{it.price}</td>
          <td>{it.status==='in'?<span className="px-2 py-0.5 text-xs rounded-md bg-neutral-100 border">In</span>:<span className="px-2 py-0.5 text-xs rounded-md bg-black text-white">Out</span>}</td>
          <td className="text-right"><Button variant="outline" onClick={()=>toggle(it)}>{it.status==='in'?'Check-out':'Check-in'}</Button></td></tr>))}</tbody></table></div></CardContent>
    </Card>
  </div>);
}
