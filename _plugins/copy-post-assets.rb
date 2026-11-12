require 'fileutils'

# Automatically copy static assets from _posts/assets/ to _site/assets/
Jekyll::Hooks.register :site, :post_write do |site|
  src = File.join(site.source, '_posts', 'assets')
  dest = File.join(site.dest, 'assets')
  if Dir.exist?(src)
    FileUtils.mkdir_p(dest)
    FileUtils.cp_r(File.join(src, '.'), dest)
  end
end
