// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 320, height: 340, title: 'Generate Links' })

// figma.on("selectionchange", () => {
//   //Logic to detect which UI to show, if none selected we show message
//   if (figma.currentPage.selection.length === 0) {
//     figma.notify('Please select at least 1 Frame') 
//   }
// })

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  if (msg.type === 'actionGenerate' && figma.currentPage.selection.length > 0) {
    //get the number of selected elements
    let selectedElements = figma.currentPage.selection
    const { includePagePrefix, linkColor, bgColor } = msg.formDataObj
    console.log(includePagePrefix);
    

    // Conber Hex value to RGB
    // Function based on this thread: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const hexToRgb = (hex: string) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const colorR = hexToRgb(linkColor)!.r / 255,
      colorG = hexToRgb(linkColor)!.g / 255,
      colorB = hexToRgb(linkColor)!.b / 255

    const bgColorR = hexToRgb(bgColor)!.r / 255,
      bgColorG = hexToRgb(bgColor)!.g / 255,
      bgColorB = hexToRgb(bgColor)!.b / 255

    // Create a frame and give name
    const parentFrame = figma.createFrame()

    parentFrame.name = 'Project Navigation'

    // Add AutoLayout to the frame and set the direction, padding, spacing and sizing mode
    parentFrame.layoutMode = 'VERTICAL'
    parentFrame.paddingLeft = 20
    parentFrame.paddingRight = 20
    parentFrame.paddingTop = 20
    parentFrame.paddingBottom = 20
    parentFrame.itemSpacing = 20
    // Set resizing to hug content on both axis
    parentFrame.primaryAxisSizingMode = 'AUTO'
    parentFrame.counterAxisSizingMode = 'AUTO'
    parentFrame.fills = [{ type: 'SOLID', color: { r: bgColorR, g: bgColorG, b: bgColorB } }]

    //Get Page and define Prefix for it
    const pageName = figma.currentPage.name
    let filePrefix = (includePagePrefix === 'true') ? (pageName + ' / ') : ''
    
    async function createNewTextStyle(index : any, id: any, name: any) {
      const text = figma.createText()

      // Move to (50, 50)
      text.x = 50
      text.y = 50 * (index + 1)

      if (text.fontName !== figma.mixed) {
        await figma.loadFontAsync(text.fontName)        
      }

      text.characters = '🔗 ' + filePrefix + name

      // Set bigger font size and red color
      text.fontSize = 18
      text.fills = [{ type: 'SOLID', color: { r: colorR, g: colorG, b: colorB } }]
      text.textDecoration = 'UNDERLINE'
      text.hyperlink = { type: 'NODE', value: id }
      parentFrame.appendChild(text)
    }

    // Grab each element selected and generate the text with link
    selectedElements.forEach((element, index) => {
      //get the id of selected element
      const { id, name } = element

      createNewTextStyle(index, id, name)
      // Select and Zoom to generated Frame
      const selectFrame: FrameNode[] = []
      selectFrame.push(parentFrame)
      figma.currentPage.selection = selectFrame
      figma.viewport.scrollAndZoomIntoView(selectFrame)
    })

  } else if (msg.type === 'actionExit') {
    figma.closePlugin('Sorry see u leave')
  } else {
    figma.notify('👀 Select at least 1 Frame 👀')
  }
};
