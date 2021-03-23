const booksController = (Book) => {
  const postBook = async (req, res) => {
    try {
      const book = new Book(req.body)

      await book.save()
      return res.status(201).json(book)
    } catch (err) {
      throw err
    }
  }

  const getBooks = async (req, res) => {
    try {
      const { query } = req
      const response = await Book.find(query)

      return res.json(response)
    } catch (err) {
      throw err
    }
  }

  const getBooksById = async (req, res) => {
    try {
      const { params } = req
      const response = await Book.findById(params.bookId)

      return res.json(response)
    } catch (err) {
      throw err
    }
  }

  const updateBook = async (req, res) => {
    try {
      const { body } = req
      const response = await Book.updateOne({
        _id: req.params.bookId
      }, {
        $set: {
          title: body.title,
          genre: body.genre,
          read: body.read
        }
      },
      {
        new: true
      }
      )

      return res.json(response)
    } catch (err) {
      throw err
    }
  }

  const deleteBook = async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.bookId)
      return res.status(202).json({message: 'The book has been deleted successfully'})
    } catch (err) {
      throw err
    }
  }

  return {postBook, getBooks, getBooksById, updateBook, deleteBook}
}

module.exports = booksController

