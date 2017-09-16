class BooksController < ApplicationController
  before_action :authenticate_reader!
  before_action :ensure_json_request

  def index
    books = Book.all.order(created_at: :desc).map do |book|
      book.as_json.merge(
        reading_list: book.on_reading_list?(current_reader.id),
        read: book.been_read?(current_reader.id)
      )
    end
    render json: books
  end

  def reading_list
    books = current_reader.books.unread.order(created_at: :desc).map do |book|
      book.as_json.merge(
        reading_list: book.on_reading_list?(current_reader.id),
        read: book.been_read?(current_reader.id)
      )
    end
    render json: books
  end

  def read_list
    books = current_reader.books.read.order(created_at: :desc).map do |book|
      book.as_json.merge(
        reading_list: book.on_reading_list?(current_reader.id),
        read: book.been_read?(current_reader.id)
      )
    end
    render json: books
  end

  def create
    book = Book.new(book_params)
    book.save
    if book.errors.any?
      book = book.as_json.merge(errors: book.errors.full_messages.as_json)
    end
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
