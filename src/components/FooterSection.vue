<template>
  <footer class="footer text-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <h4 class="text-uppercase mb-4">{{ footer.heading }}</h4>
          <div class="row g-4 justify-content-center">
            <div v-for="column in footer.columns" :key="column.title" class="col-12 col-md-4">
              <h5 class="footer-column-title text-uppercase">{{ column.title }}</h5>
              <div>
                <a
                  v-for="link in column.links"
                  :key="link.label"
                  class="btn btn-outline-light btn-social mx-1 my-1"
                  :href="link.url"
                  :aria-label="link.label"
                >
                  <i v-if="link.icon" :class="link.icon"></i>
                  <span
                    v-else
                    class="social-image-icon"
                    :style="{ '--icon-url': `url(${link.image})` }"
                    aria-hidden="true"
                  ></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  footer: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.footer-column-title {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  margin-bottom: 0.65rem;
  opacity: 0.9;
}

.social-image-icon {
  display: inline-block;
  width: 21px;
  height: 21px;
  background-color: currentColor;
  -webkit-mask-image: var(--icon-url);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: var(--icon-url);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
</style>
