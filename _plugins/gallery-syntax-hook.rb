# frozen_string_literal: true

# Convert markdown gallery syntax ![alt](url1|url2|url3) into responsive gallery slider
Jekyll::Hooks.register [:posts, :pages], :pre_render do |doc|
  doc.content = doc.content.gsub(/!\[(.*?)\]\(([^)]*?\|[^)]*?)\)/) do
    alt = Regexp.last_match(1).to_s.strip
    raw_urls = Regexp.last_match(2).to_s.split('|').map(&:strip).reject(&:empty?)

    if raw_urls.size > 1
      slides_html = raw_urls.map.with_index do |url, idx|
        active = idx == 0 ? ' active' : ''
        caption_html = alt.empty? ? '' : "<div class=\"gallery-caption\">#{alt} (#{idx + 1}/#{raw_urls.size})</div>"
        <<~SLIDE
          <div class="gallery-slide#{active}">
            <img src="#{url}" alt="#{alt} - #{idx + 1}" loading="lazy">
            #{caption_html}
          </div>
        SLIDE
      end.join("\n")

      <<~HTML
        <div class="gallery-slider">
          <div class="gallery-track">
            #{slides_html}
          </div>
          <button type="button" class="gallery-prev" aria-label="Previous Slide">&#10094;</button>
          <button type="button" class="gallery-next" aria-label="Next Slide">&#10095;</button>
          <div class="gallery-counter"><span class="curr-slide">1</span> / <span class="total-slides">#{raw_urls.size}</span></div>
          <div class="gallery-dots"></div>
        </div>
        <script defer src="/assets/js/gallery.js"></script>
      HTML
    else
      Regexp.last_match(0)
    end
  end
end
