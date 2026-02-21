const request = require('supertest');
const app = require('../index'); // Main Express app

/**
 * Integration tests for Video API endpoints
 * Uses supertest to simulate HTTP requests
 */
describe('📺 Video API Endpoints', () => {

  /**
   * Tests for: GET /api/videos/top
   * Description: Returns top videos by 3-second views
   */
  describe('GET /api/videos/top', () => {
    
    it('✅ should return top 5 videos by default', async () => {
      const response = await request(app)
        .get('/api/videos/top')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data).toHaveLength(5);
      expect(response.body.data[0]).toHaveProperty('threeSecondViews');
      expect(response.body.data[0]).toHaveProperty('title');
    });

    it('🚫 should return 400 for invalid limit query param', async () => {
      const response = await request(app)
        .get('/api/videos/top?limit=invalid')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  /**
   * Tests for: GET /api/videos/daily-stats
   * Description: Returns 3-second views for past 7 days
   */
  describe('GET /api/videos/daily-stats', () => {
    
    it('✅ should return daily stats for 7 days', async () => {
      const response = await request(app)
        .get('/api/videos/daily-stats')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data).toHaveLength(7);
      expect(response.body.data[0]).toHaveProperty('date');
      expect(response.body.data[0]).toHaveProperty('threeSecondViews');
    });
  });

  /**
   * Tests for: GET /api/videos/bubble-chart
   * Description: Returns dataset for bubble chart visualization
   */
  describe('GET /api/videos/bubble-chart', () => {
    
    it('✅ should return bubble chart data format', async () => {
      const response = await request(app)
        .get('/api/videos/bubble-chart')
        .expect('Content-Type', /json/)
        .expect(200);

      const first = response.body.data[0];
      expect(first).toHaveProperty('averageWatchTime');
      expect(first).toHaveProperty('shareRate');
      expect(first).toHaveProperty('totalPlays');
    });
  });

  /**
   * Tests for: GET /api/videos/overall-stats
   * Description: Returns aggregate stats from multiple videos
   */
  describe('GET /api/videos/overall-stats', () => {
    
    it('✅ should return overall statistics', async () => {
      const response = await request(app)
        .get('/api/videos/overall-stats')
        .expect('Content-Type', /json/)
        .expect(200);

      const stats = response.body.data;
      expect(stats).toHaveProperty('threeSecondViews');
      expect(stats).toHaveProperty('totalPlays');
      expect(stats).toHaveProperty('shareRate');
      expect(stats).toHaveProperty('averageWatchTime');
    });
  });

});
