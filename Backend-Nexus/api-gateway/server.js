const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Docker/Nginx) for accurate rate limiting IPs

const PORT = process.env.PORT || 4000;
const CORE_SERVICE_URL = process.env.CORE_SERVICE_URL || 'http://localhost:8080';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// ─── Security & Middlewares ──────────────────────────────────────────────────
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Correlation-ID", "Idempotency-Key"]
}));
app.use(morgan('combined'));

// ─── Correlation ID Middleware ───────────────────────────────────────────────
app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
});

// ─── Production Rate Limiters ────────────────────────────────────────────────
const searchLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: { error: "Too many search requests. Please throttle your queries.", status: 429 }
});

const aiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 120,
    message: { error: "AI rate limit reached. Please wait a moment.", status: 429 },
    skip: (req) => req.path === '/health' || req.path === '/health/' || req.path.includes('/evaluation')
});

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: { error: "Too many authentication attempts. Please retry later.", status: 429 }
});

const ticketVerifyLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: { error: "Ticket verification rate limit exceeded.", status: 429 }
});

// ─── Health & Readiness Probes ───────────────────────────────────────────────
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        service: 'Airline Nexus X API Gateway',
        timestamp: new Date().toISOString(),
        correlationId: req.correlationId
    });
});

app.get('/ready', (req, res) => {
    res.status(200).json({
        status: 'READY',
        upstream: {
            coreService: CORE_SERVICE_URL,
            aiService: AI_SERVICE_URL
        }
    });
});

// ─── Granular Rate Limiting Middlewares (Section 55) ─────────────────────────
app.use(['/api/v1/auth', '/api/auth', '/auth'], authLimiter);
app.use(['/api/v1/tickets/verify', '/api/tickets/verify', '/tickets/verify'], ticketVerifyLimiter);
app.use(['/api/v1/flights', '/api/flights', '/flights'], searchLimiter);

// ─── AI Service Proxy (/api/v1/ai/* and /api/ai/* and /ai/*) ────────────────
app.use(
    ['/api/v1/ai', '/api/ai', '/ai'],
    aiLimiter,
    createProxyMiddleware({
        target: AI_SERVICE_URL,
        changeOrigin: true,
        onProxyReq: (proxyReq, req) => {
            proxyReq.setHeader('X-Correlation-ID', req.correlationId);
        },
        pathRewrite: (path) => {
            return path;
        }
    })
);

// ─── Media Service Proxy (/api/v1/media/* and /api/backgrounds/*) ────────────
app.use(
    '/api/v1/media/aviation-backgrounds',
    createProxyMiddleware({
        target: CORE_SERVICE_URL,
        changeOrigin: true,
        onProxyReq: (proxyReq, req) => {
            proxyReq.setHeader('X-Correlation-ID', req.correlationId);
        },
        pathRewrite: (path, req) => {
            return '/backgrounds' + (req.url.indexOf('?') > -1 ? req.url.substring(req.url.indexOf('?')) : '');
        }
    })
);

app.use(
    '/api/backgrounds',
    createProxyMiddleware({
        target: CORE_SERVICE_URL,
        changeOrigin: true,
        onProxyReq: (proxyReq, req) => {
            proxyReq.setHeader('X-Correlation-ID', req.correlationId);
        },
        pathRewrite: (path, req) => {
            return '/backgrounds' + (req.url.indexOf('?') > -1 ? req.url.substring(req.url.indexOf('?')) : '');
        }
    })
);

// ─── Core Service Proxies (/api/v1/*, /api/*, and direct aliases) ────────────
app.use(
    ['/api/v1', '/api', '/flights', '/booking', '/seat', '/user', '/auth', '/tickets', '/backgrounds'],
    createProxyMiddleware({
        target: CORE_SERVICE_URL,
        changeOrigin: true,
        onProxyReq: (proxyReq, req) => {
            proxyReq.setHeader('X-Correlation-ID', req.correlationId);
        },
        pathRewrite: (path, req) => {
            let normalized = req.originalUrl;
            if (normalized.startsWith('/api/v1')) {
                normalized = normalized.substring('/api/v1'.length);
            } else if (normalized.startsWith('/api')) {
                normalized = normalized.substring('/api'.length);
            }
            return normalized;
        }
    })
);

app.listen(PORT, () => {
    console.log(`🚀 Airline Nexus X API Gateway is running on port ${PORT}`);
    console.log(`→ Upstream Core: ${CORE_SERVICE_URL}`);
    console.log(`→ Upstream AI:   ${AI_SERVICE_URL}`);
});
