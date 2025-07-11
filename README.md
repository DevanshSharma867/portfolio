# Portfolio Website Template

A clean, modern, and responsive portfolio website template built with HTML, CSS, and JavaScript. This template is designed to showcase your projects, experience, and skills in a professional manner.

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sanjith-v/portfolio-base.git
   cd portfolio-base
   ```

2. **Open in your preferred editor:**

   - **Recommended:** Use [Cursor](https://cursor.sh/) or [Windsurf](https://windsurf.ai/) for AI-assisted customization
   - These tools can help you quickly generate content and customize the template

3. **Customize the content:**
   - Replace placeholder text with your information
   - Add your projects and experience
   - Update links and contact information

## 📝 Customization Guide

### 1. Personal Information

Update the following in `index.html`:

- **Name and Title:** Replace "Your Name" and "Your Title • Your Specialty • Your Focus"
- **Contact Information:** Update email, phone, LinkedIn, and GitHub links
- **About Section:** Customize the description and education details

### 2. Experience Section

**Recommended approach:** Use Cursor or Windsurf to help you:

- Extract experience details from your resume
- Format them appropriately for the timeline structure
- Add quantifiable achievements and metrics

**Structure to follow:**

```html
<div class="timeline-item">
  <div class="flip-card">
    <div class="card-face card-front">
      <div class="timeline-date">Date Range</div>
      <h3 class="timeline-title">Your Position</h3>
      <div class="timeline-company">Company Name</div>
      <div class="timeline-location">Location</div>
    </div>
    <div class="card-face card-back">
      <ul>
        <li>Key achievement or responsibility</li>
        <li>Quantifiable result or improvement</li>
        <li>Technology or skill utilized</li>
      </ul>
    </div>
  </div>
</div>
```

### 3. Projects Section

For each project:

1. **Update project tiles in `index.html`:**

   - Change project titles and descriptions
   - Update technology tags
   - All tiles currently link to `project-template.html`

2. **Create individual project pages:**

   - Copy `project-template.html` for each project
   - Rename to `project-1.html`, `project-2.html`, etc.
   - Update the links in `index.html` to point to the correct files
   - Customize content for each project

3. **Project page structure:**

   ```html
   <h1 class="project-title">YOUR PROJECT TITLE</h1>

   <!-- LINKS -->
   <section>
     <h2>LINKS</h2>
     <ul class="link-row">
       <li><a href="your-github-repo" target="_blank">GitHub Repo</a></li>
       <li><a href="your-live-demo" target="_blank">Live Demo</a></li>
     </ul>
   </section>

   <!-- OVERVIEW -->
   <section>
     <h2>OVERVIEW</h2>
     <p>Project description...</p>
   </section>

   <!-- KEY ACHIEVEMENTS -->
   <section>
     <h2>KEY ACHIEVEMENTS</h2>
     <ul class="bullet-list">
       <li><strong>Feature</strong> — Description</li>
     </ul>
   </section>
   ```

### 4. Project Images

**Best approach for generating project tile images:**

- Use **Sora** (OpenAI's text-to-video model) to generate high-quality images
- Prompt examples:
  - "A clean, modern dashboard interface showing data analytics"
  - "A mobile app interface with user-friendly design"
  - "A web application with modern UI components"
- Save generated images as `project-name-thumb.png` in `assets/images/`
- Update the image sources in `index.html`

### 5. Skills Section

Update the skills icons to match your expertise:

- Keep relevant technology icons
- Remove or replace icons for technologies you don't use
- Add new icons from [Devicon](https://devicon.dev/) if needed

### 6. Certifications

Replace placeholder certification images:

- Add your actual certification badges
- Update links to verification pages
- Remove or add certification slots as needed

### 7. Profile Photo

Replace the placeholder profile image:

- Add your professional headshot
- Recommended size: 200x200 pixels
- Update the image source in `index.html`

## 🎨 Styling Customization

### Colors and Themes

- Main styles are in `assets/css/main.css`
- Project page styles in `assets/css/project-page.css`
- Customize colors, fonts, and spacing as needed

### Responsive Design

- The template is mobile-responsive
- Test on different screen sizes
- Adjust breakpoints in CSS if needed

## 📁 File Structure

```
portfolio-base/
├── index.html              # Main portfolio page
├── project-template.html   # Template for individual projects
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Images and icons
│   │   ├── certs/         # Certification images
│   │   └── *.png          # Project thumbnails
│   └── sass/              # SASS source files
└── README.md              # This file
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push your customized portfolio to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your portfolio will be available at `https://username.github.io/repository-name`

### Other Hosting Options

- **Netlify:** Drag and drop the folder to deploy
- **Vercel:** Connect your GitHub repository
- **AWS S3:** Upload files to a public bucket
- **Any web server:** Upload files to your hosting provider

## 💡 Tips for Success

1. **Content Quality:**

   - Focus on quantifiable achievements
   - Use action verbs in experience descriptions
   - Include links to live demos and GitHub repos

2. **Visual Appeal:**

   - Use high-quality project images
   - Maintain consistent styling
   - Ensure mobile responsiveness

3. **SEO Optimization:**

   - Add meta descriptions
   - Use descriptive page titles
   - Include relevant keywords

4. **Performance:**
   - Optimize image sizes
   - Minimize CSS and JavaScript
   - Use CDN for external resources

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This template is available under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Design based on [HTML5 UP](https://html5up.net/)
- Icons from [Devicon](https://devicon.dev/)
- Font Awesome for social icons

---

**Happy coding! 🎉**
