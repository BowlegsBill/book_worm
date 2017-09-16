class AddReadtoBooksReaders < ActiveRecord::Migration[5.1]
  def change
    add_column :books_readers, :read, :boolean, default: false, after: :book_id
  end
end
