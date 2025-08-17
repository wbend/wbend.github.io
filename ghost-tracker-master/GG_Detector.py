import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

import requests
import datetime
from datetime import date
import time
from config import *

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# VK API Configuration
VK_BASE_URL = "https://api.vk.com/method"

# To allow changing the templates (html, css, javascript) while running the code
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Create Google Maps link
googleMapLink = 'https://maps.googleapis.com/maps/api/js?key=' + googleMapKey + '&libraries=places&callback=initMap'

def make_vk_request(method, params):
    """
    Make a request to VK API with proper error handling and rate limiting
    """
    url = f"{VK_BASE_URL}/{method}"
    
    # Add required parameters
    api_params = {
        'access_token': VK_SERVICE_TOKEN,
        'v': VK_API_VERSION,
        **params
    }
    
    try:
        response = requests.get(url, params=api_params)
        result = response.json()
        
        if 'error' in result:
            print(f"VK API Error in {method}: {result['error']}")
            return None
            
        return result.get('response', {})
        
    except Exception as e:
        print(f"Request error in {method}: {e}")
        return None

# Root route - redirect to login
@app.route('/')
def root():
    """Root route - redirect to login"""
    return redirect(url_for('login'))

# Login page route
@app.route('/login')
def login():
    """Login page route"""
    return render_template('login.html')

# Main application page (protected)
@app.route('/main')  
def main():
    """Main application page (protected)"""
    return render_template('index.html', googleMap=googleMapLink)

# DEBUG: Add a simple test route to make sure routing works
@app.route('/test')
def test():
    return "Test route works! Flask is running properly."

# when the /result page is called
@app.route('/result', methods=['POST', 'GET'])
def getInput():
    print(f"=== DEBUG: /result route called ===")
    print(f"Request method: {request.method}")
    print(f"Request args: {request.args}")
    print(f"Request form: {request.form}")
    
    try:
        ######################### Getting the input from the URL argument ############################
        lat = request.args.get('latt')
        long = request.args.get('long')
        rad = request.args.get('radius')
        startDate = request.args.get('startDate')  # get the startDate
        endDate = request.args.get('endDate')  # get the endDate
        count = request.args.get('numebrOfPosts')
        
        print(f"Parsed parameters:")
        print(f"  lat: {lat}")
        print(f"  long: {long}")
        print(f"  rad: {rad}")
        print(f"  startDate: {startDate}")
        print(f"  endDate: {endDate}")
        print(f"  count: {count}")
        
        inputList = [lat, long, rad, startDate, endDate, count]
        
        check = check_input(inputList)
        print(f"Input validation result: {check}")

        if not check["isCorrect"]:  # if the input is not correct
            print(f"Input validation failed: {check['ERROR']}")
            raise ValueError
        
        # if it is correct
        startDate = time.mktime(datetime.datetime.strptime(request.args.get('startDate'), "%m/%d/%Y").timetuple())  # convert to timestamp
        endDate = time.mktime(datetime.datetime.strptime(request.args.get('endDate'), "%m/%d/%Y").timetuple()) + 86399.0  # convert to timestamp + end of day
        count = int(request.args.get('numebrOfPosts'))
        inputList = [lat, long, rad, startDate, endDate, count]  # reconstruct the list
        
        print(f"Converted parameters:")
        print(f"  startDate timestamp: {startDate}")
        print(f"  endDate timestamp: {endDate}")
        print(f"  count: {count}")
        
        print("Calling getPosts...")
        picList = getPosts(inputList)  ## get the posts

        if picList is None:
            print("getPosts returned None")
            return redirect(url_for('ErrorInInput', ERROR_message="Failed to retrieve posts from VK API"), code=307)

        print(f"getPosts returned: {len(picList.get('items', []))} items")
        finalResult = groupData(picList)
        
        print(f"Final result summary:")
        print(f"  Total posts count: {finalResult['totalPostsCount']}")
        print(f"  Posts listed: {finalResult['totalPostsListed']}")
        print(f"  Users listed: {finalResult['totalUsersListed']}")
            
        # call result.html and send the required parameters
        return render_template("result.html", googleMap=googleMapLink, result=finalResult["groupedData"], 
                             postsCount=finalResult["totalPostsCount"], postsListed=finalResult["totalPostsListed"], 
                             usersListed=finalResult["totalUsersListed"])
                             
    except ValueError as e:
        print(f"ValueError: {e}")
        return redirect(url_for('ErrorInInput', ERROR_message=check["ERROR"]), code=307)
    except Exception as e:
        print(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return redirect(url_for('ErrorInInput', ERROR_message=f"Unexpected ERROR: {str(e)}"), code=307)

# if an error occurred, open the index.html and do an alert with the ERROR from the html file
@app.route('/ErrorInInput', methods=['POST', 'GET'])  # Added GET method
def ErrorInInput():
    error_message = request.args.get('ERROR_message', 'Unknown error')
    print(f"Error page called with: {error_message}")
    return render_template('index.html', googleMap=googleMapLink, ERROR=error_message)

def check_input(listOfInput):
    lat = listOfInput[0]
    long = listOfInput[1]
    rad = listOfInput[2]
    startDate = listOfInput[3]
    endDate = listOfInput[4]
    count = listOfInput[5]
    ERROR = "ERROR in handling the input:\n"
    isCorrect = True

    # check radius
    try:
        rad = int(rad)
    except (ValueError, TypeError):
        ERROR = ERROR + "- Radius must be an integer value\n"
        isCorrect = False
    else:
        if rad not in [100, 800, 2000, 6000, 50000]:
            ERROR = ERROR + "- The radius can only be one of these values ( 100 | 800 | 2000 | 6000 | 50000)\n"
            isCorrect = False

    # check count
    try:
        count = int(count)
    except (ValueError, TypeError):
        ERROR = ERROR + "- Number of posts value should be an integer \n"
        isCorrect = False
    else:
        if count < 0:
            ERROR = ERROR + "- Number of posts must be a positive number\n"
            isCorrect = False

    # check start date
    try:
        startDateStamp = time.mktime(datetime.datetime.strptime(startDate, "%m/%d/%Y").timetuple())
    except (ValueError, TypeError):
        ERROR = ERROR + "- Start Date is not correct (correct date format: MM/DD/YYYY)\n"
        isCorrect = False
    else:
        if startDateStamp > time.time():
            ERROR = ERROR + "- Start date must be the same or before the current date\n"
            isCorrect = False
        elif startDateStamp < time.mktime(datetime.datetime.strptime("10/10/2006", "%m/%d/%Y").timetuple()):
            ERROR = ERROR + "- Start date must be after October 9, 2006\n"
            isCorrect = False

    # check end date
    try:
        endDateStamp = time.mktime(datetime.datetime.strptime(endDate, "%m/%d/%Y").timetuple())
    except (ValueError, TypeError):
        ERROR = ERROR + "- End date is not correct (correct date format: MM/DD/YYYY)\n"
        isCorrect = False
    else:
        if 'startDateStamp' in locals() and endDateStamp < startDateStamp:
            ERROR = ERROR + "- End date must be the same or after the start date\n"
            isCorrect = False
        elif endDateStamp < time.mktime(datetime.datetime.strptime("10/10/2006", "%m/%d/%Y").timetuple()):
            ERROR = ERROR + "- End date must be after October 9, 2006\n"
            isCorrect = False

    # check longitude
    try:
        float(long)
    except (ValueError, TypeError):
        ERROR = ERROR + "- The longitude value should be a number\n"
        isCorrect = False
    else:
        if float(long) > 180 or float(long) < -180:
            ERROR = ERROR + "- The longitude value should be from -180 to 180\n"
            isCorrect = False

    # check latitude
    try:
        float(lat)
    except (ValueError, TypeError):
        ERROR = ERROR + "- The latitude value should be a number\n"
        isCorrect = False
    else:
        if float(lat) > 90 or float(lat) < -90:
            ERROR = ERROR + "- The latitude value should be from -90 to 90\n"
            isCorrect = False

    return {'isCorrect': isCorrect, 'ERROR': ERROR}

def getPosts(parameters):
    """
    Get posts using the updated VK API
    """
    print(f"getPosts called with parameters: {parameters}")
    
    postsCount = parameters[5]
    postsLeft = postsCount
    picList = {}
    
    # Parameters for VK API
    search_params = {
        'lat': parameters[0],
        'long': parameters[1],
        'start_time': int(parameters[3]),
        'end_time': int(parameters[4]),
        'radius': parameters[2],
        'sort': 1  # Sort by date
    }
    
    print(f"VK API search params: {search_params}")
    
    if postsCount == 0:  # if the count was 0, it means the user wants all the data
        search_params['count'] = 1000
        print("Making VK API request...")
        picList = make_vk_request('photos.search', search_params)
        
        if picList is None:
            print("VK API request failed")
            return None
            
        print(f"VK API returned: {picList}")
        postsCount = picList.get("count", 0)
        postsLeft = postsCount - len(picList.get('items', []))
        print(f"Found {postsCount} total posts, got {len(picList.get('items', []))} items")
    
    # For now, let's skip the pagination logic and just return what we have
    return picList

def getAllUsers(picList):
    """
    Get all users information using the updated VK API
    """
    items = picList.get("items", [])
    if not items:
        return {"usersInfo": [], "totalUsersListed": 0}
        
    listOfUsersIds = []
    users_info = []
    
    for item in items:
        if item["owner_id"] not in listOfUsersIds:
            listOfUsersIds.append(item["owner_id"])

    totalUsersListed = len(listOfUsersIds)
    
    # Get users in batches of 500
    for i in range(0, totalUsersListed, 500):
        batch = listOfUsersIds[i:i + 500]
        
        user_params = {
            'user_ids': ','.join(map(str, batch)),
            'fields': 'first_name,last_name,photo_max_orig'
        }
        
        batch_users = make_vk_request('users.get', user_params)
        
        if batch_users:
            users_info.extend(batch_users)
        
        # Rate limiting
        time.sleep(0.34)

    return {"usersInfo": users_info, "totalUsersListed": totalUsersListed}

def getSingleUserData(user_id):
    """
    Get a single user's data
    """
    user_params = {
        'user_ids': str(user_id),
        'fields': 'first_name,last_name,photo_max_orig'
    }
    
    user_data = make_vk_request('users.get', user_params)
    return user_data if user_data else []

def getPostData(item):
    """
    Extract post data from VK API response
    """
    owner_id = item['owner_id']
    post_id = item['id']
    post_date = datetime.datetime.fromtimestamp(item['date']).strftime('%m/%d/%Y')
    post_picture_url = item['sizes'][-1]['url']  # Get the largest size
    post_url = f"https://vk.com/id{owner_id}?z=photo{owner_id}_{post_id}"
    
    return {
        'post_url': post_url,
        'post_date': post_date,
        'post_picture_url': post_picture_url
    }

def getUserData(usersInfo, user_id):
    """
    Get user data from the users info list
    """
    user_info = None
    
    if user_id > 0:
        for item in usersInfo:
            if item["id"] == user_id:
                user_info = item
                break
        
        if user_info is None:
            single_user = getSingleUserData(user_id)
            user_info = single_user[0] if single_user else None
            
        if user_info:
            user_name = f"{user_info['first_name']} {user_info['last_name']}"
            user_profile_picture = user_info.get('photo_max_orig', '')
            user_url = f"https://vk.com/id{user_info['id']}"
        else:
            user_name = "UNKNOWN USER"
            user_profile_picture = ""
            user_url = ""
    else:
        user_name = "DELETED"
        user_profile_picture = ""
        user_url = ""
    
    return {
        'user_name': user_name,
        'user_profile_picture': user_profile_picture,
        'user_url': user_url
    }

def groupData(photo_dict):
    """
    Group data by users
    """
    if photo_dict is None:
        return {"groupedData": {}, "totalPostsCount": 0, "totalPostsListed": 0, "totalUsersListed": 0}
    
    usersInfo = getAllUsers(photo_dict)
    totalUsersListed = usersInfo["totalUsersListed"]
    usersInfo = usersInfo["usersInfo"]
    totalPostsCount = photo_dict.get("count", 0)
    totalPostsListed = len(photo_dict.get("items", []))
    groupedDict = {}
    
    for item in photo_dict.get('items', []):
        user_id = item['owner_id']
        
        if user_id in groupedDict:
            groupedDict[user_id]['posts'].append(getPostData(item))
        else:
            groupedDict[user_id] = {'user_data': {}, 'posts': []}
            groupedDict[user_id]['user_data'] = getUserData(usersInfo, user_id)
            groupedDict[user_id]['posts'] = [getPostData(item)]
            
    return {
        "groupedData": groupedDict,
        "totalPostsCount": totalPostsCount,
        "totalPostsListed": totalPostsListed,
        "totalUsersListed": totalUsersListed
    }

if __name__ == '__main__':
    print("Starting Flask app...")
    print("Routes available:")
    for rule in app.url_map.iter_rules():
        print(f"  {rule.endpoint}: {rule.rule} {list(rule.methods)}")
    
    app.run(debug=True, host='127.0.0.1', port=5000)