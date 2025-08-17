import os

# VK API Configuration - now from environment variables
VK_SERVICE_TOKEN = os.environ.get('VK_SERVICE_TOKEN', 'your-dev-token-here')
VK_API_VERSION = "5.131"

# Google Maps API - from environment variable
googleMapKey = os.environ.get('GOOGLE_MAPS_API_KEY', 'your-dev-key-here')

# Legacy settings (kept for compatibility)
app_id = "YOUR VK API ID"
username = 'VK USER NAME'
password = 'VK PASSWORD'