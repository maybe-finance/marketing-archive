xml.instruct!
xml.urlset xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc root_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc privacy_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc terms_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc roadmap_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc ask_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc community_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc investors_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc now_subscribe_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc early_access_users_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
end