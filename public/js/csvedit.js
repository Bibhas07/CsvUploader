
    $(document).ready(function () {
        $("#searchForm").on("submit", function (event) {
            event.preventDefault();
            const searchInput = $("#searchInput").val();
            $.post(`/search/<%= filename %>`, { searchInput }, function (data) {
                $("body").html(data);
            });
        });
    });

