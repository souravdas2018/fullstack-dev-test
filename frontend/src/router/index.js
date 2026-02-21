// Import Vue Router functions to create router instance and history mode
import { createRouter, createWebHistory } from 'vue-router';

// Import the Dashboard view component for the main route
import Dashboard from '@/views/Dashboard.vue';

// Define the application routes
const routes = [
  {
    path: '/',            // URL path for this route
    name: 'Dashboard',    // Route name
    component: Dashboard  // Component to render when this route is matched
  }
];

// Create the router instance using HTML5 history mode and defined routes
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode (no hash in URLs)
  routes                       // Register routes
});

export default router;  // Export the router instance for use in main app
