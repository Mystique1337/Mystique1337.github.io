# Portfolio Content Update Guide

This guide shows you exactly where to update different parts of your portfolio website.

## 📋 Table of Contents
1. [Personal Information](#personal-information)
2. [Work Experience](#work-experience)
3. [Projects](#projects)
4. [Skills](#skills)
5. [About Section](#about-section)
6. [Contact Information](#contact-information)
7. [Theme & Colors](#theme--colors)
8. [Images](#images)

---

## 🧑 Personal Information

### Location: `index-new.html` (Lines 80-145)

**What to Update:**
```html
<!-- Line 85: Your name -->
<span class="name">Ashinze Emmanuel</span>

<!-- Line 87-92: Your roles (typing animation) -->
<span class="typed-text"></span>
<!-- Edit the roles in assets/js/modern.js, line 122-128 -->

<!-- Line 95-98: Your bio -->
<p class="hero-description">
    ML Engineer and Chemical Engineering undergraduate with 2+ years of AI experience. 
    I integrate engineering principles with AI expertise to solve complex, real-world problems.
</p>

<!-- Line 133-144: Social media links -->
<a href="https://github.com/Mystique1337" target="_blank">
<a href="https://www.linkedin.com/in/ashinze-emmanuel-5a6757193/" target="_blank">
<a href="https://twitter.com/ashinze_ec" target="_blank">
<a href="mailto:chidi.ashinze@gmail.com">
```

### Location: `assets/js/modern.js` (Lines 122-128)

**Update Typing Animation Roles:**
```javascript
const texts = [
    'ML Engineer',              // Change these
    'Chemical Engineer',        // to your
    'AI Researcher',           // desired
    'Data Scientist',          // job titles
    'Problem Solver'
];
```

---

## 💼 Work Experience

### Location: `index-new.html` (Lines 240-350)

**How to Add/Edit Experience:**

```html
<!-- Copy this template for each experience -->
<div class="timeline-item" data-personas="ai-ml, researcher">  <!-- Change personas -->
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="experience-card">
            <div class="experience-header">
                <div class="experience-logo">
                    <!-- Update logo image -->
                    <img src="assets/img/experience/company_logo.png" alt="Company Name">
                </div>
                <div class="experience-info">
                    <!-- Update job title -->
                    <h3 class="experience-title">Your Job Title</h3>
                    
                    <!-- Update company name and link -->
                    <p class="experience-company">
                        <a href="https://company-website.com" target="_blank">Company Name</a>
                    </p>
                    
                    <!-- Update dates -->
                    <span class="experience-period">
                        <i class="far fa-calendar"></i> Jan 2023 - Present
                    </span>
                </div>
            </div>
            
            <div class="experience-description">
                <!-- Update description -->
                <p>Brief description of your role and responsibilities.</p>
                
                <!-- Update achievements -->
                <ul class="experience-highlights">
                    <li>Achievement 1</li>
                    <li>Achievement 2</li>
                    <li>Achievement 3</li>
                </ul>
            </div>
            
            <!-- Update skills/tags -->
            <div class="experience-tags">
                <span class="tag">Skill 1</span>
                <span class="tag">Skill 2</span>
                <span class="tag">Skill 3</span>
            </div>
        </div>
    </div>
</div>
```

**Persona Options:**
- `ai-ml` - For ML/AI roles
- `researcher` - For research positions
- `chemical-engineer` - For chemical engineering roles
- Use multiple: `data-personas="ai-ml, researcher"`

---

## 🚀 Projects

### Location: `index-new.html` (Lines 360-480)

**How to Add/Edit Projects:**

```html
<!-- Copy this template for each project -->
<div class="project-card" data-personas="ai-ml, researcher">  <!-- Change personas -->
    <div class="project-image">
        <!-- Update project image -->
        <img src="path/to/project-image.jpg" alt="Project Name">
        
        <div class="project-overlay">
            <!-- Update links (remove if not needed) -->
            <a href="https://live-demo.com" target="_blank" class="project-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
            <a href="https://github.com/username/repo" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </div>
    
    <div class="project-content">
        <!-- Update project title -->
        <h3 class="project-title">Your Project Name</h3>
        
        <!-- Update description -->
        <p class="project-description">
            Brief description of what the project does and its impact.
        </p>
        
        <!-- Update technologies used -->
        <div class="project-tech">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">TensorFlow</span>
            <span class="tech-tag">Flask</span>
        </div>
    </div>
</div>
```

---

## 🛠️ Skills

### Location: `index-new.html` (Lines 490-580)

**How to Add/Edit Skills:**

```html
<!-- Each skill category -->
<div class="skill-category">
    <div class="category-header">
        <i class="fas fa-code"></i>  <!-- Change icon -->
        <h3>Programming Languages</h3>  <!-- Change category name -->
    </div>
    
    <div class="skill-items">
        <!-- Add/remove skill items -->
        <div class="skill-item">
            <img src="assets/icons/Python.png" alt="Python">  <!-- Update icon -->
            <span>Python</span>  <!-- Update name -->
        </div>
        <!-- Add more skills here -->
    </div>
</div>
```

**Available Font Awesome Icons:**
- `fas fa-code` - Programming
- `fas fa-brain` - ML/AI
- `fas fa-chart-line` - Data Science
- `fas fa-tools` - Tools
- `fas fa-database` - Databases
- `fas fa-cloud` - Cloud

---

## 📝 About Section

### Location: `index-new.html` (Lines 180-238)

**What to Update:**

```html
<!-- Line 190-200: Your bio paragraphs -->
<p class="about-text lead">
    I am an <strong>ML Engineer</strong> and <strong>Chemical Engineering undergraduate</strong> 
    with over 2 years of hands-on experience in artificial intelligence and machine learning.
</p>

<!-- Line 212-218: Stats (update the numbers) -->
<div class="stat-item">
    <span class="stat-number" data-target="2">0</span>  <!-- Change "2" -->
    <span class="stat-label">Years Experience</span>
</div>

<!-- Line 224-228: CV download link -->
<a href="assets/cv/AshinzeEmmanuel_CV.pdf" class="btn btn-primary" download>
    <i class="fas fa-download"></i>
    <span>Download CV</span>
</a>
```

---

## 📧 Contact Information

### Location: `index-new.html` (Lines 590-645)

**Update Contact Details:**

```html
<!-- Line 595-615: Contact cards -->
<div class="contact-card">
    <div class="contact-icon">
        <i class="fas fa-envelope"></i>
    </div>
    <h3>Email</h3>
    <a href="mailto:your.email@gmail.com">your.email@gmail.com</a>  <!-- Update -->
</div>

<!-- Line 625: Formspree form action -->
<form class="contact-form" id="contactForm" 
      action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">  <!-- Update ID -->
```

**To Get Formspree ID:**
1. Go to https://formspree.io/
2. Sign up (free)
3. Create a new form
4. Copy the form ID (looks like: `xpznabcd`)
5. Replace `YOUR_FORMSPREE_ID` with your actual ID

---

## 🎨 Theme & Colors

### Location: `assets/css/modern.css` (Lines 10-40)

**Update Colors:**

```css
:root {
    /* Primary Colors */
    --primary: #3B82F6;          /* Change main blue */
    --primary-dark: #2563EB;     /* Darker shade */
    --primary-light: #60A5FA;    /* Lighter shade */
    --secondary: #10B981;        /* Green accent */
    --accent: #8B5CF6;          /* Purple accent */
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Change these hex codes to your preferred gradient colors */
}
```

**Popular Color Schemes:**
- **Blue Tech:** `#3B82F6` to `#1E40AF`
- **Purple Modern:** `#8B5CF6` to `#6D28D9`
- **Green Fresh:** `#10B981` to `#059669`
- **Orange Bold:** `#F97316` to `#EA580C`

---

## 🖼️ Images

### Where to Store Images:

```
assets/
  img/
    about/
      ashinze.jpg              ← Your profile photo (update line 154 in HTML)
    experience/
      company_logo.png         ← Company logos
    projects/
      project_image.jpg        ← Project screenshots
  icons/
    Python.png                 ← Skill icons (50x50px recommended)
    TensorFlow.png
```

### Update Profile Image:

**Location: `index-new.html` (Line 154)**
```html
<img src="assets/img/about/ashinze.jpg" alt="Ashinze Emmanuel" class="profile-img">
                  ↑ Change this path
```

**Recommended Sizes:**
- Profile photo: 400x400px (square)
- Project images: 600x400px (landscape)
- Company logos: 200x200px (square with transparency)
- Skill icons: 50x50px (PNG with transparency)

---

## 🔄 Quick Update Checklist

When you want to update your portfolio:

### Adding New Experience:
1. ✅ Prepare company logo (save to `assets/img/experience/`)
2. ✅ Copy experience template from lines 240-290
3. ✅ Paste after last experience item
4. ✅ Update: title, company, dates, description, tags, persona
5. ✅ Test on local server

### Adding New Project:
1. ✅ Prepare project image (save to `assets/img/projects/`)
2. ✅ Copy project template from lines 360-385
3. ✅ Paste in projects grid
4. ✅ Update: title, description, image, links, tech tags, persona
5. ✅ Test on local server

### Updating Personal Info:
1. ✅ Update name (line 85)
2. ✅ Update bio (lines 95-98)
3. ✅ Update social links (lines 133-144)
4. ✅ Update email (line 606)
5. ✅ Update profile photo (line 154)

### Testing Your Changes:
```powershell
# In terminal
cd "path/to/your/portfolio"
python -m http.server 8000

# Open browser to: http://localhost:8000/index-new.html
```

---

## 💡 Pro Tips

1. **Always Test Locally First**
   - Make changes
   - View on http://localhost:8000/index-new.html
   - Check on mobile (resize browser)
   - Test all links

2. **Use Version Control**
   ```powershell
   git add .
   git commit -m "Updated experience section"
   git push origin main
   ```

3. **Optimize Images**
   - Use https://tinypng.com/ to compress images
   - Keep images under 500KB
   - Use PNG for logos, JPG for photos

4. **Keep Backups**
   - Before major changes: `Copy-Item index-new.html index-new.backup.html`

5. **Regular Updates**
   - Add projects immediately after completion
   - Update experience every 3-6 months
   - Refresh skills as you learn new ones
   - Update stats annually

---

## 🆘 Need Help?

**Common Issues:**

1. **Changes not showing?**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Clear browser cache

2. **Image not loading?**
   - Check file path is correct
   - Verify image exists in folder
   - Check file extension (.jpg vs .png)

3. **Layout broken?**
   - Make sure you closed all HTML tags: `</div>`
   - Check for missing commas in persona lists

4. **Form not working?**
   - Verify Formspree ID is correct
   - Check you replaced `YOUR_FORMSPREE_ID`

---

## 📚 File Reference

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `index-new.html` | Main content (text, links, structure) | Weekly/Monthly |
| `assets/css/modern.css` | Colors, fonts, spacing | Rarely |
| `assets/js/modern.js` | Interactive features | Rarely |
| `assets/img/` | Images and photos | As needed |
| `assets/icons/` | Skill icons | When learning new skills |

---

**Last Updated:** October 5, 2025
**Version:** 2.0

For more help, refer to:
- README.md (setup instructions)
- CHANGELOG.md (feature documentation)
