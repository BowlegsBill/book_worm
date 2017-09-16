class BooksController < ApplicationController
  before_action :authenticate_reader!
  before_action :ensure_json_request

  def create
    book = current_reader.books.create(book_params)
    render json: book
  end

  private

  def book_params
    params.require(:book).permit(
      :title,
      :author
    )
  end

  def ensure_json_request
    return if request.format == :json
    render nothing: true, status: 406
  end
end
