import { S3 } from 'aws-sdk';
import { convert } from 'convert-svg-to-png';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    try {
        if (event.Records[0].eventName.startsWith('ObjectCreated:')) {
            const params = {
                Bucket: bucket,
                Key: key,
            };
            const data = await new S3().getObject(params).promise();

            if (path.extname(key) === '.svg') {
                const outputFilePath = `/tmp/${path.basename(key, '.svg')}.png`;

                const convertedData = await convert(data.Body.toString(), {width: 1000, height: 1000});;

                const uploadParams = {
                    Bucket: bucket,
                    Key: `converted/${path.basename(outputFilePath)}`,
                    Body: convertedData,
                    ContentType: 'image/png',
                };
                await new S3().putObject(uploadParams).promise();
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(`Failed to process file ${key}: ${err.message}`);
    }
};
