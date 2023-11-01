package com.munira.miniproject.service;

import com.munira.miniproject.model.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto) throws Exception;

    BookDto updateBook(Long bookId, BookDto book) throws Exception;

    void deleteBook(Long bookId) throws Exception;

    List<BookDto> getAllBook() throws Exception;
}
