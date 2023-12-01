import React from 'react';
import { createMission } from "../apis/ExodusAPI";
import configData from "../configs/config.json"

type CreateMissionProps = {
    norad_id: number;
    instrument_id: number;
    lng: number;
    lat: number;
    net: string;
    nlt: string;
}
export const CreateMission: React.FunctionComponent<CreateMissionProps> = (props) => {
    const { norad_id, instrument_id, lng, lat, net, nlt } = props;

    const createSatMission = () => {
        createMission(norad_id, instrument_id, lng, lat, nlt, net, (response: any) => {
            if (response.status === "OK" && response.data_key[0]) {
                let url = window.location.search + "&data_key=" + response.data_key[0];
                window.location.href = url;
            }
        }, () => { });
    }

    const restartMission = () => {
        window.location.href = '/';
    }

    return (
        <div className="get-satellite-create px-5 pb-5">
            <h4>Satellite create mission (confirm the parameters to create the mission)</h4>
            <div className="mission-params">
                <div className="row">
                    <div className="col-3">Username: {configData.userName}</div>
                    <div className="col-3">API key: {configData.apiKey}</div>
                    <div className="col-3">norad_id: {norad_id}</div>
                    <div className="col-3">instrument_id: {instrument_id}</div>
                </div>
                <div className="row">
                    <div className="col-3">lat: {lat}</div>
                    <div className="col-3">lon: {lng}</div>
                    <div className="col-3">net: {net}</div>
                    <div className="col-3">nlt: {nlt}</div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary" onClick={createSatMission}>Create Mission</button>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-warning" onClick={restartMission}>Restart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}