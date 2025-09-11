import { useState, useEffect } from 'react';

export default function RegionModal({ isOpen, onClose }) {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error(err));
  }, []);

  const handleRegionChange = async (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);

    if (regionId) {
      const res = await fetch(`/api/schools?region_id=${regionId}`);
      const data = await res.json();
      setSchools(data);
    }
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a Region</h2>
        <select onChange={handleRegionChange} value={selectedRegion}>
          <option value="">-- Select a Region --</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>

        {schools.length > 0 && (
          <div>
            <h3>Schools in Selected Region:</h3>
            <ul>
              {schools.map(school => (
                <li key={school.id}>{school.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
}
