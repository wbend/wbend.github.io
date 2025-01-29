class FlightMapVisualization {
    constructor() {
        this.map = null;
        this.flightData = null;
        this.timeSlider = null;
        this.isPlaying = false;
        this.animationInterval = null;
        this.visibleFlights = new Map();
        this.clusteringEnabled = false;
        this.dateRange = { min: null, max: null };
        
        this.init();
    }

    async init() {
        // Initialize map
        this.map = L.map('map').setView([55.7558, 37.6173], 6); // Centered on Moscow
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        try {
            await this.loadData();
            this.setupControls();
            this.initializeTimeSlider();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing map:', error);
            alert('Error loading flight data. Please try again later.');
        }
    }

    async loadData() {
        try {
            const response = await fetch('flight_paths.geojson');
            if (!response.ok) throw new Error('Network response was not ok');
            
            this.flightData = await response.json();
            
            // Extract date range
            const dates = this.flightData.features.map(f => 
                new Date(f.properties.simplified_departure_date).getTime()
            );
            this.dateRange.min = Math.min(...dates);
            this.dateRange.max = Math.max(...dates);
            
            // Initial visualization
            this.updateVisualization([
                new Date(this.dateRange.min).toISOString().split('T')[0],
                new Date(this.dateRange.max).toISOString().split('T')[0]
            ]);
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
            throw error;
        }
    }

    setupControls() {
        const toggle = document.getElementById('cluster-toggle');
        toggle.addEventListener('change', (e) => {
            this.clusteringEnabled = e.target.checked;
            this.updateVisualization(this.timeSlider.noUiSlider.get());
        });
    }

    initializeTimeSlider() {
        const slider = document.getElementById('time-slider');
        
        noUiSlider.create(slider, {
            start: [this.dateRange.min, this.dateRange.max],
            connect: true,
            range: {
                'min': this.dateRange.min,
                'max': this.dateRange.max
            },
            step: 86400000, // One day in milliseconds
            format: {
                to: value => new Date(Number(value)).toISOString().split('T')[0],
                from: value => new Date(value).getTime()
            }
        });

        this.timeSlider = slider;
        
        slider.noUiSlider.on('update', (values) => {
            this.updateVisualization(values);
            document.getElementById('current-date').textContent = 
                `${values[0]} to ${values[1]}`;
        });
    }

    setupEventListeners() {
        const playButton = document.getElementById('play-pause');
        playButton.addEventListener('click', () => this.togglePlayPause());
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const button = document.getElementById('play-pause');
        
        if (this.isPlaying) {
            button.textContent = '⏸️ Pause';
            this.startAnimation();
        } else {
            button.textContent = '▶️ Play';
            this.stopAnimation();
        }
    }

    startAnimation() {
        if (this.animationInterval) return;
        
        const step = 86400000; // One day in milliseconds
        this.animationInterval = setInterval(() => {
            const [start, end] = this.timeSlider.noUiSlider.get().map(d => new Date(d).getTime());
            const newStart = start + step;
            const newEnd = end + step;
            
            if (newEnd > this.dateRange.max) {
                this.stopAnimation();
                return;
            }
            
            this.timeSlider.noUiSlider.set([
                new Date(newStart).toISOString().split('T')[0],
                new Date(newEnd).toISOString().split('T')[0]
            ]);
        }, 1000);
    }

    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        this.isPlaying = false;
        document.getElementById('play-pause').textContent = '▶️ Play';
    }

    updateVisualization(dateRange) {
        // Clear existing flights
        this.visibleFlights.forEach(layer => this.map.removeLayer(layer));
        this.visibleFlights.clear();

        const [startDate, endDate] = dateRange.map(d => new Date(d).getTime());
        
        // Filter flights within date range
        const visibleFeatures = this.flightData.features.filter(f => {
            const flightDate = new Date(f.properties.simplified_departure_date).getTime();
            return flightDate >= startDate && flightDate <= endDate;
        });

        if (this.clusteringEnabled) {
            this.renderClusteredFlights(visibleFeatures);
        } else {
            this.renderIndividualFlights(visibleFeatures);
        }
    }

    renderIndividualFlights(features) {
        features.forEach(feature => {
            const coordinates = feature.geometry.coordinates.map(coord => [coord[1], coord[0]]);
            
            const line = L.polyline(coordinates, {
                color: '#4a90e2',
                weight: 2,
                opacity: 0.6
            });

            // Add hover effect
            line.on('mouseover', (e) => {
                e.target.setStyle({
                    weight: 4,
                    opacity: 1
                });
            }).on('mouseout', (e) => {
                e.target.setStyle({
                    weight: 2,
                    opacity: 0.6
                });
            });

            this.addFlightPopup(line, feature.properties);
            line.addTo(this.map);
            this.visibleFlights.set(feature.properties.fa_flight_id, line);
        });
    }

    renderClusteredFlights(features) {
        // Group flights by origin-destination pairs
        const flightGroups = new Map();
        
        features.forEach(feature => {
            const key = `${feature.properties.origin_code}-${feature.properties.destination_code}`;
            if (!flightGroups.has(key)) {
                flightGroups.set(key, []);
            }
            flightGroups.get(key).push(feature);
        });

        flightGroups.forEach((flights, key) => {
            const baseWeight = 2;
            const weight = Math.min(baseWeight + Math.log2(flights.length), 10);
            
            const coordinates = flights[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            const line = L.polyline(coordinates, {
                color: '#4a90e2',
                weight: weight,
                opacity: 0.6
            });

            // Add hover effect
            line.on('mouseover', (e) => {
                e.target.setStyle({
                    opacity: 1
                });
            }).on('mouseout', (e) => {
                e.target.setStyle({
                    opacity: 0.6
                });
            });

            const popupContent = this.createClusterPopup(flights);
            line.bindPopup(popupContent);
            
            line.addTo(this.map);
            this.visibleFlights.set(key, line);
        });
    }

    addFlightPopup(line, properties) {
        const popupContent = `
            <div class="flight-info">
                <h4>Flight ${properties.ident}</h4>
                <p><strong>Registration:</strong> ${properties.registration}</p>
                <p><strong>Date:</strong> ${properties.simplified_departure_date}</p>
                <p><strong>Origin:</strong> ${properties.origin_city} (${properties.origin_coords.join(', ')})</p>
                <p><strong>Destination:</strong> ${properties.destination_city} (${properties.destination_coords.join(', ')})</p>
                <p><strong>Status:</strong> ${properties.status}</p>
                ${properties.route_distance ? `<p><strong>Distance:</strong> ${properties.route_distance} km</p>` : ''}
            </div>
        `;
        
        line.bindPopup(popupContent);
    }

    createClusterPopup(flights) {
        const count = flights.length;
        const sample = flights[0].properties;
        
        return `
            <div class="flight-info">
                <h4>${count} Flights on this Route</h4>
                <p><strong>Origin:</strong> ${sample.origin_city}</p>
                <p><strong>Destination:</strong> ${sample.destination_city}</p>
                <p><strong>Date Range:</strong> ${this.getDateRange(flights)}</p>
                <p><strong>Flight Numbers:</strong> ${this.getUniqueFlightNumbers(flights)}</p>
            </div>
        `;
    }

    getDateRange(flights) {
        const dates = flights.map(f => new Date(f.properties.simplified_departure_date));
        const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
        const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];
        return `${minDate} to ${maxDate}`;
    }

    getUniqueFlightNumbers(flights) {
        const numbers = [...new Set(flights.map(f => f.properties.ident))];
        return numbers.slice(0, 5).join(', ') + (numbers.length > 5 ? '...' : '');
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlightMapVisualization();
});