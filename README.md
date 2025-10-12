# Layer Moon Staging (fixed build config)
- Removed invalid `experimental.appDir` from next.config.mjs
- Added `@types/qrcode`
- Add `types/shims.d.ts` for qrcode/jsbarcode

If you already use the previous full-feature code, only change these:
1) **next.config.mjs**
```
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true }
export default nextConfig
```
2) **Install dev types**
```
npm i -D @types/qrcode
```
3) **Import**
```ts
import * as QRCode from "qrcode";
```
