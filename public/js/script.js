function showFileName() {
    const fileInput = document.getElementById("profileImage");
    const fileNameSpan = document.getElementById("selectedFileName");
    
    if (fileInput.files.length > 0) {
        fileNameSpan.textContent = fileInput.files[0].name;
    } else {
        fileNameSpan.textContent = "No file chosen";
    }
}


$(document).ready(function () {
    // Function to filter rows based on the search input
    $("#searchInput").on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});