# Analytics Setup for Broken Institutions

## GoatCounter Setup Instructions

GoatCounter is a privacy-friendly analytics solution perfect for GitHub Pages.

### Benefits:
- 100% free for public sites
- No cookies or tracking
- GDPR compliant
- Simple, clean dashboard
- Lightweight script

### Setup Steps:

1. **Sign up at GoatCounter**
   - Go to https://www.goatcounter.com/signup
   - Choose "Sign up for free"
   - Use site name: `brokeninstitutions` (or similar)

2. **Get your tracking code**
   - After signup, you'll get a script tag like:
   ```html
   <script data-goatcounter="https://brokeninstitutions.goatcounter.com/count"
           async src="//gc.zgo.at/count.js"></script>
   ```

3. **Add to all pages**
   - Add the script tag before closing `</head>` tag
   - Include on: index.html, about.html, methodology.html, all case pages

4. **Dashboard access**
   - View stats at: https://brokeninstitutions.goatcounter.com
   - See page views, referrers, browser stats, locations

### Alternative: Simple counter API

If you prefer a basic visit counter, we can use countapi.xyz:

```html
<script>
fetch('https://api.countapi.xyz/hit/brokeninstitutions.github.io/homepage')
  .then(response => response.json())
  .then(data => {
    document.getElementById('visit-count').textContent = data.value;
  });
</script>
```

### Recommendation:
Use GoatCounter for comprehensive, privacy-friendly analytics.