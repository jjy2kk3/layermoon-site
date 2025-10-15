
'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link2, PlusCircle, Trash2, Warehouse, LogIn, Printer, FileText, Camera } from 'lucide-react';
import QRCode from 'qrcode';

type Item = { id: string; name: string; sku: string; category: string; color: string; size: string; price: number; status: string; image?: string|null; inbound?: string|null; };
type Message = { id: string; name: string; email: string; phone?: string|null; content: string; created_at?: string; };
type LinkItem = { id: string; title?: string|null; url: string; note?: string|null; created_at?: string; };
const CATEGORIES=['Sofas','Chairs','Rugs','Tables','Art','Decor','Dining','Bedroom'];
const COLORS=['Black','White','Gray','Beige','Ivory','Blue','Green','Brown','Other'];

function Gate({ onOk }:{ onOk:(code:string)=>void }){
  const [code,setCode]=React.useState('');
  return (<div className="min-h-[60vh] grid place-items-center">
    <Card className="w-full max-w-sm">
      <CardHeader><CardTitle>Admin Access</CardTitle><CardDescription>输入访问码进入后台</CardDescription></CardHeader>
      <CardContent><Input type="password" placeholder="Access code" value={code} onChange={(e:any)=>setCode(e.target.value)}/></CardContent>
      <CardFooter><Button className="w-full" onClick={()=>onOk(code)}><LogIn className="w-4 h-4 mr-2"/>进入</Button></CardFooter>
    </Card>
  </div>);
}

export default function Admin(){
  const [ok,setOk]=React.useState(false); const [adminCode,setAdminCode]=React.useState('');
  function verify(code:string){ if(!code) return; setAdminCode(code); setOk(true); }
  if(!ok) return <Gate onOk={verify}/>;
  const [tab,setTab]=React.useState<'inventory'|'portfolio'|'inbox'|'contract'|'scan'>('inventory');
  return (<section className="py-10"><div className="max-w-6xl mx-auto px-4">
    <div className="flex items-center justify-between mb-4"><h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="flex gap-2 flex-wrap">
        <Button variant={tab==='inventory'?'default':'outline'} onClick={()=>setTab('inventory')}>Inventory</Button>
        <Button variant={tab==='portfolio'?'default':'outline'} onClick={()=>setTab('portfolio')}>Portfolio Links</Button>
        <Button variant={tab==='inbox'?'default':'outline'} onClick={()=>setTab('inbox')}>Inbox</Button>
        <Button variant={tab==='contract'?'default':'outline'} onClick={()=>setTab('contract')}><FileText className="w-4 h-4 mr-2"/>Contract</Button>
        <Button variant={tab==='scan'?'default':'outline'} onClick={()=>setTab('scan')}><Camera className="w-4 h-4 mr-2"/>Scan I/O</Button>
      </div></div>
    {tab==='inventory' && <AdminInventory adminCode={adminCode}/>}
    {tab==='portfolio' && <AdminPortfolio adminCode={adminCode}/>}
    {tab==='inbox' && <AdminInbox/>}
    {tab==='contract' && <ContractBuilder/>}
    {tab==='scan' && <ScanIO adminCode={adminCode}/>}
  </div></section>);
}

function AdminInbox(){
  const [list,setList]=React.useState<Message[]>([]);
  React.useEffect(()=>{(async()=>{try{const r=await fetch('/api/messages'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setList(d.messages||[]);}catch(e){setList([]);}})();},[]);
  return (<Card><CardHeader><CardTitle>Messages</CardTitle><CardDescription>Contact 表单提交</CardDescription></CardHeader>
    <CardContent><div className="space-y-3">
      {list.map(m=>(<div key={m.id} className="border rounded-xl p-3"><div className="text-sm font-medium">{m.name} <span className="opacity-60">({m.email}{m.phone?` · ${m.phone}`:''})</span></div><div className="text-sm mt-1 whitespace-pre-wrap">{m.content}</div><div className="text-xs opacity-60 mt-1">{m.created_at}</div></div>))}
      {list.length===0 && <div className="text-sm opacity-70">暂无消息。</div>}
    </div></CardContent></Card>);
}

function AdminPortfolio({ adminCode }:{ adminCode:string }){
  const [links,setLinks]=React.useState<LinkItem[]>([]); const [url,setUrl]=React.useState(''); const [title,setTitle]=React.useState(''); const [note,setNote]=React.useState('');
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
  const [items,setItems]=React.useState<Item[]>([]);
  const [newItem,setNewItem]=React.useState<any>({ name:'', category:'Sofas', color:'Black', size:'', price:0, inbound:'', sku:'', image:'' });
  const [scan,setScan]=React.useState('');

  function skuFromPattern(color:string, category:string, inbound:string, seq:number){ const c=(color?.[0]||'X').toUpperCase(); const dt=inbound?new Date(inbound):new Date(); const yy=String(dt.getFullYear()).slice(-2); const mm=String(dt.getMonth()+1).padStart(2,'0'); const t=(category?.[0]||'x').toLowerCase(); const s=String(seq).padStart(2,'0'); return `${c}${yy}${mm}${t}${s}`; }
  function nextSeqFor(dateStr:string,color:string,category:string){ const dt=dateStr?new Date(dateStr):new Date(); const yy=String(dt.getFullYear()).slice(-2); const mm=String(dt.getMonth()+1).padStart(2,'0'); const c=(color?.[0]||'X').toUpperCase(); const t=(category?.[0]||'x').toLowerCase(); const prefix=`${c}${yy}${mm}${t}`; const same=items.filter(i=>(i.sku||'').startsWith(prefix)); return same.length+1; }
  async function reload(){ try{ const r=await fetch('/api/items'); if(!r.ok) throw new Error(await r.text()); const d=await r.json(); setItems(d.items||[]);} catch(e){ setItems([]);} }
  React.useEffect(()=>{ reload(); },[]);

  async function add(){
    const seq=nextSeqFor(newItem.inbound,newItem.color,newItem.category);
    const sku=newItem.sku||skuFromPattern(newItem.color,newItem.category,newItem.inbound,seq);
    const body={...newItem, sku, status:'in'};
    await fetch('/api/items',{method:'POST',headers:{'content-type':'application/json','x-admin-code':adminCode},body:JSON.stringify(body)});
    setNewItem({ name:'', category:newItem.category, color:newItem.color, size:'', price:0, inbound:newItem.inbound, sku:'', image:'' });
    reload();
  }
  async function toggle(it:Item){ const body={...it, status: it.status==='in'?'out':'in'}; await fetch('/api/items',{method:'PUT',headers:{'content-type':'application/json','x-admin-code':adminCode},body:JSON.stringify(body)}); reload(); }

  function onFile(e:any){
    const file=e.target.files?.[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=()=>{ setNewItem((v:any)=>({...v,image:String(reader.result)})); };
    reader.readAsDataURL(file);
  }

  async function printLabel(it:Item){
    const content = document.createElement('div');
    content.style.padding='16px'; content.style.fontFamily='system-ui, Arial';
    const img = document.createElement('img');
    // generate QR data
    const qr = await QRCode.toDataURL(it.sku,{margin:1,scale:6});
    img.src = qr; img.style.width='120px';
    content.innerHTML = `<div style="font-size:14px"><b>${it.name||''}</b></div><div style="font-family:monospace;margin:6px 0">${it.sku}</div>`;
    content.prepend(img);
    const w = window.open('','_blank','width=360,height=240');
    if(!w) return;
    w.document.write('<html><head><title>Label</title></head><body style="margin:0;padding:20px">');
    w.document.body.appendChild(content);
    w.document.write('</body></html>');
    w.document.close();
    w.focus();
    w.print();
  }

  async function handleScanSubmit(e:any){ e.preventDefault();
    const code=scan.trim(); if(!code) return;
    const it=items.find(x=>x.sku===code);
    if(!it){ alert('SKU not found'); return; }
    await toggle(it);
    setScan('');
  }

  return (<div className="space-y-6">
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><Warehouse className="w-5 h-5"/> Inventory</CardTitle></CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-7 gap-2">
          <Input placeholder="Name" value={newItem.name} onChange={(e:any)=>setNewItem({...newItem,name:e.target.value})}/>
          <select className="border rounded-lg px-3 py-2 text-sm" value={newItem.category} onChange={(e:any)=>setNewItem({...newItem,category:e.target.value})}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
          <select className="border rounded-lg px-3 py-2 text-sm" value={newItem.color} onChange={(e:any)=>setNewItem({...newItem,color:e.target.value})}>{COLORS.map(c=><option key={c}>{c}</option>)}</select>
          <Input placeholder="Size" value={newItem.size} onChange={(e:any)=>setNewItem({...newItem,size:e.target.value})}/>
          <Input type="number" placeholder="$/month" value={newItem.price} onChange={(e:any)=>setNewItem({...newItem,price:Number(e.target.value)})}/>
          <Input type="date" placeholder="Inbound" value={newItem.inbound} onChange={(e:any)=>setNewItem({...newItem,inbound:e.target.value})}/>
          <Input placeholder="SKU (auto optional)" value={newItem.sku} onChange={(e:any)=>setNewItem({...newItem,sku:e.target.value})}/>
          <input type="file" accept="image/*" onChange={onFile} className="text-sm" />
        </div>
        <div className="mt-3"><Button onClick={add}><PlusCircle className="w-4 h-4 mr-2"/>Add Item</Button></div>
      </CardContent>
    </Card>

    <Card><CardHeader><CardTitle>Quick Scan In/Out</CardTitle><CardDescription>用扫码枪或键盘输入 SKU，回车切换入/出库</CardDescription></CardHeader>
      <CardContent><form onSubmit={handleScanSubmit} className="flex gap-2"><Input placeholder="Scan SKU here" value={scan} onChange={(e:any)=>setScan(e.target.value)}/><Button type="submit">Toggle</Button></form></CardContent>
    </Card>

    <Card><CardHeader><CardTitle>Inventory List</CardTitle></CardHeader>
      <CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="py-2">SKU</th><th>Photo</th><th>Name</th><th>Cat</th><th>Color</th><th>Size</th><th>$/mo</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
        <tbody>{items.map(it=>(<tr key={it.id} className="border-b">
          <td className="py-2 font-mono">{it.sku}</td>
          <td>{it.image ? <img src={it.image} alt="" className="w-14 h-14 object-cover rounded-md border"/> : <span className="opacity-50">—</span>}</td>
          <td>{it.name}</td><td>{it.category}</td><td>{it.color}</td><td>{it.size}</td><td>{it.price}</td>
          <td>{it.status==='in'?<span className="px-2 py-0.5 text-xs rounded-md bg-neutral-100 border">In</span>:<span className="px-2 py-0.5 text-xs rounded-md bg-black text-white">Out</span>}</td>
          <td className="text-right space-x-2">
            <Button variant="outline" onClick={()=>printLabel(it)}><Printer className="w-4 h-4 mr-1"/>Label</Button>
            <Button variant="outline" onClick={()=>toggle(it)}>{it.status==='in'?'Check-out':'Check-in'}</Button>
          </td></tr>))}</tbody></table></div></CardContent>
    </Card>
  </div>);
}

function ContractBuilder(){
  const [client,setClient]=React.useState({ name:'', phone:'', email:'', address:'', start:'', end:'' });
  const [items,setItems]=React.useState<Item[]>([]);
  const [selected,setSelected]=React.useState<Record<string,boolean>>({});
  React.useEffect(()=>{(async()=>{try{const r=await fetch('/api/items');const d=await r.json(); setItems(d.items||[]);}catch{}})();},[]);
  function toggle(id:string){ setSelected(s=>({...s,[id]:!s[id]})); }
  function generate(){
    const chosen=items.filter(i=>selected[i.id]);
    const today=new Date().toLocaleDateString();
    const html=`
      <html><head><title>Contract</title>
      <style>
        body{font-family:system-ui,-apple-system,Arial;margin:24px;color:#111}
        h1{font-size:20px;margin:0 0 8px} h2{font-size:16px;margin:16px 0 8px}
        table{width:100%;border-collapse:collapse} th,td{border:1px solid #ddd;padding:8px;font-size:12px}
        .muted{color:#666;font-size:12px}
      </style></head><body>
      <h1>Staging Rental Agreement</h1>
      <div class="muted">Date: ${today}</div>
      <h2>Client</h2>
      <div>Name: ${client.name||''}</div>
      <div>Phone: ${client.phone||''} &nbsp; Email: ${client.email||''}</div>
      <div>Address: ${client.address||''}</div>
      <div>Term: ${client.start||''} ~ ${client.end||''}</div>
      <h2>Items</h2>
      <table><thead><tr><th>SKU</th><th>Name</th><th>Category</th><th>Monthly</th><th>Status</th></tr></thead>
      <tbody>
        ${chosen.map(i=>`<tr><td>${i.sku}</td><td>${i.name}</td><td>${i.category}</td><td>${i.price||0}</td><td>${i.status}</td></tr>`).join('')}
      </tbody></table>
      <p class="muted">By signing, client agrees to pay rent for the listed items during the term and return them in good condition.</p>
      <p>Client Signature: _______________________  Date: ____________</p>
      <p>Company Signature: ______________________  Date: ____________</p>
      </body></html>
    `;
    const w=window.open('','_blank'); if(!w) return;
    w.document.write(html); w.document.close(); w.focus(); w.print();
  }
  return (<Card>
    <CardHeader><CardTitle>Contract (打印 / 另存为 PDF)</CardTitle><CardDescription>填写客户信息 + 选择物品 → 生成合同页面并打印/保存PDF</CardDescription></CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-3 gap-2">
        <Input placeholder="Client Name" value={client.name} onChange={(e:any)=>setClient({...client,name:e.target.value})}/>
        <Input placeholder="Phone" value={client.phone} onChange={(e:any)=>setClient({...client,phone:e.target.value})}/>
        <Input placeholder="Email" value={client.email} onChange={(e:any)=>setClient({...client,email:e.target.value})}/>
        <Input placeholder="Address" className="md:col-span-3" value={client.address} onChange={(e:any)=>setClient({...client,address:e.target.value})}/>
        <Input type="date" placeholder="Start" value={client.start} onChange={(e:any)=>setClient({...client,start:e.target.value})}/>
        <Input type="date" placeholder="End" value={client.end} onChange={(e:any)=>setClient({...client,end:e.target.value})}/>
      </div>
      <div className="mt-4 border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b"><th className="py-2 px-2">Select</th><th className="px-2">SKU</th><th className="px-2">Name</th><th className="px-2">$/mo</th></tr></thead>
          <tbody>{items.map(i=>(<tr key={i.id} className="border-b">
            <td className="py-2 px-2"><input type="checkbox" checked={!!selected[i.id]} onChange={()=>toggle(i.id)}/></td>
            <td className="px-2">{i.sku}</td>
            <td className="px-2">{i.name}</td>
            <td className="px-2">{i.price||0}</td>
          </tr>))}</tbody>
        </table>
      </div>
    </CardContent>
    <CardFooter><Button onClick={generate}><FileText className="w-4 h-4 mr-2"/>生成合同并打印</Button></CardFooter>
  </Card>);
}

function ScanIO({ adminCode }:{ adminCode:string }){
  const [items,setItems]=React.useState<Item[]>([]);
  const [sku,setSku]=React.useState('');
  React.useEffect(()=>{(async()=>{try{const r=await fetch('/api/items'); const d=await r.json(); setItems(d.items||[]);}catch{}})();},[]);
  async function submit(e:any){ e.preventDefault(); const it=items.find(x=>x.sku===sku.trim()); if(!it){ alert('SKU not found'); return;} const body={...it, status: it.status==='in'?'out':'in'}; await fetch('/api/items',{method:'PUT',headers:{'content-type':'application/json','x-admin-code':adminCode},body:JSON.stringify(body)}); setSku(''); const r=await fetch('/api/items'); const d=await r.json(); setItems(d.items||[]); }
  return (<Card><CardHeader><CardTitle>扫描出入库（键盘/扫码枪）</CardTitle><CardDescription>在输入框扫描或输入 SKU，自动切换 In/Out</CardDescription></CardHeader>
    <CardContent><form onSubmit={submit} className="flex gap-2"><Input placeholder="Scan SKU..." value={sku} onChange={(e:any)=>setSku(e.target.value)}/><Button type="submit">Toggle</Button></form></CardContent></Card>);
}
