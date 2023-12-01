import React from 'react';
import configData from "../../configs/config.json"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

type DownloadDataProps = {
    data_url: string;
    logs_url: string;
}

const DownloadData: React.FunctionComponent<DownloadDataProps> = (props) => {
    const { data_url } = props;

    const CREDENTIAL = {
        accessKeyId: configData.awsAccessKey,
        secretAccessKey: configData.awsSecretKey,
    };

    const client = new S3Client({ region: 'us-east-2', credentials: CREDENTIAL });

    const getFilenameFromUrl = (url: string) => {
        return url.split('/').pop();
    }

    function downloadFile(blob: any) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = "data.zip";
        document.body.appendChild(link);
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        document.body.removeChild(link);
    }

    const download = async (url: string) => {
        let key = getFilenameFromUrl(url);
        console.log(key);
        const command = new GetObjectCommand({
            Bucket: "exodusorbitals",
            Key: 'downlink/' + key,
        });

        try {
            const response = await client.send(command);
            const missionDataFile = await response.Body?.transformToByteArray();
            let zipBlob = new Blob([missionDataFile], {
                type: 'application/zip',
            });
            setTimeout(function() {},3000);
            downloadFile(zipBlob);
        } catch (err) {
            console.error(err);
        }
        return '';
    };

    const triggerDownload = () => {
        try {
            download(data_url);
        } catch(err) {

        } 
    }

    return (
        <div className='row onesat-data pb-3'>
            <div className="col-12">
                <button className="btn btn-primary" onClick={triggerDownload}>Download Mission Data</button>
            </div>
        </div>
    );
}

export default DownloadData;