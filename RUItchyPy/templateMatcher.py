import json
import base64
import numpy as np
import cv2

from firebase import firebase
firebase = firebase.FirebaseApplication('https://rutgeritchy.firebaseio.com/', None)
result = firebase.get('/img', None)
print(result)

imgdata = base64.b64decode(result['string'])
filename = 'some_image.jpg'  # I assume you have a way of picking unique filenames
with open(filename, 'wb') as f:
    f.write(imgdata)

img_bgr = cv2.imread('some_image.jpg')
img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

template = cv2.imread('template.jpg',0)
w, h = template.shape[::-1]

res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
threshold = 0.8
loc = np.where(res >= threshold)

for pt in zip(*loc[::-1]):
	cv2.rectangle(img_bgr, pt, (pt[0]+w, pt[1]+h), (0,255,255), 2)

while(True):
	cv2.imshow('detected', img_bgr)
	
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break
