// const express = require("express");
// const multer = require("multer");
// const AWS = require("aws-sdk");
// const { MongoClient } = require("mongodb");

// const ep = new AWS.Endpoint('s3.wasabisys.com');
// const s3 = new AWS.S3({endpoint: ep});
// var uuid = require('uuid');

// const router = express.Router();
// const upload = multer();

// // Configure AWS SDK with your Wasabi credentials
// AWS.config.update({
//   accessKeyId: "YU7NTN5HPMLC82ERJ1Z5",
//   secretAccessKey: "zvMUyj4CaaRgAKt75yGqS0tEwvJHF5E9tzsFCBsp",
//   endpoint: "https://s3.us-central-1.wasabisys.com"
// });

// router.post("/upload", upload.single("image"), (req, res) => {
//   const file = req.file;

//   // Upload the file to Wasabi
//   const s3 = new AWS.S3();
//   // const params = {
//   //   Bucket: "legal-distributor",
//   //   Key: file.originalname,
//   //   Body: file.buffer
//   // };

//   const params = {
//     Bucket: "legal-distributor",
//     Key: imageId,
//     ContentType: file.mimetype,
//     // ACL: "bucket-owner-full-control",
//     ACL: "public-read",
//     Expires: 3600 // URL expires after 1 hour (adjust as needed)
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error("Error uploading file to Wasabi:", err);
//       res.status(500).json({ error: "Error uploading file" });
//     } else {
//       const imageUrl = data.Location;

//       console.log("SUuuuuuuuucccccccceeeesssssssssss", imageUrl);

//       res.status(200).json({
//         imageUrl,
//         message: "Image uploaded"
//       });
//     }
//   });
// });

// router.post("/uploadMany", upload.array("images"), (req, res) => {
//   const files = req.files;
//   const s3 = new AWS.S3();

//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       const params = {
//         Bucket: "legal-distributor",
//         Key: file.originalname,
//         Body: file.buffer
//       };

//       s3.upload(params, (err, data) => {
//         if (err) {
//           console.error("Error uploading file to Wasabi:", err);
//           reject(err);
//         } else {
//           const imageUrl = data.Location;
//           console.log("SUuuuuuuuucccccccceeeessssssss22222", imageUrl);
//           resolve(imageUrl);
//         }
//       });
//     });
//   });

//   Promise.all(uploadPromises)
//     .then((imageUrls) => {
//       console.log("Success", imageUrls);
//       res.status(200).json({
//         imageUrls,
//         message: "Images uploaded"
//       });
//     })
//     .catch((error) => {
//       console.error("Error uploading files:", error);
//       res.status(500).json({ error: "Error uploading files" });
//     });
// });

// router.put("/update/:imageId", upload.single("image"), (req, res) => {
//   const imageId = req.params.imageId;
//   const file = req.file;

//   // Upload the new file to Wasabi
//   const s3 = new AWS.S3();
//   const params = {
//     Bucket: "legal-distributor",
//     Key: imageId,
//     Body: file.buffer
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error("Error uploading file to Wasabi:", err);
//       res.status(500).json({ error: "Error uploading file" });
//     } else {
//       const imageUrl = data.Location;
//       console.log("Success", imageUrl);
//       res.status(200).json({
//         imageUrl,
//         message: "Image updated"
//       });
//     }
//   });
// });

// router.delete("/delete/:imageId", (req, res) => {
//   const imageId = req.params.imageId;

//   // Generate a pre-signed URL for the image
//   const s3 = new AWS.S3();
//   const params = {
//     Bucket: "legal-distributor",
//     Key: imageId,
//     Expires: 3600 // URL expires after 1 hour (adjust as needed)
//   };

//   s3.getSignedUrl("getObject", params, (err, url) => {
//     if (err) {
//       console.error("Error generating pre-signed URL:", err);
//       res.status(500).json({ error: "Error generating pre-signed URL" });
//     } else {
//       // Delete the image from Wasabi
//       s3.deleteObject({ Bucket: "legal-distributor", Key: imageId }, (deleteErr, deleteData) => {
//         if (deleteErr) {
//           console.error("Error deleting image from Wasabi:", deleteErr);
//           res.status(500).json({ error: "Error deleting image" });
//         } else {
//           console.log("Image deleted from Wasabi");
//           res.status(200).json({ imageUrl: url, message: "Image deleted" });
//         }
//       });
//     }
//   });
// });

// module.exports = router;










// const express = require("express");
// const multer = require("multer");
// const AWS = require("aws-sdk");
// const { MongoClient } = require("mongodb");

// // const router = express.Router();
// // const upload = multer();

// // Configure AWS SDK with your Wasabi credentials
// const s3 = new AWS.S3({
//   accessKeyId: "YU7NTN5HPMLC82ERJ1Z5",
//   secretAccessKey: "zvMUyj4CaaRgAKt75yGqS0tEwvJHF5E9tzsFCBsp",
//   endpoint: "https://s3.wasabisys.com"
// });

// router.post("/upload", upload.single("image"), (req, res) => {
//   const file = req.file;

//   // Generate a unique key for the uploaded image
//   const imageId = `${uuid.v4()}_${file.originalname}`;

//   // Generate a pre-signed URL for uploading the image
//   const params = {
//     Bucket: "legal-distributor",
//     Key: imageId,
//     ContentType: file.mimetype,
//     ACL: "public-read",
//     Expires: 3600 // URL expires after 1 hour (adjust as needed)
//   };

//   s3.getSignedUrl("putObject", params, (err, url) => {
//     if (err) {
//       console.error("Error generating pre-signed URL for upload:", err);
//       res.status(500).json({ error: "Error generating pre-signed URL for upload" });
//     } else {
//       // Return the pre-signed URL to the client
//       res.status(200).json({ imageUrl: url });
//     }
//   });
// });

// router.post("/uploadMany", upload.array("images"), (req, res) => {
//   const files = req.files;

//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       // Generate a unique key for each uploaded image
//       const imageId = `${uuid.v4()}_${file.originalname}`;

//       // Generate a pre-signed URL for uploading each image
//       const params = {
//         Bucket: "legal-distributor",
//         Key: imageId,
//         ContentType: file.mimetype,
//         ACL: "public-read",
//         Expires: 3600 // URL expires after 1 hour (adjust as needed)
//       };

//       s3.getSignedUrl("putObject", params, (err, url) => {
//         if (err) {
//           console.error("Error generating pre-signed URL for upload:", err);
//           reject(err);
//         } else {
//           resolve({ imageUrl: url });
//         }
//       });
//     });
//   });

//   Promise.all(uploadPromises)
//     .then((imageUrls) => {
//       res.status(200).json({ imageUrls });
//     })
//     .catch((error) => {
//       console.error("Error uploading files:", error);
//       res.status(500).json({ error: "Error uploading files" });
//     });
// });

// router.put("/update/:imageId", upload.single("image"), (req, res) => {
//   const imageId = req.params.imageId;
//   const file = req.file;

//   // Generate a pre-signed URL for updating the image
//   const params = {
//     Bucket: "legal-distributor",
//     Key: imageId,
//     ContentType: file.mimetype,
//     ACL: "public-read",
//     Expires: 3600 // URL expires after 1 hour (adjust as needed)
//   };

//   s3.getSignedUrl("putObject", params, (err, url) => {
//     if (err) {
//       console.error("Error generating pre-signed URL for update:", err);
//       res.status(500).json({ error: "Error generating pre-signed URL for update" });
//     } else {
//       // Return the pre-signed URL to the client
//       res.status(200).json({ imageUrl: url });
//     }
//   });
// });

// router.delete("/delete/:imageId", (req, res) => {
//   const imageId = req.params.imageId;

//   // Generate a pre-signed URL for deleting the image
//   const params = {
//     Bucket: "legal-distributor",
//     Key: imageId,
//     Expires: 3600 // URL expires after 1 hour (adjust as needed)
//   };

//   s3.getSignedUrl("deleteObject", params, (err, url) => {
//     if (err) {
//       console.error("Error generating pre-signed URL for delete:", err);
//       res.status(500).json({ error: "Error generating pre-signed URL for delete" });
//     } else {
//       // Return the pre-signed URL to the client
//       res.status(200).json({ deleteUrl: url });
//     }
//   });
// });

// module.exports = router;

const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// const s3 = new AWS.S3({
//   accessKeyId: "YU7NTN5HPMLC82ERJ1Z5",
//   secretAccessKey: "zvMUyj4CaaRgAKt75yGqS0tEwvJHF5E9tzsFCBsp",
//   endpoint: "https://s3.wasabisys.com"
// });

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: "YU7NTN5HPMLC82ERJ1Z5",
  secretAccessKey: "zvMUyj4CaaRgAKt75yGqS0tEwvJHF5E9tzsFCBsp",
  endpoint: "https://s3.wasabisys.com",
  s3ForcePathStyle: true // Required for Wasabi
});

const s3 = new AWS.S3();

// Define the upload endpoint
router.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;

  // Generate a unique key for the image
  const imageKey = `images/${uuid()}_${file.originalname}`;

  // Set the ACL to "public-read" to make the object publicly accessible
  const params = {
    Bucket: "legal-distributor",
    Key: imageKey,
    Body: file.buffer,
    ACL: "public-read"
  };

  // Upload the image to Wasabi
  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading image:", err);
      res.status(500).json({ error: "Error uploading image" });
    } else {
      // Construct the public URL for the uploaded image
      const imageUrl = `https://legal-distributor.s3.wasabisys.com/${imageKey}`;
      console.log("ssssssssssseeeeeeeee",imageUrl)
      // Return the image URL to the client
      // res.status(200).json({ imageUrl });
    }
  });
});

module.exports = router;