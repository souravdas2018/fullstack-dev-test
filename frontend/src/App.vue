<template>
  <!-- ===================== PAGE WRAPPER ===================== -->
  <!-- Full-page container with a light gray background and minimum height of full screen -->
  <div class="min-h-screen bg-gray-100">

    <!-- ===================== HEADER ===================== -->
    <!-- White header bar with shadow for elevation and overflow hidden to contain animation -->
    <header class="bg-white shadow overflow-hidden">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        <!-- ========== SCROLLING HEADING ========== -->
        <!-- Horizontally scrolling title text -->
        <h1 class="scrolling-text text-3xl font-bold text-gray-900 inline-block whitespace-nowrap">
          Social Media Video Analytics
        </h1>
      </div>
    </header>

    <!-- ===================== MAIN CONTENT AREA ===================== -->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Render the component matching the current route -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
// This script block is ready to use Vue 3 Composition API
// Add imports or logic here if needed in the future (e.g. global stores, user data, etc.)
</script>

<style>
/* ===================== GLOBAL STYLES ===================== */
/* Import Tailwind CSS base layer, components, and utility classes */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===================== SCROLLING ANIMATION ===================== */
/* Define keyframes for scrolling text from left to right */
@keyframes scroll-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Apply scroll animation to the header title */
.scrolling-text {
  display: inline-block;
  animation: scroll-right 10s linear infinite;
}
</style>
