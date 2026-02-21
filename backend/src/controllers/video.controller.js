const DataGenerator = require('../lib/dataGenerator');
const VideoPresenter = require('../presenters/video.presenter');

/**
 * VideoController - Handles incoming requests related to video analytics.
 * Uses DataGenerator to produce mock data and VideoPresenter to shape responses.
 */
class VideoController {
  /**
   * GET /api/videos/top
   * Fetches top videos sorted by 3-second views.
   * 
   * @param {Object} req - Express request object (supports optional query param: `limit`)
   * @param {Object} res - Express response object
   */
  static getTopVideos(req, res) {
    try {
      const { limit = 5 } = req.query;

      // Generate mock video data and sort by performance
      const videos = DataGenerator.generateVideoData(20);
      const sortedVideos = videos
        .sort((a, b) => b.threeSecondViews - a.threeSecondViews)
        .slice(0, limit);

      // Present formatted response
      res.json(VideoPresenter.presentTopVideos(sortedVideos));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/videos/daily-stats
   * Fetches daily stats for the past 7 days.
   * 
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static getDailyStats(req, res) {
    try {
      // Generate mock daily view stats
      const stats = DataGenerator.getDailyStats(7);

      // Format response
      res.json(VideoPresenter.presentDailyStats(stats));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/videos/bubble
   * Fetches bubble chart data for video performance analysis.
   * 
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static getBubbleChartData(req, res) {
    try {
      // Generate data for 30 videos
      const videos = DataGenerator.generateVideoData(30);

      // Present formatted bubble chart data
      res.json(VideoPresenter.presentBubbleChart(videos));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/videos/overall
   * Computes overall video statistics (e.g., averages, totals).
   * 
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static getOverallStats(req, res) {
    try {
      // Generate data for 30 videos
      const videos = DataGenerator.generateVideoData(30);

      // Present overall summary stats
      res.json(VideoPresenter.presentOverallStats(videos));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VideoController;
