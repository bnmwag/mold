import { s3Storage } from "@payloadcms/storage-s3";

export const storage_plugin = s3Storage({
	collections: { media: true },
	bucket: process.env.PAYLOAD_PUBLIC_S3_BUCKET,
	config: {
		forcePathStyle: true,
		endpoint: process.env.PAYLOAD_PUBLIC_S3_ENDPOINT,
		credentials: {
			accessKeyId: process.env.PAYLOAD_PUBLIC_S3_ACCESS_KEY,
			secretAccessKey: process.env.PAYLOAD_PUBLIC_S3_SECRET_KEY,
		},
		region: process.env.PAYLOAD_PUBLIC_S3_REGION,
	},
});
