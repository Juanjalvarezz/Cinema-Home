function debounce(func, timeout = 2000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      showLoader(); // Show loader before executing function
      timer = setTimeout(() => {
        func.apply(this, args);
        hideLoader(); // Hide loader after executing function
      }, timeout);
    };
  }