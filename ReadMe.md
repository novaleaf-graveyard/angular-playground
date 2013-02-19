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

- [github for windows](https://help.github.com/articles/set-up-git) official github client
- [msysgit for windows](http://msysgit.github.com/)  needed for VS integration, and also a prereq for...
- [tortoise git (for windows)](http://code.google.com/p/tortoisegit/) (so you have windows explorer integration too)

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
- configure Typescript files to use tabs, not spaces *__(Tools-->Options-->Text Editor-->Typescript-->Tabs)__*

### linux / osx ide ecosystems ###

things you should figure out (on your own)

1. install the typescript compiler
1. install the syntax highlighter
1. use tabs, not spaces to indent!
1. use jsHint (not jsLint) on your code (see the WE-settings.xml file for how to configure it)
1. figure out how to build the project (.ts files to .js)

the code should still be compatable,  so figure it out and please update this section!

### sublime text 2 ide ###
this is basically a replacement for notepad++, 
not because there's anythign wrong with notepad++, 
but because sublime supports syntax via plugins

- get sublime [from here](http://www.sublimetext.com/2)
- get the [typescript plugin from here](https://github.com/raph-amiard/sublime-typescript), 
but it doesn't seem to function 100% properly, but syntax highlighting works. so maybe if you need more, you can [search for something better](http://stackoverflow.com/questions/12845412/typescript-plugin-for-sublime)
	- FYI if you just want syntax coloring, an easier way is you can just unzip the following to a "Typescript" folder under plugins [Official Sublime Syntax](http://blogs.msdn.com/b/interoperability/archive/2012/10/01/sublime-text-vi-emacs-typescript-enabled.aspx)

### build and library integration tools ###

- [nodejs /npm](http://nodejs.org/)
- [Typescript definition package manager (TSD)](https://github.com/Diullei/tsd)
	- for use with the d.ts files from [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped)




### debugging tools / stuff ###

- [live page extension for chrome](https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh)
- turn on source map support in chrome dev settings to debug the .ts files
- install [Chrome AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk/related?hl=en)  you can find [info/instructions here](http://blog.angularjs.org/2012/07/introducing-angularjs-batarang.html)
	- you need to restart chrome for batarang to get loaded

### learning angularjs ###

- start by following the [angularjs intro tutorials](http://angularjs.org/) (scroll down)
- second, work through the [angular+typecript todoMVC](https://github.com/addyosmani/todomvc/tree/gh-pages/labs/architecture-examples/angularjs_typescript)
- then do the [official tutorial](http://docs.angularjs.org/tutorial/) (do it in typescript following the patterns given in the todoMVC!!!)

*note*

- jason is following [this seemingly excelent tutorial on angular+typescript](https://github.com/addyosmani/todomvc/tree/gh-pages/labs/architecture-examples/angularjs_typescript)
and when working through this, is updating __THIS readme__ based on the outcome!


### writing code ###

####html (use Emmet) ####
- can use [zen coding](http://code.google.com/p/zen-coding/) instead of writing normal HTML (this is supported by the web-essentials VS plugin)
	- [full syntax](http://code.google.com/p/zen-coding/wiki/ZenHTMLSelectorsEn)
	- [quick reference](http://www.johnpapa.net/zen-coding-in-visual-studio-2012/)
- __note__ seems that some of [Emmet](http://docs.emmet.io/) is supported in VS Web Essentials, so here is a [cheat sheet for emmet](http://docs.emmet.io/cheat-sheet/)  (use this in preference to zen coding syntax if possible!)




# steps jason took to learning Javascript et. al #
1. read "Javascript, the good parts"
1. do typescript online tutorial [here](http://www.typescriptlang.org/Tutorial/) 
	- ([jason's implementation here](TypeScriptQuickStart))
1. do samples in chapter 1 of the typescript documentation [here](http://go.microsoft.com/fwlink/?LinkId=267238)
	-  ([jason's implementation here](TypeScript-Language-Specs-Playground))
1. create this github project and document it
1. do angular js tutorials "The Basics" and "Add Some Control" ( from the [first page of the site](http://angularjs.org/#project-html))
	- try to use Emmet/Zen coding for the html sections
		- beware, zen expansion has a bug:   expansion of input[type=text name=name ng-model=project.name required]  currently misses the "name" tag (bug is filed with web essentials)
	- redo "Add Some Control" using Typescript interfaces / modules (called "AddSomeControlTypescripted" in the source)
	- ([jason's implementation here](AngularTutorials))
1. run into a brick wall when trying to look inside angularjs to see "how it works" (very complex internals, and [very poor documentation](http://docs.angularjs.org/api/angular.module)
	- investigating other frameworks (looking for something less "heavy") next i will try [Knockback](http://kmalakoff.github.com/knockback/)
1. create the [Typescript-Knockback-playground](https://github.com/Novaleaf/Typescript-Knockback-Playground) github project to give it a try
	- will start by recreating the [official knockback todoMVC tutorial](http://kmalakoff.github.com/knockback/app_todos.html) in typescript ([demo](http://kmalakoff.github.com/knockback-todos-app/))
1. original idea (now crossed-out) 
	- # thus i will not be updating this project any more unless i come back to angularjs... (i've moved to [Typescript-Knockback-playground](https://github.com/Novaleaf/Typescript-Knockback-Playground))
1. back to angular.js,  seems knockback is ok, but not very popular, and it juggles between 3 different frameworks...  
	- so going to plod thru the rest of the angular tutorials before deciding what to do next....
1. port my core libraries project to be used for all javascript projects (sync-core.cmd added here)



## todo
- look at angular DI methods like angular.module, $routeProvider.controller, etc and create interfaces for the provided services
	- and make sure people can effectively overwrite with their own....
