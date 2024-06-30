setTimeout(function() {
    if (window.performance.navigation.type == window.performance.navigation.TYPE_RELOAD ||
        window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD_DIR) {
      return;
    }
  
    var lastTime = Date.now();
    setInterval(function() {
      if (Date.now() - lastTime > 20000) { // 20 seconds since last interaction
        window.postMessage('crashed', '*');
      }
    }, 1000);
  }, 1000);
  