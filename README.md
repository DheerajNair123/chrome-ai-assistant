# Chrome AI Assistant

A Chrome extension that harnesses Chrome's built-in AI models (Gemini Nano) to help you understand and work with text on any webpage.

## 🚀 Features

- **📝 Summarize**: Get key points from long text
- **📖 Define**: Understand complex terms
- **🌐 Translate**: Convert text to English
- **✨ Simplify**: Make text easier to read

## 🛠️ Built With

This extension uses Chrome's built-in AI APIs:
- **Prompt API**: For general AI queries and definitions
- **Summarizer API**: For text summarization
- **Translator API**: For language translation
- **Rewriter API**: For text simplification

## 📋 Requirements

- Chrome 127+ (or Chrome Canary/Dev)
- Chrome's built-in AI features enabled

## 🔧 Installation

### Enable Chrome AI Features

1. Open `chrome://flags/#optimization-guide-on-device-model`
2. Set to **Enabled**
3. Open `chrome://flags/#prompt-api-for-gemini-nano`
4. Set to **Enabled**
5. Restart Chrome

### Install the Extension

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/chrome-ai-assistant.git
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked**

5. Select the extension directory

6. The extension is now installed! 🎉

## 🎯 How to Use

### Method 1: Text Selection Panel
1. Select any text on a webpage
2. A floating panel will appear
3. Click one of the action buttons (Summarize, Define, Translate, Simplify)

### Method 2: Context Menu
1. Select any text on a webpage
2. Right-click on the selected text
3. Choose **AI Assistant** > [Action]

## 🏗️ Project Structure

```
chrome-ai-assistant/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (handles AI API calls)
├── content.js            # Content script (handles UI)
├── content.css           # Styles for injected UI
├── popup.html            # Extension popup
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 🧪 Development

This extension is built for the **Chrome Built-in AI Challenge**. It demonstrates:
- Integration with Chrome's on-device AI models
- Privacy-first approach (no data sent to external servers)
- Fast, responsive AI interactions
- Clean, modern UI

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/YOUR_USERNAME/chrome-ai-assistant/issues).

## 📺 Demo Video

[Link to demo video will be added]

## 🏆 Chrome Built-in AI Challenge

This project was created for the Chrome Built-in AI Challenge, showcasing the capabilities of Chrome's built-in AI APIs.

### APIs Used:
- ✅ Prompt API
- ✅ Summarizer API
- ✅ Translator API
- ✅ Rewriter API

### Problem Solved:
This extension makes web browsing more accessible and efficient by providing instant AI-powered text processing without requiring external services or compromising user privacy.

---

Made with ❤️ for the Chrome Built-in AI Challenge
