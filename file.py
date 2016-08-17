import json

with open('currWeather.json') as file:
    thing = json.load(file)
    file.close()

with open('prevWeather.json') as file:
    yestr = json.load(file)
    file.close()    

yesterHigh = yestr["history"]["dailysummary"][0]["maxtempi"]
yesterLow = yestr["history"]["dailysummary"][0]["mintempi"]

todayHigh = thing["forecast"]["simpleforecast"]["forecastday"][0]["high"]["fahrenheit"] 
todayLow = thing["forecast"]["simpleforecast"]["forecastday"][0]["low"]["fahrenheit"]

print(todayHigh)

yesterMean = (int(yesterHigh) + int(yesterLow)) / 2 
todayMean = (int(todayHigh) + int(todayLow)) / 2
diffMean = (int(todayMean) - int(yesterMean))

# if (diffHigh < 0):
# 	print("Today's high temperature is " + str(abs(diffHigh)) + " degree(s) cooler than yesterday")

# if (diffHigh > 0):
# 	print("Today's high temperature is " + str(diffHigh) + " degree(s) warmer than yesterday")	

# if (diffHigh == 0) :
# 	print("Today's temperature is same yesterday which was " + todayHigh)

# if (diffLow < 0):
# 	print("Today's low temperature is " + str(abs(diffLow)) + " degree(s) cooler than yesterday")

# if (diffLow > 0):
# 	print("Today's low temperature is " + str(diffLow) + " degree(s) warmer than yesterday")	

# if (diffLow == 0) :
# 	print("Today's temperature is same yesterday which was " + todayLow)

if (diffMean < 0):
	print("Today's temperature is " + str(abs(diffMean)) + " degree(s) cooler than yesterday")

if (diffMean > 0 ):
	print("Today's temperature is " + str(diffMean) + " degree(s) warmer than yesterday")

if (diffMean == 0):
	print("Today's temperature is same as yesterday which was a high of" + todayHigh + " degree(s) and a low of " + todayLow + " degree(s)")

# print(yesterHigh)
# print(yesterLow)

# print (todayHigh)
# print (todayLow)