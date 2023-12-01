import {useState, useEffect} from "react";
import {getAvailableSatellites} from "../apis/ExodusAPI";
import Satellite from "./list_items/Satellite";

export const GetSatellites = () => {
    const [allSatellites, setSatellites] = useState(Array<any>);

    useEffect(() => {
        if (allSatellites.length<1) {
            getAvailableSatellites((response:any) => {
                setSatellites(response);
            },() => {
    
            });
        }
    });

    return(
        <div className="get-satellites px-5 pb-5">
            <div className="sat-list px-5">
                <div className="row onesat heading">
                    <div className="col-1">
                        norad_id
                    </div>
                    <div className="col-1">
                        name
                    </div>
                    <div className="col-3">
                        description
                    </div>
                    <div className="col-1">
                        type
                    </div>
                    <div className="col-3">
                        tle
                    </div>
                </div>
                {allSatellites.map((element:any, i:number) => {
                    return (
                        <Satellite 
                            norad_id={element.norad_id} 
                            name={element.name} 
                            description={element.description} 
                            tle1={element.tle1}
                            tle2={element.tle2}
                            type={element.type}
                            />
                    );
                })}
            </div>
        </div>
    );
}