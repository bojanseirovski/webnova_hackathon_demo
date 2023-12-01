import React, { useState, useRef } from 'react';
import { getTimesOnTarget } from "../apis/ExodusAPI";
import TimesOnTarget from './list_items/TimesOnTarget';

type TimesOnTargetMainProp = {
    norad_id: number;
    instrument_id: number;
}

export const GetTimesOnTarget:React.FunctionComponent<TimesOnTargetMainProp> = (props) => {

    const latRef = useRef(null);
    const lonRef = useRef(null);
    const nltRef = useRef(null);
    const nleRef = useRef(null);

    const {norad_id,instrument_id} = props;
    const [allSatTimes, setSatelliteTimes] = useState(Array<any>);

    const getTimes = () => {
        const lon = lonRef.current.value;
        const lat = latRef.current.value;
        const nlt = nltRef.current.value;
        const nle = nleRef.current.value;
        getTimesOnTarget(norad_id, instrument_id, lon, lat,nlt, nle, (response:any) => {
            setSatelliteTimes(response.target_passes);
        }, () => {});
    }

    const continueToCreateMission = () => {
        const lon = lonRef.current.value;
        const lat = latRef.current.value;
        const nlt = nltRef.current.value;
        const nle = nleRef.current.value;
        let url = window.location.search +
            "&lng=" + lon +
            "&lat=" + lat +
            "&nlt=" + nlt +
            "&nle=" + nle;
        window.location.href = url;
    }

    return (
        <div className="get-satellite-times-on-target px-5 pb-5">
            <h4>Satellite Times On Target (enter the parameters to see all available times and click Continue to continue with the mission)</h4>
            <div className="times-user-params">
                <div className="row">
                    <div className="col-3">
                        <div className="form-group">
                            <input type="text" ref={nltRef} className="form-control" id="nlt" placeholder="Date, Not Earlier Than" value="2023-03-03 03:27:26"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <input type="text" ref={nleRef} className="form-control" id="nle" placeholder="Date, Not Later Than" value="2023-03-01 03:27:26"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <input type="text" ref={lonRef} className="form-control" id="lon" placeholder="Longitude" value="-79.6"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <input type="text" ref={latRef} className="form-control" id="lat" placeholder="Latitude" value="43.7"/>
                        </div>
                    </div>
                </div>
                <div className="row pt-3 pb-3">
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary" onClick={getTimes}>Get Times</button>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary" onClick={continueToCreateMission}>Continue</button>
                    </div>
                </div>
            </div>
            <div className="sat-times-on-target-list px-5 pt-3 pb-3">
                {allSatTimes.map((times) => {
                    return (
                        <TimesOnTarget pass={times}/>
                    );
                })}
            </div>
        </div>
    );
}