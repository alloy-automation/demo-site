# lukewarm.coffee
A playground for all coding things
# Alloy Automation Demo Site README

## Introduction

This repository hosts the Alloy Automation Demo Site, showcasing how to build an integration marketplace using Alloy's APIs and SDKs. By inserting your API key, you can connect to Alloy's platform and access the integration marketplace, simulating the marketplace setup process.

## Quick Start

```bash
git clone [repository-url]
cd [local-repository]
npm install
```

## Setup

You will need your Alloy API key to use this demo. Find it in your Alloy Embedded account settings. For safety, use the development API key, which is only stored for the session's duration.

## Running the Demo Site

Start the server:

```bash
npm start
```

Open `http://localhost:3000` in your browser and enter your Alloy API key when prompted.

## Features

- Dynamically loads the integrations you have released in your Alloy account.
- Connect and set up integrations through the user interface.

For more information on how integrations are structured in Alloy, visit the [Alloy documentation](https://docs.runalloy.com/docs/integrations).

## Directory Structure Overview

```
.
├── app.js                   # Express server entry point
├── bin/www                  # Server startup script
├── public                   # Static assets (CSS, JS)
│   ├── css/main.css         # CSS styles
│   ├── scripts              # Client-side JavaScript
│   └── stylesheets          # SCSS styles
├── routes/index.js          # Server-side routes
└── views                    # EJS templates and partials
```

## Contributing

Contributions are welcome! Fork this repository, make your changes, and create a pull request.

## License

This project is released under the [MIT License](LICENSE.md).

---

**Disclaimer:** This README assumes a certain level of understanding of Node.js and npm. It is provided as a guide and should be customized to suit your project's needs.
