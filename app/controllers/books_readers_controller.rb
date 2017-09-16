class BooksReadersController < ApplicationController
  before_action :authenticate_reader!
  def create
    BooksReader.create(
      book: Book.find(params[:book_id]),
      reader: current_reader,
      read: false
    )
    render json: Book.find(params[:book_id])
  end

  def update
    record = BooksReader.find_by_book_id_and_reader_id(
      params[:book_id].to_i, current_reader.id
    )
    record.update(read: true)
  end
end
