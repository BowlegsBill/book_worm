class Book < ApplicationRecord
  # ----------------------------------------------------------------
  # Includes & Extensions
  # ----------------------------------------------------------------

  # ----------------------------------------------------------------
  # Constants
  # ----------------------------------------------------------------

  # ----------------------------------------------------------------
  # Attributes
  # ----------------------------------------------------------------
  enum genre: { science_fiction: 1, satire: 2, drama: 3, action_and_adventure: 4,
    romance: 5, mystery: 6, horror: 7, self_help: 8, health: 9, guide: 10,
    travel: 11, childrens: 12, religion_spirituality_and_new_age: 13, science: 14,
    history: 15, math: 16, anthology: 17, poetry: 18, comics: 19, art: 20,
    cookbook: 21, diary: 22, journal: 23, biography: 24, autobiography: 25, fantasy: 26 }

  # ----------------------------------------------------------------
  # Associations
  # ----------------------------------------------------------------
  has_many :books_readers
  has_many :readers, through: :books_readers

  # ----------------------------------------------------------------
  # Validations
  # ----------------------------------------------------------------
  validates(
    :title,
    :author,
    :genre,
    presence: true
  )

  validates(
    :title,
    uniqueness: true
  )

  # ----------------------------------------------------------------
  # Callbacks
  # ----------------------------------------------------------------

  # ----------------------------------------------------------------
  # Nested Attributes
  # ----------------------------------------------------------------

  # ----------------------------------------------------------------
  # Scopes
  # ----------------------------------------------------------------
  scope :unread, -> { joins(:books_readers).where(books_readers: { read: false }) }
  scope :read, -> { joins(:books_readers).where(books_readers: { read: true }) }

  # ----------------------------------------------------------------
  # Other
  # ----------------------------------------------------------------

  # ----------------------------------------------------------------
  # Class Methods
  # ----------------------------------------------------------------

  # ----------------------------------------------------------------
  # Instance Methods
  # ----------------------------------------------------------------
  def on_reading_list?(reader_id)
    books_readers.find_by_reader_id(reader_id).present?
  end

  def been_read?(reader_id)
    return false unless on_reading_list?(reader_id)
    books_readers.find_by_reader_id(reader_id).read
  end

  protected

  private
end
