package com.munira.miniproject.service.implementation;

import com.munira.miniproject.entity.BookEntity;
import com.munira.miniproject.exception.BookNotFoundException;
import com.munira.miniproject.exception.CanNotDeleteException;
import com.munira.miniproject.model.BookDto;
import com.munira.miniproject.repository.BookRepository;
import com.munira.miniproject.service.BookService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookServiceImplementation implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public BookDto createBook(BookDto book) {
        ModelMapper modelMapper = new ModelMapper();
        BookEntity bookEntity = new BookEntity();

        bookEntity.setBookName(book.getBookName());
        bookEntity.setBookAuthor(book.getBookAuthor());
        bookEntity.setBookImageLink(book.getBookImageLink());
        bookEntity.setBookStatus("AVAILABLE");

        BookEntity storedBookDetails = bookRepository.save(bookEntity);
        return modelMapper.map(storedBookDetails, BookDto.class);
    }

//    @Override
//    public BookDto updateBook(BookDto book){
//
//        if (!bookRepository.existsByBookId(book.getBookId()))
//            throw new BookNotFoundException("Book does not exist!");
//
//        ModelMapper modelMapper = new ModelMapper();
//        BookEntity bookEntity = bookRepository.findByBookId(book.getBookId());
//
//        if (bookEntity.isDeleted())
//            throw new BookNotFoundException("Book does not exist!!");
//
//        bookEntity.setBookName(book.getBookName());
//        bookEntity.setBookAuthor(book.getBookAuthor());
//        BookEntity storedBookDetails = bookRepository.save(bookEntity);
//        return modelMapper.map(storedBookDetails, BookDto.class);
//    }

    @Override
    public BookDto updateBook(Long bookId, BookDto book) {
        if (book == null) {
            throw new IllegalArgumentException("BookDto cannot be null");
        }

        BookEntity bookEntity = bookRepository.findByBookId(bookId);

        if (bookEntity == null) {
            throw new BookNotFoundException("Book does not exist!");
        }

        if (bookEntity.isDeleted()) {
            throw new BookNotFoundException("Book does not exist!!");
        }

        ModelMapper modelMapper = new ModelMapper();

        // Update the book properties
        bookEntity.setBookName(book.getBookName());
        bookEntity.setBookAuthor(book.getBookAuthor());
        bookEntity.setBookImageLink(book.getBookImageLink());

        // Save the updated book entity
        BookEntity storedBookDetails = bookRepository.save(bookEntity);

        return modelMapper.map(storedBookDetails, BookDto.class);
    }

    public void deleteBook(Long bookId) {
        Optional<BookEntity> optionalBook = bookRepository.findByBookIdAndDeletedFalse(bookId);

        if (optionalBook.isPresent()) {
            BookEntity bookEntity = optionalBook.get();
            if (bookEntity.getBookStatus().equals("BORROWED"))
                throw new CanNotDeleteException("This book is borrowed, DO NOT delete it!");
            bookEntity.setDeleted(true);
            bookRepository.save(bookEntity);
        } else {
            throw new BookNotFoundException("Book does not exists!");
        }
    }

    public List<BookDto> getAllBook() {
        List<BookEntity> allBooks = bookRepository.findAllByDeletedFalse();
        return allBooks
                .stream()
                .map(bookEntity -> BookDto.builder()
                        .bookId(bookEntity.getBookId())
                        .bookName(bookEntity.getBookName())
                        .bookAuthor(bookEntity.getBookAuthor())
                        .bookStatus(bookEntity.getBookStatus())
                        .bookImageLink(bookEntity.getBookImageLink())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public BookDto getBookByBookId(Long bookId) {
        ModelMapper modelMapper = new ModelMapper();
        BookEntity bookEntity = bookRepository.findByBookId(bookId);
        return modelMapper.map(bookEntity, BookDto.class);

    }
}
