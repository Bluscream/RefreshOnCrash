chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: 'inject.js'});
  });
  
  function checkTabStatus(tabId) {
    chrome.tabs.get(tabId, function(tab) {
      if (tab.status == 'crashed') {
        // Tab has crashed, attempt to reload
        chrome.tabs.reload(tabId);
      } else {
        // Schedule next check if tab is not crashed
        setTimeout(function() {
          checkTabStatus(tabId);
        }, 5000); // Check every 5 seconds
      }
    });
  }
  
  // Start checking status of monitored tabs
  checkTabStatus(chrome.tabs.query({}).then(tabs => tabs[0].id));
  