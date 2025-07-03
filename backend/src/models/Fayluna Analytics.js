// src/utils/Analytics.js

// Read env variables for GA and Sentry
const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || null;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || null;

// Initialize Google Analytics gtag.js
export function initGA() {
  if (!GA_ID) {
    console.warn("Google Analytics ID not set. Skipping GA initialization.");
    return;
  }

  // Add GA script to the page if not already added
  if (!window.gtag) {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID, { send_page_view: false }); // manual pageview
  }
}

// Track a page view
export function trackPageView(path = window.location.pathname) {
  if (window.gtag && GA_ID) {
    window.gtag("config", GA_ID, {
      page_path: path,
    });
  }
}

// Track a custom event
export function trackEvent({ action, category, label, value }) {
  if (window.gtag && GA_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Optionally initialize Sentry for error reporting
export function initSentry() {
  if (!SENTRY_DSN) return;

  import("@sentry/browser").then(Sentry => {
    Sentry.init({ dsn: SENTRY_DSN });
  }).catch(err => {
    console.error("Failed to load Sentry:", err);
  });
}

export default {
  initGA,
  trackPageView,
  trackEvent,
  initSentry,
};
