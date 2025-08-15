# VK Picture Geosearching Tool

## Getting Started

### Create a Virtual Environment
In the project directory, create a virtualenv named `venv`

`$ virtualenv -p python3 venv`

Activate the virtual environment
`$ source venv/bin/activate`

Install the dependencies

`$ pip install -r requirements.txt`

Now, the environment is ready for execution.

### VK Requirements
In order to use the VKontakte API, one needs:
 * VKontakte account credentials (username and password)
 * VKontakte app id

In order to get a VKontakte app id:
1. Log in to VKontakte
2. [Create an Application](https://vk.com/editapp?act=create) on the VK Developers site
3. Select "Standalone Application"
4. Click "Connect Application"
5. Select "Settings" and grab the value listed under **Application ID**

### Google Maps Requirements
In order to use the Google Maps API, one needs:
 * Google's app key

In order to get a Google app key: [Source](https://developers.google.com/maps/documentation/embed/get-api-key)
1. Visit [Google Cloud Platform Console](https://cloud.google.com/console/google/maps-apis/overview) 
2. Log in using your account (Gmail)
3. Click the project drop-down and select or create the project for which you want to add an API key.
4. Click the menu button (top left) and select **APIs & Services > Credentials**.
5. On the **Credentials** page, click **Create credentials > API key**. 
	The **API key created** dialog displays your newly created API key.
6. Click **Close**. 
	The new API key is listed on the **Credentials** page under **API keys**. 
	(Optional: Remember to restrict the API key before using it in production for more security.)

### Script Config
Update the values in `config.py` with the ones retrieved in the steps before

## Running the Script
`$ export FLASK_APP=GG_Detector`

`$ flask run`

Wait for a couple of seconds. In a browser, visit http://127.0.0.1:5000/  

## Input Options
Option 1: From the user interface

Option 2: Go to the following link after filling the values on the right hand of the equal signs http://127.0.0.1:5000/result?latt=latitude&long=longitude&radius=RADIUS&startDate=MM/DD/YYYY&endDate=MM/DD/YYYY&numebrOfPosts=NUMBER
	  


## Output File(s)
The page will list the posts found

## WARNINGS:
- According to VK, radius works very approximately
- If you chose the 50000m radius, the result might contain posts that are far away from the center (more than 50000m)

