# Development Workflow Guide
*Broken Institutions - Independent Accountability Journalism*

## Optimized Local Development Process

### 1. Local Development & Testing (RECOMMENDED)
```bash
# Navigate to project directory
cd C:/Users/ricca/progetti-claude/sources

# Start local server (required for JSON loading)
python -m http.server 8000

# Open browser to: http://localhost:8000
# Make changes, refresh browser to see results instantly
# Test all functionality before committing
```

**Why Local Server?**
- Modern browsers block fetch() requests from `file://` URLs for security (CORS restrictions)
- Local server eliminates these restrictions
- Instant feedback - no deployment delays (vs 30-60 seconds)
- Zero risk to production environment
- Charlotte case loads correctly with JSON data

### 2. Commit to Dev Branch (When Changes Work)
```bash
git add .
git commit -m "Feature: description"
git push origin dev
```
**Result:** Code saved in development branch, ready for production when needed

### 3. Production Release (When Ready)
```bash
git checkout main
git merge dev --no-ff -m "Release: feature description"
git push origin main
```
**Result:** Automatic deployment to production site via GitHub Actions

## Environment URLs

- **Local Development:** `http://localhost:8000` (instant testing)
- **Production:** `https://brokeninstitutions.github.io/sources` (from `main` branch)

*Note: No staging environment needed - local development provides instant feedback*

## Technical Stack

### Frontend
- **HTML5/CSS3** - Responsive design with dark/light themes
- **Vanilla JavaScript** - No external dependencies
- **JSON-based content** - Dynamic case loading
- **GitHub Pages** - Static site hosting

### Development Tools
- **Git** - Version control with dev/main branch strategy
- **GitHub Actions** - Automated testing and deployment
- **Python HTTP Server** - Local development server
- **Visual feedback workflow** - See changes before committing

### Features Implemented
- ✅ **Theme Toggle** - Persistent across all pages with localStorage
- ✅ **Responsive Design** - Mobile-optimized layouts
- ✅ **Case Management** - JSON-driven content system
- ✅ **Professional Navigation** - Consistent UX across pages
- ✅ **SEO Optimized** - Proper meta tags and descriptions

## Quality Gates

### Development Standards
- All changes tested locally before pushing
- Visual confirmation required for UI changes
- No commits with broken functionality
- Consistent coding style across all files

### Content Standards
- **Editorial Positioning:** "Independent accountability journalism with clear editorial stance"
- **Source Requirements:** All claims backed by verified sources
- **Factual Accuracy:** Rigorous fact-checking with source documentation
- **Professional Presentation:** Clean, readable design with proper typography

## Branch Strategy

### Main Branch (Production)
- **Purpose:** Live website visible to public
- **Updates:** Only stable, tested features
- **Deploy:** Automatic via GitHub Actions
- **URL:** `https://brokeninstitutions.github.io/sources`

### Dev Branch (Development)
- **Purpose:** Feature development and testing
- **Updates:** Work-in-progress features
- **Deploy:** Manual merge to main when ready
- **Testing:** Local development server only

## Emergency Procedures

### Rollback Production
```bash
git checkout main
git reset --hard HEAD~1  # Go back one commit
git push --force-with-lease origin main
```

### Hotfix Process
```bash
git checkout main
# Make critical fix
git commit -m "Hotfix: critical issue description"
git push origin main  # Automatic deployment
```

### Local Development Issues
- **Case not loading:** Ensure using `http://localhost:8000` not `file://`
- **Python server shows file explorer:** Check you're in the `sources` directory
- **Changes not visible:** Clear browser cache with Ctrl+F5

## Project Achievements

### Professional Infrastructure
- ✅ **Enterprise-grade workflow** with automated testing
- ✅ **Zero-downtime deployments** with proper branch protection
- ✅ **Visual feedback loop** eliminating blind commits
- ✅ **Scalable architecture** ready for multiple case studies

### Content Excellence
- ✅ **Charlotte Transit Case** - Complete investigative package
- ✅ **Editorial Clarity** - Transparent perspective and sourcing
- ✅ **Professional Design** - Publication-quality presentation
- ✅ **Mobile Experience** - Optimized for all devices

### Technical Excellence
- ✅ **Performance Optimized** - Fast loading, lightweight code
- ✅ **Accessibility** - Proper semantic HTML and contrast
- ✅ **SEO Ready** - Comprehensive metadata and structure
- ✅ **Future-Ready** - Extensible for additional content types

---

**Last Updated:** September 17, 2025
**Status:** Production Ready
**Next Steps:** Content expansion with additional case studies