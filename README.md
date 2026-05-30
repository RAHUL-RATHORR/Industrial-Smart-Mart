# Industrial Safety Mart

B2B industrial e-commerce storefront built with Next.js 16, React 19, and Tailwind CSS.

## Run locally

```bash
cd industrial-safety-mart
npm install
cp env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

From the parent folder you can also run:

```bash
npm run dev
```

(requires `package.json` in the parent directory)

## WhatsApp number

Edit `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

Use digits only with country code (no `+`).

## Main routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/products` | All products + search (`?q=`) |
| `/products/[id]` | Product detail (Moglix-style) |
| `/categories` | All categories |
| `/categories/[slug]` | Category listing |

## Disk space tip

If the dev server fails, delete the build cache:

```bash
Remove-Item -Recurse -Force .next
npm run dev
```
