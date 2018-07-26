function load() {
    //var varpasscode = JSON.parse(data1);

    //var passcode = prompt("Please enter passcode", "");

    //if (passcode == null || passcode != varpasscode[0].passcode)
    //{
    //        $("body").empty();
    //        $("div").empty();
    //        return;
    //}

   // var cartData = [];

    var userdata;

    var productHTML = "";

    var divIDs = [];

    $(document).ready(function ()
    {
        jQuery(function () {
            adjustStyle($(this).width());
            $(window).resize(function () {
                adjustStyle($(this).width());
            });


            divIDs.push('#idDivMain');
            divIDs.push('#iddivCartDetails');
            divIDs.push('#iddivAboutus');
            divIDs.push('#iddivProdDetail');
            divIDs.push('#iddivmyorders');

            $('[data-toggle="tooltip"]').tooltip();

            document.getElementById('imagelogo').src = 'Images/logo.png';
            document.getElementById('ImageCart').src = 'Images/cart.png';
            document.getElementById('btnSearchProduct').src = 'Images/search.png';

            var counter = 1;

            //var mydata = JSON.parse(data);
            // var mydata= JSON.parse(data);;
            var success;

            $.ajax({
                url: "http://localhost:7543/api/Default1/Getproducts",
                dataType: 'json',
                beforeSend: function () {
                    $(".ProductsDiv").append('<img src="Images/ajax-loading-large.gif" alt="Loading Data" style="height:50%;width:50%">');
                },
                success: function () {
                    $(".ProductsDiv").html("");
                },
                complete: function (json) {

                    mydata = json.responseJSON;
                    /*This is for autocomlete start */
                    for (var i = 0; i < mydata.length; i++) {
                        mydata[i].label = mydata[i].name;
                    }
                    PopulateAllVegetables(mydata);

                    $("#txtsearchProduct").autocomplete({
                        minLength: 0,
                        source: mydata,
                        focus: function (event, ui) {
                            $("#txtsearchProduct").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtsearchProduct").val(ui.item.label);
                            return false;
                        }
                    })
.autocomplete("instance")._renderItem = function (ul, item) {

    var ImageHTML = '<div class="ccontainer-fluid" style="width:50px;height:50px">';
        ImageHTML += '<div class="row">';
        ImageHTML += '<div class="col-md-6">';
        ImageHTML = '<img src=\"Images/' + item.name.toLocaleLowerCase() + '.jpg" style="width:30%;height:30%" />';
        ImageHTML += '</div>';
        ImageHTML += '<div class="col-md-6">';
        ImageHTML += '<a>' + item.name + ' Rs.' + item.price + '</a>';
        ImageHTML += '</div>';
        ImageHTML += '</div>';
        ImageHTML += '</div>';

        return $("<li>")
        .append(ImageHTML)
        .appendTo(ul);

};
                }
            });
          
            var counter = 0;

            function adjustStyle(width) {
                width = parseInt(width);
                if (width < 401) {
                    $("#size-stylesheet").attr("href", "css/MyStyle-Small.css");
                } else if (width < 900) {
                    $("#size-stylesheet").attr("href", "css/MyStyle.css");
                } else {
                    $("#size-stylesheet").attr("href", "css/MyStyle.css");
                }
            }

            //Add Event Listener
            document.getElementById("btnSearchProduct").addEventListener("click", SearchProductfunction);
            document.getElementById("btnlogin").addEventListener("click", loginuser);
            var class_names = document.getElementsByClassName("cls_category");

            for (var i = 0; i < class_names.length; i++) {
                class_names[i].addEventListener('click', CategoryChange);
            }

            var class_names_menu = document.getElementsByClassName("cls_category_menu");

            for (var i = 0; i < class_names_menu.length; i++) {
                class_names_menu[i].addEventListener('click', cls_category_menu_function);
            }

            $('#idCartDiv').on("click", function () {
               
                ShowDiv('#iddivCartDetails');

                var class_names = document.getElementsByClassName("clsBackToProducts");
                for (var i = 0; i < class_names.length; i++) {
                    class_names[i].addEventListener('click', FunBackToProducts);
                }
            });

          

            $('#idCartDiv').on("mouseover", function () {
                $('#idDivCartTable1').css("display", "block");
            });

            $('#idCartDiv').on("mouseout", function () {
                $('#idDivCartTable1').fadeOut(2000);
            });

            function FunBackToProducts() {
                ShowDiv('#idDivMain');
                 }

            $(document).on("click", "a.remove-cart", function (e) {
                removefromcart();
            });

            function SearchProductfunction() {
                $(".ProductsDiv").html("");
                var SearchedPRoducts = getObjects(mydata, 'name', $("#txtsearchProduct").val());
                var class_names = document.getElementsByClassName("cls_category");

                for (var i = 0; i < class_names.length; i++) {
                    if (class_names[i].checked) {
                        //alert(class_names[0].value);
                        PopulateProducts(getObjects(SearchedPRoducts, 'category', class_names[i].value));
                    }
                }
            }

            function cls_category_menu_function() {
                var MenuItem = $(this)["0"].dataset.target;

                if (MenuItem == "Red"
                     || MenuItem == "Green"
                     || MenuItem == "leafy"
                     || MenuItem == "Milk"
                     || MenuItem == "Wheat") {

                    ShowDiv('#idDivMain');
      
                    $(".ProductsDiv").html("");
                    PopulateProducts(getObjects(mydata, 'category', MenuItem));
                }
                else if (MenuItem == "AllVegetables") {
                    ShowDiv('#idDivMain');
                    PopulateAllVegetables(mydata);
                }
                else if (MenuItem == "AboutUs") {
                    ShowDiv('#iddivAboutus');
                    $('#iddivAboutus').fadeIn(4000);
                }
                else if (MenuItem == "logout") {
                    ShowDiv('#idDivMain');
                    PopulateAllVegetables(mydata);
                    logout();
                }
                else if (MenuItem == "myorders") {
                    ShowDiv('#iddivmyorders');
                    myorders();
                }
                
            }

            function ShowDiv(div)
            {
                for (var i in divIDs)
                {
                    if (divIDs[i] == div)
                    {
                        $(divIDs[i]).css("display", "block");
                    }
                    else
                    {
                        $(divIDs[i]).css("display", "none");
                    }
                }
            }



            

            //AJAX calling

            $('#idcheckout').on("click", function () {
                Checkout();
            });
            /*This is for autocomlete end */

            $('html,body').scrollTop();
        });
    });
}