$.ajax({
    url: 'http://localhost:3000/err',
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr);
        console.log(thrownError);
    }
});