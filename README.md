
# Layer Moon v8
- 默认英文；右上角中英切换
- Admin 后台新增：
  - 图片上传（保存在 items.image，Base64 小图方案，后续可切换 Supabase Storage）
  - 标签打印（SKU 的二维码/条码，浏览器打印为贴纸）
  - 扫码入/出库（支持扫码枪把条码当键盘输入）
  - 合同生成（打印为 PDF）
- API 基于 Supabase JS；健康检查 /api/health
- SQL 在 supabase.sql

## 部署
1) Supabase → SQL Editor → 运行 supabase.sql
2) Vercel → 环境变量：SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / ADMIN_ACCESS_CODE
3) Redeploy（勾选 Clear build cache and redeploy）

## 说明
- 图片暂存 Base64（适合中小图），若需云存储请告知，我会接上 Supabase Storage（需 anon 公钥或代理 API）。
