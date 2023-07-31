export const infiniteScroll = function (fetchedFunction) {
  let isLoading = false;

  window.addEventListener("scroll", async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollThreshold = 200;

    // Check if the user has reached the bottom of the page
    if (
      !isLoading &&
      scrollTop + clientHeight >= scrollHeight - scrollThreshold
    ) {
      isLoading = true;
      await fetchedFunction();
      isLoading = false;
    }
  });
};
