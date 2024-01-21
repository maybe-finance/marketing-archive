class DictionaryTermsFetcher
  def self.get(slug)
    term = Term.where(slug: slug).first

    {
      term: term.name,
      slug:  term.slug,
      definition: term.body
    }
  end

  def self.list()
    terms = Term.all.order('name ASC')

    terms.map{ |term| {
      term: term.name,
      slug:  term.slug,
    }}
  end

  def self.more_terms(slug)
    terms = Term.where.not(slug: slug).
      order('name ASC').
      limit(3)

    terms.map{ |term| {
      term: term.name,
      slug:  term.slug,
    }}
  end

  def self.page
    # We have around 120 terms
    rand(30) + 1
  end
end
