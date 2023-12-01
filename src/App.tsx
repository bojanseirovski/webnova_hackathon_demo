import logo from './logo_b.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { GetSatellites } from './modules/GetSatellites';
import { GetInstruments } from './modules/GetInstruments';
import { GetTimesOnTarget } from './modules/GetTimesOnTarget';
import { CreateMission } from './modules/CreateMission';
import { GetData } from './modules/GetData';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const noradId = parseInt(queryParams.get('norad_id'));
  const instrumentId = parseInt(queryParams.get('instrument_id'));
  const lat = parseFloat(queryParams.get('lat'));
  const lng = parseFloat(queryParams.get('lng'));
  const net = queryParams.get('nle');
  const nlt = queryParams.get('nlt');

  const dataKey = queryParams.get('data_key');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>API demo app</h3>
      </header>
      <h3>Select a satellite to start your mission(click on the name):</h3>
      <section className="App-body justify-content-center">
        <GetSatellites/>
        {noradId && 
          <GetInstruments norad_id={noradId}/>
        }
        {noradId && instrumentId && 
          <GetTimesOnTarget norad_id={noradId}  instrument_id={instrumentId}/>
        }
        {noradId && instrumentId && lat && lng && 
          <CreateMission
            norad_id={noradId}
            instrument_id={instrumentId}
            lat={lat}
            lng={lng}
            net={net}
            nlt={nlt}
            />
        }

        {dataKey && 
          <GetData dataKey={dataKey}/>
        }
      </section>
    </div>
  );
}

export default App;
