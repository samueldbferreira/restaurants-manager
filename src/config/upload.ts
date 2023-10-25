import multer from "multer";

export default {
	upload(folderName: string) {
		return {
			storage: multer.diskStorage({
				destination: function (req, file, cb) {
					cb(null, folderName);
				},
				filename: function (req, file, cb) {
					const extension = file.originalname.split(".")[1];
					const newName = require("crypto").randomBytes(64).toString("hex");
					cb(null, `${newName}.${extension}`);
				},
			}),
		};
	},
};
