package ru.ciuis.vblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ru.ciuis.vblog.exception.UnableToResolvePhotoException;
import ru.ciuis.vblog.exception.UnableToSavePhotoException;
import ru.ciuis.vblog.service.ImageService;

@RestController
@RequestMapping("/images")
@CrossOrigin("*")
public class ImageController {
    public final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @ExceptionHandler({UnableToSavePhotoException.class, UnableToResolvePhotoException.class})
    public ResponseEntity<String> handlePhotoExceptions() {
        return new ResponseEntity<String>("Unable to process photo", HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String filename) throws UnableToResolvePhotoException {
        byte[] imageBytes = imageService.downloadImage(filename);

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf(imageService.getImageType(filename)))
                .body(imageBytes);
    }
}
