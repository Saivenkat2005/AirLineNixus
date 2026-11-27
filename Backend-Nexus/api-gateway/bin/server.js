const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 4000;

// Security & Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Rate Limiting as requested
const searchLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });
const aiLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 30 });
const defaultLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 200 });

app.use(defaultLimiter);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'UP', service: 'API Gateway' }));

// Routing to AI Service
app.use(
    '/api/ai',
    aiLimiter,
    createProxyMiddleware({
        target: process.env.AI_SERVICE_URL || 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
            '^/api/ai': '/api/ai'
        }
    })
);

// Routing to Core Java Services (which act as distinct domains via monolithic context for now)
app.use(
    '/api',
    createProxyMiddleware({
        target: process.env.CORE_SERVICE_URL || 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    })
);

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
