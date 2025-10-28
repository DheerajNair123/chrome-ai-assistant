# Chrome AI Assistant - Setup Guide

## 🎯 Quick Start Guide

### Step 1: Enable Chrome's Built-in AI Features

Chrome's AI APIs are experimental and need to be enabled first.

1. **Enable the Optimization Guide**
   - Open: `chrome://flags/#optimization-guide-on-device-model`
   - Set to: **Enabled BypassPerfRequirement**
   - This allows Chrome to download Gemini Nano

2. **Enable Prompt API**
   - Open: `chrome://flags/#prompt-api-for-gemini-nano`
   - Set to: **Enabled**

3. **Enable Summarization API** (optional but recommended)
   - Open: `chrome://flags/#summarization-api-for-gemini-nano`
   - Set to: **Enabled**

4. **Enable Translation API** (optional but recommended)
   - Open: `chrome://flags/#translation-api`
   - Set to: **Enabled**

5. **Restart Chrome**

6. **Wait for Model Download**
   - Chrome will automatically download Gemini Nano in the background
   - This may take a few minutes depending on your connection
   - Check progress at: `chrome://components/` (look for "Optimization Guide On Device Model")

### Step 2: Install the Extension

1. **Download/Clone the Extension**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chrome-ai-assistant.git
   cd chrome-ai-assistant
   ```

2. **Open Chrome Extensions Page**
   - Navigate to: `chrome://extensions/`
   - Or click: Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `chrome-ai-assistant` folder
   - The extension should now appear in your extensions list

5. **Pin the Extension** (optional)
   - Click the puzzle icon (🧩) in the toolbar
   - Click the pin icon next to "Chrome AI Assistant"

### Step 3: Test the Extension

1. **Visit any webpage** (e.g., Wikipedia, news site, blog)

2. **Select some text** (at least 6 characters)

3. **Look for the AI panel** that appears above your selection

4. **Click any action button**:
   - 📝 Summarize
   - 📖 Define
   - 🌐 Translate
   - ✨ Simplify

5. **Wait for the result** in the modal window

### Alternative: Context Menu

You can also:
1. Select text
2. Right-click
3. Choose "AI Assistant" → [Action]

## 🔧 Troubleshooting

### "AI API is not available" Error

**Solution 1: Check Chrome Version**
- You need Chrome 127+ (or Chrome Canary/Dev)
- Update Chrome if needed

**Solution 2: Verify Flags**
- Make sure all flags are enabled (see Step 1)
- Restart Chrome after enabling

**Solution 3: Wait for Model Download**
- Go to `chrome://components/`
- Find "Optimization Guide On Device Model"
- If status is "Downloading", wait for it to complete
- If missing, click "Check for update"

### Panel Not Appearing

**Check:**
- You selected enough text (minimum 6 characters)
- You're on a normal webpage (not chrome:// or extension pages)
- The extension is enabled in `chrome://extensions/`

### No Results Showing

**Check Console:**
- Press F12 to open DevTools
- Look for error messages in the Console tab
- Common issues:
  - Model not downloaded yet
  - Flags not enabled
  - API not available in your Chrome version

## 📝 Testing Checklist

- [ ] Chrome flags enabled
- [ ] Chrome restarted
- [ ] Model downloaded (check `chrome://components/`)
- [ ] Extension loaded in Developer mode
- [ ] Can select text and see panel
- [ ] Summarize works
- [ ] Define works
- [ ] Translate works
- [ ] Simplify works
- [ ] Context menu works

## 🎥 Creating a Demo Video

For the Chrome Built-in AI Challenge submission:

1. **Record your screen** using:
   - OBS Studio (free)
   - Loom
   - Chrome's built-in screen recorder
   - Windows Game Bar (Win+G)

2. **Show in your video**:
   - Extension installation
   - Selecting text on a webpage
   - Each AI feature in action (Summarize, Define, Translate, Simplify)
   - Results appearing in the modal
   - Context menu usage

3. **Keep it around 3 minutes**

4. **Upload to YouTube or Vimeo** and make it public

## 📤 Publishing to GitHub

1. **Create a new repository** on GitHub

2. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Chrome AI Assistant"
   ```

3. **Add remote and push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/chrome-ai-assistant.git
   git branch -M main
   git push -u origin main
   ```

4. **Add icons** (see `icons/README.md` for instructions)

5. **Update README.md** with:
   - Your GitHub username
   - Link to demo video
   - Any additional features you added

## 🏆 Challenge Submission

When submitting to the Chrome Built-in AI Challenge:

✅ **Repository**: Public GitHub repo with open source license (MIT)  
✅ **Video**: 3-minute demo on YouTube/Vimeo  
✅ **Description**: Explain which APIs you used and problem solved  
✅ **Published**: Extension should be functional and publicly accessible  

---

**Need help?** Open an issue on GitHub or check Chrome's AI API documentation.

Good luck with the challenge! 🚀
