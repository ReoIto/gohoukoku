module PostsHelper
  APP_URL_BASE = ENV['APP_URL_BASE']
  TWITTER_CARD_DEFAULT_IMAGE = ENV['TWITTER_CARD_DEFAULT_IMAGE']

  def get_twitter_card_info post
    twitter_card = {}
    app_url_base =
      if Rails.env.development?
        "http://localhost:3000"
      else
        APP_URL_BASE
      end

    if post.present?
        twitter_card[:url] = "#{app_url_base}/posts/#{post.id}"
        twitter_card[:image] = post.img_path
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