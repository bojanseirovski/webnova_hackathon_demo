# Exodus Orbitals - Webnova Hackathon Demo

This repository serves as an example for the usage of https://github.com/bojanseirovski/webnova_hackathon. It applies the valid flow described there.
Although still buggy, it demonstrates what the responses of each API endpoint are.

The ```/data_download``` endpoint returns a AWS S3 bucket URL, in order to authenticate and get a download link, you will need the S3 bucket credentials.
These can be obtained from Exodus Orbitals.

## Setup and run the demo app
Make sure you update the ```src/configs/config.json``` with all of the parameters. 
The baseUrl, username, AWS keys etc., can be obtained from Exodus Orbitals.

To run the application locally
    yarn start


https://exodusorbitals.com/

