::Antonio Cortez 
::@kacorius 
::07/2021

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
        echo THE IMAGE ALREADY EXIST, RUN 1-LiveServer_on & echo.
        ) else ( 
            goto toCreate
        )

goto Fin

:toCreate
    if exist .\Dockerfile (
        echo "Creating image..."
        echo.
        docker build -t devnode_global_liveserver-npm:15.5.0-buster .
        echo.
        echo "The image is ready, run 1-LiveServer_on " & echo.
    ) else (
        echo "Dockerfile not exists, is very necessary"
        echo.
    )
goto Fin
     
:Fin
pause 
endlocal 