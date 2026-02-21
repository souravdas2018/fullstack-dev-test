// Import the createApp function from Vue to create a new application instance
import { createApp } from 'vue';

// Import Font Awesome icons globally
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import the root App component
import App from './App.vue';

// Import the Vue Router instance to enable routing
import router from './router';

// Import the global CSS file for styling
import './index.css';

// Create a Vue application instance using the root component
const app = createApp(App);

// Register the router instance with the Vue app for handling routes
app.use(router);

// Mount the Vue app onto the DOM element with the id 'app'
app.mount('#app');
 