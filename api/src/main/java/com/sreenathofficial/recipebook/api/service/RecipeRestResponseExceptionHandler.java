package com.sreenathofficial.recipebook.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class RecipeRestResponseExceptionHandler extends
        ResponseEntityExceptionHandler {

    Logger logger = LoggerFactory.getLogger(RecipeRestResponseExceptionHandler.class);

    @ExceptionHandler({ RepositoryConstraintViolationException.class })
    public ResponseEntity<Object> handleAccessDeniedException(
            Exception ex, WebRequest request) {
        RepositoryConstraintViolationException nevEx =
                (RepositoryConstraintViolationException) ex;

        final Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", "Data missing or invalid");
        body.put("errors", nevEx.getErrors().getAllErrors());

        return new ResponseEntity<Object>(body, new HttpHeaders(),
                HttpStatus.BAD_REQUEST);
    }

}
