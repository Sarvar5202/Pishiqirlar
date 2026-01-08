# 🚀 Vercelga Deploy Qilish

## Tezkor Qadamlar:

### 1. GitHubga yuklash (agar hali qilmagan bo'lsangiz):

```bash
git init
git add .
git commit -m "Pishiriqlar sayti"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Vercelda deploy qilish:

**Variant A: Vercel Dashboard orqali**
1. https://vercel.com ga kiring
2. "New Project" tugmasini bosing
3. GitHub repositoryingizni tanlang
4. **Muhim sozlamalar:**
   - Framework Preset: **"Other"**
   - Root Directory: **"."** (nuqta)
   - Build Command: **bo'sh qoldiring**
   - Output Directory: **"."** (nuqta)
5. "Deploy" tugmasini bosing

**Variant B: Vercel CLI orqali**
```bash
npm i -g vercel
vercel
```

## ✅ Yaratilgan fayllar:

- ✅ `vercel.json` - Vercel konfiguratsiyasi
- ✅ `api/index.js` - Serverless API functions
- ✅ `.vercelignore` - Ignore fayllar
- ✅ Barcha CSS va JS fayllar

## 🔧 Animatsiyalar ishlamasa:

1. **Browser Console ni tekshiring (F12):**
   - Xatoliklar bormi?
   - CSS va JS fayllar yuklanganmi?

2. **Network tab ni tekshiring:**
   - `css/style.css` yuklanganmi?
   - `js/script.js` yuklanganmi?

3. **Cache ni tozalang:**
   - Ctrl + Shift + R (hard refresh)
   - Yoki brauzer cache ni tozalang

## 📝 API Endpoints:

Deploy qilingandan keyin quyidagi API lar ishlaydi:
- `https://your-site.vercel.app/api/categories`
- `https://your-site.vercel.app/api/images/tort`
- `https://your-site.vercel.app/api/stats`
- `https://your-site.vercel.app/api/rating` (POST)
- `https://your-site.vercel.app/api/health`

## ⚠️ Muhim Eslatmalar:

- ✅ Barcha animatsiyalar ishlashi kerak
- ✅ Dark mode ishlashi kerak
- ✅ Tabs funksiyasi ishlashi kerak
- ✅ Rating funksiyasi ishlashi kerak
- ⚠️ `ratings.json` fayli Vercelda saqlanmaydi (faqat localStorage)

## 🐛 Muammo bo'lsa:

1. **Sayt ochilmasa:**
   - Vercel dashboardda build loglarni tekshiring
   - `vercel.json` fayli to'g'ri ekanligini tekshiring

2. **Rasmlar ko'rinmasa:**
   - `img/` papkasi GitHubga yuklanganligini tekshiring
   - Rasm manzillarini tekshiring

3. **Animatsiyalar ishlamasa:**
   - Browser console da JavaScript xatoliklari bormi?
   - CSS fayl yuklanganmi?
