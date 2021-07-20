Notes to start correctly this proyect.

1st.- the docker container to execute this proyect is based on the notes of YtFzC60
2nd.- with the Docker file:
	a) create the Image:  docker build -t devnode_global_liveserver-npm:15.5.0-buster .
	or execute RunFirstOnce.bat
3th.- make the container: 
	docker run -it -p 80:8080 --name NodeDevLiveServer -v "%cd%":/home/node/app devnode_global_liveserver-npm:15.5.0-buster bash
	or execute 1-LiveServer_on.bat
