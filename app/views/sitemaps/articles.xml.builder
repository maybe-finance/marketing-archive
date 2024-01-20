xml.instruct!
xml.urlset xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc articles_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  @articles.each do |article|
    xml.url do
      xml.loc article_url(article.slug)
      xml.lastmod article.published.to_datetime.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
    end
  end
end