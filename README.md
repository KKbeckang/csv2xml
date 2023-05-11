# Single Page CVS to XML Tooling Components

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`


This is a React component using the Material-UI Data Grid library. The DataGridComponent is responsible for uploading a CSV file, parsing it, displaying it in a Data Grid with features such as filtering, sorting, and editing, and exporting the data in CSV, XML, and print formats.

The component uses several hooks and custom functions:

1. useState: It is used to manage the state of data, columns, and isLoading (for the loading indicator).
2. useGridApiRef: It is a hook that returns the apiRef object, which allows interaction with the Data Grid.
3. convertCSVToXML: This function takes the parsed CSV data and converts it into XML format.
4. parseCSV: This function parses the CSV text using the Papa.parse library and sets the data and columns states.
5. handleFileUpload: It handles the file upload event, reads the contents of the file, and calls the parseCSV function.
6. UploadMenuItem: This is a custom menu item component for uploading CSV files.
7. getXML: It takes the apiRef and extracts data from the grid, then calls convertCSVToXML to convert the data into XML format.
8. exportBlob: It takes a Blob and filename and exports the Blob as a file with the given filename.
9. XMLExportMenuItem: This is a custom menu item component for exporting the data in XML format.
10. GoToRowMenuItem: This is a custom menu item component for selecting a specific row in the Data Grid.
11. csvOptions and printOptions: These options configure the behavior of the CSV and print exports from the Data Grid.
12. CustomExportButton: It is a custom export button component that includes CSV, Print, and XML export menu items.
13. CustomToolbar: This is a custom toolbar component that includes the UploadMenuItem, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, CustomExportButton, and GoToRowMenuItem.

The main return statement of the component renders a DataGrid with the custom toolbar and a LinearProgress loading overlay.https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
