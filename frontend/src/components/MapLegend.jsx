import './MapLegend.css'
function MapLegend({ legendStructure, colorMapping }) {
    // Handling if either legendStructure or colorMapping is not yet available.
    if (!legendStructure || !colorMapping || Object.keys(legendStructure).length === 0 || Object.keys(colorMapping).length === 0) {
        return <div>Loading legend...</div>; // or some other placeholder or loading indicator
    }
    console.log('Legend Structure: ', legendStructure);
    console.log('Color Mapping: ', colorMapping);
    
    return (
        <div className="map-legend">
        {Object.entries(legendStructure).map(([ecoName, { vegCNames }]) => (
          <div key={ecoName} className="eco-name-section">
            <div className="eco-name-title">{ecoName}</div>
            {vegCNames.map(vegCName => (
              <div key={vegCName} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: colorMapping[vegCName] }}></span>
                <span className="legend-label">{vegCName}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
}

export default MapLegend;
