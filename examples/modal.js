function load() {
    

    $(document).ready(function () {

        var ProdDetailsHTML = ''
        ProdDetailsHTML += '<div class="container">';
        ProdDetailsHTML += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">';
        ProdDetailsHTML += 'Open modal';
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
        ProdDetailsHTML += '<h4 class="modal-title">Modal Heading</h4>';
        ProdDetailsHTML += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        ProdDetailsHTML += '</div>';
        ProdDetailsHTML += '<!-- Modal body -->';
        ProdDetailsHTML += '<div class="modal-body">';
        ProdDetailsHTML += '</div>';
        ProdDetailsHTML += '<!-- Modal footer -->';
        ProdDetailsHTML += '<div class="modal-footer">';
        ProdDetailsHTML += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        ProdDetailsHTML += '</div>';
        ProdDetailsHTML += '</div>';
        ProdDetailsHTML += '</div>';
        ProdDetailsHTML += '</div>';
        ProdDetailsHTML += '</div>';

        $('#mydiv').append(ProdDetailsHTML);

    });
}