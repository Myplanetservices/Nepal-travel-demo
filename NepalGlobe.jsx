import { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import './NepalGlobe.css';

// Destinations to highlight on the globe.
// Swap/add lat-lng pairs for other spots (Pokhara, Chitwan, Annapurna, etc.)
const MARKERS = [
  {
    lat: 27.7172,
    lng: 85.324,
    label: 'Kathmandu Valley',
    url: '/destinations/kathmandu',
  },
  {
    lat: 27.9881,
    lng: 86.925,
    label: 'Mount Everest',
    url: '/destinations/everest',
  },
];

export default function NepalGlobe() {
  const globeEl = useRef();
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = true;

    // Initial camera framing
    globeEl.current.pointOfView({ lat: 20, lng: 40, altitude: 2.2 }, 0);
  }, []);

  function handleMarkerClick(marker) {
    const controls = globeEl.current.controls();
    controls.autoRotate = false;
    setIsZooming(true);

    // Animate the camera in toward the marker — this is the "zoom pan in" effect
    globeEl.current.pointOfView(
      { lat: marker.lat, lng: marker.lng, altitude: 0.3 },
      1500 // transition duration in ms
    );

    // Wait for the zoom to finish, then navigate
    setTimeout(() => {
      window.location.href = marker.url;
      // If using Next.js / React Router, replace the line above with:
      // router.push(marker.url);
    }, 1600);
  }

  return (
    <div className="globe-wrapper">
      <Globe
        ref={globeEl}
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.15}
        htmlElementsData={MARKERS}
        htmlElement={(marker) => {
          const el = document.createElement('div');
          el.className = 'globe-marker-container';
          el.innerHTML = `
            <div class="globe-pin"></div>
            <div class="globe-tooltip">${marker.label}</div>
          `;
          el.style.pointerEvents = isZooming ? 'none' : 'auto';
          el.addEventListener('click', () => handleMarkerClick(marker));
          return el;
        }}
      />
      {isZooming && <div className="globe-fade-overlay" />}
    </div>
  );
}
