chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.id) return
    chrome.sidePanel.open({
        tabId: tab.id
    })
});