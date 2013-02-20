

@echo off
@echo .
@echo .
@echo ====================  ====================    ====================  
@echo ====================  START EXECUTING BATCH FILE: %0
@echo ====================  ====================    ====================  
@echo .
@echo .

@rem @echo off
set thisPath=%0

FOR /F %%I IN ("%0") DO SET thisDir=%%~dpI

set targetDir=%VS110COMNTOOLS%..\Packages\schemas\html\
set targetFile=xhtml_5.xsd
set sourceDir=%thisDir%
set sourceFile=xhtml_5-ng.xsd

@echo ------------------------------------
@echo PURPOSE OF THIS FILE:  install our xhtml5 schema with ng bindings into visual studio 2012.
@echo     you need to run this as administrator, and need to restart visual studio afterwards
@echo ------------------------------------
@echo .
@echo .


@rem @echo debug: verify paths are OK
@rem @echo %thisPath%
@rem @echo %thisDir%
@rem @echo %targetDir%
@rem @echo %sourceDir%



@echo backup original (if asks to overwrite, you should say no!)
copy "%targetDir%%targetFile%" "%targetDir%%targetFile%.ng.original" /-Y
@echo copy, overwriting xhtml5 schema 
xcopy "%sourceDir%%sourceFile%" "%targetDir%%targetFile%"  /Y

@echo .
@echo .
@echo ====================  ====================    ====================  
@echo ====================  FINISHED EXECUTING BATCH FILE: %0
@echo ====================  ====================    ====================  
@echo .
@echo .

pause
exit 0