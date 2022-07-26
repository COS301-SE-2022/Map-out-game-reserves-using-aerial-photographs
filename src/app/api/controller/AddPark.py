import time
import requests
import sys


# Usage ParkName
#$ python AddPark.py <parkname --optional>
""" for i in range(1, len(sys.argv)):
    print("Argument:", i, " Value:",sys.argv[i]) """

# Get User Input
if(len(sys.argv) < 2):
    parkname = None
else:
    parkname = sys.argv[1]

def addPark(parkname):
    # Authenticate the function (defined here incase it needs to be called externally)
    res = requests.post('http://localhost:8000/api/token-auth/',data={'username':'thedylpickles1@gmail.com','password':'somethingeasy#1'}).json()
    token = res['token']

    # If a parkname is given
    if parkname:
        # See if a park already exists
        parkexists = requests.get('http://localhost:8000/api/projects/?name='+parkname,headers={'Authorization': 'JWT {}'.format(token)}).json()
        if(parkexists):
            print("Park Already Exists")
            return parkexists[0]['id']
        else:
            res = requests.post('http://localhost:8000/api/projects/',headers={'Authorization': 'JWT {}'.format(token)},data={'name': parkname}).json()
            print("New Park Added")
            return res['id']
    else:
        res = requests.post('http://localhost:8000/api/projects/',headers={'Authorization': 'JWT {}'.format(token)},data={'name': str(time.asctime(time.localtime(time.time())))}).json()
        print("New Default Park Added")
        return res['id']

addPark(parkname)