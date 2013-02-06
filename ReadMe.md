# AngularJS + Typescript playground #

## why ##
this is to help jason (and maybe all novaleaf app team members) learn

- javascript
- typescript
- angularjs
- the tools of the (webdev) trade

## VIEWING THIS FILE (and others in markdown format) ##
[install this chrome .md plugin](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl/details?hl=en)

- to view local files, you need to enable it in your chrome extensions settings menu.
- FYI, the Web Essentials plugin (for visual studio, see below) provides editor functionality for markdown
- [markdown syntax is described here](http://daringfireball.net/projects/markdown/syntax)

## things to install (windoze dev specific) ##


### source control ###
*install github first if you want it to auto-set your user info*

- [github for windows](https://help.github.com/articles/set-up-git)
- [msysgit for windows](http://msysgit.github.com/)

### VS ide ecosystems ###
- visual studio
- [typescript](http://www.typescriptlang.org/) (currently using 0.8.2, but we should investigate one of the newer builds)
- [visual studio extensions](http://visualstudiogallery.msdn.microsoft.com/) (make sure you get the vs 2012 versions of these)
	- Web Essentials
	- Brace Completer
	- Chutzpah Test Adapter
	- Git Source Control Provider  
		- afterwards, go to the settings and set VS as your diff viewer
	- Productivity Power Tools
	- and if you want better markdown editing than provided by web essentials, [try this](http://visualstudiogallery.msdn.microsoft.com/0855e23e-4c4c-4c82-8b39-24ab5c5a7f79?SRC=VSIDE) (i have not)

### sublime text 2 ide ###
this is basically a replacement for notepad++, 
not because there's anythign wrong with notepad++, 
but because sublime supports syntax via plugins

- get sublime [from here](http://www.sublimetext.com/2)
- get the [typescript plugin from here](https://github.com/raph-amiard/sublime-typescript), 
but it doesn't seem complete, so maybe if you need more, you can [search for something better](http://stackoverflow.com/questions/12845412/typescript-plugin-for-sublime)

### build and library integration tools ###

- [nodejs /npm](http://nodejs.org/)
- [Typescript definition package manager (TSD)](https://github.com/Diullei/tsd)
	- for use with the d.ts files from [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped)




### debugging tools / stuff ###

- [live page extension for chrome](https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh)
- turn on source map support in chrome dev settings to debug the .ts files

### learning angularjs ###
jason is following [this seemingly excelent tutorial on angular+typescript](https://github.com/addyosmani/todomvc/tree/gh-pages/labs/architecture-examples/angularjs_typescript)
lets hope it all works great!  (you can check the progress in the "*first-try*" subdirectory here)




