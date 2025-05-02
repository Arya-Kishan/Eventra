import multer from "multer"

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

export const imageUpload = upload.single("image")
export const audioUpload = upload.single("audio")
export const videoUpload = upload.single("video")
export const pdfUpload = upload.single("pdf")
export const mixUpload = upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }, { name: "audio", maxCount: 1 }])