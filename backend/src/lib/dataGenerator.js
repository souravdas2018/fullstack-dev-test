/**
 * DataGenerator - A mock data utility class for generating synthetic
 * video analytics data for dashboards, charts, or testing purposes.
 */

class DataGenerator {
  /**
   * Generates mock video data for analytics use.
   * 
   * @param {number} count - Number of video entries to generate.
   * @returns {Array<Object>} - Array of video objects with various metrics.
   */
  static generateVideoData(count = 20) {
    const videos = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Start from 7 days ago

    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      const offset = Math.floor(Math.random() * 7);
      date.setDate(startDate.getDate() + offset); // Random day in last 7 days

      videos.push({
        id: `video-${i + 1}`,
        title: `Video ${i + 1}`,
        threeSecondViews: Math.floor(Math.random() * 10000) + 10000, // 10k–20k
        totalPlays: Math.floor(Math.random() * 15000) + 20000, // 20k–35k
        shareRate: Number((Math.random() * 0.5 + 0.5).toFixed(2)), // 0.50–1.00
        averageWatchTime: Math.floor(Math.random() * 1800) + 300, // 5m–35m
        date: date.toISOString()
      });
    }

    return videos;
  }

  /**
   * Generates mock daily stats over a given number of days.
   * 
   * @param {number} days - Number of past days to include.
   * @returns {Array<Object>} - Array of daily view stats with date and views.
   */
  static getDailyStats(days = 7) {
    const stats = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i); // Increment date

      stats.push({
        date: date.toISOString().split('T')[0],
        threeSecondViews: Math.floor(Math.random() * 500000) + 100000 // 100k–600k
      });
    }

    return stats;
  }

  /**
   * Returns the top 5 videos with the highest 3-second views.
   * 
   * @returns {Array<Object>} - Top 5 video objects sorted by performance.
   */
  static getTopVideos() {
    const videos = this.generateVideoData(20);
    return videos
      .sort((a, b) => b.threeSecondViews - a.threeSecondViews)
      .slice(0, 5);
  }

  /**
   * Prepares bubble chart data for performance visualization.
   * Each bubble size reflects the video's total play count.
   * 
   * @returns {Array<Object>} - Array of data points for a bubble chart.
   */
  static getBubbleChartData() {
    const videos = this.generateVideoData(20);

    return videos.map(video => ({
      x: video.averageWatchTime, // Watch time in seconds
      y: video.shareRate,        // Share rate (0.5–1.0)
      r: Math.sqrt(video.totalPlays) / 20 // Radius based on play count
    }));
  }

  /**
   * Generates mock data for currently live or trending videos.
   * Useful for real-time dashboards.
   * 
   * @param {number} count - Number of live videos to simulate.
   * @returns {Array<Object>} - Array of live video objects.
   */
  static getOnlineVideoData(count = 10) {
    const videos = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const videoStart = new Date(now);
      // Video started within the past 0–60 minutes
      videoStart.setMinutes(videoStart.getMinutes() - Math.floor(Math.random() * 60));

      videos.push({
        id: `live-video-${i + 1}`,
        title: `Live Video ${i + 1}`,
        isLive: true,
        viewers: Math.floor(Math.random() * 5000) + 1000, // 1k–6k viewers
        streamStartTime: videoStart.toISOString(),
        category: ['Gaming', 'News', 'Music', 'Tech'][Math.floor(Math.random() * 4)]
      });
    }

    return videos;
  }
}

module.exports = DataGenerator;
