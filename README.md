# Data Grid Component with Material-UI For Factorial Inc

**Author : Rongda Kang by 5/11/2023**

This React component uses the Material-UI Data Grid library to display and manipulate tabular data. It allows users to upload a CSV file, parse it, and display it in a customizable grid with features such as filtering, sorting, and editing. The data can be exported in CSV, XML, and print formats.

## Building and Debugging

This project was created using Create React App. To build and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/KKbeckang/csv2xml.git`
2. Install dependencies: `cd csv2xml && npm install`
3. Start the development server: `npm start`
4. Open your browser to `http://localhost:3000` to see the app running.

To debug the app, you can use the built-in developer tools in your browser. Additionally, you can use the `console.log` function to print debug information to the console.

## Usage

To use this component, simply import it into your React project and add it to your JSX code:

```jsx
import DataGridComponent from './DataGridComponent';

function App() {
  return (
    <div className="App">
      <DataGridComponent />
    </div>
  );
}
```

## Features

This component uses several hooks and custom functions to provide the following features:

- **Upload CSV**: Users can upload a CSV file with their data and have it displayed in the grid.

- **Filtering**: Users can filter the data based on column values.

- **Sorting**: Users can sort the data based on column values.
- 
- **Filtering**: Users can filter the data based on column values.

- **Clear All Filter/Sort**: Users deactivate all the filter and sorting activated.

- **Editing**: Users can edit the data directly in the grid.

- **Export CSV**: Users can export the data in CSV format.

- **Export XML**: Users can export the data in XML format.

- **Export Print**: Users can export the data in a printable format.

- **Go to Row**: Users can select a specific row in the grid.

- **ALERT When Exporting XML** : To Ensure the Data Out Put is correct the Filters should be 

## Customization

This component also allows for customization of the toolbar and export options through the following components:

- **UploadMenuItem**: A custom menu item component for uploading CSV files.

- **XMLExportMenuItem**: A custom menu item component for exporting the data in XML format.

- **GoToRowMenuItem**: A custom menu item component for selecting a specific row in the Data Grid.

- **ClearALLMenuItem**: A custom menu item component for deactivatet all filters and sorting in the Data Grid.

- **CustomExportButton**: A custom export button component that includes CSV, Print, and XML export menu items.

- **CustomToolbar**: A custom toolbar component that includes the UploadMenuItem, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, CustomExportButton, and GoToRowMenuItem.


Users can also configure the behavior of the CSV and print exports using the `csvOptions` and `printOptions` properties.

## Technology Used

- **React.js**: A JavaScript library for building user interfaces. It's used in this project to build the UI components.

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It's used in this project to run the development server and build the application for production.

- **Material UI**: A popular React UI framework with a set of React components that implement Google's Material Design. In this project, it's used to style the application and provide a responsive layout.

- **Papa Parser**: A powerful, in-browser CSV parser. In this project, it's used to parse CSV data into a format that can be used in the Data Grid.

- **Data Grid**: A feature-rich control for displaying data in a tabular format. Its functionalities in this project include data binding, editing, filtering, custom sorting, and more.


