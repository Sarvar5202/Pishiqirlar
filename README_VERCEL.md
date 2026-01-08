# Vercelga Deploy Qilish

## Qadamlar:

1. **Vercel account yarating:**
   - https://vercel.com ga kiring
   - GitHub yoki email bilan ro'yxatdan o'ting

2. **Loyihani GitHubga yuklang:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Vercelda yangi loyiha yarating:**
   - Vercel dashboardga kiring
   - "New Project" tugmasini bosing
   - GitHub repositoryingizni tanlang
   - Framework Preset: "Other" yoki "Other" tanlang
   - Root Directory: "." (nuqta)
   - Build Command: bo'sh qoldiring yoki "echo 'No build needed'"
   - Output Directory: "." (nuqta)
   - "Deploy" tugmasini bosing

4. **Yoki Vercel CLI orqali:**
   ```bash
   npm i -g vercel
   vercel
   ```

## Muhim Eslatmalar:

- ✅ Barcha fayllar (`index.html`, `css/`, `js/`, `img/`) avtomatik deploy qilinadi
- ✅ API routes `/api/` papkasida serverless functions sifatida ishlaydi
- ✅ Animatsiyalar va barcha JavaScript funksiyalar ishlaydi
- ⚠️ `ratings.json` fayli Vercelda saqlanmaydi (faqat localStorage ishlaydi)

## API Endpoints:

- `/api/categories` - Kategoriyalar
- `/api/images/:category` - Rasmlar
- `/api/stats` - Statistika
- `/api/rating` - Rating yuborish
- `/api/health` - Server holati

## Muammo bo'lsa:

1. **Animatsiyalar ishlamasa:**
   - Browser console ni tekshiring (F12)
   - CSS va JS fayllar yuklanganligini tekshiring

2. **Rasmlar ko'rinmasa:**
   - `img/` papkasi Vercelga yuklanganligini tekshiring
   - Rasm manzillarini tekshiring

3. **API ishlamasa:**
   - Network tab ni tekshiring
   - API endpointlar to'g'ri ishlayotganini tekshiring
