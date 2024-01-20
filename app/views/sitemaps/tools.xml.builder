xml.instruct!
xml.urlset xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc tools_low_hanging_fruit_checklist_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc tools_fomo_calculator_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc tools_freedom_calculator_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
  xml.url do
    xml.loc tools_bogleheads_growth_calculator_url
    xml.lastmod Time.now.utc.strftime("%Y-%m-%dT%H:%M:%S+00:00")
  end
end