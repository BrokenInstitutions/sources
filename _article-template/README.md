# Article Template

Template files for creating new investigation articles.

## Quick Start

1. **Copy this entire folder** to `cases/[new-case-id]/`
2. **Rename the folder** from `_article-template` to your case ID
3. **Replace all placeholders** in brackets `[PLACEHOLDER]` with actual content
4. **Add images** to the `assets/` folder
5. **Update** `cases-index.json` in the root directory

## Files Included

- **`article.html`** - Main modular article page
- **`content.json`** - Structured article data
- **`timeline.html`** - Timeline page (optional)
- **`sources.html`** - Sources page (optional)
- **`assets/`** - Folder for images and documents

## Placeholders to Replace

### Basic Info
- `[CASE_ID]` - URL-friendly case identifier (e.g., "charlotte-transit")
- `[CASE_TITLE]` - Full case title
- `[CASE_SUBTITLE]` - Brief subtitle
- `[CASE_DESCRIPTION]` - SEO description
- `[LOCATION]` - Geographic location
- `[CATEGORY]` - Case category (e.g., "Judicial System")

### Dates
- `[INVESTIGATION_DATE]` - When investigation was conducted
- `[PUBLISH_DATE]` - Publication date (YYYY-MM-DD format)
- `[DEATH_DATE]` - Date of incident

### People
- `[VICTIM_NAME]` - Victim's name
- `[PERPETRATOR_NAME]` - Perpetrator's name
- `[OFFICIAL_NAME_1]`, `[OFFICIAL_NAME_2]` - Judicial officials involved

### Content
- `[OPENING_PARAGRAPH]` - Investigation summary
- `[KEY_INSIGHT]` - Main finding about institutional accountability
- All other bracketed placeholders in content.json

## After Creation

1. Test the new article by opening `article.html`
2. Verify all data loads correctly
3. Add the case to the main `cases-index.json` file
4. Link to it from the homepage

## Modular System

The `article.html` uses the modular component system:
- Automatic rendering from `content.json`
- Reusable components for consistency
- Theme support and responsive design included