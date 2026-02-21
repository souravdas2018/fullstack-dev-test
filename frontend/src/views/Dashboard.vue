<template>
  <!-- Main dashboard container with soft gradient background and padding -->
  <div class="px-6 py-10 bg-gradient-to-br from-indigo-50 via-white to-blue-100 min-h-screen space-y-12">

    <!-- ========================= KPI CARDS ========================= -->
    <!-- Display overall stats as stylish cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Loop through each stat and render a card -->
      <div
        v-for="(stat, key) in overallStats"
        :key="key"
        class="rounded-xl bg-white/60 backdrop-blur-md shadow-lg p-5 border border-slate-100 transition-all hover:shadow-2xl hover:scale-[1.02] group"
      >
        <div class="flex items-center justify-between">
          <div>
            <!-- Stat title -->
            <dt class="text-xs font-medium uppercase text-gray-500 tracking-wide mb-1 group-hover:text-indigo-600 transition">
              {{ formatStatName(key) }}
            </dt>
            <!-- Stat value -->
            <dd class="text-3xl font-extrabold text-slate-800 group-hover:text-indigo-700 transition duration-200">
              {{ formatStatValue(key, stat) }}
            </dd>
          </div>
          <!-- Icon for visual enhancement -->
          <div class="text-indigo-500 text-3xl opacity-40 group-hover:opacity-80 transition">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================= CHART SECTION ========================= -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- ========== BAR CHART: Top Videos ========== -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl transition">
        <h3 class="text-xl font-semibold text-indigo-700 mb-4 border-l-4 pl-3 border-indigo-500">
          📊 Top Videos by Views
        </h3>
        <div class="h-[400px]">
          <Bar v-if="topVideosChartData" :data="topVideosChartData" :options="topVideosChartOptions" />
        </div>
      </div>

      <!-- ========== LINE CHART: Daily Trends ========== -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl transition">
        <h3 class="text-xl font-semibold text-teal-700 mb-4 border-l-4 pl-3 border-teal-500">
          📈 Daily Views Trend
        </h3>
        <div class="h-[400px]">
          <Line v-if="dailyStatsChartData" :data="dailyStatsChartData" :options="dailyStatsChartOptions" />
        </div>
      </div>

      <!-- ========== BUBBLE CHART: Performance Analysis ========== -->
      <div class="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl transition">
        <h3 class="text-xl font-semibold text-purple-700 mb-4 border-l-4 pl-3 border-purple-500">
          🧪 Video Performance Analysis
        </h3>
        <div class="h-[500px]">
          <Bubble v-if="bubbleChartData" :data="bubbleChartData" :options="bubbleChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import Vue Composition API functions
import { ref, onMounted } from 'vue';

// Import chart components and Chart.js
import { Bar, Line, Bubble } from 'vue-chartjs';
import { Chart as ChartJS, registerables } from 'chart.js';

// Import your API service to fetch dashboard data
import { videoService } from '@/services/api';

// Register all necessary Chart.js components
ChartJS.register(...registerables);

// ========================= STATE =========================
// Store overall KPI stats
const overallStats = ref({});

// Chart data references
const topVideosChartData = ref(null);
const dailyStatsChartData = ref(null);
const bubbleChartData = ref(null);

// ========================= HELPERS =========================
// Format stat name: e.g., "averageWatchTime" -> "average watch time"
const formatStatName = (key) => key.replace(/([A-Z])/g, ' $1').toLowerCase();

// Format stat value based on type
const formatStatValue = (key, value) => {
  if (key === 'shareRate') return `${(value * 100).toFixed(1)}%`;
  if (key === 'averageWatchTime') return `${value}s`;
  return value.toLocaleString();
};

// ========================= CHART OPTIONS =========================
// Bar chart options (Top Videos)
const topVideosChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: '3-Second Views' },
      ticks: { color: '#334155' }
    },
    x: { ticks: { color: '#334155' } }
  },
  plugins: { legend: { display: false } }
};

// Line chart options (Daily Views)
const dailyStatsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Views' },
      ticks: { color: '#334155' }
    },
    x: { ticks: { color: '#334155' } }
  }
};

// Bubble chart options (Performance)
const bubbleChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: { display: true, text: 'Avg Watch Time (s)' },
      ticks: { color: '#334155' }
    },
    y: {
      title: { display: true, text: 'Share Rate' },
      ticks: { color: '#334155' }
    }
  }
};

// ========================= DATA FETCH =========================
// Fetch all necessary dashboard data from the API
const fetchData = async () => {
  try {
    const [overallStatsData, topVideos, dailyStats, bubbleData] = await Promise.all([
      videoService.getOverallStats(),
      videoService.getTopVideos(),
      videoService.getDailyStats(),
      videoService.getBubbleChartData()
    ]);

    // Assign KPI data
    overallStats.value = overallStatsData.data;

    // Prepare bar chart data (Top Videos)
    topVideosChartData.value = {
      labels: topVideos.data.map(v => v.title),
      datasets: [{
        label: '3-Second Views',
        data: topVideos.data.map(v => v.threeSecondViews),
        backgroundColor: '#6366F1'
      }]
    };

    // Prepare line chart data (Daily Stats)
    dailyStatsChartData.value = {
      labels: dailyStats.data.map(stat => new Date(stat.date).toLocaleDateString()),
      datasets: [{
        label: 'Daily Views',
        data: dailyStats.data.map(stat => stat.threeSecondViews),
        borderColor: '#0D9488',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(13, 148, 136, 0.2)'
      }]
    };

    // Prepare bubble chart data (Performance Analysis)
    bubbleChartData.value = {
      datasets: [{
        label: 'Video Metrics',
        data: bubbleData.data.map(video => ({
          x: video.averageWatchTime,
          y: video.shareRate,
          r: Math.sqrt(video.totalPlays) / 15  // Bubble radius scaled by total plays
        })),
        backgroundColor: 'rgba(139, 92, 246, 0.6)'
      }]
    };
  } catch (error) {
    console.error('Dashboard fetch error:', error);
  }
};

// Lifecycle hook: fetch data when component mounts
onMounted(fetchData);
</script>

<style scoped>
/* Global transition for smoother animations */
div {
  transition: all 0.3s ease-in-out;
}
</style>
