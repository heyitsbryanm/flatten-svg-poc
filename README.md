# Overview

This is a POC of flattening SVG files uploaded to AWS using a Lambda function.

# Installation

1. Run `npm i` to install all required packages and modules
2. Create a Lambda function (Node v20.x) with a trigger for s3 `create` events
3. Set the trigger to filter for `.svg` filetypes
4. Upload the `./dist/bundle.zip` file to the code
5. Upload an `svg` file to your S3
6. (pending) The SVG will be modified to be flattened PNG file

# Testing

A quick test can be run using `node index-test.js`. This will take an input file (`static_preview.svg`) and convert that to a png file (`static_preview.png`).

# Todo

- [x] Set up a function to convert `svg` to `png`
- [ ] Configure Lambda to use puppeteer
