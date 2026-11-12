# AGENT.md - AI Agent Operating Guide for onovar.github.io

This repository hosts the personal blog and technical website for **Lasha Brodzeli** ([https://onovar.github.io](https://onovar.github.io)), powered by **Jekyll** with the [`jekyll-theme-chirpy`](https://github.com/cotes2020/jekyll-theme-chirpy) theme and deployed automatically via **GitHub Pages** (GitHub Actions).

This document serves as the ground truth instruction set for AI coding agents handling feature requests, content generation, styling adjustments, and blog maintenance.

---

## 1. Core Architecture & Tech Stack

- **Static Site Generator**: Jekyll (Ruby 3.x, Gemfile managed)
- **Theme**: `jekyll-theme-chirpy` (~> 7.4)
- **Plugins**:
  - `jekyll-thumbnail-img` (handles post thumbnail images)
  - `html-proofer` (test/CI link and HTML verification)
  - `_plugins/posts-lastmod-hook.rb` (automatically records post update timestamps from git)
- **Deployment**: Automatic GitHub Actions workflow via `.github/workflows/pages-deploy.yml` upon push to `main`.
- **Default Site Timezone**: `Asia/Tbilisi` (`+0400`)
- **PWA & Offline Cache**:
  - `pwa.enabled` and `pwa.cache.enabled` are set to `false` in `_config.yml` to prevent intrusive "New content available / [Update]" prompts on every commit and ensure instant live page updates.
  - *Testing/Revert Note*: If you or the user notice any significant performance slowdown on mobile/slow connections and want aggressive offline caching restored, re-enable in `_config.yml`:
    ```yaml
    pwa:
      enabled: true
      cache:
        enabled: true
    ```

---

## 2. Content & Post Rules (`_posts/`)

### 2.1 File Naming & Location
- Posts must be located inside the `_posts/` folder.
- **Published Posts**: Use standard Jekyll format `YYYY-MM-DD-title.md` (e.g., `2026-11-12-my-new-post.md`).
- **Living Examples Collection (`_posts/_Examples.md`)**:
  - `_posts/_Examples.md` is the master kitchen-sink reference file where formatting examples, components, widgets, and syntax snippets are gathered and demonstrated.
  - Whenever new Chirpy features, shortcodes, embeds, or custom HTML snippets are developed, document and add an example block to `_posts/_Examples.md`.
- **Hidden / Draft / Template Files**:
  - Any file whose filename begins with an underscore `_` (e.g., `_Examples.md`, `_draft-post.md`) is **ignored** by Jekyll's build engine and will not be published to the public site.
  - When the user asks to hide or draft a post without deleting it, rename the file to start with `_` inside `_posts/` (or move it to `_drafts/`).

### 2.2 Post Frontmatter Standard
Every post must begin with YAML frontmatter formatted as follows:

```yaml
---
title: "Descriptive Post Title"
date: YYYY-MM-DD HH:MM:SS +0400
categories: [primary_category, secondary_subcategory]
tags: [tag1, tag2, tag3]
pin: false
math: false
mermaid: false
thumbnail: /assets/img/thumbs/post-thumbnail.jpg
# image:
#   path: /assets/img/thumbs/banner.jpg
#   alt: "Banner Image Description"
---
```

**Key Guidelines for Agents:**
- **Timezone**: Always use `+0400` (Georgia / `Asia/Tbilisi`) unless explicitly instructed otherwise.
- **Categories**: Max 2 levels (e.g., `[Development, Jekyll]` or `[Science, AI]`).
- **Tags**: Lowercase, comma-separated keywords.
- **Thumbnail**: Point to `/assets/img/thumbs/<name>.[jpg|png]`.
- **Math / Mermaid**: Keep `false` unless the post contains LaTeX formulas (`$math$`) or Mermaid diagrams.

### 2.3 Chirpy-Specific Markdown Features
When writing or formatting articles, use Chirpy's native design tokens:

- **Prompts / Callout Boxes**:
  ```markdown
  > Tip prompt content here.
  {: .prompt-tip }

  > Informational note.
  {: .prompt-info }

  > Warning message.
  {: .prompt-warning }

  > Danger / error warning.
  {: .prompt-danger }
  ```
- **Inline Filepaths**:
  Use `{: .filepath}` immediately following backticks:
  ```markdown
  Edit `_config.yml`{: .filepath} to update settings.
  ```
- **Image Styling**:
  ```markdown
  ![Description](/assets/img/example.png){: .rounded-10 .shadow width="90%"}
  ```
- **Embedded Videos**:
  ```markdown
  {% include embed/youtube.html id='YOUTUBE_VIDEO_ID' %}
  ```
- **Footnotes**:
  ```markdown
  Here is a claim[^note1].

  [^note1]: Reference source text.
  ```

---

## 3. Assets & Image Placement Rules

To avoid fragmented image assets, duplicate files, and 404 errors:

1. **Local Post Images (Single Source of Truth)**: `_posts/assets/`
   - Store all pasted and post-specific images here (e.g., `_posts/assets/my-image.png`).
   - Markdown reference: `![alt text](assets/my-image.png)` (Chirpy resolves this to `/assets/my-image.png`).
   - **Automated Copy Hook**: The hook in `_plugins/copy-post-assets.rb` automatically copies all files from `_posts/assets/` into `_site/assets/` during the Jekyll build. **Do NOT duplicate images into the root `assets/` folder.**
2. **Post Thumbnails**: `assets/img/thumbs/`
   - Named consistently, e.g., `assets/img/thumbs/<post-slug>-thumb.jpg` (or `.png`).
3. **Site-wide Shared Graphics**: `assets/img/`
   - Favicons (`assets/img/favicons/`), site avatar, and recurring shared graphics.

---

## 4. Technical Customization & Feature Work

### 4.1 Styling & Theme Overrides (CSS/SCSS)
- Do NOT edit the compiled Chirpy gem files directly.
- Add custom styles and CSS overrides in `assets/css/jekyll-theme-chirpy.scss` or inside `_sass/`.
- Ensure color variables respect Chirpy's light and dark mode palette.

### 4.2 Navigation Tabs (`_tabs/`)
- Site tabs are defined in `_tabs/` (e.g., `about.md`, `archives.md`, `categories.md`, `tags.md`).
- Tab frontmatter requires:
  ```yaml
  ---
  layout: page
  icon: fas fa-info-circle
  order: 1
  title: About
  ---
  ```

### 4.3 Layout & Include Overrides
- To override a Chirpy layout or partial, copy the relevant file from the Chirpy theme into `_layouts/` or `_includes/` and modify it locally. Jekyll prioritizes workspace files over gem files.

---

## 5. Content Quality & Editing Guidelines

When asked to review, proofread, or rewrite posts:
1. **Spell & Grammar Checking**: Ensure clean, professional English tone while retaining technical accuracy.
2. **Heading Structure**: Use single `#` for post title (rendered from frontmatter), starting sections with `##`, `###`.
3. **Link Verification**: Ensure external links use `https://` and internal links reference valid `/posts/:title/` or tab routes.
4. **Code Blocks**: Always specify language identifiers (e.g., ```` ```ruby ````, ```` ```bash ````, ```` ```yaml ````) for Rouge syntax highlighting.

---

## 6. Verification & Build Commands

Before committing or completing a task, verify the build locally:

```powershell
# Install dependencies if Gemfile changed
bundle install

# Serve local development site
bundle exec jekyll s

# Verify build output cleanly
bundle exec jekyll b
```
Live preview will be available at `http://127.0.0.1:4000`.
