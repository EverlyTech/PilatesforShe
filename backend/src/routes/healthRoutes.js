const express = require('express');
const { checkDatabaseHealth, getDatabaseStats } = require('../config/database');
const { asyncHandler } = require('../middleware/errorMiddleware');

const router = express.Router();

// Basic health check
router.get('/', asyncHandler(async (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      readable: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
    },
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  };
  
  res.json({
    success: true,
    data: health
  });
}));

// Database health check
router.get('/database', asyncHandler(async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  
  const statusCode = dbHealth.status === 'healthy' ? 200 : 503;
  
  res.status(statusCode).json({
    success: dbHealth.status === 'healthy',
    data: dbHealth
  });
}));

// Detailed database statistics (admin only in production)
router.get('/database/stats', asyncHandler(async (req, res) => {
  // In production, this should require admin authentication
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      success: false,
      error: {
        message: 'Access denied. Admin authentication required.'
      }
    });
  }
  
  const dbStats = await getDatabaseStats();
  
  res.json({
    success: true,
    data: dbStats
  });
}));

// System information
router.get('/system', asyncHandler(async (req, res) => {
  const systemInfo = {
    platform: process.platform,
    architecture: process.arch,
    nodeVersion: process.version,
    cpuUsage: process.cpuUsage(),
    pid: process.pid,
    ppid: process.ppid,
    execPath: process.execPath
  };
  
  res.json({
    success: true,
    data: systemInfo
  });
}));

module.exports = router;
