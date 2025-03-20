class FlightMapVisualization {
    constructor() {
        this.map = null;
        this.aircraftData = new Map(); // Map of aircraft ID to GeoJSON data
        this.visibleFlights = new Map(); // Map of route key to polyline layer
        this.routeGroups = new Map(); // Map of route key to array of flight features
        this.DISTANCE_THRESHOLD = 50;
        this.modal = null;
        this.currentFlights = null;
        
        // Year filter properties
        this.availableYears = new Set();
        this.selectedYear = null; // null means all years
        
        // Aircraft info modal
        this.aircraftInfoModal = null;
        
        // Basic aircraft configuration - minimal info needed before CSV loads
        this.aircraft = [];
        this.aircraftInfoLoaded = false;
        
        // Add click handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('see-all-button')) {
                const routeKey = e.target.dataset.routeKey;
                const flights = this.routeGroups.get(routeKey);
                if (flights) {
                    this.showAllFlights(flights);
                }
            }
            
            // Add handler for aircraft info buttons
            if (e.target.classList.contains('aircraft-info-button') || e.target.closest('.aircraft-info-button')) {
                const button = e.target.classList.contains('aircraft-info-button') ? 
                    e.target : e.target.closest('.aircraft-info-button');
                const aircraftId = button.dataset.aircraft;
                this.showAircraftInfo(aircraftId);
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
        
        try {
            // First load aircraft info from CSV
            await this.loadAircraftInfo();
            
            // Then set up controls that depend on aircraft info
            this.setupAircraftControls();
            this.setupDistanceControls();
            this.setupYearFilter();
            this.setupAircraftInfoModal();
            
            // Load flight data for all aircraft
            await this.loadAircraftData();
            this.updateVisualization();
        } catch (error) {
            console.error('Error initializing map:', error);
            alert('Error loading flight data. Please try again later.');
        }
    }

    async loadAircraftInfo() {
        try {
            const response = await fetch('aircraft-info.csv');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const csvText = await response.text();
            
            // Parse CSV
            const lines = csvText.split('\n');
            const headers = lines[0].split(',');
            
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                const values = this.parseCSVLine(lines[i]);
                const aircraft = {};
                
                // Map CSV columns to aircraft properties
                headers.forEach((header, index) => {
                    aircraft[header] = values[index] || '';
                });
                
                // Set required properties for visualization
                aircraft.id = aircraft.id;
                aircraft.file = aircraft.file;
                aircraft.color = aircraft.color;
                aircraft.visible = true;
                aircraft.loaded = false;
                aircraft.data = null;
                
                this.aircraft.push(aircraft);
            }
            
            this.aircraftInfoLoaded = true;
            console.log(`Loaded information for ${this.aircraft.length} aircraft`);
            
        } catch (error) {
            console.error('Error loading aircraft info:', error);
            alert('Error loading aircraft information. Using default configuration.');
            
            // Fallback to default aircraft config if CSV fails to load
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
            ];
        }
    }
    
    // Helper function to correctly parse CSV lines (handling quoted fields with commas)
    parseCSVLine(line) {
        const result = [];
        let currentValue = '';
        let insideQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                result.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        
        // Add the last value
        result.push(currentValue);
        
        return result;
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
        // Create aircraft checkboxes dynamically based on loaded aircraft info
        const controlsContainer = document.querySelector('.checkbox-group');
        
        // Clear existing checkboxes if any
        controlsContainer.innerHTML = '';
        
        // Create checkbox for each aircraft
        this.aircraft.forEach(aircraft => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'aircraft';
            checkbox.value = aircraft.id;
            checkbox.checked = aircraft.visible;
            
            const colorIndicator = document.createElement('span');
            colorIndicator.className = 'color-indicator';
            colorIndicator.style.backgroundColor = aircraft.color;
            
            const textNode = document.createTextNode(aircraft.id);
            
            const infoButton = document.createElement('button');
            infoButton.className = 'aircraft-info-button';
            infoButton.dataset.aircraft = aircraft.id;
            infoButton.innerHTML = '<i class="info-icon">i</i>';
            infoButton.title = `Show information about ${aircraft.id}`;
            
            label.appendChild(checkbox);
            label.appendChild(colorIndicator);
            label.appendChild(textNode);
            label.appendChild(infoButton);
            
            controlsContainer.appendChild(label);
            
            // Add checkbox change handler
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
    
    setupYearFilter() {
        // Create UI elements for year filter
        const controls = document.querySelector('.control-panel');
        
        const yearControlsDiv = document.createElement('div');
        yearControlsDiv.className = 'year-controls';
        
        const yearFilterP = document.createElement('p');
        yearFilterP.textContent = 'Filter by Year:';
        
        const yearSelectDiv = document.createElement('div');
        yearSelectDiv.className = 'year-select';
        
        // Create the dropdown
        const yearSelect = document.createElement('select');
        yearSelect.id = 'year-filter';
        
        // Add default "All Years" option
        const allYearsOption = document.createElement('option');
        allYearsOption.value = '';
        allYearsOption.textContent = 'All Years';
        yearSelect.appendChild(allYearsOption);
        
        // We'll populate the other options once data is loaded
        
        yearSelect.addEventListener('change', (e) => {
            this.selectedYear = e.target.value ? e.target.value : null;
            this.updateVisualization();
        });
        
        yearSelectDiv.appendChild(yearSelect);
        yearControlsDiv.appendChild(yearFilterP);
        yearControlsDiv.appendChild(yearSelectDiv);
        
        // Add to controls after the distance controls
        const groupingControls = document.querySelector('.grouping-controls');
        groupingControls.after(yearControlsDiv);
    }
    
    setupAircraftInfoModal() {
        // Create modal elements if they don't exist
        if (!document.getElementById('aircraft-info-modal')) {
            const modalHTML = `
                <div id="aircraft-info-modal" class="modal">
                    <div class="modal-content aircraft-modal-content">
                        <div class="modal-header">
                            <h2>Aircraft Information</h2>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="modal-body aircraft-info-body">
                            <!-- Aircraft info will be inserted here -->
                        </div>
                    </div>
                </div>
            `;
            
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer.firstElementChild);
            
            this.aircraftInfoModal = document.getElementById('aircraft-info-modal');
            
            // Add close button handler
            const closeButton = this.aircraftInfoModal.querySelector('.close-modal');
            closeButton.onclick = () => {
                this.aircraftInfoModal.style.display = 'none';
            };
            
            // Close modal when clicking outside
            window.addEventListener('click', (event) => {
                if (event.target === this.aircraftInfoModal) {
                    this.aircraftInfoModal.style.display = 'none';
                }
            });
        } else {
            this.aircraftInfoModal = document.getElementById('aircraft-info-modal');
        }
    }
    
    showAircraftInfo(aircraftId) {
        if (!this.aircraftInfoModal) {
            this.setupAircraftInfoModal();
        }
        
        // Find the aircraft
        const aircraft = this.aircraft.find(a => a.id === aircraftId);
        if (!aircraft) return;
        
        // Get modal elements
        const modalTitle = this.aircraftInfoModal.querySelector('.modal-header h2');
        const modalBody = this.aircraftInfoModal.querySelector('.modal-body');
        
        // Generate HTML from aircraft data
        let htmlContent = this.generateAircraftInfoHTML(aircraft);
        
        // Update title and content
        modalTitle.textContent = `Aircraft: ${aircraft.id}`;
        modalBody.innerHTML = htmlContent;
        
        // Show modal
        this.aircraftInfoModal.style.display = 'block';
    }
    
    // Generate HTML content for aircraft info modal based on CSV data
    generateAircraftInfoHTML(aircraft) {
        let html = `
            <h3>${aircraft.model} (${aircraft.id})</h3>
            <p>${aircraft.description}</p>
        `;
        
        // Add aircraft details section if we have data
        if (aircraft.serial || aircraft.first_flight || aircraft.registration_date || aircraft.status) {
            html += `
                <div class="aircraft-info">
                    <h4>Aircraft Details</h4>
                    <ul>
            `;
            
            if (aircraft.operator) html += `<li><strong>Operator:</strong> ${aircraft.operator}</li>`;
            if (aircraft.model) html += `<li><strong>Model:</strong> ${aircraft.model}</li>`;
            if (aircraft.serial) html += `<li><strong>Serial:</strong> ${aircraft.serial}</li>`;
            if (aircraft.first_flight) html += `<li><strong>First Flight:</strong> ${aircraft.first_flight}</li>`;
            if (aircraft.registration_date) html += `<li><strong>Registration:</strong> ${aircraft.registration_date}</li>`;
            if (aircraft.status) html += `<li><strong>Status:</strong> ${aircraft.status}</li>`;
            
            html += `
                    </ul>
                </div>
            `;
        }
        
        // Add sanctions info if applicable
        if (aircraft.sanctions_status === 'Yes') {
            html += `
                <div class="sanctions-alert">
                    <h4>Sanctions Information</h4>
                    <p><strong>Sanctioned:</strong> ${aircraft.sanctions_date || 'Unknown'}</p>
                    <p><strong>Authority:</strong> ${aircraft.sanctions_authority || 'Unknown'}</p>
                    <p><strong>Sanctions Type:</strong> ${aircraft.sanctions_type || 'Unknown'}</p>
                    ${aircraft.sanctions_document ? `<p><strong>Document:</strong> ${aircraft.sanctions_document}</p>` : ''}
                    ${aircraft.sanctions_identifier ? `<p><strong>Identifier:</strong> ${aircraft.sanctions_identifier}</p>` : ''}
                    <p><strong>Reason:</strong> "${aircraft.sanctions_reason || 'Unknown'}"</p>
                </div>
            `;
        }
        
        // Add alert content if available
        if (aircraft.alert_content) {
            const alertClass = aircraft.alert_type === 'dual-use' ? 'aircraft-alert dual-use-alert' :
                              aircraft.alert_type === 'sanctions' ? 'sanctions-alert' : 'aircraft-alert';
            
            html += `<div class="${alertClass}">`;
            
            // Split by double pipe to handle multiple paragraphs
            const alertParagraphs = aircraft.alert_content.split('||');
            alertParagraphs.forEach(paragraph => {
                if (paragraph.trim()) {
                    html += `<p>${paragraph.trim()}</p>`;
                }
            });
            
            html += `</div>`;
        }
        
        // Add owner info if available
        if (aircraft.owner_info) {
            html += `
                <h4>About ${aircraft.operator || 'the Operator'}</h4>
                <p>${aircraft.owner_info}</p>
            `;
        }
        
        // Add activities if available
        if (aircraft.activities) {
            html += `
                <h4>Noteworthy Activities</h4>
                <ul>
            `;
            
            // Split by double pipe to handle multiple activities
            const activities = aircraft.activities.split('||');
            activities.forEach(activity => {
                if (activity.trim()) {
                    html += `<li>${activity.trim()}</li>`;
                }
            });
            
            html += `</ul>`;
        }
        
        // Add image if available
      //  if (aircraft.image_url) {
       //     html += `
       //         <div class="image-container">
       //             <img src="${aircraft.image_url}" alt="${aircraft.model} ${aircraft.id}" />
        //            <p class="caption">${aircraft.model} ${aircraft.id} (Source: Archive Photo)</p>
        //        </div>
       //     `;
    //    }
        
        return html;
    }

    showAllFlights(flights) {
        this.currentFlights = flights;
        const modalBody = this.modal.querySelector('.modal-body');
        
        const sortedFlights = [...flights].sort((a, b) => {
            const dateA = a.properties.simplified_departure_date ? new Date(a.properties.simplified_departure_date) : new Date(0);
            const dateB = b.properties.simplified_departure_date ? new Date(b.properties.simplified_departure_date) : new Date(0);
            return dateB - dateA; // Newest first
        });

        const firstFlight = flights[0].properties;
        
        // Update modal header
        const modalTitle = this.modal.querySelector('.modal-header h2');
        
        // Group origins and destinations for the header
        const originSet = new Set(flights.map(f => f.properties.origin_city || 'Unknown'));
        const destSet = new Set(flights.map(f => f.properties.destination_city || 'Unknown'));
        
        const originText = originSet.size > 3 ? 
            `${Array.from(originSet).slice(0, 3).join('/')} & others` : 
            Array.from(originSet).join('/');
        
        const destText = destSet.size > 3 ? 
            `${Array.from(destSet).slice(0, 3).join('/')} & others` : 
            Array.from(destSet).join('/');
        
        modalTitle.textContent = `${flights.length} Flights: ${originText} to ${destText}`;
        
        // Generate flight list HTML with year grouping
        const flightsByYear = {};
        
        sortedFlights.forEach(flight => {
            const year = flight.properties.simplified_departure_date ? 
                flight.properties.simplified_departure_date.split('-')[0] : 'Unknown';
            
            if (!flightsByYear[year]) {
                flightsByYear[year] = [];
            }
            
            flightsByYear[year].push(flight);
        });
        
        // Generate HTML with year sections
        let flightListHTML = '';
        
        for (const [year, yearFlights] of Object.entries(flightsByYear).sort((a, b) => b[0] - a[0])) {
            flightListHTML += `
                <div class="flight-year-section">
                    <h3 class="flight-year-header">${year}</h3>
                    <div class="flight-year-list">
            `;
            
            yearFlights.forEach(flight => {
                const props = flight.properties;
                const aircraft = this.aircraft.find(a => a.id === props.ident || a.id === props.registration);
                const aircraftColor = aircraft ? aircraft.color : '#999';
                const aircraftId = props.ident || props.registration || 'Unknown';
                const formattedDate = props.simplified_departure_date ? 
                    new Date(props.simplified_departure_date).toLocaleDateString() : 'Unknown Date';
                
                flightListHTML += `
                    <div class="flight-list-item">
                        <span class="aircraft-tag" style="background-color: ${aircraftColor}">${aircraftId}</span>
                        <strong>${formattedDate}</strong> - 
                        ${props.origin_code || 'Unknown'} → ${props.destination_code || 'Unknown'}
                        ${props.origin_city ? `(${props.origin_city} to ${props.destination_city || 'Unknown'})` : ''}
                    </div>
                `;
            });
            
            flightListHTML += `
                    </div>
                </div>
            `;
        }
        
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
                    
                    // Extract year for filtering with proper validation
                    if (feature.properties.simplified_departure_date) {
                        try {
                            // Ensure it's a valid date string
                            const dateStr = feature.properties.simplified_departure_date;
                            const dateParts = dateStr.split('-');
                            
                            // Only add if it's a valid year format (4 digits)
                            if (dateParts[0] && /^\d{4}$/.test(dateParts[0])) {
                                const year = dateParts[0];
                                this.availableYears.add(year);
                            }
                        } catch (e) {
                            // Skip invalid dates
                            console.debug("Skipped invalid date", feature.properties.simplified_departure_date);
                        }
                    }
                    
                    return feature;
                });
                
                aircraft.data = data;
                aircraft.loaded = true;
                console.log(`Loaded ${data.features.length} flights for ${aircraft.id}`);
                
                // Update year filter options
                this.updateYearOptions();
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
    
    updateYearOptions() {
        const yearSelect = document.getElementById('year-filter');
        
        // Clear existing year options (except All Years)
        while (yearSelect.options.length > 1) {
            yearSelect.remove(1);
        }
        
        // Add years in descending order (newest first)
        const sortedYears = Array.from(this.availableYears).sort((a, b) => b - a);
        
        sortedYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
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
                // Apply year filter if selected
                let features = aircraft.data.features;
                
                if (this.selectedYear) {
                    features = features.filter(feature => {
                        if (!feature.properties.simplified_departure_date) return false;
                        return feature.properties.simplified_departure_date.startsWith(this.selectedYear);
                    });
                }
                
                allFeatures = allFeatures.concat(features);
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
        
        // Group and count origins
        const originMap = new Map();
        flights.forEach(f => {
            const originKey = `${f.properties.origin_city || 'Unknown'} (${f.properties.origin_code || 'Unknown'})`;
            originMap.set(originKey, (originMap.get(originKey) || 0) + 1);
        });
        
        // Group and count destinations
        const destMap = new Map();
        flights.forEach(f => {
            const destKey = `${f.properties.destination_city || 'Unknown'} (${f.properties.destination_code || 'Unknown'})`;
            destMap.set(destKey, (destMap.get(destKey) || 0) + 1);
        });
        
        // Get top origins with counts
        const topOrigins = Array.from(originMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => `${name}${count > 1 ? ` (${count})` : ''}`)
            .join(', ');
        
        // Get top destinations with counts
        const topDestinations = Array.from(destMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => `${name}${count > 1 ? ` (${count})` : ''}`)
            .join(', ');
        
        // Append "and X more" if needed
        const originsText = originMap.size > 5 ? 
            `${topOrigins} and ${originMap.size - 5} more` : topOrigins;
        
        const destinationsText = destMap.size > 5 ? 
            `${topDestinations} and ${destMap.size - 5} more` : topDestinations;
        
        const popupContent = `
            <div class="flight-info">
                <h4>
                    <span class="aircraft-tag" style="background-color: ${aircraft.color}">${aircraft.id}</span>
                    ${flightCount} ${flightCount === 1 ? 'Flight' : 'Flights'} on this Route
                </h4>
                <p><strong>Origins:</strong> ${originsText}</p>
                <p><strong>Destinations:</strong> ${destinationsText}</p>
                <p><strong>Date Range:</strong> ${dateRange}</p>
                <p><strong>Route Distance:</strong> ${firstFlight.route_distance ? `${firstFlight.route_distance} km` : 'N/A'}</p>
                ${this.DISTANCE_THRESHOLD > 0 ? '<p><strong>Grouping Distance:</strong> ' + this.DISTANCE_THRESHOLD + ' km</p>' : ''}
                <p><strong>Recent Flights:</strong></p>
                <div style="border-left: 3px solid ${aircraft.color}; padding-left: 8px; max-height: 150px; overflow-y: auto;">
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