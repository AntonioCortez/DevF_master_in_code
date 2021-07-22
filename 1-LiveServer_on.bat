::Antonio Cortez 
::@kacorius 
::07/2021
::


@echo off 
docker -v && (
    goto isInstalled 
    ) || ( 
        echo. & echo YOU NEED INSTALL DOCKER & echo. & goto Fin 
    )

:isInstalled
    docker images && (
        goto isRunning 
    ) || ( 
        echo. & echo DOCKER DESKTOP IS NOT RUNNING & echo. & goto Fin 
    )
goto Fin

:isRunning
    for /f "tokens=1" %%a in ( 'docker images ^| findstr /C:"devnode_global_liveserver-npm"' ) do ( 
    set un=%%a 
    ) 
    echo.

    if "%un%"=="devnode_global_liveserver-npm " ( 
        goto run
        ) else ( 
            echo THE IMAGE NOT EXIST, MAY BE YOU NEED RUN RunFirstOnce & echo.
        )

goto Fin

:run
    
    for /f "tokens=*" %%a in ( 'docker ps ^| findstr /C:"NodeDevLiveServer"' ) do ( 
    set an=%%a 
    )

    for /f "tokens=*" %%a in ( 'docker ps -a ^| findstr /C:"NodeDevLiveServer" ^| findstr /C:"Exited ("' ) do ( 
    set ax=%%a 
    )

    if "%ax%"=="" (
        
        if "%an:~-18%"=="NodeDevLiveServer " (
            echo THE CONTAINER IS RUNNING
        ) else (
            if "%an%"=="" (
                ECHO DOCKER TO RUN CONTAINER & echo.
                docker run -it -p 80:8080 --name NodeDevLiveServer -v "%cd%":/home/node/app devnode_global_liveserver-npm:15.5.0-buster bash
            )
        )

    ) else (
        if "%ax:~-18%"=="NodeDevLiveServer " (
            echo THE CONTAINER IS STOPPED, WAKING UP CONTAINER...
            echo.
            docker start -i NodeDevLiveServer
            echo.
        )
    )
    
goto Fin
     
:Fin
endlocal 