# Layer Moon Admin (在线后台编辑 + Inbox + 库存)

**满足你的需求：**
- ✅ 隐藏登录按钮（不在顶部显示）
- ✅ 管理后台改为隐藏入口：访问 `/admin`，输入访问码进入（在环境变量里设置）
- ✅ 后台可管理：库存（入库/出库）、案例链接（Redfin/Zillow）、查看联系表单（Inbox）
- ✅ 前台去掉 RFQ cart，仅保留案例链接展示和联系表单
- ✅ 持久化：使用 Supabase（免费）

## 快速开始
1. 在 Supabase 创建项目：https://supabase.com
2. 打开 Supabase → SQL Editor → 复制粘贴 `supabase.sql` 执行（建表）
3. 在 Vercel 项目里设置环境变量（Settings → Environment Variables）：
```
SUPABASE_URL=你的 Supabase 项目 URL
SUPABASE_SERVICE_ROLE_KEY=你的 Service Role Key
ADMIN_ACCESS_CODE=你自定义的后台访问码（例如：LM2025!）
```
4. 部署完成后：
   - 前台：`/`（首页，无登录按钮）
   - 后台：`/admin`（输入访问码进入）

## 使用说明
- **库存**：在 Admin → Inventory 里新增物品。SKU 留空会按照规则自动生成（颜色首字母 + 年月 YYMM + 类别首字母小写 + 两位序号，例如：B2509s01）。
- **案例链接**：在 Admin → Portfolio 链接里，粘贴 Redfin 或 Zillow 的 URL，即可在首页展示为卡片。
- **Inbox**：网站首页的“联系表单”提交后，内容会保存到 `messages` 表，Admin → Inbox 可查看。

## 本地开发
```bash
npm i
npm run dev
# 打开 http://localhost:3000
```
设置 `.env.local`（参考 `.env.example`）。

