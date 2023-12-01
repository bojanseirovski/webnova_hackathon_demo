import React from 'react';

type SatelliteProps = {
    norad_id:number;
    name:string;
    description:string;
    tle1:string;
    tle2: string;
    type:string;
}

const Satellite:React.FunctionComponent<SatelliteProps> = (props) => {
    const {norad_id, name, description, tle1, tle2, type} = props;
    let link = "?norad_id="+norad_id;
    return (
        <div className={'row onesat-sat' + {norad_id}}>
            <div className="col-1">
                <a href={link}>{norad_id}</a>
            </div>
            <div className="col-1">
                <a href={link}>{name}</a>
            </div>
            <div className="col-3">
                {description}
            </div>
            <div className="col-1">
                {type}
            </div>
            <div className="col-3">
                <p>{tle1}</p>
                <p>{tle2}</p>
            </div>
        </div>
    );
}

export default Satellite;