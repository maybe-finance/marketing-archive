module Tools
  module CryptoIndexFund
    class CacheCleaner
      CACHE_KEY = 'crypto_index_fund__time_series__cache'.freeze

      def self.call
        Rails.cache.delete_matched("#{CACHE_KEY}/*")
      end
    end
  end
end
