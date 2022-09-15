Figma Create Links
<img src="https://https://github.com/mojouy/figma-plugin-create-links/blob/main/repo-assets/Icon.png" alt="icon" height="50"></img>
# Create Links

This small plugin lets you grab as many frames as you like and generate a nice list for easy navigation through your project or components.



This includes:

Selecting 1 or multiple items
Able to customize the color of the font and list background
You can choose if you want to include the Page prefix to your links or not


This Figma plugin is made with lot's of love, and trying to suffice a need I constantly encounter on medium-large projects. Being able to quickly generate links and organise my views or flows in a dedicated project navigation area.

❤️ 

![](https://github.com/mojouy/figma-plugin-create-links/blob/main/repo-assets/cover.png)



## Development

Build for production
```
Code here
```
Below are the steps to get your plugin running. You can also find instructions at:

  https://www.figma.com/plugin-docs/setup/

This plugin template uses Typescript and NPM, two standard tools in creating JavaScript applications.

First, download Node.js which comes with NPM. This will allow you to install TypeScript and other
libraries. You can find the download link here:

  https://nodejs.org/en/download/

Next, install TypeScript using the command:

  npm install -g typescript

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

  npm install --save-dev @figma/plugin-typings

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "npm: watch". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
