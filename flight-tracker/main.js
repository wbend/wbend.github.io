class FlightMapVisualization {
    constructor() {
        this.map = null;
        this.flightData = null;
        this.visibleFlights = new Map();
        this.routeGroups = new Map();
        this.DISTANCE_THRESHOLD = 50; // km - threshold for considering airports "nearby"
        
        this.init();
    }

    async init() {
        this.map = L.map('map').setView([55.7558, 37.6173], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        try {
            await this.loadData();
            this.groupSimilarFlights();
            this.renderFlights();
        } catch (error) {
            console.error('Error initializing map:', error);
            alert('Error loading flight data. Please try again later.');
        }
    }

    async loadData() {
        try {
            const response = await fetch('flight_paths.geojson');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const text = await response.text();
            const cleanedText = text.replace(/: ?NaN/g, ': null');
            
            try {
                this.flightData = JSON.parse(cleanedText);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                throw new Error('Invalid JSON format in flight data');
            }
            
            this.flightData.features = this.flightData.features.filter(feature => {
                return feature.properties && 
                       feature.geometry &&
                       feature.geometry.coordinates &&
                       Array.isArray(feature.geometry.coordinates) &&
                       feature.geometry.coordinates.length > 0 &&
                       feature.properties.origin_coords &&
                       feature.properties.destination_coords;
            });
            
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
            throw error;
        }
    }

    calculateDistance(coords1, coords2) {
        const R = 6371; // Earth's radius in km
        const [lat1, lon1] = coords1;
        const [lat2, lon2] = coords2;
        
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    findExistingRoute(originCoords, destCoords) {
        for (let [routeKey, flights] of this.routeGroups.entries()) {
            const existingFlight = flights[0];
            const existingOrigin = existingFlight.properties.origin_coords;
            const existingDest = existingFlight.properties.destination_coords;
            
            const originDistance = this.calculateDistance(originCoords, existingOrigin);
            const destDistance = this.calculateDistance(destCoords, existingDest);
            
            if (originDistance <= this.DISTANCE_THRESHOLD && 
                destDistance <= this.DISTANCE_THRESHOLD) {
                return routeKey;
            }
        }
        return null;
    }

    groupSimilarFlights() {
        this.routeGroups.clear();
        
        this.flightData.features.forEach(feature => {
            const originCoords = feature.properties.origin_coords;
            const destCoords = feature.properties.destination_coords;
            
            if (!originCoords || !destCoords) return;
            
            // Try to find an existing similar route
            const existingRouteKey = this.findExistingRoute(originCoords, destCoords);
            
            if (existingRouteKey) {
                // Add to existing route group
                this.routeGroups.get(existingRouteKey).push(feature);
            } else {
                // Create new route group
                const newRouteKey = `${feature.properties.origin_city}-${feature.properties.destination_city}-${this.routeGroups.size}`;
                this.routeGroups.set(newRouteKey, [feature]);
            }
        });
    }

    renderFlights() {
        this.routeGroups.forEach((flights, routeKey) => {
            const coordinates = flights[0].geometry.coordinates
                .filter(coord => Array.isArray(coord) && coord.length >= 2)
                .map(coord => [coord[1], coord[0]]);
            
            if (coordinates.length < 2) return;

            const baseWeight = 2;
            const weight = Math.min(baseWeight + Math.log2(flights.length), 8);
            
            const line = L.polyline(coordinates, {
                color: '#4a90e2',
                weight: weight,
                opacity: 0.6
            });

            line.on('mouseover', (e) => {
                e.target.setStyle({
                    weight: weight + 2,
                    opacity: 1
                });
            }).on('mouseout', (e) => {
                e.target.setStyle({
                    weight: weight,
                    opacity: 0.6
                });
            });

            this.addRoutePopup(line, flights);
            line.addTo(this.map);
            this.visibleFlights.set(routeKey, line);
        });
    }

    addRoutePopup(line, flights) {
        const sortedFlights = [...flights].sort((a, b) => {
            return new Date(a.properties.simplified_departure_date) - 
                   new Date(b.properties.simplified_departure_date);
        });

        const firstFlight = sortedFlights[0].properties;
        const flightCount = flights.length;
        const dateRange = this.getDateRange(sortedFlights);
        
        // Collect unique airports used
        const origins = new Set(flights.map(f => `${f.properties.origin_city} (${f.properties.origin_code})`));
        const destinations = new Set(flights.map(f => `${f.properties.destination_city} (${f.properties.destination_code})`));
        
        const popupContent = `
            <div class="flight-info">
                <h4>${flightCount} ${flightCount === 1 ? 'Flight' : 'Flights'} on this Route</h4>
                <p><strong>Origins:</strong> ${Array.from(origins).join(', ')}</p>
                <p><strong>Destinations:</strong> ${Array.from(destinations).join(', ')}</p>
                <p><strong>Date Range:</strong> ${dateRange}</p>
                <p><strong>Route Distance:</strong> ${firstFlight.route_distance ? `${firstFlight.route_distance} km` : 'N/A'}</p>
                <p><strong>Flight(s):</strong></p>
                ${this.getFlightsHTML(sortedFlights.slice(-5).reverse())}
            </div>
        `;
        
        line.bindPopup(popupContent);
    }

    getDateRange(flights) {
        const dates = flights.map(f => new Date(f.properties.simplified_departure_date))
                           .filter(date => !isNaN(date.getTime()));
        
        if (dates.length === 0) return 'N/A';
        
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        
        return `${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`;
    }

    getFlightsHTML(flights) {
        return flights.map(flight => {
            const props = flight.properties;
            return `
                <div class="recent-flight">
                    <p class="flight-detail">
                        ${new Date(props.simplified_departure_date).toLocaleDateString()} - 
                        ${props.origin_code} → ${props.destination_code}
                        ${props.ident ? ` - Flight ${props.ident}` : ''}
                        ${props.registration ? ` (${props.registration})` : ''}
                    </p>
                </div>
            `;
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FlightMapVisualization();
});