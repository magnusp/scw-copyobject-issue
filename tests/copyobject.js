require('dotenv').config();
const sinon = require("sinon");
const assert = require("assert");
const Minio = require("minio");

const s3Config = {
    endPoint: process.env.MINIO_HOST,
    port: parseInt((process.env.MINIO_PORT ?? '443'), 10),
	region: (process.env.MINIO_REGION ?? 'us-east-1'),
	useSSL: (process.env.MINIO_USE_SSL ?? 'true') === 'true',
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
}
console.log(s3Config)
const client = new Minio.Client(s3Config);

describe("Minio copyObject with existing buckets", function () {
    this.timeout(200000);

    it("should copy an object to another bucket", async function () {
        await client.fPutObject(process.env.SOURCE_BUCKET, 'test1.png', 'tests/test1.png');

		const copyResult = await client.copyObject(
			process.env.DESTINATION_BUCKET,
			'test1.png',
			`/${process.env.SOURCE_BUCKET}/test1.png`,
			new Minio.CopyConditions()
		);
		console.log(copyResult);
    });
});
