
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ============================================
// API ROUTES
// ============================================

// Get all images by category
app.get('/api/images/:category', (req, res) => {
    const category = req.params.category;
    const imgDir = path.join(__dirname, 'img');
    
    try {
        // Check if img directory exists
        if (!fs.existsSync(imgDir)) {
            return res.json({
                success: true,
                count: 0,
                images: []
            });
        }
        
        const files = fs.readdirSync(imgDir);
        // Map category names to file prefixes
        const categoryMap = {
            'tort': 't',
            'pishiriq': 'p',
            'xalisa': 'x'
        };
        const prefix = categoryMap[category] || category;
        
        const categoryImages = files.filter(file => 
            file.startsWith(prefix) && 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        
        const images = categoryImages.map(file => ({
            id: file,
            name: file.replace(/\.[^/.]+$/, ''),
            url: `/img/${file}`,
            category: category
        }));
        
        res.json({
            success: true,
            count: images.length,
            images: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Rasmlarni olishda xatolik yuz berdi',
            error: error.message
        });
    }
});

// Get all categories
app.get('/api/categories', (req, res) => {
    res.json({
        success: true,
        categories: [
            {
                id: 'tort',
                name: 'Tortlar',
                icon: '🎂',
                description: 'Eng mazali va chiroyli tortlar'
            },
            {
                id: 'pishiriq',
                name: 'Pishiriqlar',
                icon: '🥐',
                description: 'Turli xil pishiriqlar'
            },
            {
                id: 'xalisa',
                name: 'Xalisa',
                icon: '🍯',
                description: 'Tabiiy va mazali xalisa'
            }
        ]
    });
});

// Get statistics
app.get('/api/stats', (req, res) => {
    const imgDir = path.join(__dirname, 'img');
    
    try {
        // Check if img directory exists
        if (!fs.existsSync(imgDir)) {
            return res.json({
                success: true,
                stats: {
                    tort: 0,
                    pishiriq: 0,
                    xalisa: 0,
                    total: 0
                }
            });
        }
        
        const files = fs.readdirSync(imgDir);
        const stats = {
            tort: files.filter(f => f.startsWith('t') && /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).length,
            pishiriq: files.filter(f => f.startsWith('p') && /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).length,
            xalisa: files.filter(f => f.startsWith('x') && /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).length,
            total: files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).length
        };
        
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Statistikani olishda xatolik',
            error: error.message
        });
    }
});

// Submit rating and feedback
app.post('/api/rating', (req, res) => {
    const { rating, feedback } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: 'Noto\'g\'ri rating qiymati'
        });
    }
    
    // Save rating to file (you can use database instead)
    const ratingData = {
        rating: parseInt(rating),
        feedback: feedback || '',
        timestamp: new Date().toISOString(),
        ip: req.ip
    };
    
    const ratingsFile = path.join(__dirname, 'ratings.json');
    let ratings = [];
    
    try {
        if (fs.existsSync(ratingsFile)) {
            const data = fs.readFileSync(ratingsFile, 'utf8');
            ratings = JSON.parse(data);
        }
        ratings.push(ratingData);
        fs.writeFileSync(ratingsFile, JSON.stringify(ratings, null, 2));
        
        res.json({
            success: true,
            message: 'Rahmat! Izohingiz qabul qilindi',
            data: ratingData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Rating saqlashda xatolik',
            error: error.message
        });
    }
});

// Get all ratings
app.get('/api/ratings', (req, res) => {
    const ratingsFile = path.join(__dirname, 'ratings.json');
    
    try {
        if (fs.existsSync(ratingsFile)) {
            const data = fs.readFileSync(ratingsFile, 'utf8');
            const ratings = JSON.parse(data);
            
            // Calculate average rating
            const avgRating = ratings.length > 0
                ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
                : 0;
            
            res.json({
                success: true,
                total: ratings.length,
                averageRating: avgRating.toFixed(1),
                ratings: ratings
            });
        } else {
            res.json({
                success: true,
                total: 0,
                averageRating: 0,
                ratings: []
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ratinglarni olishda xatolik',
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server ishlayapti!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ============================================
// SERVE STATIC FILES
// ============================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Sahifa topilmadi'
    });
});

app.use((err, req, res, next) => {
    console.error('Server xatosi:', err);
    res.status(500).json({
        success: false,
        message: 'Server xatosi yuz berdi',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Ichki server xatosi'
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🍰 Pishiriqlar serveri ishga tushdi!`);
    console.log(`📍 Server manzili: http://localhost:${PORT}`);
    console.log(`⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`);
    console.log(`\n📝 Eslatma: Serverni to'xtatish uchun Ctrl+C bosing\n`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Xatolik: ${PORT} port allaqachon ishlatilmoqda!`);
        console.error(`💡 Boshqa port ishlatish uchun: PORT=3001 npm start`);
    } else {
        console.error('❌ Server xatosi:', err);
    }
    process.exit(1);
});
