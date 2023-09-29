import React, { useState } from 'react';
import MapDisplay from './MapDisplay';
import PlantDisplay from './PlantDisplay'
import MapLegend from './MapLegend';
import NavContainer from './NavContainer';
import AirQuality from './AirQuality';
import NPS from './NPS';
import './Main.css'
export default function Main() {
    const [colorMapping, setColorMapping] = useState({});
    const [legendStructure, setLegendStructure] = useState({});
    const [vegCName, setVegCName] = useState('');
    const [secondVegCName, setSecondVegCName] = useState('');

    console.log("Rendering Main component");
    console.log('Received vegCName in Main: ', vegCName);
    console.log('Received secondVegCName in Main: ', secondVegCName);
    return (
        <div className="container">
            <div className='TopLeft'>
                <AirQuality />
            </div>
            <div className='TopRight'>
                <NPS />
            </div>
            <div className="PlantDisplay">
                <PlantDisplay vegCName={vegCName} secondVegCName={secondVegCName}/>
            </div>
            <div className="MapDisplay">
                <MapDisplay
                    setColorMapping={setColorMapping}
                    setLegendStructure={setLegendStructure}
                    colorMapping={colorMapping}
                    setVegCName={setVegCName}
                    setSecondVegCName={setSecondVegCName}
                />
            </div>
            <div className="Map-Legend">
                <MapLegend
                    colorMapping={colorMapping}
                    legendStructure={legendStructure}
                />
            </div>
            <div className="NavContainer">
                <NavContainer />
            </div>
        </div>
    );
}