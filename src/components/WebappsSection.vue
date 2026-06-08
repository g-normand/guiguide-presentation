<template>
  <section id="webapp" class="page-section webapp">
    <div class="container">
      <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">
        {{ webapps.title }}
      </h2>
      <div class="divider-custom">
        <div class="divider-custom-line"></div>
        <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
        <div class="divider-custom-line"></div>
      </div>
      <p class="text-center lead webapp-intro">{{ webapps.intro }}</p>
      <p v-if="webapps.subIntro" class="text-center webapp-subintro">{{ webapps.subIntro }}</p>

      <div class="webapp-block webapp-category-card">
        <h3 class="webapp-subsection-title text-uppercase text-secondary">Top Apps</h3>
        <div class="row justify-content-center">
          <a
            v-for="app in featuredApps"
            :key="app.id"
            :href="app.url"
            :aria-label="`Open ${app.title}`"
            class="col-md-6 col-xl-4 mb-5 text-decoration-none webapp-card-link"
          >
            <div class="webapp-item mx-auto">
              <img
                v-if="app.previewImage"
                :src="app.previewImage"
                :alt="app.alt || `${app.title} preview`"
                class="img-fluid mb-2"
              />
              <h3>{{ app.title }}</h3>
              <p>{{ app.description }}</p>
            </div>
          </a>
        </div>
      </div>

      <div class="row g-4 webapp-block reviewer-all-row">

        <div class="col-lg-6">
          <div class="webapp-category-card all-apps-block h-100">
            <h3 class="webapp-subsection-title text-uppercase text-secondary">Other apps</h3>
            <ul class="all-apps-list list-unstyled">
              <li v-for="app in allApps" :key="app.id">
                <a :href="app.url" class="all-app-link">{{ app.title }}</a>
                <span class="all-app-description">{{ app.description }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  webapps: {
    type: Object,
    required: true,
  },
  appsById: {
    type: Object,
    required: true,
  },
  featuredAppIds: {
    type: Array,
    required: true,
  },
  allAppsExtraIds: {
    type: Array,
    required: true,
  },
});

const appsFromIds = (ids) => ids.map((id) => props.appsById[id]).filter(Boolean);

const featuredApps = computed(() => appsFromIds(props.featuredAppIds));

const allApps = computed(() => {
  const seen = new Set();
  const blockedIds = new Set([...props.featuredAppIds]);
  const orderedIds = props.allAppsExtraIds.filter((id) => !blockedIds.has(id));

  return orderedIds
    .filter((id) => {
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    })
    .map((id) => props.appsById[id])
    .filter(Boolean);
});
</script>

<style scoped>
.webapp {
  background: linear-gradient(180deg, #f8fcff 0%, #f3f8fc 100%);
}

.webapp-block {
  margin-top: 2.25rem;
}

.webapp-intro {
  margin-bottom: 0.45rem;
  max-width: 58rem;
  margin-left: auto;
  margin-right: auto;
  color: #32485f;
}

.webapp-subintro {
  margin-bottom: 1.5rem;
  max-width: 58rem;
  margin-left: auto;
  margin-right: auto;
  color: #4f6070;
}

.webapp-category-card {
  background: #ffffff;
  border: 1px solid #dbe6ef;
  border-radius: 0.75rem;
  padding: 1.25rem 1.1rem;
  box-shadow: 0 0.35rem 0.9rem rgba(31, 63, 92, 0.08);
}

.webapp-subsection-title {
  font-size: 1.35rem;
  margin-bottom: 1.1rem;
  color: #274d69 !important;
}

.webapp-card-link {
  display: block;
  color: inherit;
  cursor: pointer;
}

.webapp-item {
  position: relative;
  border: 1px solid transparent;
  border-radius: 0.7rem;
  padding: 0.65rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.webapp-item h3,
.webapp-item h4 {
  transition: color 0.2s ease;
}

.webapp-card-link:hover .webapp-item,
.webapp-card-link:focus-visible .webapp-item {
  transform: translateY(-4px);
  border-color: #12806b;
  background-color: #f8fffd;
  box-shadow: 0 0.65rem 1.2rem rgba(18, 128, 107, 0.2);
}

.webapp-card-link:hover .webapp-item h3,
.webapp-card-link:hover .webapp-item h4,
.webapp-card-link:focus-visible .webapp-item h3,
.webapp-card-link:focus-visible .webapp-item h4 {
  color: #12806b;
}

.reviewer-block {
  margin-top: 0;
}

.reviewer-row .reviewer-item {
  max-width: 22rem;
}

.reviewer-item {
  padding: 0.4rem;
}

.reviewer-item h4 {
  font-size: 1.15rem;
  margin-bottom: 0.35rem;
}

.reviewer-item p {
  font-size: 0.95rem;
  margin-bottom: 0;
}

.reviewer-image {
  max-height: 180px;
  object-fit: contain;
}

.all-apps-list {
  margin: 0;
}

.all-apps-list li {
  padding: 0.35rem 0;
  font-size: 0.92rem;
  line-height: 1.3;
  border-bottom: 1px dashed #e9ecef;
}

.all-app-link {
  display: inline-block;
  color: #274d69;
  font-weight: 700;
  margin-right: 0.35rem;
}

.all-app-description {
  color: #5b6775;
}
</style>
