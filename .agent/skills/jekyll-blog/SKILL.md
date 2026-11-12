---
name: jekyll-blog
description: >-
  Use this skill for managing, creating, editing, and technically customizing the
  Jekyll Chirpy blog on onovar.github.io. It provides procedures for authoring
  posts with proper timezone (+0400), draft/hidden post handling, asset routing,
  Chirpy markdown formatting, and style customization.
---

# Jekyll Chirpy Blog Operations Skill

This skill equips AI agents to manage the GitHub Pages blog for **Lasha Brodzeli** ([https://onovar.github.io](https://onovar.github.io)).

---

## 1. Post Creation & Scaffolding Workflow

When asked to create or draft a new post:

1. **Filename Determination**:
   - Location: `_posts/`
   - Published format: `YYYY-MM-DD-title-slug.md` (e.g., `2026-11-12-introduction-to-ai.md`).
   - Draft / Hidden format: `_YYYY-MM-DD-title-slug.md` or `_Title.md` (Jekyll ignores any file in `_posts/` starting with `_`).
   - **Living Examples Collection (`_posts/_Examples.md`)**:
     - `_posts/_Examples.md` serves as the living kitchen-sink reference file containing working syntax examples for prompts, footnotes, embeds, code blocks, images, and tables.
     - When introducing new components or styling patterns, add corresponding examples to `_posts/_Examples.md`.

2. **Frontmatter Standard**:
   Always populate standard fields with the `+0400` timezone (`Asia/Tbilisi`):
   ```yaml
   ---
   title: "Your Post Title"
   date: YYYY-MM-DD HH:MM:SS +0400
   categories: [PrimaryCategory, SubCategory]
   tags: [tag1, tag2]
   pin: false
   math: false
   mermaid: false
   thumbnail: /assets/img/thumbs/sample-thumb.jpg
   ---
   ```

3. **Chirpy Markdown Formatting Rules**:
   - Use prompt classes for alerts:
     - `{: .prompt-tip }`
     - `{: .prompt-info }`
     - `{: .prompt-warning }`
     - `{: .prompt-danger }`
   - Style inline paths with `` `path/to/file`{: .filepath} ``.
   - For images with styling, append `{: .rounded-10 .shadow width="50%"}`.
   - For YouTube videos: `{% include embed/youtube.html id='VIDEO_ID' %}`.
   - For Image Gallery / Slideshow (flippable single frame without libraries):
     ```liquid
     {% include gallery.html images="
       /assets/img/thumbs/image1.jpg | Caption 1,
       https://i.imgur.com/example.png | Caption 2
     " %}
     ```

---

## 2. Page Proofreading, Spell Checking & Enhancements

When improving an existing page or draft:

1. **Spelling & Grammar**:
   - Proofread English text for clarity, conciseness, and correct technical terms.
   - Keep heading levels logical (`##` for sections, `###` for sub-sections).
2. **Readability & Engagement**:
   - Break large walls of text into bullet lists or tables where appropriate.
   - Use callout prompts (`{: .prompt-tip }` or `{: .prompt-info }`) to highlight key takeaways.
3. **SEO & Metadata**:
   - Ensure `categories` has at most 2 hierarchical levels.
   - Add concise, lowercase `tags`.
   - Ensure `thumbnail` references a valid image in `/assets/img/thumbs/`.

---

## 3. Post Hiding & Draft Management

If the user asks to hide a post from the live site:

- **Option A (Underscore Prefix)**: Rename the file inside `_posts/` so it starts with an underscore `_` (e.g., rename `2025-12-15-First-test.md` to `_2025-12-15-First-test.md`). Jekyll automatically skips files starting with `_`.
- **Option B (Unpublished frontmatter)**: Add `published: false` to the YAML frontmatter.
- To re-publish, remove the leading `_` or set `published: true`.

---

## 4. Asset & Image Management

To keep assets centralized and clean without duplicate files or broken links:

1. **Local Post Images (Single Source of Truth)**: `_posts/assets/`
   - Store all pasted post images in `_posts/assets/` (e.g., `_posts/assets/image.png`).
   - Markdown reference: `![alt text](assets/image.png)`.
   - **Automated Copy Hook**: The hook `_plugins/copy-post-assets.rb` automatically copies files from `_posts/assets/` into `_site/assets/` during build time. **Never duplicate images in root `assets/`.**
2. **Post Thumbnails**:
   - Store in `assets/img/thumbs/` (e.g., `assets/img/thumbs/my-post-thumb.jpg` or `.png`).
3. **Site-wide Shared Graphics**:
   - Place in `assets/img/` or subdirectories (e.g., `assets/img/favicons/`).

---

## 5. Technical Customization (Styling & Layout)

When asked to modify the site design, add tabs, or adjust layouts:

1. **CSS / SCSS Customization**:
   - Place custom rules in `assets/css/jekyll-theme-chirpy.scss`.
   - Respect Chirpy dark and light color tokens (e.g., `--main-bg`, `--text-color`).
2. **Adding New Navigation Tabs**:
   - Create a markdown file in `_tabs/` (e.g., `_tabs/portfolio.md`).
   - Include `layout: page`, `icon: fas fa-...`, `order: <number>`, and `title: ...`.
3. **Overriding Chirpy Layouts/Includes**:
   - Copy the target file from the Chirpy theme into `_layouts/` or `_includes/` locally and edit it. Never modify vendor gem files.

---

## 6. Verification Checklist

Always perform these sanity checks before concluding:
1. `date` in frontmatter contains `+0400` timezone offset.
2. Code blocks specify language syntax (`bash`, `ruby`, `javascript`, etc.).
3. If local Ruby is available, verify the build using `bundle exec jekyll build` or test locally with `bundle exec jekyll s`.
