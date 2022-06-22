class GenerateImage
  require 'securerandom'
  include BaseService

  CENTER = 'center'
  FONT = ".fonts/GenEiGothicN-U-KL.otf"
  WHITE = "white"

  def initialize post
    @post = post
  end

  def call
    ActiveRecord::Base.transaction do
      # 改行を消去
      content = post.content.gsub(/\r\n|\r|\n/," ")
      conditions = calc_conditions_of_image(content)
      image = MiniMagick::Image.open(conditions[:background_img_path])
      image.combine_options do |i|
        i.font conditions[:font]
        i.fill conditions[:text_color]
        i.gravity CENTER
        i.pointsize conditions[:text_size]
        i.draw conditions[:draw_position]
      end

      upload_to_S3! image
      post.save!
      ServiceResult.new success: true, data: post
    end
  rescue
    errors = post.errors.messages
    ServiceResult.new success: false, errors: errors
  end

  private
  attr_reader :post

  def calc_conditions_of_image content
    sentense = ''

    if content.length <= 28 then
      # 28文字以下の場合は7文字毎に改行
      n = (content.length / 7).floor + 1
      n.times do |i|
        s_num = i * 7
        f_num = s_num + 6
        range =  Range.new(s_num,f_num)
        sentense += content.slice(range)
        sentense += "\n" if n != i+1
      end
      text_size = 90
    elsif content.length <= 50 then
      n = (content.length / 10).floor + 1
      n.times do |i|
        s_num = i * 10
        f_num = s_num + 9
        range =  Range.new(s_num,f_num)
        sentense += content.slice(range)
        sentense += "\n" if n != i+1
      end
      text_size = 60
    else
      n = (content.length / 15).floor + 1
      n.times do |i|
        s_num = i * 15
        f_num = s_num + 14
        sentense += content.slice(range)
        sentense += "\n" if n != i+1
      end
      text_size = 45
    end
    # フォントの指定
    font = FONT
    # 文字色の指定
    text_color = WHITE
    # 文字を入れる場所の調整（0,0を変えると文字の位置が変わります）
    draw_position = "text 0,0 '#{sentense}'"

    # 選択された背景画像の設定
    # TODO: post.background_kindはnot nullだから今の仕様だと赤背景にしたらバグる
    unless post.background_kind
      post.background_kind = 2
    end

    case post.background_kind
    # 1 == 黒背景
    when 1 then
      background_img_path = "app/assets/images/black.jpg"
    else
      background_img_path = "app/assets/images/red.jpg"
    end

    {
      font: font,
      text_color: text_color,
      text_size: text_size,
      draw_position: draw_position,
      background_img_path: background_img_path
    }
  end

  def upload_to_S3! image
    # 保存先のストレージの指定。Amazon S3を指定する。
    storage = Fog::Storage.new(
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['S3_REGION']
    )
    bucket = storage.directories.get(ENV['S3_DIRECTORY_NAME'])
    uuid = SecureRandom.uuid.tr('-', '')
    png_path = "images/#{uuid}.png"
    image_path = image.path
    # 無駄な開発時のデータも保存されるので一旦コメントアウト
    bucket.files.create(key: png_path, public: true, body: open(image_path))
    post.img_path = "#{ENV['S3_URI']}/#{ENV['S3_DIRECTORY_NAME']}/#{png_path}"
  end
end