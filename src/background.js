chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: 'inject.js'});
  });
  
  function checkTabStatus(queryInfo, callback) {
    chrome.tabs.query(queryInfo, function(tabs) {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        checkTabStatusInternal(tabId, callback);
      } else {
        console.log("No tabs found.");
      }
    });
  }
  
  function checkTabStatusInternal(tabId, callback) {
    chrome.tabs.get(tabId, function(tab) {
      if (tab.status === 'crashed') {
        // Tab has crashed, attempt to reload
        chrome.tabs.reload(tabId);
        if (callback) {
          callback(); // Call the callback after reloading the tab
        }
      } else {
        // Schedule next check if tab is not crashed
        setTimeout(function() {
          checkTabStatusInternal(tabId, callback);
        }, 5000); // Check every 5 seconds
      }
    });
  }
  
  // Start checking status of monitored tabs
  checkTabStatus({}, function() {
    console.log("Checked all tabs.");
  });
  