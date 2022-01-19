// eslint-disable-next-line @typescript-eslint/naming-convention
export interface CustomFileResult extends Partial<Express.Multer.File> {
    name: string;
}

/** ************************** */

// eslint-disable-next-line no-undef
_handleFile = (
    req: Request,
    file: Express.Multer.File,
    cb: (error?: any, info?: CustomFileResult) => void
): void => {
    if (!this.bucket) {
        // We cant continue if no bucket is provided.
        cb(new Error("bucket is a required field."));
        return;
    }

    const fileName = this.nameFn(req, file); // Unique name for file
    const storageFile = this.bucket.file(fileName); // Creating a new file in bucket with name = fileName
    const fileWriteStream = storageFile.createWriteStream(this.options); // Obtaining WritableStream from storageFile

    const fileReadStream = file.stream; // ReadableStream for uploaded file

    fileReadStream
        .pipe(fileWriteStream) // Piping ReadableStream of uploaded file to WritableStream of file in bucket
        .on("error", (err) => {
            // Error occured during piping
            fileWriteStream.end(); // Closing the WritableStream
            storageFile.delete({ ignoreNotFound: true }); // Deleting file from bucket
            cb(err);
        })
        .on("finish", () => {
            // All the data was written successfully
            cb(null, { name: fileName }); // Adding custom fields to file
        });
};
