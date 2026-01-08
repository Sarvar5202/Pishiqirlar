// Vercel Serverless Function
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all images by category
app.get('/images/:category', (req, res) => {
    const category = req.params.category;
    const imgDir = path.join(process.cwd(), 'img');
    
    try {
        if (!fs.existsSync(imgDir)) {
            return res.json({
                success: true,
                count: 0,
                images: []
            });
        }
        
        const files = fs.readdirSync(imgDir);
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
app.get('/categories', (req, res) => {
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
app.get('/stats', (req, res) => {
    const imgDir = path.join(process.cwd(), 'img');
    
    try {
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
app.post('/rating', (req, res) => {
    const { rating, feedback } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: 'Noto\'g\'ri rating qiymati'
        });
    }
    
    const ratingData = {
        rating: parseInt(rating),
        feedback: feedback || '',
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };
    
    // In Vercel, we can't write to filesystem, so we'll just return success
    // You can integrate with a database or external service here
    res.json({
        success: true,
        message: 'Rahmat! Izohingiz qabul qilindi',
        data: ratingData
    });
});

// Get all ratings
app.get('/ratings', (req, res) => {
    // In Vercel, we can't read from filesystem easily
    // You should use a database or external service
    res.json({
        success: true,
        total: 0,
        averageRating: 0,
        ratings: []
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server ishlayapti!',
        timestamp: new Date().toISOString()
    });
});

// Export for Vercel
module.exports = app;
