import React, { useState, useEffect } from 'react';
import { getDataDownload } from '../apis/ExodusAPI';
import DownloadData from './list_items/DownloadData';


type DownloadDataProps = {
    dataKey: string;
}

export const GetData: React.FunctionComponent<DownloadDataProps> = (props) => {
    const { dataKey } = props;
    const [allData, setData] = useState(Object);

    useEffect(() => {
        if (!allData.data_url){
            getDataDownload(dataKey, (response: any) => {
                setData(response);
            }, () => { });
        }
    });

    const restartMission = () => {
        window.location.href = '/';
    }

    return (
        <div className='row onesat-data-download px-5'>
            <h3>Your mission was successful!</h3>
            <DownloadData
                data_url={allData.data_url}
                logs_url={allData.logs_url}
            />
            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-warning" onClick={restartMission}>Restart</button>
                </div>
            </div>
        </div>
    );
}