//deleteCustomer.js

function deleteCustomer() {
    $.ajax({
        type: 'DELETE',
        url: location.pathname,
        success: function(){
            $.ajax({
                url: '/customers',
                success: function(data){
                    $('#content').html(data.split('<div id="content">')[1].replace(/<\/div><\/body><\/html>$/, ''));
                    document.title = 'Customers | Customer Data Service';
                    window.history.pushState(null, null, '/customers');
                }
            });
        }
    });
}
