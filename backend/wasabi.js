const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const { MongoClient } = require("mongodb");

const router = express.Router();
const upload = multer();

// Configure AWS SDK with your Wasabi credentials
AWS.config.update({
  accessKeyId: "YU7NTN5HPMLC82ERJ1Z5",
  secretAccessKey: "zvMUyj4CaaRgAKt75yGqS0tEwvJHF5E9tzsFCBsp",
  endpoint: "https://s3.us-central-1.wasabisys.com"  
});

router.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;

  // Upload the file to Wasabi
  const s3 = new AWS.S3();
  const params = {
    Bucket: "legal-distributor",
    Key: file.originalname,
    Body: file.buffer
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file to Wasabi:", err);
      res.status(500).json({ error: "Error uploading file" });
    } else {
      const imageUrl = data.Location;
      console.log("Success", imageUrl);
      res.status(200).json({
        imageUrl,
        message: "Image uploaded"
      });
    }
  });
});

router.post("/uploadMany", upload.array("images"), (req, res) => {
  const files = req.files;
  const s3 = new AWS.S3();

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: "legal-distributor",
        Key: file.originalname,
        Body: file.buffer
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error("Error uploading file to Wasabi:", err);
          reject(err);
        } else {
          const imageUrl = data.Location;
          console.log("Success", imageUrl);
          resolve(imageUrl);
        }
      });
    });
  });

  Promise.all(uploadPromises)
    .then((imageUrls) => {
      console.log("Success", imageUrls);
      res.status(200).json({
        imageUrls,
        message: "Images uploaded"
      });
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Error uploading files" });
    });
});

router.put("/update/:imageId", upload.single("image"), (req, res) => {
  const imageId = req.params.imageId;
  const file = req.file;

  // Upload the new file to Wasabi
  const s3 = new AWS.S3();
  const params = {
    Bucket: "legal-distributor",
    Key: imageId,
    Body: file.buffer
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file to Wasabi:", err);
      res.status(500).json({ error: "Error uploading file" });
    } else {
      const imageUrl = data.Location;
      console.log("Success", imageUrl);
      res.status(200).json({
        imageUrl,
        message: "Image updated"
      });
    }
  });
});


router.delete("/delete/:imageId", (req, res) => {
    const imageId = req.params.imageId;
  
    // Delete the image from Wasabi
    const s3 = new AWS.S3();
    const params = {
      Bucket: "legal-distributor",
      Key: imageId
    };
  
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error("Error deleting image from Wasabi:", err);
        res.status(500).json({ error: "Error deleting image" });
      } else {
        console.log("Image deleted from Wasabi");
        res.status(200).json({ message: "Image deleted" });
      }
    });
  });

module.exports = router;
