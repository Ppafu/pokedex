export const setupIntersectionObserver = (callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(); // Call the provided callback when the sentinel is in view
      }
    });
  });

  // Observe the sentinel element
  const sentinelEl = document.querySelector("#sentinel");
  observer.observe(sentinelEl);
};
