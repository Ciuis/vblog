package ru.ciuis.vblog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ru.ciuis.vblog.exception.UnableToResolvePhotoException;
import ru.ciuis.vblog.exception.UnableToSavePhotoException;
import ru.ciuis.vblog.model.Image;
import ru.ciuis.vblog.repository.ImageRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Transactional
public class ImageService {
    private final ImageRepository imageRepository;

    private static final File DIRECTORY = new File("D:\\Temp\\simpleBlog\\backend\\img");
    private static final String URL = "http://localhost:8000/images/";

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image saveGifFromPost(Image image) {
        return imageRepository.save(image);
    }

    public Image uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
        try {
            //Type of content
            String extension = "." + file.getContentType().split("/")[1];

            File img = File.createTempFile(prefix, extension, DIRECTORY);
            file.transferTo(img);
            String imageURL = URL + img.getName();

            Image i = new Image(img.getName(), file.getContentType(), img.getPath(), imageURL);

            return imageRepository.save(i);

        } catch (IOException e) {
            throw new UnableToSavePhotoException();
        }
    }

    public byte[] downloadImage(String filename) throws UnableToResolvePhotoException {
        try {
            Image image = imageRepository.findByImageName(filename).get();

            String filePath = image.getImagePath();

            return Files.readAllBytes(new File(filePath).toPath());

        } catch (IOException e) {
            throw new UnableToResolvePhotoException();
        }
    }

    public String getImageType(String filename) {
        Image image = imageRepository.findByImageName(filename).get();

        return image.getImageType();
    }
}
