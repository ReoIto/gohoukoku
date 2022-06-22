class PostsController < ApplicationController
  APP_URL_BASE = ENV['APP_URL_BASE']
  APP_NAME = ENV['APP_NAME']

  def new
    render inertia: 'Post/New'
  end

  def show
    @post = Post.find_by_id params[:id]

    render inertia: 'Post/Show', props: {
      post: @post.as_json(
        only: [:id, :img_path, :created_at]
      ),
      app_name: APP_NAME,
      app_url_base: Rails.env.development? ? "http://localhost:3000" : APP_URL_BASE
    }
  end

  def create
    post = Post.new post_params
    result = GenerateImage.call post

    if result.success?
      redirect_to post_path(post)
    else
      render new_post_path
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :background_kind)
  end
end
