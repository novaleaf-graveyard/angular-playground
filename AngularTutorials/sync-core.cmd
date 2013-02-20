

@echo off
@echo .
@echo .
@echo ====================  ====================    ====================  
@echo ====================  START EXECUTING BATCH FILE: %0
@echo ====================  ====================    ====================  
@echo .
@echo .

@rem @echo off

@rem @echo ------------------------------------
@rem @echo SET UP ENVIRONMENT HELPERS
@rem @echo ------------------------------------

@rem get location of the batch file
set thisPath=%0
FOR /F %%I IN ("%0") DO SET thisDir=%%~dpI

@rem get date
FOR /F "TOKENS=1* DELIMS= " %%A IN ('DATE/T') DO SET CDATE=%%B
FOR /F "TOKENS=1,2 eol=/ DELIMS=/ " %%A IN ('DATE/T') DO SET mm=%%B
FOR /F "TOKENS=1,2 DELIMS=/ eol=/" %%A IN ('echo %CDATE%') DO SET dd=%%B
FOR /F "TOKENS=2,3 DELIMS=/ " %%A IN ('echo %CDATE%') DO SET yyyy=%%B
SET date=%yyyy%%mm%%dd%


@rem @echo ------------------------------------
@rem @echo SET UP PURPOSE HELPERS
@rem @echo ------------------------------------


set targetDir=%thisDir%core
set sourceProject=Novaleaf-Core-Libraries
set sourceDir=%thisDir%..\..\%sourceProject%

@echo ------------------------------------
@echo PURPOSE OF THIS FILE:  copy a readonly version of our "%sourceProject%" for use inside this project
@echo ------------------------------------
@echo .
@echo .


@rem @echo debug: verify paths are OK
@rem @echo %thisPath%
@rem @echo %thisDir%
@rem @echo %targetDir%
@rem @echo %sourceDir%

@echo copy, mirroring source (Delete anything in dest that isn't in source)
@echo robocopy "%sourceDir%" "%targetDir%" /MIR /A+:R
robocopy "%sourceDir%" "%targetDir%" /MIR /A+:R
set targetReadme=%targetDir%\Readme.md
set readmeText=# READ-ONLY! any changes will be deleted.  this is a mirror of the '%sourceProject%' project

@attrib -R "%targetReadme%"
@echo replace %targetReadme% with "readonly" message
@echo %readmeText% >> "%targetReadme%"
@attrib +R "%targetReadme%"

@echo allow overwrites of .map and .js files, as VS (web essentials) likes to rebuild them all the time
pushd %targetDir%
attrib +R * /S /D
attrib -R *.map /S
attrib -R *.js /S
popd


@echo .
@echo .
@echo ====================  ====================    ====================  
@echo ====================  FINISHED EXECUTING BATCH FILE: %0
@echo ====================  ====================    ====================  
@echo .
@echo .

exit 0