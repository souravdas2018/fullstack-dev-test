const express = require('express');
const VideoController = require('../controllers/video.controller');
const VideoValidator = require('../validators/video.validator');

const router = express.Router();

/**
 * @route   GET /api/videos/top
 * @desc    Fetch top-performing videos sorted by 3-second views
 * @query   {Number} limit - (optional) number of top videos to return
 * @access  Public
 */
router.get(
  '/top',
  // Validate query parameters using Joi schema (e.g., limit must be a number)
  VideoValidator.validateQuery(VideoValidator.getVideoStatsSchema()),
  VideoController.getTopVideos
);

/**
 * @route   GET /api/videos/daily-stats
 * @desc    Get daily stats of 3-second video views over the last 7 days
 * @access  Public
 */
router.get('/daily-stats', VideoController.getDailyStats);

/**
 * @route   GET /api/videos/bubble-chart
 * @desc    Get performance metrics for videos in a format suitable for a bubble chart
 * @access  Public
 */
router.get('/bubble-chart', VideoController.getBubbleChartData);

/**
 * @route   GET /api/videos/overall-stats
 * @desc    Get overall statistics like total views, average watch time, and share rate
 * @access  Public
 */
router.get('/overall-stats', VideoController.getOverallStats);

module.exports = router;
