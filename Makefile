push:
	source ./.secrets && balena push 352b0b6.local --env APIKEY=$$APIKEY --env BUSSTOP=$$BUSSTOP
