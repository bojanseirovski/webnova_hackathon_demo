import React from 'react';

type SatelliteInstrumentsProps = {
    d:number;
    f:number;
    fov:number;
    id:number;
    pixel: Array<any>;
    sensor:Array<any>;
    type:string;
}

const SatelliteInstruments:React.FunctionComponent<SatelliteInstrumentsProps> = (props) => {
    const {d, f, fov, id, pixel, sensor, type} = props;
    const url = window.location.search + '&instrument_id=' + id;

    const allSensors = (sensors:Array<any>) => {
        let sensorsString: string = "";
        for (let i=0; i<sensors.length; i++) {
            sensorsString += sensors[i]+","
        }
        return sensorsString;
    }

    return (
        <div className='row onesat-instrument'>
            <div className="col-1">
                <a href={url}>{id}</a>
            </div>
            <div className="col-2">
                <a href={url}>{type}</a>
            </div>
            <div className="col-1">
                {f}
            </div>
            <div className="col-1">
                {fov}
            </div>
            <div className="col-1">
                {d}
            </div>
            <div className="col-2">
                {pixel}
            </div>
            <div className="col-4">
                {allSensors(sensor)}
            </div>
        </div>
    );
}

export default SatelliteInstruments;