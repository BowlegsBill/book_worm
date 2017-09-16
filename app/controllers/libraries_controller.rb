class LibrariesController < ApplicationController
  before_action :authenticate_reader!
  def show
    @books = current_reader.books.order(created_at: :desc)
  end
end
