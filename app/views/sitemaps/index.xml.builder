xml.instruct!
xml.sitemapindex xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.sitemap do
    xml.loc sitemap_pages_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end

    xml.sitemap do
      xml.loc sitemap_tools_url
      xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
    end

    xml.sitemap do
      xml.loc sitemap_articles_url
      xml.lastmod ButterCMS::Post.all.first.updated.to_datetime.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
    end
end