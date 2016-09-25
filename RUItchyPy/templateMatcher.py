import json		#used to transfer image from mobile device to server 
import base64	#used to transfer image from mobile device to server
import numpy as np
import cv2

from firebase import firebase 	#used to convert JSON to base64
firebase = firebase.FirebaseApplication('https://rutgeritchy.firebaseio.com/', None)
result = firebase.get('/img', None)
print(result)

#used to convert base64 to a .JPG that we can analyze.
imgdata = base64.b64decode(result['string'])
filename = 'image_to_be_analyzed.jpg' 
with open(filename, 'wb') as f:
    f.write(imgdata)

def analyze():
	flag = False	#flag is used as an 'output', so that we can see whether the image was analyzed with positive results or not.
	img_bgr = cv2.imread('image_to_be_analyzed.jpg')	
	img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY) #adds a grayscale to the image to be analyzed. Didn't have enough time to fully flesh out why, but it has something to do with scaling.

	template = cv2.imread('template.jpg',0)	#the 'template' that we're checking the image_to_be_analyzed against.
	w, h = template.shape[::-1]

	res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
	threshold = 0.5		#our threshold value. The higher it is, the more 'accurate' we will be. However, for the purposes of demoing, it is set at a reasonable value.
	loc = np.where(res >= threshold)

	for pt in zip(*loc[::-1]):
		cv2.rectangle(img_bgr, pt, (pt[0]+w, pt[1]+h), (0,255,255), 2)
		flag = True		#if a rectangle/match is found, we'll have a match!
		break

	cv2.imshow('detected', img_bgr) # Part of a UI feature that shows us the picture post analysis. Can be removed at our discretion.
	
	print flag
	return

analyze();
cv2.waitKey(1) # Part of a UI feature that shows us the picture post analysis. Can be removed at our discretion.
