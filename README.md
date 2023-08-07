# CsvUploader
# Node.js Express File Upload App

This is a simple Node.js application built with Express to handle file uploads. Users can upload files, and the uploaded files will be saved in the "public" directory. The application uses EJS as the template engine for rendering views.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- Git (optional, for version control)

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_folder>
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and set the following environment variables:

   ```env
   PORT=<port_number>
   ```

   Replace `<port_number>` with the desired port (default is 8000).

5. Start the application:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:<port_number>`. You can access the application in your web browser.

## Usage

### File Upload

- **POST /:** Upload a file using a form on the home page. The uploaded files will be saved in the "public" directory.

### Frontend

The frontend is built using EJS templates and located in the `views` directory. The application uses Bootstrap for styling, and the CSS file is served from the `public` directory.

## Directory Structure

- `views/`: Contains the EJS templates used for rendering views.
- `public/`: Contains static assets such as CSS files.
- `routes/`: Contains the main application router.
- `uploads/`: The uploaded files will be saved in this directory.

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request. Please make sure to follow the coding conventions and include tests for any new features.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to the creators of Node.js, Express, and Multer for providing excellent tools for building web applications with file upload functionality.
