
"use client";
import React, { useMemo, useState, useRef, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sofa, Paintbrush, Ruler, Mail, Filter, Trash2, Info, PhoneCall, MapPin, Instagram, Loader2, LogIn, LogOut, Upload, PlusCircle, Camera, Printer, Warehouse, CheckCheck, PackageOpen, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

/**************** i18n (EN/中文) ****************/
const dict: any = {
  en: {
    brand: "Layer Moon Staging",
    nav: { services: "Services", portfolio: "Portfolio", catalog: "Catalog", contact: "Contact", inventory: "Inventory", login: "Login", logout: "Logout" },
    heroTitle: "Stage faster. Sell better.",
    heroDesc: "Greater Seattle home staging—vacant, partial, Airbnb. Furniture + styling rentals.",
    browseCatalog: "Browse Catalog",
    getQuote: "Get a Quote",
    servicesTitle: "Services & Packages",
    portfolioTitle: "Recent Projects",
    catalogTitle: "Rental Catalog",
    catalogDesc: "Basic product management: categories, search, sort, RFQ cart.",
    filter: "Filter",
    searchPH: "Search name/SKU/color",
    category: "Category",
    sort: "Sort",
    sortPopular: "Featured",
    sortLow: "Price: Low → High",
    sortHigh: "Price: High → Low",
    addToRFQ: "Add to RFQ",
    cart: "RFQ Cart",
    emptyCart: "Your RFQ cart is empty.",
    monthlySubtotal: "Monthly subtotal",
    submitRFQ: "Submit RFQ",
    rfqTitle: "Submit RFQ",
    rfqDesc: "Tell us about your project. We'll reply with availability & pricing.",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    address: "Project city/ZIP",
    duration: "Duration",
    notes: "Notes (style, budget, timeline)",
    sending: "Sending",
    sendRFQ: "Send RFQ",
    generateContract: "Generate Contract (demo)",
    contactUs: "Tell us about your project",
    usuallyReply: "We typically reply within 24 hours.",
    send: "Send",
    downloadList: "Download service list",
    contact: "Contact & Social",
    faq: "FAQ",
    flow: "Process",
    price: "Pricing",
    stock: "Inventory",
    flowAns: "24–48h walkthrough; 1–3 days for install.",
    priceAns: "Monthly billing. Minimum 1 month; weekly extension available.",
    stockAns: "In‑house warehouse + vendor partners. Popular items can be reserved.",
    /**** Admin ****/
    adminTab: "Inventory (Admin)",
    adminIntro: "Private warehouse: image upload, manual categories/colors, printable barcodes, check-in/out via scan.",
    addItem: "Add Item",
    importCSV: "Import CSV",
    fields: { title: "Title", sku: "SKU (auto if empty)", cat: "Category", color: "Color", size: "Size", monthly: "Monthly rent ($)", tags: "Tags (comma)", image: "Image", inbound: "Inbound date" },
    autoCatHint: "SKU pattern: CYYMMtNN (Color initial + yymm + type initial + seq)",
    saveItem: "Save Item",
    inventoryList: "Inventory List",
    status: "Status",
    inWarehouse: "In warehouse",
    stagedOut: "Staged (out)",
    checkOut: "Check‑out",
    checkIn: "Check‑in",
    printLabels: "Print labels",
    scanMode: "Scan mode",
    scanPH: "Scan or type barcode/QR",
    labelNote: "Labels include Code128 barcode + QR to item URL.",
    lang: "EN",
    loginTitle: "Admin Login",
    passPH: "Access code",
  },
  zh: {
    brand: "Layer Moon Staging",
    nav: { services: "服务", portfolio: "案例", catalog: "租赁目录", contact: "联系", inventory: "库存", login: "登录", logout: "退出" },
    heroTitle: "让房子更快售出，也更好成交",
    heroDesc: "大西雅图 Home Staging｜整套/局部｜家具与软装一体化租赁。",
    browseCatalog: "浏览租赁目录",
    getQuote: "获取报价",
    servicesTitle: "服务与套餐",
    portfolioTitle: "近期案例",
    catalogTitle: "租赁目录",
    catalogDesc: "简单商品管理：分类、搜索、排序、询价车。",
    filter: "筛选",
    searchPH: "搜索名称/型号/颜色",
    category: "分类",
    sort: "排序",
    sortPopular: "推荐",
    sortLow: "价格从低到高",
    sortHigh: "价格从高到低",
    addToRFQ: "加入询价车",
    cart: "询价车",
    emptyCart: "你的询价车是空的。",
    monthlySubtotal: "月度小计",
    submitRFQ: "提交询价",
    rfqTitle: "提交询价",
    rfqDesc: "填写项目信息，我们会回复可用库存与报价。",
    name: "姓名",
    email: "邮箱",
    phone: "电话（可选）",
    address: "项目城市/邮编",
    duration: "需求时长",
    notes: "备注（风格/预算/节点）",
    sending: "提交中",
    sendRFQ: "发送询价",
    generateContract: "生成合约（演示）",
    contactUs: "告诉我们你的项目",
    usuallyReply: "我们通常在 24 小时内响应。",
    send: "发送",
    downloadList: "下载服务清单",
    contact: "联系与社媒",
    faq: "常见问答",
    flow: "流程",
    price: "价格",
    stock: "库存",
    flowAns: "通常 24–48 小时评估，1–3 天完成进场。",
    priceAns: "按月计费，最短 1 个月，可按周续租。",
    stockAns: "自有仓库 + 供应商联动，热门单品可预留。",
    /**** Admin ****/
    adminTab: "库存（后台）",
    adminIntro: "私有库存：图片本地上传、手动分类/颜色、条码打印、扫码出入库。",
    addItem: "新增物品",
    importCSV: "导入 CSV",
    fields: { title: "名称", sku: "SKU（留空自动）", cat: "分类", color: "颜色", size: "尺寸", monthly: "月租($)", tags: "标签（逗号）", image: "图片", inbound: "入库日期" },
    autoCatHint: "SKU 格式：颜色首字母 + 年月(YYMM) + 类别首字母(小写) + 序号",
    saveItem: "保存物品",
    inventoryList: "库存清单",
    status: "状态",
    inWarehouse: "在库",
    stagedOut: "外出（staging）",
    checkOut: "出库",
    checkIn: "入库",
    printLabels: "打印标签",
    scanMode: "扫码模式",
    scanPH: "扫描或输入条码/二维码",
    labelNote: "标签包含 Code128 条码 + 指向物品页面的二维码。",
    lang: "中文",
    loginTitle: "后台登录",
    passPH: "访问码",
  }
};
const LangCtx = createContext({ lang: "en", t: dict.en, setLang: (l:string)=>{} } as any);
const useI18n = () => useContext(LangCtx);

/**************** Fake Data ****************/
const PRODUCTS: any[] = [
  { id: "p1", name: "Belmont 3-Seater Sofa", sku: "SOF-001", price: 150, unit: "/month", category: "Sofas", color: "Oatmeal", size: "84\"W", img: "", tags: ["Modern", "Rental"], status: "in" },
  { id: "p2", name: "Auburn Bouclé Accent Chair", sku: "CHA-014", price: 75, unit: "/month", category: "Chairs", color: "Ivory", size: "30\"W", img: "", tags: ["Scandi", "Rental"], status: "in" },
  { id: "p3", name: "Cascade 8x10 Rug", sku: "RUG-208", price: 65, unit: "/month", category: "Rugs", color: "Beige/Gray", size: "8x10", img: "", tags: ["Neutral", "Best Seller"], status: "out" },
];
const CATEGORIES = ["Sofas", "Chairs", "Rugs", "Tables", "Art", "Decor", "Nightstands", "Dining"];
const COLORS = ["Black", "White", "Gray", "Beige", "Ivory", "Blue", "Green", "Brown", "Other"];
const PORTFOLIO = [
  { id: "pf1", title: "New Build in Bellevue", badge: "4bd | Contemporary", cover: "", note: "Sold in 7 days over asking" },
  { id: "pf2", title: "Queen Anne Condo", badge: "1bd | Minimal", cover: "", note: "Vacant → Warm & airy" },
  { id: "pf3", title: "Redmond Family Home", badge: "5bd | Transitional", cover: "", note: "Before / After" },
  { id: "pf4", title: "Kirkland Lakeview", badge: "3bd | Coastal", cover: "", note: "Light blues & naturals" },
];

function currency(n:number) { return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n); }

/**************** Barcode & QR utils ****************/
function useBarcode(value:string) {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(()=>{
    if (!ref.current || !value) return;
    try { (JsBarcode as any)(ref.current, value, { format: "CODE128", displayValue: false, margin: 0, height: 40 }); } catch {}
  }, [value]);
  return ref;
}
async function toQRDataURL(text:string) { return await (QRCode as any).toDataURL(text, { margin: 0, width: 120 }); }

/**************** Admin: Inventory ****************/
function AdminInventory() {
  const { t } = useI18n();
  const [items, setItems] = useState(PRODUCTS);
  const [scanCode, setScanCode] = useState("");
  const [newItem, setNewItem] = useState<any>({ name: "", sku: "", category: "Sofas", color: "Black", size: "", price: 0, tags: "", img: "", inbound: "", status: "in" });

  // SKU per pattern: ColorInitial + yymm + typeInitial(lowercase) + seq2
  function skuFromPattern(params:{color:string; category:string; inbound:string; seq:number}){
    const colorInitial = (params.color?.[0] || "X").toUpperCase();
    const dt = params.inbound ? new Date(params.inbound) : new Date();
    const yy = String(dt.getFullYear()).slice(-2);
    const mm = String(dt.getMonth()+1).padStart(2, '0');
    const typeInitial = (params.category?.[0] || 'x').toLowerCase();
    const seq2 = String(params.seq).padStart(2,'0');
    return `${colorInitial}${yy}${mm}${typeInitial}${seq2}`;
  }

  async function handleImageUpload(file:File){
    return new Promise<string>((resolve)=>{
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }

  function nextSeqFor(dateStr:string, color:string, category:string){
    const dt = new Date(dateStr || new Date());
    const yy = String(dt.getFullYear()).slice(-2);
    const mm = String(dt.getMonth()+1).padStart(2,'0');
    const colorInitial = (color?.[0]||'X').toUpperCase();
    const typeInitial = (category?.[0]||'x').toLowerCase();
    const prefix = `${colorInitial}${yy}${mm}${typeInitial}`;
    const sameDay = items.filter(i => (i.sku||"").startsWith(prefix));
    return sameDay.length + 1;
  }

  async function handleSave() {
    const seq = nextSeqFor(newItem.inbound || new Date().toISOString().slice(0,10), newItem.color, newItem.category);
    const sku = newItem.sku || skuFromPattern({ color: newItem.color, category: newItem.category, inbound: newItem.inbound, seq });
    const id = `itm_${Date.now()}`;
    const toAdd = { id, name: newItem.name, sku, price: Number(newItem.price)||0, unit: "/month", category: newItem.category, color: newItem.color, size: newItem.size, img: newItem.img, tags: (newItem.tags||"").split(",").map((s:string)=>s.trim()).filter(Boolean), status: "in" };
    setItems(prev=>[toAdd, ...prev]);
    setNewItem({ name: "", sku: "", category: newItem.category, color: newItem.color, size: "", price: 0, tags: "", img: "", inbound: newItem.inbound, status: "in" });
    alert(`Saved: ${toAdd.name} → ${toAdd.sku}`);
  }

  function findByCode(code:string){ return items.find(i => i.sku === code || i.id === code); }
  function toggleOutIn(itemId:string, mode:"out"|"in"){ setItems(prev=> prev.map(i=> i.id===itemId ? { ...i, status: mode==="out"?"out":"in" } : i)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Warehouse className="w-5 h-5"/> {t.adminIntro}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-6 gap-3">
            <Input placeholder={t.fields.title} value={newItem.name} onChange={e=>setNewItem({...newItem, name:e.target.value})}/>
            <Select value={newItem.category} onValueChange={(v:any)=>setNewItem({...newItem, category:v})}>
              <SelectTrigger><SelectValue placeholder={t.fields.cat}/></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c=> <SelectItem key={c} value={c} onClick={()=>setNewItem({...newItem, category:c})}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={newItem.color} onValueChange={(v:any)=>setNewItem({...newItem, color:v})}>
              <SelectTrigger><SelectValue placeholder={t.fields.color}/></SelectTrigger>
              <SelectContent>
                {COLORS.map(c=> <SelectItem key={c} value={c} onClick={()=>setNewItem({...newItem, color:c})}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder={t.fields.size} value={newItem.size} onChange={e=>setNewItem({...newItem, size:e.target.value})}/>
            <Input placeholder={t.fields.monthly} type="number" value={newItem.price} onChange={e=>setNewItem({...newItem, price:e.target.value})}/>
            <Input type="date" placeholder={t.fields.inbound} value={newItem.inbound} onChange={e=>setNewItem({...newItem, inbound:e.target.value})}/>
            <Input placeholder={t.fields.tags} value={newItem.tags} onChange={e=>setNewItem({...newItem, tags:e.target.value})} className="md:col-span-3"/>
            <div className="md:col-span-2 flex items-center gap-2">
              <Input type="file" accept="image/*" onChange={async (e:any)=>{ const f=e.target.files?.[0]; if (f){ const url = await handleImageUpload(f); setNewItem({...newItem, img:url}); } }} />
              {newItem.img && <img src={newItem.img} alt="preview" className="w-16 h-16 object-cover rounded"/>}
            </div>
            <Input placeholder={t.fields.sku} value={newItem.sku} onChange={e=>setNewItem({...newItem, sku:e.target.value})}/>
          </div>
          <div className="text-xs opacity-70 mt-2">{t.autoCatHint} (e.g. Black sofa inbound 2025‑09 → <span className="font-mono">B2509s01</span>)</div>
          <div className="mt-3 flex gap-2">
            <Button onClick={handleSave}><PlusCircle className="w-4 h-4 mr-2"/> {t.addItem}</Button>
            <Button variant="outline"><Upload className="w-4 h-4 mr-2"/> {t.importCSV}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2"><PackageOpen className="w-5 h-5"/> {t.inventoryList}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">SKU</th>
                  <th>Name</th>
                  <th>Cat</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>$/mo</th>
                  <th>{t.status}</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it=> (
                  <tr key={it.id} className="border-b">
                    <td className="py-2 font-mono">{it.sku}</td>
                    <td className="whitespace-nowrap">{it.name}</td>
                    <td>{it.category}</td>
                    <td>{it.color}</td>
                    <td>{it.size}</td>
                    <td>{it.price}</td>
                    <td>
                      {it.status === "in" ? <Badge variant="secondary">{t.inWarehouse}</Badge> : <Badge>{t.stagedOut}</Badge>}
                    </td>
                    <td className="text-right space-x-2 py-2">
                      <Button size="sm" variant="outline" onClick={()=>setItems(prev=> prev.map(i=> i.id===it.id?{...i, status:"out"}:i))}><LogOut className="w-4 h-4 mr-1"/> {t.checkOut}</Button>
                      <Button size="sm" variant="outline" onClick={()=>setItems(prev=> prev.map(i=> i.id===it.id?{...i, status:"in"}:i))}><LogIn className="w-4 h-4 mr-1"/> {t.checkIn}</Button>
                      <PrintLabelButton item={it} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5"/> {t.scanMode}</CardTitle>
          <CardDescription>{t.labelNote}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input placeholder={t.scanPH} value={scanCode} onChange={e=>setScanCode(e.target.value)} className="max-w-sm"/>
            <Button variant="outline" onClick={()=>{
              const found: any = findByCode(scanCode.trim());
              if (!found) return alert("Not found");
              setItems(prev=> prev.map(i=> i.id===found.id?{...i, status: found.status==="in"?"out":"in"}:i));
              setScanCode("");
            }}><CheckCheck className="w-4 h-4 mr-2"/> OK</Button>
          </div>
          <div className="text-xs opacity-70 mt-2">(接入 html5-qrcode 可使用摄像头扫码；当前用输入框模拟演示)</div>
        </CardContent>
      </Card>
    </div>
  );
}

function PrintLabelButton({ item }: any){
  const { t } = useI18n();
  const barcodeRef = useBarcode(item.sku);
  const [qr, setQr] = useState<string>("");
  const url = `https://layermoon.com/items/${item.id}`;
  useEffect(()=>{ (async()=> setQr(await toQRDataURL(url)))(); }, [url]);
  return (
    <Dialog open={true} onOpenChange={()=>{}}>
      {/* Simplified trigger: render button that opens a simple window for print */}
      <Button size="sm" variant="outline" onClick={()=>{
        const w = window.open("", "label");
        if(!w) return;
        const svg = barcodeRef.current?.outerHTML || "";
        w.document.write(`<!doctype html><html><head><meta charset='utf-8'><title>Label</title>
          <style>body{font-family:ui-sans-serif,system-ui;padding:16px}</style></head><body>
          <div style="border:1px solid #ddd;border-radius:12px;padding:12px;width:320px">
            <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
              <div><div style="font-weight:600;font-size:14px">${item.name}</div>
              <div style="opacity:.7;font-size:12px">${item.sku} · ${item.color} · ${item.size}</div></div>
              <img src="${qr}" width="64" height="64"/>
            </div>
            <div style="margin-top:8px">${svg}</div>
            <div style="opacity:.6;font-size:10px;margin-top:4px">${url}</div>
          </div>
          <script>window.print()</script></body></html>`);
        w.document.close();
      }}><Printer className="w-4 h-4 mr-1"/> {t.printLabels}</Button>
    </Dialog>
  );
}

/**************** Public site ****************/
export default function StagingSiteMVP() {
  const [lang, setLang] = useState<'en'|'zh'>("en" as any);
  const t = dict[lang];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [openRFQ, setOpenRFQ] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = PRODUCTS.filter(p => (category === "All" || p.category === category) && (!term || `${p.name} ${p.sku} ${p.color} ${p.category}`.toLowerCase().includes(term)));
    if (sort === "price-asc") list = list.slice().sort((a:any,b:any)=>a.price-b.price);
    if (sort === "price-desc") list = list.slice().sort((a:any,b:any)=>b.price-a.price);
    return list;
  }, [search, category, sort]);

  const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0);
  function addToCart(p:any) {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id===p.id?{...i, qty: i.qty+1}:i);
      return [...prev, { ...p, qty: 1 }];
    });
  }
  function removeFromCart(id:string) { setCart(prev => prev.filter(i => i.id !== id)); }
  function updateQty(id:string, qty:number) { setCart(prev => prev.map(i => i.id===id?{...i, qty: Math.max(1, qty)}:i)); }

  async function handleSubmitQuote(e:any) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(()=>{ setSubmitting(false); setOpenRFQ(false); alert("RFQ submitted (demo)"); }, 1200);
  }

  function openContractDemo(){
    const win = window.open('', 'contract');
    if (!win) return;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Contract</title><style>body{font-family:ui-sans-serif,system-ui;padding:24px} h1{font-size:20px} table{width:100%;border-collapse:collapse;margin-top:12px} td,th{border:1px solid #ddd;padding:8px;font-size:12px} .right{text-align:right}</style></head><body><h1>Layer Moon Staging – Rental Contract (Demo)</h1><p>Date: ${new Date().toLocaleDateString()}</p><table><thead><tr><th>Item</th><th>SKU</th><th>Qty</th><th class="right">$/mo</th></tr></thead><tbody>${cart.map(i=>`<tr><td>${i.name}</td><td>${i.sku}</td><td>${i.qty}</td><td class="right">${i.price}</td></tr>`).join('')}</tbody><tfoot><tr><th colspan="3" class="right">Subtotal</th><th class="right">${subtotal}</th></tr></tfoot></table><p style="margin-top:12px;font-size:12px">Terms placeholder…</p><script>window.print()</script></body></html>`;
    win.document.write(html);
    win.document.close();
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-2xl bg-black text-white grid place-items-center font-bold">LM</div>
            <span className="font-semibold">{t.brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:opacity-70">{t.nav.services}</a>
            <a href="#portfolio" className="hover:opacity-70">{t.nav.portfolio}</a>
            <a href="#catalog" className="hover:opacity-70">{t.nav.catalog}</a>
            <a href="#contact" className="hover:opacity-70">{t.nav.contact}</a>
            {loggedIn && <button onClick={()=>setAdmin(a=>!a)} className="hover:opacity-70">{t.nav.inventory}</button>}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={()=>setLang((l:any)=> l==='en'?'zh':'en')} className="text-sm opacity-80 hover:opacity-100 border px-2 py-1 rounded-lg">{t.lang}</button>
            {!loggedIn ? (
              <Button variant="outline" size="sm" onClick={()=>setShowLogin(true)} className="gap-2"><User className="w-4 h-4"/> {t.nav.login}</Button>
            ) : (
              <Button variant="outline" size="sm" onClick={()=>{setLoggedIn(false); setAdmin(false);}} className="gap-2"><Lock className="w-4 h-4"/> {t.nav.logout}</Button>
            )}
            <a className="hidden sm:flex items-center gap-2 text-sm opacity-80 hover:opacity-100" href="tel:+12065550123"><PhoneCall className="w-4 h-4"/> 206‑555‑0123</a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2"><ShoppingCart className="w-4 h-4"/> {t.cart} ({cart.length})</Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>{t.cart}</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {cart.length===0 && <p className="text-sm opacity-70">{t.emptyCart}</p>}
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <CardDescription>{item.sku} · {currency(item.price)}{item.unit}</CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={()=>updateQty(item.id, item.qty-1)}>-</Button>
                            <Input value={item.qty} onChange={e=>updateQty(item.id, Number((e.target as any).value)||1)} className="w-14 text-center" />
                            <Button size="sm" variant="outline" onClick={()=>updateQty(item.id, item.qty+1)}>+</Button>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{currency(item.price*item.qty)} /月</div>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={()=>removeFromCart(item.id)}><Trash2 className="w-4 h-4 mr-1"/> 移除</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm opacity-70">{t.monthlySubtotal}</div>
                  <div className="text-lg font-semibold">{currency(subtotal)}</div>
                </div>
                <div className="grid gap-2 mt-4">
                  <Button className="w-full" disabled={cart.length===0} onClick={()=>setOpenRFQ(true)}>{t.submitRFQ}</Button>
                  <Button type="button" variant="outline" className="w-full" disabled={cart.length===0} onClick={openContractDemo}>{t.generateContract}</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      {!admin && (
      <section className="bg-gradient-to-b from-white to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-3xl md:text-5xl font-semibold leading-tight">{t.heroTitle}</motion.h1>
            <p className="mt-4 text-neutral-600">{t.heroDesc}</p>
            <div className="mt-6 flex gap-3">
              <a href="#catalog"><Button className="rounded-2xl px-6">{t.browseCatalog}</Button></a>
              <a href="#contact"><Button variant="outline" className="rounded-2xl px-6">{t.getQuote}</Button></a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2"><Sofa className="w-4 h-4"/> In‑house warehouse</div>
              <div className="flex items-center gap-2"><Paintbrush className="w-4 h-4"/> Design styling</div>
              <div className="flex items-center gap-2"><Ruler className="w-4 h-4"/> On‑site measure</div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl bg-neutral-200 grid place-items-center text-neutral-500">
            <span>(Hero photo / before-after)</span>
          </div>
        </div>
      </section>) }

      {/* Admin inventory panel (private) */}
      {admin && loggedIn && (
        <section id="inventory" className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{t.adminTab}</h2>
            <AdminInventory />
          </div>
        </section>
      )}

      {/* Portfolio */}
      {!admin && (
      <section id="portfolio" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">{t.portfolioTitle}</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-6">
            {PORTFOLIO.map(p => (
              <Card key={p.id} className="rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-200"/>
                <CardHeader>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2"><Badge variant="secondary">{p.badge}</Badge><span>{p.note}</span></CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Catalog */}
      {!admin && (
      <section id="catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">{t.catalogTitle}</h2>
              <p className="text-neutral-600 mt-2">{t.catalogDesc}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm opacity-70"><Info className="w-4 h-4"/>$/month pricing incl. normal wear.</div>
          </div>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1 space-y-3">
              <div className="p-4 bg-white border rounded-2xl">
                <div className="text-sm font-medium mb-3 flex items-center gap-2"><Filter className="w-4 h-4"/> {t.filter}</div>
                <Input placeholder={t.searchPH} value={search} onChange={e=>setSearch((e.target as any).value)} />
                <div className="mt-3">
                  <div className="text-xs uppercase tracking-wide opacity-60 mb-2">{t.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {["All",...CATEGORIES].map(c => (
                      <Button key={c} variant={category===c?"default":"outline"} size="sm" className="rounded-full" onClick={()=>setCategory(c)}>{c}</Button>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xs uppercase tracking-wide opacity-60 mb-2">{t.sort}</div>
                  <Select value={sort} onValueChange={(v:any)=>setSort(v)}>
                    <SelectTrigger><SelectValue placeholder={t.sort}/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular" onClick={()=>setSort("popular")}>{t.sortPopular}</SelectItem>
                      <SelectItem value="price-asc" onClick={()=>setSort("price-asc")}>{t.sortLow}</SelectItem>
                      <SelectItem value="price-desc" onClick={()=>setSort("price-desc")}>{t.sortHigh}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <Card key={p.id} className="rounded-2xl flex flex-col">
                  <div className="aspect-[4/3] bg-neutral-200"/>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between">{p.name} <Badge variant="outline" className="ml-2">{p.category}</Badge></CardTitle>
                    <CardDescription className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{p.sku}</Badge>
                      <Badge variant="secondary">{p.color}</Badge>
                      {p.tags.map((t:string)=> <Badge key={t} variant="secondary">{t}</Badge>)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg font-semibold">{currency(p.price)}<span className="text-sm font-normal">/month</span></div>
                    <div className="text-sm opacity-70">Size: {p.size}</div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full" onClick={()=>addToCart(p)}><ShoppingCart className="w-4 h-4 mr-2"/> {t.addToRFQ}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Contact */}
      {!admin && (
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">{t.contactUs}</h2>
              <p className="text-neutral-600 mt-2">{t.usuallyReply}</p>
              <form className="mt-6 grid gap-3" onSubmit={(e)=>e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder={t.name} required/>
                  <Input type="email" placeholder={t.email} required/>
                </div>
                <Input placeholder={t.phone}/>
                <Textarea placeholder={t.notes} rows={5}/>
                <div className="flex gap-3">
                  <Button className="rounded-xl">{t.send}</Button>
                  <Button type="button" variant="outline" className="rounded-xl">{t.downloadList}</Button>
                </div>
              </form>
            </div>
            <div className="p-6 bg-neutral-50 border rounded-2xl">
              <h3 className="font-medium">{t.contact}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> hello@layermoon.com</div>
                <div className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> 206‑555‑0123</div>
                <div className="flex items-center gap-2"><Instagram className="w-4 h-4"/> @layermoon.staging</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Lynnwood / Stanwood / Seattle</div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">FAQ</h4>
                <Tabs defaultValue="q1" className="w-full">
                  <TabsList className="grid grid-cols-3 gap-2">
                    <TabsTrigger value="q1">{t.flow}</TabsTrigger>
                    <TabsTrigger value="q2">{t.price}</TabsTrigger>
                    <TabsTrigger value="q3">{t.stock}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="q1" className="text-sm opacity-80">{t.flowAns}</TabsContent>
                  <TabsContent value="q2" className="text-sm opacity-80">{t.priceAns}</TabsContent>
                  <TabsContent value="q3" className="text-sm opacity-80">{t.stockAns}</TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Footer */}
      <footer className="py-10 border-t bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Layer Moon Staging. All rights reserved.</div>
          <div className="opacity-70">Privacy · Terms</div>
        </div>
      </footer>

      {/* Login modal (simplified) */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.loginTitle}</DialogTitle>
            <DialogDescription>Demo access: set your code later in real auth.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input type="password" placeholder={t.passPH} value={accessCode} onChange={e=>setAccessCode((e.target as any).value)} />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={()=>setShowLogin(false)}>Cancel</Button>
              <Button onClick={()=>{ if(accessCode.trim()){ setLoggedIn(true); setAdmin(true); setShowLogin(false); } }}><Lock className="w-4 h-4 mr-2"/> OK</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* RFQ Dialog */}
      <Dialog open={openRFQ} onOpenChange={setOpenRFQ}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.rfqTitle}</DialogTitle>
            <DialogDescription>{t.rfqDesc}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitQuote} className="grid gap-3">
            <Input required placeholder={t.name} />
            <Input required type="email" placeholder={t.email} />
            <Input placeholder={t.phone} />
            <Input required placeholder={t.address} />
            <div className="grid grid-cols-3 gap-2">
              <Button type="submit" className="mt-2" disabled={submitting}>{submitting ? <span className="inline-flex items-center"><Loader2 className="w-4 h-4 mr-2"/> {t.sending}</span> : t.sendRFQ}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    </LangCtx.Provider>
  );
}
