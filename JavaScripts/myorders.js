function  myorders()
{
 
    $.ajax({
        type: "GET",
        url: "http://localhost:7543/api/Default1/GetOrderMasterDetails?customerid=" + userdata.id + "",
        dataType: 'json',
        beforeSend: function () { beforeOrdergetmasterSuccess(); },
        success: function () { AfterOrdergetmasterSuccess(); },
        complete: function (json) { AfterOrdergetmastercomplete(json); },
        failure: function (errMsg) { AfterOrdergetmasterFailure(); }
    });

    
}

function beforeOrdergetmasterSuccess()
{
   
}
function AfterOrdergetmasterSuccess()
{
  
}
function AfterOrdergetmastercomplete(json) {

    $("#iddivmyorders").html("");

    var OrderHTML = "";

    OrderHTML += "<table border='1' class='ordertable'>";
 
    for (var i = 0; i < json.responseJSON.length; i++)
    {
       // OrderHTML += "<tr><td>" + json.responseJSON[i].id + "</td><td>" + json.responseJSON[i].shippingaddress + "</td><td>" + json.responseJSON[i].orderdate + "</td></tr>";

       
        OrderHTML += '<tr>';
        OrderHTML += '<td td valign=top>';
        //OrderHTML += '<p>OrderID:'+json.responseJSON[i].id  +'</p>';
        //OrderHTML += '<p>Shipping Address:</p>';
        //OrderHTML += '<p>' + json.responseJSON[i].shippingaddress + '</p>';
        //OrderHTML += '<p>Order Date :' + json.responseJSON[i].orderdate + '</p>';
        OrderHTML += 'OrderID:' + json.responseJSON[i].id + '</br>';
        OrderHTML += 'Shipping Address:';
        OrderHTML += '' + json.responseJSON[i].shippingaddress + '</br>';
        OrderHTML += 'Order Date :' + json.responseJSON[i].orderdate + '';

        OrderHTML += '</td>';
        OrderHTML += '<td td valign=top>';
        OrderHTML += '<table class="carttablecls .table-condensed" style="height:100%;width:100%">';
        OrderHTML += '<tr>';
        OrderHTML += '<th>Image</th>';
        OrderHTML += '<th>name</th>';
        OrderHTML += '<th>qty</th>';
        OrderHTML += '<th>price</th>';
        OrderHTML += '</tr>';

        for (var j = 0; j < json.responseJSON[i].objorderdetails.length; j++)
        {
            OrderHTML += '<tr>';
            OrderHTML += '<td><img  style=\'height: 50px; width: 50px;\' src=\'Images/' + json.responseJSON[i].objorderdetails[j].name.toLocaleLowerCase() + '.jpg\' alt=' + json.responseJSON[i].objorderdetails[j].name + ' </td>';
            OrderHTML += '<td>' + json.responseJSON[i].objorderdetails[j].name + '</td>';
            OrderHTML += '<td>' + json.responseJSON[i].objorderdetails[j].price + '</td>';
            OrderHTML += '<td>' + json.responseJSON[i].objorderdetails[j].qty + '</td>';
            OrderHTML += '</tr>';
        }

        OrderHTML += '</table>';
        OrderHTML += '</td>';

        OrderHTML += '<td valign=top>';
       
        OrderHTML += '<table >';
        OrderHTML += '<tr><td>';
        OrderHTML += ' <button type="button" class="btn clsfeedbackbtn" style="height:100%;width:100%">Leave Feedback</button>';
        OrderHTML += '</td></tr>';
        OrderHTML += '<td>';
        OrderHTML += ' <button type="button" class="btn clsfeedbackbtn" style="height:100%;width:100%">Buy Again</button>';
        OrderHTML += '</td></tr>';
        OrderHTML += '</table>';

        OrderHTML += '</td>';

        OrderHTML += '</tr>';
 

    }

    OrderHTML += "</table>"

    $("#iddivmyorders").append(OrderHTML);
}
function AfterOrdergetmasterFailure()
{
    $("#iddivmyorders").append('<p>Error occured while getting orders, plese contact admin.<P>');
}

