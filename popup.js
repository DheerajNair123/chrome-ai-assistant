// Popup script for Chrome AI Assistant
// Provides a simple way to test the UI without relying on AI availability

function sendToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.id) return;
    chrome.tabs.sendMessage(tab.id, message);
  });
}

// Test modal button
document.getElementById('btn-test-ui')?.addEventListener('click', () => {
  sendToActiveTab({ type: 'SHOW_TEST_MODAL' });
});

// Open setup guide
document.getElementById('btn-open-setup')?.addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('SETUP.md') });
});
