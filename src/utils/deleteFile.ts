import fs from "fs/promises";

export default async function deleteFile(path: string) {
	try {
		await fs.unlink(path);
	} catch (e) {
		return;
	}
}
