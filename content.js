// Content script for Chrome AI Assistant
// This handles text selection and displays AI results

console.log('[Chrome AI Assistant] Content script loaded');

let selectedText = '';
let aiPanel = null;

// Listen for text selection
document.addEventListener('mouseup', handleTextSelection);
document.addEventListener('keyup', (e) => {
  // Support keyboard selection (Shift+Arrow etc.)
  if (e.key === 'Shift' || e.key.startsWith('Arrow')) {
    handleTextSelection(e);
  }
});

function handleTextSelection(e) {
  const selection = window.getSelection();
  selectedText = selection ? selection.toString().trim() : '';

  if (selectedText && selectedText.length > 2) { // lowered threshold to 3 chars
    showAIPanel(e.pageX, e.pageY);
  } else {
    hideAIPanel();
  }
}

// Create and show the AI panel
function showAIPanel(x, y) {
  // Remove existing panel if any
  hideAIPanel();

  // Create panel
  aiPanel = document.createElement('div');
  aiPanel.id = 'chrome-ai-assistant-panel';
  aiPanel.innerHTML = `
    <button data-action="summarize">📝 Summarize</button>
    <button data-action="define">📖 Define</button>
    <button data-action="translate">🌐 Translate</button>
    <button data-action="simplify">✨ Simplify</button>
  `;

  // Position the panel
  aiPanel.style.left = `${x}px`;
  aiPanel.style.top = `${y - 60}px`;

  document.body.appendChild(aiPanel);

  // Add click handlers
  aiPanel.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', handleAIAction);
  });

  console.log('[Chrome AI Assistant] AI panel shown');

  // Hide panel when clicking outside
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 100);
}

function hideAIPanel() {
  if (aiPanel) {
    aiPanel.remove();
    aiPanel = null;
    document.removeEventListener('click', handleOutsideClick);
    console.log('[Chrome AI Assistant] AI panel hidden');
  }
}

function handleOutsideClick(e) {
  if (aiPanel && !aiPanel.contains(e.target)) {
    hideAIPanel();
  }
}

// Handle AI action button clicks
async function handleAIAction(e) {
  const action = e.target.dataset.action;
  if (!action || !selectedText) return;

  hideAIPanel();
  showLoadingModal(action);

  try {
    const response = await chrome.runtime.sendMessage({
      type: 'AI_REQUEST',
      action: action,
      text: selectedText
    });

    if (response.success) {
      showResultModal(action, response.result);
    } else {
      showErrorModal(action, response.error);
    }
  } catch (error) {
    console.error('[Chrome AI Assistant] Messaging error:', error);
    showErrorModal(action, error.message || 'Unknown error sending message to background');
  }
}

// Listen for context menu actions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action && request.text) {
    selectedText = request.text;
    handleContextMenuAction(request.action);
  }
});

async function handleContextMenuAction(action) {
  showLoadingModal(action);

  try {
    const response = await chrome.runtime.sendMessage({
      type: 'AI_REQUEST',
      action: action,
      text: selectedText
    });

    if (response.success) {
      showResultModal(action, response.result);
    } else {
      showErrorModal(action, response.error);
    }
  } catch (error) {
    showErrorModal(action, error.message);
  }
}

// Show loading modal
function showLoadingModal(action) {
  const modal = createModal();
  modal.innerHTML = `
    <div class="ai-modal-content">
      <h2>${capitalize(action)} Request</h2>
      <div class="ai-loading">
        <div class="ai-spinner"></div>
        <p>Processing with Chrome's built-in AI...</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Show result modal
function showResultModal(action, result) {
  removeExistingModal();
  
  const modal = createModal();
  modal.innerHTML = `
    <div class="ai-modal-content">
      <h2>${capitalize(action)} Result</h2>
      <div class="ai-result">
        ${formatResult(result)}
      </div>
      <button class="ai-close-btn">Close</button>
    </div>
  `;
  
  modal.querySelector('.ai-close-btn').addEventListener('click', () => {
    modal.remove();
  });
  
  document.body.appendChild(modal);
}

// Show error modal
function showErrorModal(action, error) {
  removeExistingModal();
  
  const modal = createModal();
  modal.innerHTML = `
    <div class="ai-modal-content">
      <h2>${capitalize(action)} Failed</h2>
      <div class="ai-error">
        <p><strong>Error:</strong> ${error}</p>
        <p class="ai-hint">Make sure Chrome's built-in AI features are enabled at chrome://flags/#optimization-guide-on-device-model</p>
      </div>
      <button class="ai-close-btn">Close</button>
    </div>
  `;
  
  modal.querySelector('.ai-close-btn').addEventListener('click', () => {
    modal.remove();
  });
  
  document.body.appendChild(modal);
}

// Helper functions
function createModal() {
  const modal = document.createElement('div');
  modal.id = 'chrome-ai-assistant-modal';
  modal.className = 'ai-modal';
  return modal;
}

function removeExistingModal() {
  const existing = document.getElementById('chrome-ai-assistant-modal');
  if (existing) {
    existing.remove();
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatResult(result) {
  // Convert newlines to paragraphs
  return result
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p>${escapeHtml(line)}</p>`)
    .join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
