class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :content, null: false
      t.string :img_path, null: false
      t.integer :background_kind, null: false
      t.datetime :deleted_at
      t.timestamps
    end
  end
end