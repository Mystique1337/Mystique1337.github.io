# Ashinze Emmanuel C. - Portfolio Website

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)](https://mystique1337.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A modern, persona-aware portfolio website showcasing my work as an ML Engineer and Chemical Engineering undergraduate. Built with vanilla JavaScript, no backend required, fully managed through a Git-based CMS.

 **Live Site:** [https://mystique1337.github.io/](https://mystique1337.github.io/)

##  Features

###  Modern Design
- **Inter Font** - Clean, professional typography
- **Light/Dark Theme** - Toggle with localStorage persistence  
- **Responsive Design** - Mobile-first, works on all devices
- **Accessible** - WCAG compliant with keyboard navigation support

###  Persona System
- **Dynamic Filtering** - Filter content by Chemical Engineer, Researcher, or AI/ML personas
- **URL Support** - Share filtered views with ?persona=ai-ml
- **Persistent Selection** - Remembers your choice in localStorage
- **Smooth Animations** - Elegant transitions when filtering

###  No-Backend CMS  
- **Decap CMS** (formerly Netlify CMS) with GitHub backend
- **Content Management** - Edit all content through /admin interface
- **Git-based** - All changes commit directly to your repository
- **No Server Needed** - 100% static, runs on GitHub Pages

###  Contact Form
- **Formspree Integration** - Receive emails without a backend
- **Spam Protection** - Honeypot field included
- **Client-side Validation** - Instant feedback
- **Accessible** - Proper labels and ARIA attributes

###  Performance & SEO
- **Optimized** - Lighthouse score  95
- **SEO Ready** - Meta tags, Open Graph, Twitter Cards
- **Sitemap** - Automatic sitemap.xml for search engines
- **Lazy Loading** - Images load as needed

##  Quick Start

### 1. Configure Formspree
1. Sign up at https://formspree.io/
2. Create a new form and copy your form ID
3. In index.html, replace YOUR_FORMSPREE_ID

### 2. Enable GitHub Pages
1. Go to repository Settings  Pages
2. Select main branch and /root folder  
3. Your site will be live at https://mystique1337.github.io/

### 3. Access the CMS
1. Navigate to https://mystique1337.github.io/admin/
2. Login with your GitHub account
3. Start editing content!

##  Using the Admin Panel (/admin)

The easiest way to manage your portfolio:

1. Visit https://mystique1337.github.io/admin/
2. Click **Login with GitHub** and authorize
3. Browse collections (Experience, Projects, Education, etc.)
4. Click **New** to add content or edit existing entries
5. Click **Publish** to save changes to GitHub

All changes are automatically committed to your repository!

##  Adding a New Persona

1. Edit content/site.json and add to personas array
2. Edit admin/config.yml to add the persona to collection options  
3. Tag content items with the new persona in data-personas attribute
4. The persona chip will auto-generate from the slug

Example: "data-scientist"  "Data Scientist"

##  Managing Images

### Via CMS
Upload images directly through the admin interface. They're saved to /public/images/uploads/

### Manually
Place images in:
- Experience logos: /assets/img/experience/
- Project images: /assets/img/projects/
- Skill icons: /assets/icons/

Then reference them in JSON: "image": "/assets/img/projects/my-project.jpg"

##  Configuration

See the comprehensive [CHANGELOG.md](./CHANGELOG.md) for detailed configuration instructions.

##  License

MIT License - see [LICENSE](LICENSE) file for details.

##  Contact

**Ashinze Emmanuel C.**
- Email: chidi.ashinze@gmail.com
- LinkedIn: [Ashinze Emmanuel](https://www.linkedin.com/in/ashinze-emmanuel-5a6757193/)
- GitHub: [@Mystique1337](https://github.com/Mystique1337)

---

**Made with  by Ashinze Emmanuel C.**
