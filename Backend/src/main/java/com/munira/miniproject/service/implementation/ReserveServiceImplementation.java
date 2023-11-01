package com.munira.miniproject.service.implementation;

import com.munira.miniproject.entity.BookEntity;
import com.munira.miniproject.entity.BorrowEntity;
import com.munira.miniproject.entity.ReserveEntity;
import com.munira.miniproject.entity.UserEntity;
import com.munira.miniproject.exception.*;
import com.munira.miniproject.model.ReserveDto;
import com.munira.miniproject.repository.BookRepository;
import com.munira.miniproject.repository.ReserveRepository;
import com.munira.miniproject.repository.UserRepository;
import com.munira.miniproject.service.ReserveService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class ReserveServiceImplementation implements ReserveService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReserveRepository reserveRepository;

    public ReserveDto reserveBook(Long bookId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Long userId = user.get().getUserId();

        UserEntity userEntity = userRepository.findByUserId(userId);
        BookEntity bookEntity = bookRepository.findByBookId(bookId);

        if(bookEntity == null || bookEntity.isDeleted())
            throw new BookNotFoundException("Book with ID " + bookId + " is not available");

        if (Objects.equals(bookEntity.getBookStatus(), "AVAILABLE"))
            throw new Exception("This book is available, you can borrow this!");

        ReserveEntity bookReservedEntity = reserveRepository.findByUserEntityAndBookEntityAndReserveStatus(userEntity, bookEntity, "PENDING");
        if(bookReservedEntity != null)
            throw new BookAlreadyReservedException("This book is already reserved by you!");


        ModelMapper modelMapper = new ModelMapper();
        ReserveEntity reserveEntity = new ReserveEntity();
        reserveEntity.setBookEntity(bookEntity);
        reserveEntity.setUserEntity(userEntity);
        reserveEntity.setReserveDate(LocalDate.now());
        reserveEntity.setReserveStatus("PENDING");


        ReserveEntity storeReserve = reserveRepository.save(reserveEntity);
        return modelMapper.map(storeReserve, ReserveDto.class);

    }

    public ReserveDto cancelReserveBook(Long bookId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Long userId = user.get().getUserId();

        UserEntity userEntity = userRepository.findByUserId(userId);
        BookEntity bookEntity = bookRepository.findByBookId(bookId);

        if(bookEntity == null || bookEntity.isDeleted())
            throw new BookNotFoundException("Book with ID " + bookId + " is not available");

        ModelMapper modelMapper = new ModelMapper();
        ReserveEntity bookCancelReserveEntity = reserveRepository.findByUserEntityAndBookEntityAndReserveStatus(userEntity,bookEntity,"PENDING");

        if (bookCancelReserveEntity.getUserEntity() != userEntity)
            throw new Exception("You are not authorized to cancel reservation!");


        bookCancelReserveEntity.setReserveStatus("CANCEL");

        ReserveEntity cancelReserve = reserveRepository.save(bookCancelReserveEntity);
        return modelMapper.map(cancelReserve, ReserveDto.class);

    }

    public List<BookEntity> getAllReservedBookByUser(Long userId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        String currentUserRole = user.get().getRole();
        Long currentUserId = user.get().getUserId();

        if (!currentUserId.equals(userId) && currentUserRole.equals("USER")) {
            throw new UnauthorizedException("You are not authorized to access this!");
        }

        UserEntity userEntity = userRepository.findByUserId(userId);
        if(userEntity == null)
            throw new UserNotFoundException("User id is invalid.");

        List<ReserveEntity> bookReserving = reserveRepository.findByUserEntityAndReserveStatus(userEntity, "PENDING");
        if(bookReserving.isEmpty())
            throw new BookWasNotBorrowedException("No book was borrowed by this user!");

        return bookReserving.stream()
                .map(ReserveEntity::getBookEntity)
                .collect(Collectors.toList());
    }
}
