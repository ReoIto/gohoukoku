class GenerateImage
  require 'securerandom'
  include BaseService

  CENTER = 'center'
  TOP = 'North'
  # FONT = ".font/GenEiGothicN-U-KL.otf"
  FONT = ".font/ヒラギノ明朝 ProN.ttc"
  WHITE = "white"
  TITLE = '【ご報告】'

  def initialize post
    @post = post
  end

  def call
    ActiveRecord::Base.transaction do
      # 改行を消去
      # content = post.content.gsub(/\r\n|\r|\n/," ")
      conditions = calc_conditions_of_image(post.content)
      image = MiniMagick::Image.open(conditions[:background_img_path])
      draw_title_and_content_on_image!(image, conditions)
      upload_to_S3! image
      post.save!

      ServiceResult.new success: true, data: post
    end
  rescue
    errors = post.errors.full_messages
    ServiceResult.new success: false, errors: errors
  end

  private
  attr_reader :post

  def calc_conditions_of_image content
    # 15文字ごとに区切る
    sentense = adjust_content(content)
    font = FONT
    text_color = WHITE
    draw_position = "text 0,0 '#{sentense}'"
    background_img_path =
      case post.background_kind
      when 1
        "app/assets/images/black.jpg"
      when 2
        "app/assets/images/red.jpg"
      else
        "app/assets/images/black.jpg"
      end

    {
      font: font,
      text_color: text_color,
      text_size: 45,
      draw_position: draw_position,
      background_img_path: background_img_path
    }
  end

  def adjust_content content
    if content.length == 0
      raise StandardError
    end

    sentense = ''
    num_rows = (content.length / 15).floor + 1
    num_rows.times do |i|
        s_num = i * 15
        f_num = s_num + 14
        sentense += content.slice(Range.new(s_num,f_num))
        sentense += "\n" if num_rows != (i + 1)
    end

    sentense
  end

  def draw_title_and_content_on_image! image, conditions
    draw_title_on_image(image, conditions)
    draw_content_on_image(image, conditions)
  end

  def draw_title_on_image image, conditions
    image.combine_options do |i|
      i.font conditions[:font]
      i.fill conditions[:text_color]
      i.gravity TOP
      i.pointsize 60
      i.draw "text 0, 20 '#{TITLE}'"
    end
  end

  def draw_content_on_image image, conditions
    image.combine_options do |i|
      i.font conditions[:font]
      i.fill conditions[:text_color]
      i.gravity CENTER
      i.pointsize conditions[:text_size]
      i.draw conditions[:draw_position]
    end
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
    png_path = png_path_with_uuid
    image_path = image.path
    # 無駄な開発時のデータも保存されるので一旦コメントアウト
    bucket.files.create(key: png_path, public: true, body: open(image_path))
    post.img_path = s3_img_path png_path
  end

  def png_path_with_uuid
    uuid = SecureRandom.uuid.tr('-', '')
    "images/#{uuid}.png"
  end

  def s3_img_path png_path
    "#{ENV['S3_URI']}/#{ENV['S3_DIRECTORY_NAME']}/#{png_path}"
  end
end