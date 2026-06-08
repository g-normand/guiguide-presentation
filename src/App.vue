<template>
  <NavbarSection
    :brand-name="siteContent.brandName"
    :nav-items="siteContent.navItems"
    :is-navbar-shrunk="isNavbarShrunk"
    @nav-link-click="collapseResponsiveNav"
  />

  <WebappsSection
    :webapps="siteContent.webapps"
    :apps-by-id="siteContent.appsById"
    :featured-app-ids="siteContent.featuredAppIds"
    :all-apps-extra-ids="siteContent.allAppsExtraIds"
  />

  <MastheadSection
    :brand-name="siteContent.mastheadHeading || siteContent.brandName"
    :tagline="siteContent.mastheadTagline"
  />
  <FooterSection :footer="siteContent.footer" />

  <div class="copyright py-4 text-center text-white">
    <div class="container">
      <small>
        Copyright © {{ siteContent.copyright.owner }} {{ siteContent.copyright.year }}. Adapted from
        <a :href="siteContent.copyright.sourceUrl" target="_blank" rel="noreferrer noopener">
          {{ siteContent.copyright.sourceLabel }}
        </a>
      </small>
    </div>
  </div>

  <div v-show="showScrollToTop" class="scroll-to-top d-lg-none position-fixed">
    <a class="d-block text-center text-white rounded" href="#page-top"
      ><i class="fas fa-chevron-up"></i
    ></a>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import * as bootstrap from "bootstrap";
import FooterSection from "./components/FooterSection.vue";
import MastheadSection from "./components/MastheadSection.vue";
import NavbarSection from "./components/NavbarSection.vue";
import WebappsSection from "./components/WebappsSection.vue";
import { siteContent } from "./data/site";

const isNavbarShrunk = ref(false);
const showScrollToTop = ref(false);

let scrollSpyInstance;

const updateScrollState = () => {
  isNavbarShrunk.value = window.scrollY !== 0;
  showScrollToTop.value = window.scrollY > 100;
};

const collapseResponsiveNav = () => {
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  if (!navbarToggler) {
    return;
  }

  if (window.getComputedStyle(navbarToggler).display !== "none") {
    navbarToggler.click();
  }
};

onMounted(async () => {
  updateScrollState();
  document.addEventListener("scroll", updateScrollState, { passive: true });

  await nextTick();

  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    scrollSpyInstance = new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("scroll", updateScrollState);
  if (scrollSpyInstance) {
    scrollSpyInstance.dispose();
  }
});
</script>
