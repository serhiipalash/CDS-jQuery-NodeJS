// app.js

$(document).ready(function () {
    $('body').on('click', 'a', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');

        $.ajax({
            url: url,
            success: function (data){
                $('#content').html(data.split('<div id="content">')[1].replace(/<\/div><\/body><\/html>$/, ''));
                document.title = data.split('</title>')[0].split('<title>')[1];
            }
        });

        if (url != window.location) {
            window.history.pushState(null, null, url);
        }
    });

    $(window).on('popstate', function () {
        $.ajax({
            url: location.pathname,
            success: function (data) {
                $('#content').html(data.split('<div id="content">')[1].replace(/<\/div><\/body><\/html>$/, ''));
                document.title = data.split('</title>')[0].split('<title>')[1];
            }
        });
    });

    $('#createButton').on('click', function() {
        if (location.pathname === '/customers' && $('#content').is(':not(:has(#customerForm))')) {
            createCustomer();
        } else {
            $.ajax({
                type: 'GET',
                url: '/customers',
                success: function (data) {
                    $('#content').html(data.split('<div id="content">')[1].replace(/<\/div><\/body><\/html>$/, ''));
                    document.title = 'Customers | Customer Data Service';
                    window.history.pushState(null, null, '/customers');
                    createCustomer();
                }
            });
        }
    });

    $('#updateButton').on('click', function () {
        if (/\/customers\/\d+$/.test(location.pathname) && $('#content').is(':not(:has(#customerForm))')) {
           updateCustomer();
        } else if ($('#content').is(':not(:has(#customerForm))')) {
            $('#helpText').text('Please select customer');
            setTimeout(function () {
                $('#helpText').text('\xa0');
            }, 2000);
        }
    });

    $('#deleteButton').on('click', function () {
        if (/\/customers\/\d+$/.test(location.pathname)) {
            deleteCustomer();
        } else {
            $('#helpText').text('Please select customer');
            setTimeout(function () {
                $('#helpText').text('\xa0');
            }, 2000);
        }
    });
});
