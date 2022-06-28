module PostsHelper
  APP_URL_BASE = ENV['APP_URL_BASE']
  TWITTER_CARD_DEFAULT_IMAGE = ENV['TWITTER_CARD_DEFAULT_IMAGE']

  def get_twitter_card_info post
    binding.pry
    twitter_card = {}
    app_url_base =
      if Rails.env.development?
        "http://localhost:3000"
      else
        APP_URL_BASE
      end

    if post.present?
      twitter_card[:url] = "#{app_url_base}/posts/new"
      twitter_card[:image] = post.img_path
    else
      twitter_card[:url] = "#{app_url_base}/posts/new"
      twitter_card[:image] = TWITTER_CARD_DEFAULT_IMAGE
    end

    twitter_card[:title] = "ご報告ついーと"
    twitter_card[:card] = 'gohoukoku-tweet'
    twitter_card[:description] = 'これは重大なご報告をひょろわ〜にするためのアプリです'
    twitter_card
  end
end