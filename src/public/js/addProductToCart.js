$(document).ready(function() {
    var currentPage = 1;
  
    function getProducts(page) {

      $.ajax({
        method: 'GET',
        url: '/api/products',
        data: { page: page },
        success: function(response) {

          var template = Handlebars.compile($('#products-template').html());
          $('#products-container').html(template(response.products));
  l
          currentPage = response.page;
  
          updatePaginationButtons(response.hasPreviousPage, response.hasNextPage);
        },
        error: function(error) {
          console.error('Error al obtener los productos');
        }
      });
    }
  
    $(document).on('click', '.add-to-cart', function() {
      var productId = $(this).data('product-id');

      console.log('Producto agregado al carrito');
    });
  

    $(document).on('click', '.previous-page', function() {
      getProducts(currentPage - 1);
    });
  

    $(document).on('click', '.next-page', function() {
      getProducts(currentPage + 1);
    });

    function updatePaginationButtons(hasPreviousPage, hasNextPage) {
      var previousPageButton = $('.previous-page');
      var nextPageButton = $('.next-page');
  
      if (hasPreviousPage) {
        previousPageButton.show();
      } else {
        previousPageButton.hide();
      }
  
      if (hasNextPage) {
        nextPageButton.show();
      } else {
        nextPageButton.hide();
      }
    }
  

    getProducts(currentPage);
  });