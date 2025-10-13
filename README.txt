LayerMoon Admin v3 (Fixed)
--------------------------

✅ 修复内容
1. 修复登录后白屏错误（增加 try/catch 容错）。
2. 后台访问密码改为：lj861201。
3. 增加 /api/health 检查接口，用于验证 Supabase 环境变量。
4. 构建已验证，直接上传 GitHub 并重新部署即可。

🧭 使用步骤
1. 上传整个项目到 GitHub。
2. 在 Vercel 中设置环境变量：
   SUPABASE_URL
   SUPABASE_SERVICE_ROLE_KEY
   ADMIN_ACCESS_CODE = lj861201
3. 点击 Redeploy（勾选 Clear build cache）。
4. 后台访问地址：https://layermoon.com/admin

🧩 若仍出错
访问 https://layermoon.com/api/health 确认环境变量是否正确。
