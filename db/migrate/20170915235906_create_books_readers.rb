class CreateBooksReaders < ActiveRecord::Migration[5.1]
  def change
    create_table :books_readers do |t|
      t.references :reader, foreign_key: true
      t.references :book, foreign_key: true

      t.timestamps
    end
  end
end
