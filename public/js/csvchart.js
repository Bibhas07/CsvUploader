google.charts.load('current', { 'packages': ['corechart'] });

function drawChart(selectedColumnIndex) {
    console.log("google " , google)
    
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Label');
    data.addColumn('number', 'Value');

    // 'rows' and 'headers' are now accessible as global variables through `csvData`
    // const rows = window.csvData.rows;
    const headers = window.csvData.headers;
    console.log("headers ",headers)

    rows.forEach((row) => {
        const label = row[0]; // Assuming the first column contains labels
        const value = Number(row[selectedColumnIndex]); // Convert the value to a number
        data.addRow([label, value]);
    });

    const options = {
        title: headers[selectedColumnIndex], // Set the chart title to the selected column header
        chartArea: { width: '80%', height: '70%' },
        hAxis: { title: headers[0] }, // Assuming the first column contains labels
        vAxis: { title: headers[selectedColumnIndex] },
        legend: { position: 'none' },
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chartContainer'));
    chart.draw(data, options);
}

// Add an event listener to the select element
document.getElementById('selectColumn').addEventListener('change', function () {
    // Get the selected column index from the value of the select element
    const selectedColumnIndex = Number(this.value);
    
    // Call the drawChart function with the selected column index
    drawChart(selectedColumnIndex);
});

google.charts.setOnLoadCallback(() => drawChart(1)); // Draw initial chart for the second column (change as needed)
