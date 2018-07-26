
function AddToCartfunction() {
    // var res = $(this).data('key').split("#");
    var name = $(this).parent().find('.cls_name')[0].value;
    var price = $(this).parent().find('.cls_price')[0].value;
    var qty = $(this).parent().find('.cls_qty')[0].value;
    price = qty * price;

    //First check if product is alredy in cart
    var ObjInCart = getObjects(cartData, 'Name', name)

    //if (ObjInCart.length > 0) {
    //    alert('Product ' + name + ' is already present in cart.')
    //    return;
    //}

    cartData.push(
       {
           Name: name,
           price: price,
           qty: qty
       }
       );

    var key = name + "#" + price;
    var removekey = '<a href=\"#\" title=\"\" class=\"remove-cart\" data-key=' + key + '>Delete</a>';
    var ImageHTML = "<img  style=\"height: 50px; width: 50px;\" src=\"Images/" + name.toLocaleLowerCase() + ".jpg\" alt=" + name + ">";

    $("#carttable").last().append("<tr><td>" + name + "</td><td>" + ImageHTML + "</td><td>" + price + "</td><td>" + removekey + "</td>");
    $("#carttable1").last().append("<tr><td>" + name + "</td><td>" + ImageHTML + "</td><td>" + price + "</td>");

    var total = $(".jcart-total")[0].innerText;
    if (total == "" || isNaN(total))
        total = 0;
    total = parseInt(total) + parseInt(price);

    document.getElementById('idcartTotal').innerText = total;
    document.getElementById('idcartItems').innerText = cartData.length;

    var class_names_jcart_items = document.getElementsByClassName("jcart-items");
    for (var i = 0; i < class_names_jcart_items.length; i++) {
        class_names_jcart_items[i].innerText = '(' + cartData.length + ')';
    }

    var class_names_jcart_total = document.getElementsByClassName("jcart-total");
    for (var i = 0; i < class_names_jcart_items.length; i++) {
        class_names_jcart_total[i].innerText = total
    }

    //$('#idDivCartTable1').css("display", "block");

    //$('#idDivCartTable1').fadeIn(1000);
    //$('#idDivCartTable1').fadeOut(2000);

   
}


function removefromcart()
{
    event.preventDefault();

    $(this).closest('tr').remove()

    var res = $(this).data('key').split("#");
    var name = res[0];
    var price = res[1];

    cartData.removeValue('name', name);

    var total = document.getElementById('idTotal').innerHTML;
    if (total == "")
        total = 0;
    total = parseInt(total) - parseInt(price);
    document.getElementById('idTotal').innerHTML = total;
    document.getElementById('idcartTotal').innerText = total;
    document.getElementById('idcartItems').innerText = cartData.length;
}

function Checkout()
{
    if (userdata.id == 0)
    {
        //ask user to login and return
        alert('Please login to continue');
        return;
    }
    var orderdata = {
        cartData: cartData,
        customer: userdata.id,
        shippingaddress: '1643 villa st apt c mountain view CA'
    };

   /* $.ajax({
        type: "POST",
        url: "http://localhost:7543/api/Default1/PlaceOrder",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(orderdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { beforeOrderSuccess(); },
        success: function (data) { AfterOrderSuccess(); },
        failure: function (errMsg) { AfterOrderFailure(); }
    });*/
	
	
	   $.ajax({
            type: "POST",
            url: "http://localhost:3973/WebAPI/AddProductsPrices",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(orderdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () { beforeOrderSuccess(); },
            success: function (data) { AfterOrderSuccess(); },
            failure: function (errMsg) { AfterOrderFailure(); }
        });
}

function beforeOrderSuccess() {
    $("#iddivcheckout").append('<img src="Images/checkoutwait.gif" alt="processing ....">');
}
function AfterOrderSuccess() {
    $("#iddivcheckout").html("<p style='color:green'>Congratulations your order placed successfully !</P>");
    cartData = [];
    $("#idDivCartTable1").html(""); $("#carttable").html(""); $("#carttable1").html("");
    document.getElementById('idcartTotal').innerText = "";
    document.getElementById('idcartItems').innerText = "";
}
function AfterOrderFailure() {
    alert('There is problem placing order now, please contact admin!')
}

