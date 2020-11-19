class ContentsController < ApplicationController
       before_action :set_content, only: [:update, :destroy]
  
  def index
    content = Content.all.order("id ASC")
    render json: content
  end

  def create
      content = Content.new(content_params)
      if content.save
        render json: content, status: :created
      else
        render json: content.errors, status: :unprocessable_entity
      end
  end

  def update
     content = Content.find(params[:id])
     if content.update_attributes(content_params)
        render json: content
     end   
  end

  def destroy
    content = Content.find(params[:id])
    if content.destroy
        render json: content
    end
end

private
def set_content
  @content = Content.find(params[:id])
end

def content_params
  params.require(:content).permit(:text, :x, :y)
end

end
