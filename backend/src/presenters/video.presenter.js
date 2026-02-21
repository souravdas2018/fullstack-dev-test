/**
 * VideoPresenter class
 * 
 * Responsible for transforming and formatting raw video data 
 * into response structures for various endpoints.
 */
class VideoPresenter {
  
  /**
   * Format the top videos for client consumption
   * 
   * @param {Array<Object>} videos - Array of video objects
   * @returns {Object} formatted response with top videos
   */
  static presentTopVideos(videos) {
    return {
      data: videos.map(video => ({
        id: video.id,
        title: video.title,
        threeSecondViews: video.threeSecondViews
      })),
      meta: {
        total: videos.length
      }
    };
  }

  /**
   * Format daily 3-second view statistics for chart display
   * 
   * @param {Array<Object>} stats - Array of daily stats
   * @returns {Object} formatted daily view statistics
   */
  static presentDailyStats(stats) {
    return {
      data: stats.map(stat => ({
        date: stat.date,
        threeSecondViews: stat.threeSecondViews
      })),
      meta: {
        total: stats.length,
        timeRange: 'week'
      }
    };
  }

  /**
   * Format data for bubble chart visualization
   * 
   * @param {Array<Object>} videos - Array of video data
   * @returns {Object} formatted data for bubble chart
   */
  static presentBubbleChart(videos) {
    return {
      data: videos.map(video => ({
        id: video.id,
        title: video.title,
        averageWatchTime: video.averageWatchTime,
        shareRate: video.shareRate,
        totalPlays: video.totalPlays
      })),
      meta: {
        total: videos.length
      }
    };
  }

  /**
   * Compute and format overall stats like totals and averages
   * 
   * @param {Array<Object>} videos - Array of video data
   * @returns {Object} aggregated statistics
   */
  static presentOverallStats(videos) {
    const totalThreeSecondViews = videos.reduce((sum, video) => sum + video.threeSecondViews, 0);
    const totalPlays = videos.reduce((sum, video) => sum + video.totalPlays, 0);
    const avgShareRate = videos.reduce((sum, video) => sum + video.shareRate, 0) / videos.length;
    const avgWatchTime = videos.reduce((sum, video) => sum + video.averageWatchTime, 0) / videos.length;

    return {
      data: {
        threeSecondViews: totalThreeSecondViews,
        totalPlays: totalPlays,
        shareRate: Number(avgShareRate.toFixed(2)),     // Rounded to 2 decimals
        averageWatchTime: Math.round(avgWatchTime)      // Rounded to nearest second
      }
    };
  }
}

module.exports = VideoPresenter;
