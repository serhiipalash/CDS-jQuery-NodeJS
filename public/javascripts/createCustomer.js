//createCustomer.js

function createCustomer() {

    $('ol.rectangle-list').hide();

    showForm();

    $('#customerForm #submit').on('click', function (e) {
        if ($('#customerForm #firstName').val() != '') {

            e.preventDefault();

            var newData = [];

            $('#customerForm input').each(function () {
                newData.push($(this).val());
            });

            newData.push((Date.now() + '').replace(/.{3}$/g, ''));

            $.ajax({
                type: 'POST',
                url: '/customers',
                data: { newCustomer: JSON.stringify(new Customer(newData), "", 4), id: newData[8] },
                success: function(){
                    if ($('#content').is(':has(ol.rectangle-list)')) {
                        $('#customerForm').remove();
                        $('ol.rectangle-list').append('<li><a href="/customers/' + newData[8] + '">' + newData[0] + ' '+newData[1] + '</a></li>');
                        $('ol.rectangle-list').show();
                    }
                    else {
                        $('#customerForm').remove();
                        $('#content').append('<ol class="rectangle-list"><li><a href="/customers/' + newData[8] + '">' + newData[0] + ' ' + newData[1] + '</a></li></ol>');
                    }
                }
            });
        } else {
            $('#helpText').text('Please enter customer name');
            setTimeout(function() {
                $('#helpText').text('\xa0');
            }, 2000);
        }
    });
}
