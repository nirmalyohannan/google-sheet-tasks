# Google Sheet Tasks Viewer

This project is a React application that displays tasks from a Google Sheet. It's designed to be embedded as a sidebar in Google Sheets using Google Apps Script.

## Linking with Google Sheets using Apps Script

To link this project with your Google Sheet, you'll need to use Google Apps Script. Follow these steps:

1.  Open your Google Sheet.
2.  Go to **Extensions > Apps Script**.
3.  This will open the Apps Script editor. If you have an existing `Code.gs` file, replace its content. Otherwise, create a new script file named `Code.gs`.
4.  Paste the following code into `Code.gs`:

    ```javascript
    function onOpen() {
      const ui = SpreadsheetApp.getUi();
      ui.createMenu('Task Manager')
          .addItem('Open Task Sidebar', 'showSidebar')
          .addToUi();
    }

    function showSidebar() {
      const data = getAllTasks();
      const stringfied = JSON.stringify(data);
      // console.log(stringfied); // For debugging
      const encoded = encodeURIComponent(stringfied);
      // console.log(encoded); // For debugging
      const html = HtmlService.createHtmlOutput(`
        <iframe
          src="https://nirmalyohannan.github.io/google-sheet-tasks/?data=${encoded}"
          width="100%"
          height="600"
          style="border: none;"></iframe>
      `).setTitle("React Task Viewer");

      SpreadsheetApp.getUi().showSidebar(html);
    }

    function getAllTasks() {
      const sheet = SpreadsheetApp.getActiveSheet();
      const data = sheet.getDataRange().getValues();
      const headers = data[0];

      return data.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
    }
    ```

5.  Save the script (File > Save or Ctrl+S/Cmd+S).
6.  Refresh your Google Sheet. You should now see a new menu item: **Task Manager > Open Task Sidebar**.
7.  Clicking **Open Task Sidebar** will open the task viewer in the sidebar, populated with data from your active sheet.

## Website URL

The React application is hosted on GitHub Pages and can be accessed via the following URL structure within the Apps Script:

`https://nirmalyohannan.github.io/google-sheet-tasks/?data=${encoded_data}`

Where `${encoded_data}` is the URL-encoded JSON string of your task data.

## How Data is Passed

1.  The `getAllTasks()` function in `Code.gs` reads all data from the active Google Sheet.
2.  It assumes the first row contains headers (column names).
3.  It converts each subsequent row into a JSON object where keys are the headers and values are the cell contents for that row.
4.  An array of these JSON objects is created.
5.  This array is then `JSON.stringify()`-ed and `encodeURIComponent()`-ed.
6.  The resulting encoded string is passed as a URL query parameter named `data` to the React application's URL.
7.  The React application (`App.tsx`) then retrieves this `data` parameter, decodes it, parses the JSON, and displays the tasks.

## Structure of Columns in Google Sheet

For the application to work correctly, your Google Sheet should have the following columns in the first row (headers). The order of columns does not strictly matter as long as the headers match these names, but the data types are important:

*   **`Date`**: The date of the task. (e.g., `2025-05-20` or any format recognized by `new Date()` in JavaScript. The app will format it to `DD Mon YYYY` like `20 May 2025`).
*   **`Task`**: A short description or title of the task (e.g., `Clean 1st floor`).
*   **`Category`**: The category of the task (e.g., `Other`, `Work`, `Personal`).
*   **`Duration(Minute)`**: The duration of the task in minutes (e.g., `120`). This must be a number.
*   **`Description`**: A more detailed description of the task (e.g., `-Book shelf cleaned`).

**Example Sheet Structure:**

| Date       | Task             | Category | Duration(Minute) | Description          |
|------------|------------------|----------|------------------|----------------------|
| 2025-05-20 | Clean 1st floor  | Other    | 120              | -Book shelf cleaned  |
| 2025-05-21 | Project Meeting  | Work     | 60               | Discuss project plan |
| 2025-05-21 | Grocery Shopping | Personal | 45               | Buy weekly groceries |

## Development

To run this project locally:

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

## Building for Production

To build the project for production:

`npm run build`

This will create a `dist` folder with the static assets.

## Deployment

The project is configured to deploy to GitHub Pages using the `gh-pages` package.

1.  Ensure your `package.json` has the correct `homepage` field (e.g., `"homepage": "https://your-username.github.io/your-repo-name"`). For this project, it is `"homepage": "https://nirmalyohannan.github.io/google-sheet-tasks"`.
2.  Run the deploy script: `npm run deploy`

This will build the project and push the contents of the `dist` folder to the `gh-pages` branch of your repository.
