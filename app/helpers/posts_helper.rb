module PostsHelper
  APP_NAME = ENV['APP_NAME']
  APP_URL_BASE = ENV['APP_URL_BASE']
  S3_URI = ENV['S3_URI']
  TWITTER_CARD_DEFAULT_IMAGE = ENV['TWITTER_CARD_DEFAULT_IMAGE']

  def get_twitter_card_info post
    twitter_card = {}

    if post.present? && post.id
        twitter_card[:url] = "#{APP_URL_BASE}/posts/#{post.id}"
        twitter_card[:image] = "#{S3_URI}/#{APP_NAME}/images/#{post.id}.png"
    else
      twitter_card[:url] = APP_URL_BASE
      twitter_card[:image] = TWITTER_CARD_DEFAULT_IMAGE
    end

    twitter_card[:title] = "タイトル"
    twitter_card[:card] = 'summary_large_image'
    twitter_card[:description] = 'ホゲホゲ'
    twitter_card
  end
end