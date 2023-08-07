const fs = require('fs')
const path = require('path')
const testFolder = './uploads'


exports.delete = (req, res) =>{
    const filename = req.params.file;
    const filePath  = path.join(testFolder,filename)

    fs.unlink(filePath, function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
         return res.redirect("/")
    });
}
exports.getfileList = (req, res) =>{
    const files = fs.readdirSync(testFolder)
    console.log("List " ,files)
    return res.render("homePage",{files})
}

exports.uploadFiles = (req, res) => {
    console.log("body " , req.body);
    console.log("file " , req.file);
    return res.redirect("/")
}

exports.viewFiles = (req, res) => {
    const filename = req.params.filename;

    if (!filename) {
        return res.status(400).send("File name not provided.");
    }

    const filePath = path.join(testFolder, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading CSV file");
        }

        // Parse CSV data and render it in a table format
        const rows = data.split(/\r?\n/).map(row => row.split(/[,;]/)); // Split using , or ; as the delimiter
        const headers = rows.shift();

        return res.render("csvTable", { filename, headers, rows });
    });
};


exports.editFiles = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(testFolder, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading CSV file");
        }

        // Parse CSV data and render it in a table format
        const rows = data.split(/\r?\n/).map(row => row.split(/[,;]/)); // Split using , or ; as the delimiter
        const headers = rows.shift();

        return res.render("csvEdit", { filename, headers, rows, content: data });
    });
}

exports.saveEditedFiles = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(testFolder, filename);

    // Extract and process the edited data from req.body
    const rowIndices = Object.keys(req.body).map(key => key.match(/rows\[(\d+)\]/)).filter(match => match !== null);
    const numRows = Math.max(...rowIndices.map(match => parseInt(match[1]))) + 1;
    const numCols = Object.keys(req.body).filter(key => key.startsWith('header')).length;

    // Extract and process the edited header data from req.body
    const editedHeaders = [];
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const headerValue = req.body[`header[${colIndex}]`].trim();
        editedHeaders.push(headerValue);
    }

    // Read the original CSV file to get the unedited rows
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading CSV file");
        }

        // Parse CSV data and get the original rows
        const originalRows = data.split("\n").map(row => row.split(","));

        // Merge the edited and original rows to get the final rows
        const finalRows = Array.from({ length: numRows }, (_, rowIndex) => {
            if (rowIndex === 0) {
                return editedHeaders;
            } else {
                const editedRow = Array.from({ length: numCols }, (_, colIndex) => req.body[`rows[${rowIndex - 1}][${colIndex}]`]);
                return editedRow.length === 0 ? originalRows[rowIndex] : editedRow;
            }
        });

        // Convert the finalRows back to CSV format
        const csvContent = finalRows.map(row => row.join(',')).join('\n');

        // Save the updated data back to the file
        fs.writeFile(filePath, csvContent, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error saving CSV file");
            }

            console.log("CSV file updated successfully!");
            return res.redirect(`/view/${filename}`);
        });
    });
};

// exports.saveEditedFiles = (req, res) => {
//     const filename = req.params.filename;
//     const filePath = path.join(testFolder, filename);

//     // Extract and process the edited data from req.body
//     const editedRowIndex = req.body.editedRow; // Get the index of the edited row
//     const numRows = Object.keys(req.body).filter(key => key.startsWith('rows[')).length;
//     const numCols = Object.keys(req.body).length / numRows;

//     // Separate the headers and data rows
//     const headers = Array.from({ length: numCols }, (_, colIndex) => req.body[`header[${colIndex}]`]);
//     const dataRows = Array.from({ length: numRows }, (_, rowIndex) => {
//         if (rowIndex == editedRowIndex) {
//             // If this is the edited row, get the updated data from the request body
//             return Array.from({ length: numCols }, (_, colIndex) => req.body[`rows[${rowIndex}][${colIndex}]`]);
//         } else {
//             // If this is not the edited row, get the data from the original rows
//             return Array.from({ length: numCols }, (_, colIndex) => rows[rowIndex][colIndex]);
//         }
//     });

//     // Convert the dataRows back to CSV format
//     const csvContent = [headers, ...dataRows].map(row => row.join(',')).join('\n');

//     // Save the updated data back to the file
//     fs.writeFile(filePath, csvContent, 'utf8', (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error saving CSV file");
//         }

//         console.log("CSV file updated successfully!");
//         return res.redirect('/');
//     });
// };




exports.searchFiles = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(testFolder, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading CSV file");
        }

        // Parse CSV data and render it in a table format
        const rows = data.split("\n").map(row => row.split(","));
        const headers = rows.shift();

        // Get the search query from the request body
        const searchQuery = req.body.searchInput.toLowerCase();

        // Filter the rows based on the search query
        const filteredRows = rows.filter(row => {
            return row.some(cell => cell.toLowerCase().includes(searchQuery));
        });

        return res.render("csvEdit", {
            filename,
            headers,
            rows: filteredRows,
            content: data
        });
    });
};
