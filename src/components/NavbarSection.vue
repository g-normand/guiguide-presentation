<template>
  <nav
    id="mainNav"
    class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
    :class="{ 'navbar-shrink': isNavbarShrunk }"
  >
    <div class="container">
      <a class="navbar-brand" href="#page-top">{{ brandName }}</a>
      <button
        class="navbar-toggler text-uppercase fw-bold bg-primary text-white rounded"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div id="navbarResponsive" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li v-for="item in navItems" :key="item.targetId" class="nav-item mx-0 mx-lg-1">
            <a
              class="nav-link py-3 px-0 px-lg-3 rounded"
              :href="`#${item.targetId}`"
              @click="emit('nav-link-click')"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  brandName: {
    type: String,
    required: true,
  },
  navItems: {
    type: Array,
    required: true,
  },
  isNavbarShrunk: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["nav-link-click"]);
</script>
