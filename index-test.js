const { convert } = require('convert-svg-to-png');
const fs = require ('fs');
const path = require('path');

// Function to convert local SVG to PNG and save it locally
// can be run with `node index-test.js`
// will output the file to the `./files` directory
const convertLocalSvgToPng = async (inputFilePath, outputFilePath) => {
    try {
        // Read the SVG file
        const svgData = fs.readFileSync(inputFilePath, 'utf-8');

        // Convert SVG to PNG
        const newFile = await convert(svgData, {width: 1000, height: 1000});
        fs.writeFileSync(outputFilePath, newFile);
        console.log(`Converted ${inputFilePath} to ${outputFilePath}`);
    } catch (err) {
        console.error(`Failed to convert file ${inputFilePath}: ${err.message}`);
    }
};

// Specify the input SVG file and the output PNG file
const inputSvgFile = './files/static_preview.svg';
const outputPngFile = './files/static_preview.png';

// Convert the SVG to PNG
convertLocalSvgToPng(inputSvgFile, outputPngFile);