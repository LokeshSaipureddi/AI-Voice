import { env } from '~/env';
import { GetObjectCommand, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { error } from 'console';

const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESSKEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
})

export async function getPresignedUrl({
    key,
    expiresIn = 3600,
    bucket = env.S3_BUCKET,
}:{
    key : string;
    expiresIn ?: number;
    bucket ?: string; 
}): Promise<string> {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    });

    return getSignedUrl(s3Client, command, {expiresIn});
}

export async function getUploadUrl(fileType : string,): Promise<{uploadUrl: string, s3Key: string}>{
    const allowedTypes = ["audio/mp3", "audio/wav"]

    if (!allowedTypes.includes(fileType)){
        throw new Error("Only Mp3 and Wav Files are Supported")
    }

    const extension = fileType == "audio/mp3" ? "mp3" : "wav";
    const s3Key = `seed-vc-uploads/${crypto.randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: s3Key,
        ContentType: fileType
    });
    const uploadUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600});

    return {uploadUrl, s3Key}
}
