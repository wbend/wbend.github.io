class FlightMapVisualization {
    constructor() {
        this.map = null;
        this.aircraftData = new Map(); // Map of aircraft ID to GeoJSON data
        this.visibleFlights = new Map(); // Map of route key to polyline layer
        this.routeGroups = new Map(); // Map of route key to array of flight features
        this.DISTANCE_THRESHOLD = 50;
        this.modal = null;
        this.currentFlights = null;
        
        // Define aircraft information
        this.aircraft = [
            {
                id: 'RA-76845',
                file: 'RA76845_flight_paths.geojson',
                color: '#4a90e2', // Blue
                visible: true,
                loaded: false,
                data: null
            },
            {
                id: 'RA-76846',
                file: 'RA76846_flight_paths.geojson', 
                color: '#e24a4a', // Red
                visible: true,
                loaded: false,
                data: null
            }
            // Add more aircraft here as needed
        ];
        
        // Add click handler for "See All Flights" buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('see-all-button')) {
                const routeKey = e.target.dataset.routeKey;
                const flights = this.routeGroups.get(routeKey);
                if (flights) {
                    this.showAllFlights(flights);
                }
            }
        });
        
        this.init();
    }

    async init() {
        // Initialize map centered on Europe/Russia/Middle East region
        this.map = L.map('map').setView([45, 45], 4);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.setupModal();
        this.setupAircraftControls();
        this.setupDistanceControls();

        try {
            // Load data for all aircraft that are visible
            await this.loadAircraftData();
            this.updateVisualization();
        } catch (error) {
            console.error('Error initializing map:', error);
            alert('Error loading flight data. Please try again later.');
        }
    }

    setupModal() {
        this.modal = document.getElementById('flight-modal');
        const closeButton = document.querySelector('.close-modal');
        
        closeButton.onclick = () => {
            this.modal.style.display = 'none';
        };
        
        window.onclick = (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        };
    }
    
    setupAircraftControls() {
        const checkboxes = document.querySelectorAll('input[name="aircraft"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const aircraftId = e.target.value;
                const aircraft = this.aircraft.find(a => a.id === aircraftId);
                
                if (aircraft) {
                    aircraft.visible = e.target.checked;
                    this.updateVisualization();
                }
            });
        });
    }

    setupDistanceControls() {
        const radioButtons = document.querySelectorAll('input[name="distance"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.DISTANCE_THRESHOLD = parseInt(e.target.value);
                this.updateVisualization();
            });
        });
    }

    showAllFlights(flights) {
        this.currentFlights = flights;
        const modalBody = this.modal.querySelector('.modal-body');
        
        const sortedFlights = [...flights].sort((a, b) => {
            const dateA = a.properties.simplified_departure_date ? new Date(a.properties.simplified_departure_date) : new Date(0);
            const dateB = b.properties.simplified_departure_date ? new Date(b.properties.simplified_departure_date) : new Date(0);
            return dateA - dateB;
        });

        const firstFlight = sortedFlights[0].properties;
        
        // Update modal header
        const modalTitle = this.modal.querySelector('.modal-header h2');
        modalTitle.textContent = `${flights.length} Flights: ${firstFlight.origin_city || 'Unknown'} to ${firstFlight.destination_city || 'Unknown'}`;
        
        // Generate flight list HTML
        const flightListHTML = sortedFlights.map(flight => {
            const props = flight.properties;
            const aircraft = this.aircraft.find(a => a.id === props.ident || a.id === props.registration);
            const aircraftColor = aircraft ? aircraft.color : '#999';
            const aircraftId = props.ident || props.registration || 'Unknown';
            
            return `
                <div class="flight-list-item">
                    <span class="aircraft-tag" style="background-color: ${aircraftColor}">${aircraftId}</span>
                    <strong>${props.simplified_departure_date ? new Date(props.simplified_departure_date).toLocaleDateString() : 'Unknown Date'}</strong> - 
                    ${props.origin_code || 'Unknown'} → ${props.destination_code || 'Unknown'}
                </div>
            `;
        }).join('');
        
        modalBody.innerHTML = flightListHTML;
        this.modal.style.display = 'block';
    }

    async loadAircraftData() {
        const loadPromises = [];
        
        // Create promises for loading each aircraft's data
        for (let aircraft of this.aircraft) {
            if (!aircraft.loaded) {
                const promise = this.loadSingleAircraftData(aircraft);
                loadPromises.push(promise);
            }
        }
        
        // Wait for all loading to complete
        await Promise.all(loadPromises);
    }
    
    async loadSingleAircraftData(aircraft) {
        try {
            const response = await fetch(aircraft.file);
            if (!response.ok) throw new Error(`Network response was not ok for ${aircraft.id}`);
            
            const text = await response.text();
            const cleanedText = text.replace(/: ?NaN/g, ': null');
            
            try {
                const data = JSON.parse(cleanedText);
                
                // Add aircraft ID to each feature for identification
                data.features = data.features.filter(feature => {
                    return feature.properties && 
                           feature.geometry &&
                           feature.geometry.coordinates &&
                           Array.isArray(feature.geometry.coordinates) &&
                           feature.geometry.coordinates.length > 0 &&
                           feature.properties.origin_coords &&
                           feature.properties.destination_coords;
                }).map(feature => {
                    // Add aircraft ID to feature for later identification
                    if (!feature.properties.aircraftId) {
                        feature.properties.aircraftId = aircraft.id;
                    }
                    return feature;
                });
                
                aircraft.data = data;
                aircraft.loaded = true;
                console.log(`Loaded ${data.features.length} flights for ${aircraft.id}`);
            } catch (parseError) {
                console.error(`Error parsing JSON for ${aircraft.id}:`, parseError);
                throw new Error(`Invalid JSON format in flight data for ${aircraft.id}`);
            }
        } catch (error) {
            console.error(`Error loading GeoJSON for ${aircraft.id}:`, error);
            aircraft.loaded = false;
            throw error;
        }
    }

    updateVisualization() {
        // Clear existing flights
        this.visibleFlights.forEach(layer => this.map.removeLayer(layer));
        this.visibleFlights.clear();
        this.routeGroups.clear();
        
        // Combine features from all visible aircraft
        let allFeatures = [];
        for (let aircraft of this.aircraft) {
            if (aircraft.visible && aircraft.loaded && aircraft.data) {
                allFeatures = allFeatures.concat(aircraft.data.features);
            }
        }
        
        // Group flights by route
        this.groupSimilarFlights(allFeatures);
        
        // Render the flights
        this.renderFlights();
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

    findExistingRoute(originCoords, destCoords, aircraftId) {
        // If grouping is disabled (threshold = 0), don't try to find existing routes
        if (this.DISTANCE_THRESHOLD === 0) return null;
        
        for (let [routeKey, flights] of this.routeGroups.entries()) {
            // Only match routes of the same aircraft
            if (flights[0].properties.aircraftId !== aircraftId) continue;
            
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

    groupSimilarFlights(features) {
        this.routeGroups.clear();
        
        features.forEach(feature => {
            const originCoords = feature.properties.origin_coords;
            const destCoords = feature.properties.destination_coords;
            const aircraftId = feature.properties.aircraftId;
            
            if (!originCoords || !destCoords) return;
            
            if (this.DISTANCE_THRESHOLD === 0) {
                // Ensure unique key even if ident is missing
                const uniqueKey = `${aircraftId}-${feature.properties.origin_code}-${feature.properties.destination_code}-${feature.properties.simplified_departure_date}-${feature.properties.registration || 'unknown'}`;
                this.routeGroups.set(uniqueKey, [feature]);
            } else {
                // Try to find an existing similar route for the same aircraft
                const existingRouteKey = this.findExistingRoute(originCoords, destCoords, aircraftId);
                
                if (existingRouteKey) {
                    // Add to existing route group
                    this.routeGroups.get(existingRouteKey).push(feature);
                } else {
                    // Create new route group
                    const newRouteKey = `${aircraftId}-${feature.properties.origin_city || 'Unknown'}-${feature.properties.destination_city || 'Unknown'}-${this.routeGroups.size}`;
                    this.routeGroups.set(newRouteKey, [feature]);
                }
            }
        });
    }

    renderFlights() {
        this.routeGroups.forEach((flights, routeKey) => {
            if (flights.length === 0) return;
            
            const aircraftId = flights[0].properties.aircraftId;
            const aircraft = this.aircraft.find(a => a.id === aircraftId);
            
            if (!aircraft || !aircraft.visible) return;
            
            const coordinates = flights[0].geometry.coordinates
                .filter(coord => Array.isArray(coord) && coord.length >= 2)
                .map(coord => [coord[1], coord[0]]);
            
            if (coordinates.length < 2) return;

            const baseWeight = 2;
            const weight = this.DISTANCE_THRESHOLD === 0 ? 
                          baseWeight : 
                          Math.min(baseWeight + Math.log2(flights.length), 8);
            
            const line = L.polyline(coordinates, {
                color: aircraft.color,
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

            this.addRoutePopup(line, flights, routeKey, aircraft);
            line.addTo(this.map);
            this.visibleFlights.set(routeKey, line);
        });
    }

    addRoutePopup(line, flights, routeKey, aircraft) {
        const sortedFlights = [...flights].sort((a, b) => {
            const dateA = a.properties.simplified_departure_date ? new Date(a.properties.simplified_departure_date) : new Date(0);
            const dateB = b.properties.simplified_departure_date ? new Date(b.properties.simplified_departure_date) : new Date(0);
            return dateA - dateB;
        });

        const firstFlight = sortedFlights[0].properties;
        const flightCount = flights.length;
        const dateRange = this.getDateRange(sortedFlights);
        
        const origins = new Set(flights.map(f => `${f.properties.origin_city || 'Unknown'} (${f.properties.origin_code || 'Unknown'})`));
        const destinations = new Set(flights.map(f => `${f.properties.destination_city || 'Unknown'} (${f.properties.destination_code || 'Unknown'})`));
        
        const popupContent = `
            <div class="flight-info">
                <h4>
                    <span class="aircraft-tag" style="background-color: ${aircraft.color}">${aircraft.id}</span>
                    ${flightCount} ${flightCount === 1 ? 'Flight' : 'Flights'} on this Route
                </h4>
                <p><strong>Origins:</strong> ${Array.from(origins).join(', ')}</p>
                <p><strong>Destinations:</strong> ${Array.from(destinations).join(', ')}</p>
                <p><strong>Date Range:</strong> ${dateRange}</p>
                <p><strong>Route Distance:</strong> ${firstFlight.route_distance ? `${firstFlight.route_distance} km` : 'N/A'}</p>
                ${this.DISTANCE_THRESHOLD > 0 ? '<p><strong>Grouping Distance:</strong> ' + this.DISTANCE_THRESHOLD + ' km</p>' : ''}
                <p><strong>Flight(s):</strong></p>
                <div style="border-left: 3px solid ${aircraft.color}; padding-left: 8px;">
                    ${this.getFlightsHTML(sortedFlights.slice(-5).reverse(), aircraft)}
                </div>
                ${flightCount > 5 ? `
                    <button class="see-all-button" data-route-key="${routeKey}" style="background-color: ${aircraft.color}">
                        See All ${flightCount} Flights
                    </button>
                ` : ''}
            </div>
        `;
        
        line.bindPopup(popupContent);
    }

    getDateRange(flights) {
        const dates = flights.map(f => f.properties.simplified_departure_date ? new Date(f.properties.simplified_departure_date) : null)
                           .filter(date => date && !isNaN(date.getTime()));
        
        if (dates.length === 0) return 'N/A';
        
        const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
        
        return `${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`;
    }

    getFlightsHTML(flights, aircraft) {
        return flights.map(flight => {
            const props = flight.properties;
            return `
                <div class="recent-flight" style="background-color: ${aircraft.color}10">
                    <p class="flight-detail">
                        ${props.simplified_departure_date ? new Date(props.simplified_departure_date).toLocaleDateString() : 'Unknown Date'} - 
                        ${props.origin_code || 'Unknown'} → ${props.destination_code || 'Unknown'}
                        ${props.ident ? ` - Flight ${props.ident}` : ''}
                        ${props.registration ? ` (${props.registration})` : ''}
                    </p>
                </div>
            `;
        }).join('');
    }
}

// Initialize the visualization and make it globally available for the modal
document.addEventListener('DOMContentLoaded', () => {
    window.flightViz = new FlightMapVisualization();
});