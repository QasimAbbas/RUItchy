import json
import base64

from firebase import firebase
firebase = firebase.FirebaseApplication('https://rutgeritchy.firebaseio.com/', None)
result = firebase.get('/img', None)
print(result["string"])

imgdata = base64.b64decode(result["string"])
filename = 'some_image.jpg'  # I assume you have a way of picking unique filenames
with open(filename, 'wb') as f:
    f.write(imgdata)
