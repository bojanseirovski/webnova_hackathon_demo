import React, { useState, useEffect } from 'react';
import { getSatelliteInstruments } from "../apis/ExodusAPI";
import SatelliteInstruments from './list_items/SatelliteInstruments';

type InstrumentProp = {
    norad_id: number;
}

export const GetInstruments: React.FunctionComponent<InstrumentProp> = (props) => {
    const { norad_id } = props;
    const [allSatInstruments, setSatelliteInstruments] = useState(Array<any>);

    useEffect(() => {
        if (allSatInstruments.length < 1) {
            getSatelliteInstruments(norad_id, (response: any) => {
                if (response[0].instruments) {
                    setSatelliteInstruments(response[0].instruments);
                }
            }, () => { });
        }

    });

    return (
        <div className="get-satellite-instruments px-5 pb-5">
            <h4>Satellite Instruments (click on name or id to continue with the mission)</h4>
            <div className="sat-device-list px-5 pb-5">
                <div className='row onesat-instrument-heading'>
                    <div className="col-1">
                        id
                    </div>
                    <div className="col-2">
                        type
                    </div>
                    <div className="col-1">
                        f
                    </div>
                    <div className="col-1">
                        fov
                    </div>
                    <div className="col-1">
                        d
                    </div>
                    <div className="col-2">
                        pixel
                    </div>
                    <div className="col-4">
                        sensor
                    </div>
                </div>
                {allSatInstruments.map((elem: any, i: number) => {
                    return (
                        <SatelliteInstruments
                            d={elem.d}
                            f={elem.f}
                            fov={elem.fov}
                            id={elem.id}
                            pixel={elem.pixel}
                            sensor={elem.sensor}
                            type={elem.type}
                        />
                    );
                })}
            </div>
        </div>
    );
}