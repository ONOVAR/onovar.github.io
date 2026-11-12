---
title: Example
date: 2025-12-15 00:00:00 + 0800
categories: [science, ai]
tags: [test, ai]
pin: false
math: false
mermaid: false
thumbnail: /assets/img/thumbs/first-post-thumb.jpg
# header_image: /assets/img/thumbs/first-post.jpg
# image:
  # path: /assets/img/thumbs/first-post-thumb.jpg
---


## Paragraph

Get started with [`jekyll-theme-chirpy`](https://github.com/cotes2020/jekyll-theme-chirpy)  basics in this comprehensive overview. You will learn how to install, configure, and use your first Chirpy-based website, as well as deploy it to a web server. This approach simplifies upgrades, isolates unnecessary files, and is perfect for users who want to focus on writing with minimal configuration.

If you want to save time of creating files, please consider using the plugin [`Jekyll-Compose`](https://github.com/jekyll/jekyll-compose) to accomplish this.


- `poster='/path/to/poster.png'` — poster image for a video that is shown while video is downloading
- `title='Text'` — title for a video that appears below the video and looks same as for images

## Block Quote
> This line shows the _block quote_.


### Description list

Sun
: the star around which the earth orbits

Moon
: the natural satellite of the earth, visible by reflected light from the sun

## Lists

### Ordered list

1. Firstly
2. Secondly
3. Thirdly

### Unordered list

- Chapter
  - Section
    - Paragraph

### ToDo list

- [ ] Job
  - [x] Step 1
  - [x] Step 2
  - [ ] Step 3

---

## Images

![Desktop View](/assets/img/thumbs/first-post.jpg){: .rounded-10 .shadow width="972" height="589" }
![Desktop View](/assets/img/thumbs/first-post.jpg){: .rounded-10 .shadow width="50%"}
<!-- ![light mode only](/assets/img/thumbs/first-post.jpg){: .light .w-75 .shadow .rounded-10 w='1212' h='668' } -->
<!-- ![dark mode only](/assets/img/thumbs/first-post.jpg){: .dark .w-75 .shadow .rounded-10 w='1212' h='668' } -->




```json
{
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

## Filepath

Here is the `/path/to/the/file.extend`{: .filepath}.



***

## Demo video
<!-- cspell:disable-next-line -->
{% include embed/youtube.html id='WAvchbP2kXM' %}


## Links
<http://127.0.0.1:4000><br>
<https://github.com/><br>
[GitHub](https://github.com/)<br>

<http://127.0.0.1:4000>
<https://github.com/>
[GitHub](https://github.com/)

## Footnote
Click the hook will locate the footnote[^footnote], and here is another footnote[^fn-nth-2].

## End

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> An example showing the `tip` type prompt.
{: .prompt-tip }

> An example showing the `info` type prompt.
{: .prompt-info }

> An example showing the `warning` type prompt.
{: .prompt-warning }

> An example showing the `danger` type prompt.
{: .prompt-danger }


## Download & Replace

Download the generated package, unzip and delete the following file(s) from the extracted files:

- `site.webmanifest`{: .filepath}

And then copy the remaining image files (`.PNG`{: .filepath}, `.ICO`{: .filepath} and `.SVG`{: .filepath}) to cover the original files in the directory `assets/img/favicons/`{: .filepath} of your Jekyll site. If your Jekyll site doesn't have this directory yet, just create one.

The following table will help you understand the changes to the favicon files:

| File(s) | From Online Tool | From Chirpy |
| ------- | :--------------: | :---------: |
| `*.PNG` |        ✓         |      ✗      |
| `*.ICO` |        ✓         |      ✗      |
| `*.SVG` |        ✓         |      ✗      |


## Reverse Footnote

[^footnote]: The footnote source
[^fn-nth-2]: The 2nd footnote source