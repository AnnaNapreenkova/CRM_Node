const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Обычное хранилище
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = "uploads";
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


// Хранилище для аватаров
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.user;
    const filePath = `uploads/${id}`;
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, "avatar" + path.extname(file.originalname));
  },
});
// Хранилище для документов
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.user;
    const filePath = `uploads/${id}/documents`;
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});

// Хранилище для тикетов
const ticketStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.user;
    const filePath = `uploads/${id}/tickets`;
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});

// Хранилище 


//ограничивает вес файлов. Если вес больше, то файл не сохранится
const limits = {
  fileSize: 1024 * 1024 * 5, //5Mb
};

//фильтр файлов по многим условиям
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = {
  upload: multer({ storage }),
  avatarUpload: multer({ storage: avatarStorage }),  
  documentUpload: multer({ storage: documentStorage }),
  ticketUpload: multer({storage: ticketStorage}),
  
  fullFileLink: (req, filePath) =>
    req.protocol + "://" + req.get("host") + "/" + filePath,
};
