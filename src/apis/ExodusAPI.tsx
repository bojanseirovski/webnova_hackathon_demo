import axios from 'axios';
import configData from "../configs/config.json"

const api = axios.create({
    baseURL: configData.baseUrl,
    headers: configData.headers,
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    return api(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export default api;

export const getAvailableSatellites = (done:any, err:any) => {
    api.get("/satellites")
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const getSatelliteInstruments = (noradId: number, done:any, err:any) => {
    api.get("/instruments", {params: {norad_id: noradId}})
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const getTimesOnTarget = (noradId:number, instrumentId:number, lng:number, lat:number, nlt:string, net:string, done:any, err:any) => {
    api.get("/times_on_target", {params: {norad_id: noradId, instrument_id: instrumentId, lng: lng, lat:lat, nlt:nlt, net:net}})
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const createMission = (noradId:number, instrumentId:number, lng:number, lat:number, nlt:string, net:string, done:any, err:any) => {
    let username = configData.userName;
    let apiKey = configData.apiKey;
    api.post(
        "/create_mission", 
        {user: username, api_key: apiKey, norad_id: noradId, instrument_id: instrumentId, lon: lng, lat: lat, nlt: nlt, net: net}
    )
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}

export const getDataDownload = (dataKey:string, done:any, err:any) => {
    api.get("/data_download", {params: {data_key: dataKey, user: configData.userName, api_key:configData.apiKey}})
    .then(response => {
        if (done) {
            done(response.data);
        }
    })
    .catch(error => {
        if (err) {
            err();
        }
    });
}