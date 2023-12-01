import React, { useEffect } from 'react';
import configData from "../../configs/config.json"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

type DownloadDataProps = {
    data_url: string;
    logs_url: string;
}

const DownloadData: React.FunctionComponent<DownloadDataProps> = (props) => {
    const { data_url, logs_url } = props;

    const CREDENTIAL = {
        accessKeyId: configData.awsAccessKey,
        secretAccessKey: configData.awsSecretKey,
    };
    const client = new S3Client({ region: 'us-east-2', credentials: CREDENTIAL });

    const getFilenameFromUrl = (url: string) => {
        return url.split('/').pop();
    }
    const download = async (url: string) => {
        let key = getFilenameFromUrl(url);
        const command = new GetObjectCommand({
            Bucket: "exodusorbitals",
            Key: 'downlink/'+key,
        });

        try {
            const response = await client.send(command);
            const str = await response.Body.transformToString();
            console.log(str);
            return str;
        } catch (err) {
            console.error(err);
        }
        return '';
    };

    useEffect(() => {
        download(data_url);
    });

    return (
        <div className='row onesat-data'>
            <div className="col-6">
                <a href={data_url}>{data_url}</a>
            </div>
            <div className="col-6">
                <a href={logs_url}>{logs_url}</a>
            </div>

        </div>
    );
}

export default DownloadData;