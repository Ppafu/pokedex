export const infiniteScroll = function (fetchedFunction) {
  let infiniteScrollActive = true;

  function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  let isLoading = false;

  const checkPosition = async function () {
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
  };

  // ???
  if (infiniteScrollActive) {
    window.addEventListener("scroll", throttle(checkPosition, 250));
    window.addEventListener("resize", throttle(checkPosition, 250));
  }
};
