# Quick Reference: Where to Update Your Portfolio

## 🎯 Most Common Updates

### 1. Add New Experience
**File:** `index-new.html`  
**Line:** ~240-350 (Experience Section)

```html
Search for: <!-- Experience Item -->
Copy the entire block and paste below
Update: Company name, job title, dates, description
```

---

### 2. Add New Project
**File:** `index-new.html`  
**Line:** ~360-480 (Projects Section)

```html
Search for: <!-- Project -->
Copy project card block and paste
Update: Title, description, image, GitHub link
```

---

### 3. Update Personal Info
**File:** `index-new.html`

| What | Line | Search For |
|------|------|------------|
| Your Name | 85 | `<span class="name">` |
| Bio | 95 | `<p class="hero-description">` |
| Email | 606 | `<a href="mailto:` |
| GitHub | 133 | `href="https://github.com/` |
| LinkedIn | 137 | `href="https://www.linkedin.com/` |

---

### 4. Update Job Titles (Typing Animation)
**File:** `assets/js/modern.js`  
**Line:** 122-128

```javascript
const texts = [
    'Your Title 1',
    'Your Title 2',
    'Your Title 3',
];
```

---

### 5. Change Colors
**File:** `assets/css/modern.css`  
**Line:** 10-40

```css
--primary: #3B82F6;        ← Change this color
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                            ↑ First color    ↑ Second color
```

---

### 6. Update Profile Photo
**File:** `index-new.html`  
**Line:** 154

```html
<img src="assets/img/about/YOUR_PHOTO.jpg"
              ↑ Replace with your image filename
```

Then save your photo to: `assets/img/about/`

---

### 7. Add Skills
**File:** `index-new.html`  
**Line:** ~490-580 (Skills Section)

```html
Search for: <div class="skill-item">
Copy and paste to add more skills
Update icon path and skill name
```

---

### 8. Update Stats Numbers
**File:** `index-new.html`  
**Line:** ~212-220

```html
<span class="stat-number" data-target="2">0</span>
                                      ↑ Change this number
```

---

## 🔧 Testing Your Changes

```powershell
# Start local server
python -m http.server 8000

# Open in browser
http://localhost:8000/index-new.html

# Press Ctrl+Shift+R to hard refresh after changes
```

---

## 📁 File Structure Quick Look

```
Your Portfolio/
│
├── index-new.html          ← Main file: Update content here
│
├── assets/
│   ├── css/
│   │   └── modern.css      ← Change colors/fonts here
│   │
│   ├── js/
│   │   └── modern.js       ← Update typing animation here
│   │
│   ├── img/
│   │   ├── about/          ← Put your photo here
│   │   ├── experience/     ← Put company logos here
│   │   └── projects/       ← Put project images here
│   │
│   └── icons/              ← Put skill icons here
│
├── CONTENT-GUIDE.md        ← Detailed guide (you are here!)
└── README.md               ← Setup instructions
```

---

## ⚡ Super Quick Updates

**Change your name:**
```
Open: index-new.html
Search: "Ashinze Emmanuel"
Replace: "Your Name"
```

**Change email:**
```
Open: index-new.html
Search: "chidi.ashinze@gmail.com"
Replace: "your.email@gmail.com"
```

**Change main color:**
```
Open: assets/css/modern.css
Search: "--primary: #3B82F6"
Replace: "--primary: #YOUR_COLOR"
```

---

## 📌 Important Notes

✅ **Always edit `index-new.html`** (not `index.html`)  
✅ **Test locally before pushing** to GitHub  
✅ **Keep backups** before major changes  
✅ **Optimize images** (use TinyPNG.com)  
✅ **Hard refresh** browser (Ctrl+Shift+R) after changes

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Changes not showing | Hard refresh: `Ctrl + Shift + R` |
| Image not loading | Check path: `assets/img/folder/filename.jpg` |
| Layout broken | Find unclosed `</div>` tag |
| Colors not changing | Check CSS file, clear cache |

---

**For detailed instructions, see: `CONTENT-GUIDE.md`**
