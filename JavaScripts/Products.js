var cartData = [];

function PopulateProducts(productData)
{
    for (var i = 0; i < productData.length; i++) {
        var oneKgPrice = productData[i].price;
        var HalfKgPrice = Math.round((productData[i].price / 2 * 1.1));

        productHTML = '<div class="top-cuisine-grid">';
        productHTML += '<div class="myimagediv"><img id="imgpro" src=\"Images/' + productData[i].name.toLocaleLowerCase() + '.jpg" " class="img-responsive Image-Class" alt=""/></div>';
        productHTML += '<div class="prod-details"></a> <label> <a style="text-decoration:none;" id="afont" href="view-product.php?productid=60">' + productData[i].name + '</a><br />';
        productHTML += '<strong id="value_60" class="afontnew cls_SelectedQty">500 gm - Rs. ' + HalfKgPrice + '</strong>';
        productHTML += '<select name="my-item-price" style="width:100%;" class="cls_selectqty" id="price">';
        productHTML += '<option value="' + HalfKgPrice + '">500 gm - Rs. ' + HalfKgPrice + '/-</option>';
        productHTML += '<option value="' + oneKgPrice + '">1 kg - Rs. ' + oneKgPrice + '/-</option>';
        productHTML += '</select>';
        productHTML += '<div style="background-color:#F4F3F2;padding:5px;">';
        productHTML += '<input type="hidden" class="cls_name" value="' + productData[i].name.toLocaleLowerCase() + '">';
        productHTML += '<input type="hidden" class="cls_price" value="' + HalfKgPrice + '">';
        productHTML += '<br />Qty: <input type="text" name="my-item-qty" value="1" maxlength="3" id="afonttext" size="3" class="cls_qty" onkeypress="return isNumber(event)" autofocus="autofocus" /> ';
        productHTML += '<input type="image" id="cart" class=\"add-to-cart\" src="images/addtocart.png" style="float:right;" alt="AddToCart"">';
        // productHTML += ' <input type="button" value="Search" class="btnAddToCart" data-key="' + productData[i].Name + '#' + productData[i].Price + '">';
        productHTML += '</div></label></div></div>';

        $(".ProductsDiv").append(productHTML);
    }

    var class_names = document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('click', AddToCartfunction);
    }

    var class_names = document.getElementsByClassName("cls_selectqty");
    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('change', CartQtyChangeEvent);
    }

    var class_names = document.getElementsByClassName("Image-Class");
    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('click', ShowProductDetails);
    }

    $('html,body').scrollTop();
}

function CartQtyChangeEvent() {
    // alert($(this).val());
    $(this).parent().find('.cls_SelectedQty')[0].innerText = this.selectedOptions[0].innerText;
    $(this).parent().find('.cls_price')[0].value = this.selectedOptions[0].value;
}

function ShowProductDetails() {
    $('#idDivMain').css("display", "none");
    $('#iddivCartDetails').css("display", "none");
    $('#iddivAboutus').css("display", "none");
    $('#iddivProdDetail').css("display", "block");

    $("#iddivProdDetailInner").html("");

    var name = $(this).parent().parent().find('.cls_name')[0].value;
    var price = $(this).parent().parent().find('.cls_price')[0].value;

    var ProdDetailsHTML = ''
    var ProdDetailsHTML = '<div class="container">';
    ProdDetailsHTML += '<div class="row">';
    ProdDetailsHTML += '<div class="col-md-6">';

    ProdDetailsHTML += GetcarouselHTML();

    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '<div class="col-md-6">';

    ProdDetailsHTML += '<p class="font-weight-bold">Name :' + name + '</p>';
    ProdDetailsHTML += '<p class="font-weight-bold">price :' + price + '</p>';

    ProdDetailsHTML += '<p class="font-weight-bold">Qty:</p> <input type="text" name="my-item-qty" value="1" maxlength="3" id="afonttext" size="3" class="cls_qty" onkeypress="return isNumber(event)" autofocus="autofocus" /> ';

    ProdDetailsHTML += '<input type="hidden" class="cls_name" value="' + name.toLocaleLowerCase() + '">';
    ProdDetailsHTML += '<input type="hidden" class="cls_price" value="' + price + '">';

    ProdDetailsHTML += '</br></br><input type="image" id="cart" class=\"add-to-cart\" src="Images/addtocart_prodetails.png" style="float:left;" alt="AddToCart"">';
    ProdDetailsHTML += '<input type="image" id="cart" class=\"clsBackToProducts\" src="Images/backtostore_proddetails.png" " alt="Back To Store"">';
    //ProdDetailsHTML += '<input type="image" id="cart" class=\"clsProductsBenefits\" src="Images/backtostore_proddetails.png" " alt="Product Benefits" data-target="#myModal"">';
    ProdDetailsHTML += '<div class="container">';
    ProdDetailsHTML += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">';
    ProdDetailsHTML += 'Product Benefits';
    ProdDetailsHTML += '</button>';
    //ProdDetailsHTML += '<a href="#" class="btn add-to-cart"><span class="glyphicon glyphicon-shopping-cart "></span> Add To Cart';
    //ProdDetailsHTML += '<a href="#" class="btn clsBackToProducts "><span class="glyphicon glyphicon-grain"></span>Back To Store';

    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '<div class="row">';
    ProdDetailsHTML += '<div class="col-md-12">';
    ProdDetailsHTML += 'There are about 5,000 potato varieties worldwide. Three thousand of them are found in the Andes alone, mainly in Peru, Bolivia, Ecuador, Chile, and Colombia. As of 2007, China led the world in potato production, and nearly a third of the worlds potatoes were harvested in China and India';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';

    //<!-- The Modal -->
    ProdDetailsHTML += '<div class="modal fade" id="myModal">';
    ProdDetailsHTML += '<div class="modal-dialog">';
    ProdDetailsHTML += '<div class="modal-content">';
    ProdDetailsHTML += '<!-- Modal Header -->';
    ProdDetailsHTML += '<div class="modal-header">';
    ProdDetailsHTML += '<h4 class="modal-title">Product Benefits</h4>';
    ProdDetailsHTML += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '<!-- Modal body -->';
    ProdDetailsHTML += '<div class="modal-body">';
    ProdDetailsHTML += '<img src="Images/' + name + '_benefits.jpg" alt="Available Soon" style="height:100%;width:100%">';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '<!-- Modal footer -->';
    ProdDetailsHTML += '<div class="modal-footer">';
    ProdDetailsHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';
    ProdDetailsHTML += '</div>';

    $('#iddivProdDetailInner').append(ProdDetailsHTML);
    //$('#iddivProdDetailInner').append($(this).parent()[0].innerHTML);
    //$('#iddivProdDetailInner').append('</br><a href="#" class="clsBackToProducts">Continue Shopping</a>');

    var class_names = document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('click', AddToCartfunction);
    }

    var class_names = document.getElementsByClassName("cls_selectqty");
    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('change', CartQtyChangeEvent);
    }

    var class_names = document.getElementsByClassName("clsBackToProducts");
    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('click', FunBackToProducts);
    }
}

function GetcarouselHTML() {
    var carouselhtml = "";

    carouselhtml = '<div id="demo" class="carousel slide" data-ride="carousel">';

    carouselhtml += '<ul class="carousel-indicators" >';
    carouselhtml += '<li data-target="#demo" data-slide-to="0" class="active" style="background-color:black"></li>';
    carouselhtml += '<li data-target="#demo" data-slide-to="1" style="background-color:black"></li>';
    carouselhtml += '<li data-target="#demo" data-slide-to="2" style="background-color:black"></li>';
    carouselhtml += '</ul>';

    carouselhtml += '<div class="carousel-inner">';
    carouselhtml += ' <div class="carousel-item active" >';
    carouselhtml += '<img src="Images/brinjal.jpg" alt="Los Angeles" style="height:100%;width:100%">';
    carouselhtml += '</div>';
    carouselhtml += '<div class="carousel-item" >';
    carouselhtml += '<img src="Images/cabbage.jpg" alt="Chicago" style="height:100%;width:100%">';
    carouselhtml += '</div>';
    carouselhtml += '<div class="carousel-item" >';
    carouselhtml += '<img src="Images/fenugreek.jpg" alt="New York" style="height:100%;width:100%">';
    carouselhtml += '</div>';
    carouselhtml += '</div>';

    carouselhtml += '<a class="carousel-control-prev" href="#demo" data-slide="prev" style="background-color:aliceblue;width:15px">';
    carouselhtml += '<span class="carousel-control-prev-icon" style="background-color:black"></span>';
    //  carouselhtml += '<i class="fa fa-chevron-left"></i>';
    carouselhtml += '</a>';
    carouselhtml += '<a class="carousel-control-next" href="#demo" data-slide="next" style="background-color:aliceblue;width:15px">';
    carouselhtml += '<span class="carousel-control-next-icon" style="background-color:black"></span>';
    // carouselhtml += '<i class="fa fa-chevron-left"></i>';
    carouselhtml += '</a>';
    carouselhtml += '</div>';

    return carouselhtml;
}




function CategoryChange() {
    $(".ProductsDiv").html("");
    var class_names = document.getElementsByClassName("cls_category");

    for (var i = 0; i < class_names.length; i++) {
        if (class_names[i].checked) {
            //alert(class_names[0].value);
            PopulateProducts(getObjects(mydata, 'Category', class_names[i].value));
        }
    }
}

function PopulateAllVegetables(mydata) {
    $('#idDivMain').css("display", "block");
    $('#iddivCartDetails').css("display", "none");
    $('#iddivAboutus').css("display", "none");
    $('#iddivProdDetail').css("display", "none");

    $(".ProductsDiv").html("");
    PopulateProducts(getObjects(mydata, 'category', 'Red'));
    PopulateProducts(getObjects(mydata, 'category', 'Green'));
    PopulateProducts(getObjects(mydata, 'category', 'leafy'));
}


