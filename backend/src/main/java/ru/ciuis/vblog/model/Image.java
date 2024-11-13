package ru.ciuis.vblog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="images")
@Getter
@Setter
@ToString
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="image_id")
    private Long imageId;

    @Column(name="image_name")
    private String imageName;

    @Column(name="image_type")
    private String imageType;

    @Column(name="image_path")
    @JsonIgnore
    private String imagePath;

    @Column(name="image_url")
    private String imageURL;

    public Image() {

    }

    public Image(String imageName, String imageType, String imagePath, String imageURL) {
        this.imageName = imageName;
        this.imageType = imageType;
        this.imagePath = imagePath;
        this.imageURL  = imageURL;
    }

    public Image(Long imageId, String imageName, String imageType, String imagePath, String imageURL) {
        this.imageId   = imageId;
        this.imageName = imageName;
        this.imageType = imageType;
        this.imagePath = imagePath;
        this.imageURL  = imageURL;
    }
}
