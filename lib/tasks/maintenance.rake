namespace :maintenance do
  task import_terms: :environment do
    # Import terms from /storage/data/dictionary.json
    # This is a one-time task

    require 'json'
    file = File.read('storage/data/dictionary.json')
    data = JSON.parse(file)

    data['dictionary'].each do |term|
      definition = ReverseMarkdown.convert(term['definition'])

      Term.create(
        name: term['term'],
        body: definition,
        slug: term['slug']
      )
    end
  end

  task import_articles: :environment do
    # Import articles from /storage/data/articles.json
    # This is a one-time task

    require 'json'
    file = File.read('storage/data/articles.json')
    data = JSON.parse(file)

    data['data'].each do |article|
      body = ReverseMarkdown.convert(article['body'])

      Article.create(
        title: article['title'],
        body: body,
        slug: article['slug'],
        author_name: "#{article['author']['first_name']} #{article['author']['last_name']}",
        author_twitter: article['author']['twitter_handle'],
        publish_at: article['published'],
        created_at: article['created'],
        updated_at: article['updated']
      )
    end
  end
end

