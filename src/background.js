chrome.action.onClicked.addListener((tab) => {
    // Attempt to reload the tab
    chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['inject.js']
    });
  });
  
  function checkTabStatus(tabId) {
    chrome.tabs.get(tabId, async (tab) => {
      if (tab.status === 'crashed') {
        // Tab has crashed, attempt to reload
        await chrome.tabs.reload(tabId);
      } else {
        // Schedule next check if tab is not crashed
        setTimeout(() => {
          checkTabStatus(tabId);
        }, 5000); // Check every 5 seconds
      }
    });
  }
  
  // Start checking status of monitored tabs
  checkTabStatus(chrome.tabs.query({}).then(tabs => tabs[0].id));
  