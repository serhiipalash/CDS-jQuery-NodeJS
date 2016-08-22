//updateCustomer.js

function updateCustomer() {
    var currentData = [];

    $('#showPanel span').each(function() {
        currentData.push($(this).text());
    });

    $('#showPanel').hide();

    showForm(new Customer(currentData));

    $('#customerForm #submit').on('click', function(e) {

        if ($('#customerForm #firstName').val() != '') {
            e.preventDefault()

            var newData = [];

            $('#customerForm input').each(function() {
                newData.push($(this).val());
            });

            newData.push( Number(location.pathname.match(/\d+$/)) );

            $.ajax({
                type: 'PUT',
                url: location.pathname,
                data: { updatedCustomer : JSON.stringify(new Customer(newData), "", 4) },
                success: function () {
                    for (var i = 0; i < 4; i++) {
                        $('#showPanel span:eq('+i+')').text(newData[i]);
                    }

                    var address = 'Address: <span id="street">' + newData[4] + '</span>';

                    if (newData[4] != '' && (newData[5] != '' || newData[6] != '' || newData[7] != '')) {
                        address += ', ';
                    }

                    address += '<span id="city">' + newData[5] + '</span>';

                    if (newData[5] != '' && (newData[6] != '' || newData[7] != '')) {
                        address += ', ';
                    }

                    address += '</span><span id="state">' + newData[6] + '</span>';

                    if (newData[6] != '' && newData[7] != '') {
                        address += ', ';
                    }

                    address += '</span><span id="zip">' + newData[7] + '</span>';

                    $('#showPanel .row:eq(3) h4').html(address);

                    $('#customerForm').remove();

                    $('#showPanel').show();

                    document.title = newData[0] + ' ' + newData[1] + ' | Customer Data Service';
                }
            });
        }
        else {
            $('#helpText').text('Please enter customer name');
            setTimeout(function () {
                $('#helpText').text('\xa0');
            }, 2000);
        }
    });
}
