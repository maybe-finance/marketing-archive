class DictionaryTermsFetcher
  def self.get(slug)
    term = ButterCMS::Content.list('dictionary', 'fields.slug': slug).first.data[1][0]

    {
      term: term.term,
      slug:  term.slug,
      definition: term.definition
    }
  end

  def self.list()
    terms = ButterCMS::Content.list('dictionary', order: 'term').first.data[1]

    terms.map{ |term| {
      term: term.term,
      slug:  term.slug,
    }}
  end

  def self.more_terms(slug)
    terms = ButterCMS::Content.list('dictionary', page: page, page_size: 4).first.data[1].
      select{|term| term.slug != slug}.
      first(3)

    terms.map{ |term| {
      term: term.term,
      slug:  term.slug,
    }}
  end

  def self.page
    # We have around 120 terms
    rand(30) + 1
  end
end
