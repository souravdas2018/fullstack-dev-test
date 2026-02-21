import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Dashboard from '../views/Dashboard.vue';
import { videoService } from '../services/api';

// 📌 Mock the videoService module to isolate the component from real API calls
vi.mock('../services/api', () => ({
  videoService: {
    getOverallStats: vi.fn(),
    getTopVideos: vi.fn(),
    getDailyStats: vi.fn(),
    getBubbleChartData: vi.fn()
  }
}));

describe('🧪 Dashboard.vue', () => {

  // 🧼 Reset mocks and set expected mock return values before each test
  beforeEach(() => {
    vi.clearAllMocks();

    videoService.getOverallStats.mockResolvedValue({
      data: {
        threeSecondViews: 50000,
        totalPlays: 75000,
        shareRate: 0.15,
        averageWatchTime: 45
      }
    });

    videoService.getTopVideos.mockResolvedValue({
      data: [
        { id: 1, title: 'Video 1', threeSecondViews: 1000 }
      ]
    });

    videoService.getDailyStats.mockResolvedValue({
      data: [
        { date: '2024-01-01', threeSecondViews: 1000 }
      ]
    });

    videoService.getBubbleChartData.mockResolvedValue({
      data: [
        {
          id: 1,
          averageWatchTime: 45,
          shareRate: 0.15,
          totalPlays: 1000
        }
      ]
    });
  });

  /**
   * ✅ Test: Check if dashboard title renders correctly
   */
  it('renders the dashboard title', () => {
    const wrapper = mount(Dashboard);
    expect(wrapper.find('h3').text()).toContain('Top Videos by Views');
  });

  /**
   * ✅ Test: All API services are called once the component is mounted
   */
  it('calls all required API endpoints on mount', () => {
    mount(Dashboard);
    expect(videoService.getOverallStats).toHaveBeenCalled();
    expect(videoService.getTopVideos).toHaveBeenCalled();
    expect(videoService.getDailyStats).toHaveBeenCalled();
    expect(videoService.getBubbleChartData).toHaveBeenCalled();
  });

  /**
   * ✅ Test: Check if specific values are formatted and rendered
   */
  it('formats stat values correctly', async () => {
    const wrapper = mount(Dashboard);
    await wrapper.vm.$nextTick(); // Wait for DOM update after promises

    const shareRateElement = wrapper.text();
    expect(shareRateElement).toContain('15.0%'); // shareRate formatted

    const watchTimeElement = wrapper.text();
    expect(watchTimeElement).toContain('45s'); // averageWatchTime formatted
  });
});
