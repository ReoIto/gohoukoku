class Post < ApplicationRecord
  validates :content, presence: true
  validates :img_path, presence: true
end
