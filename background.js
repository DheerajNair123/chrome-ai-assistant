// Background service worker for Chrome AI Assistant
// This handles context menu creation and communication with content scripts

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'aiAssistant',
    title: 'AI Assistant',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'summarize',
    parentId: 'aiAssistant',
    title: 'Summarize',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'define',
    parentId: 'aiAssistant',
    title: 'Define',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'translate',
    parentId: 'aiAssistant',
    title: 'Translate',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'simplify',
    parentId: 'aiAssistant',
    title: 'Simplify',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'summarize' || 
      info.menuItemId === 'define' || 
      info.menuItemId === 'translate' || 
      info.menuItemId === 'simplify') {
    
    chrome.tabs.sendMessage(tab.id, {
      action: info.menuItemId,
      text: info.selectionText
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'AI_REQUEST') {
    handleAIRequest(request.action, request.text)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for async response
  }
});

// Handle AI requests using Chrome's built-in APIs
async function handleAIRequest(action, text) {
  try {
    switch (action) {
      case 'summarize':
        return await summarizeText(text);
      case 'define':
        return await defineText(text);
      case 'translate':
        return await translateText(text);
      case 'simplify':
        return await simplifyText(text);
      default:
        throw new Error('Unknown action');
    }
  } catch (error) {
    console.error('AI Request Error:', error);
    throw error;
  }
}

// Use Chrome's Summarizer API
async function summarizeText(text) {
  try {
    // Check if the Summarizer API is available
    if (!window.ai || !window.ai.summarizer) {
      return await fallbackToPromptAPI('summarize', text);
    }

    const summarizer = await window.ai.summarizer.create();
    const result = await summarizer.summarize(text);
    return result;
  } catch (error) {
    console.error('Summarizer API error:', error);
    return await fallbackToPromptAPI('summarize', text);
  }
}

// Use Chrome's Prompt API for definitions
async function defineText(text) {
  return await usePromptAPI(
    `Provide a clear, concise definition of "${text}" in 1-2 sentences. Include context if it's a technical term.`,
    text
  );
}

// Use Chrome's Translator API
async function translateText(text) {
  try {
    // Check if the Translator API is available
    if (!window.ai || !window.ai.translator) {
      return await fallbackToPromptAPI('translate', text);
    }

    const translator = await window.ai.translator.create({
      sourceLanguage: 'auto',
      targetLanguage: 'en'
    });
    const result = await translator.translate(text);
    return result;
  } catch (error) {
    console.error('Translator API error:', error);
    return await fallbackToPromptAPI('translate', text);
  }
}

// Use Chrome's Rewriter API for simplification
async function simplifyText(text) {
  try {
    // Check if the Rewriter API is available
    if (!window.ai || !window.ai.rewriter) {
      return await fallbackToPromptAPI('simplify', text);
    }

    const rewriter = await window.ai.rewriter.create({
      tone: 'casual',
      length: 'shorter'
    });
    const result = await rewriter.rewrite(text);
    return result;
  } catch (error) {
    console.error('Rewriter API error:', error);
    return await fallbackToPromptAPI('simplify', text);
  }
}

// Use Chrome's Prompt API as primary method
async function usePromptAPI(systemPrompt, userText) {
  try {
    if (!window.ai || !window.ai.languageModel) {
      throw new Error('Chrome AI Prompt API is not available. Make sure you are using Chrome 127+ with AI features enabled.');
    }

    const session = await window.ai.languageModel.create({
      systemPrompt: systemPrompt
    });

    const result = await session.prompt(userText);
    return result;
  } catch (error) {
    console.error('Prompt API error:', error);
    throw new Error(`AI API Error: ${error.message}. Please ensure Chrome's built-in AI features are enabled in chrome://flags`);
  }
}

// Fallback to Prompt API for other actions
async function fallbackToPromptAPI(action, text) {
  const prompts = {
    summarize: 'Summarize the following text in 3-4 bullet points:',
    translate: 'Translate the following text to English:',
    simplify: 'Rewrite the following text in simpler language that a 10-year-old can understand:'
  };

  return await usePromptAPI(prompts[action], text);
}
