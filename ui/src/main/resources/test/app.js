    $(document).ready(function () {

        recipeList('http://localhost:9000/api/recipes');

        $('#addButton').click(function () {
            resetRecipeForm();
            $('#modelHeading').html("New Recipe");
            $('#ajaxModel').modal('show');
        });

        $('#addIngredientRow').click(function(){
            addIngredientRow();
            return false;
        });

        $('#saveBtn').click(function () {
            var action = $('#action').val();
            if(action == 'create'){
                createRecipe($('#submitUrl').val());
            }else{
                updateRecipe($('#submitUrl').val());
            }
        });

        $('#searchParam').on('change', function() {

            $('#search').prop( 'disabled', false );
            $('#searchBtn').prop( 'disabled', false );
            $('#search').val('');

            var searchType = $(this).find(":selected").val();
            if(searchType == 'text' | searchType == 'instructions' | searchType == 'ingredients' | searchType == 'portion'){
                $('#search').attr('placeholder', 'Type here');
            }else if(searchType == 'vegetarian'){
                $('#search').prop( 'disabled', true );
                $('#searchBtn').prop( 'disabled', true );
                $('#search').attr('placeholder', '');
            } else {
                $('#search').attr('placeholder', 'dd-MM-yyyy HH:mm');
            }
        });

        $('#searchBtn').click(function () {
            var searchStr = encodeURIComponent($('#search').val());
            var searchType = $('#searchParam').find(":selected").val();
            var searchResourceUrl = 'http://localhost:9000/api/recipes/search/findAll?text=';

            if(searchType == 'instructions'){
                searchResourceUrl='http://localhost:9000/api/recipes/search/findAllByInstructions?instructions=';
            } else if(searchType == 'ingredients'){
                searchResourceUrl='http://localhost:9000/api/recipes/search/findAllByIngredientsName?ingredientName=';
            } else if(searchType == 'portion'){
                searchResourceUrl='http://localhost:9000/api/recipes/search/findAllByPortion?portion=';
            } else if(searchType == 'createdBefore'){
                searchResourceUrl='http://localhost:9000/api/recipes/search/findAllByCreatedDateBefore?date=';
            } else if(searchType == 'createdAfter'){
                searchResourceUrl='http://localhost:9000/api/recipes/search/findAllByCreatedDateAfter?date=';
            }

            recipeList(searchResourceUrl+searchStr);

            console.log(searchResourceUrl+searchStr);

            $('#loading').clone().removeClass('d-none').appendTo('#recipeList');
        });

    });

    function addIngredientRow(ingredient){
        var currentIngredientCount = $('#ingredients .input-group').length;

        $('div[id="ingredient[x]"]').clone().appendTo('#ingredients');

        //Change name in new inputs
        var inputGroupDiv = $('#ingredients .input-group').last();
        inputGroupDiv.removeClass('d-none');
        var inputs = inputGroupDiv.find('input');
        var button = inputGroupDiv.find('button');
        inputGroupDiv.attr("id",function(i,oldVal) {
            return oldVal.replace(/x/,function(m){
                return currentIngredientCount;
            });
        });
        inputs.attr("id",function(i,oldVal) {
            return oldVal.replace(/x/,function(m){
                return currentIngredientCount;
            });
        });
        button.attr("id",function(i,oldVal) {
            return oldVal.replace(/x/,function(m){
                return currentIngredientCount;
            });
        });

        button.click(function(){
            $('div[id="ingredient['+currentIngredientCount+']"]').remove();
            return false;
        });

        if(ingredient){
            var ingNameField = inputGroupDiv.find('input[name="ingredientName"]').first();
            var ingAmtField = inputGroupDiv.find('input[name="ingredientAmount"]').first();
            var ingUomField = inputGroupDiv.find('input[name="ingredientUom"]').first();
            if(ingNameField){ ingNameField.val(ingredient.name) }
            if(ingAmtField){ ingAmtField.val(ingredient.amount) }
            if(ingUomField){ ingUomField.val(ingredient.uom) }
        }
    }

    function resetRecipeForm(){
            $('#action').val('create');
            $('#modelHeading').val('New Recipe');
            $('#submitUrl').val('http://localhost:9000/api/recipes');
            $('#title').val('');
            $('#desc').val('');
            $('#portion').val('');
            $('#vegetarian').prop('checked', false);
            $('#instructions').val('');
            $('#ingredients').empty();
    }

    function fillRecipeForm(recipe){
            $('#action').val('update');
            $('#submitUrl').val(recipe._links.self.href);
            $('#title').val(recipe.title);
            $('#desc').val(recipe.desc);
            $('#portion').val(recipe.portion);
            $('#vegetarian').prop('checked', recipe.vegetarian);
            $('#instructions').val(recipe.instructions);
            $('#ingredients').empty();

            $.each(recipe.ingredients, function(index, ingredient){
                addIngredientRow(ingredient);
            });
    }

    function getRecipeFormData(){

        var recipe = {};
        recipe.title = $('#title').val();
        recipe.desc = $('#desc').val();
        recipe.portion = $('#portion').val();
        recipe.vegetarian = $('#vegetarian').prop('checked');
        recipe.instructions = $('#instructions').val();
        recipe.ingredients = [];
        var ingredientElems = $('#ingredients .input-group');

        $.each(ingredientElems, function(index, ingredientElem){
            var ingredient = {};
            ingredient.name = $(ingredientElem).find('input[name="ingredientName"]').first().val();
            ingredient.amount = $(ingredientElem).find('input[name="ingredientAmount"]').first().val();
            ingredient.uom = $(ingredientElem).find('input[name="ingredientUom"]').first().val();
            recipe.ingredients.push(ingredient);
        });

        console.log(recipe);

        return recipe;
    }

    //Create recipe
    function createRecipe(recipeResource) {
     // Call Web API to update the recipe
      $.ajax({
        url: recipeResource,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(getRecipeFormData()),
        success: function (recipe) {
          showSaveActionStatus('Status', 'Recipe Saved', true);
          console.log(recipe);
        },
        error: function (request, message, error) {
          handleException(request, message, error);
        }
      });
    }

    //Edit recipe
    function editRecipe(recipeResource) {
      // Call Web API to pop up recipe edit modal
      $('#modelHeading').html("Edit Recipe");
      $('#ajaxModel').modal('show');

      $.ajax({
        url: recipeResource,
        type: 'GET',
        dataType: 'json',
        success: function (recipe) {
          fillRecipeForm(recipe);
        },
        error: function (request, message, error) {
          handleException(request, message, error);
        }
      });
    }

    //Update recipe
    function updateRecipe(recipeResource) {
     // Call Web API to update the recipe
      $.ajax({
        url: recipeResource,
        type: 'PUT',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(getRecipeFormData()),
        success: function (recipe) {
          showSaveActionStatus('Status', 'Recipe Saved', true);
          console.log(recipe);
        },
        error: function (request, message, error) {
          handleException(request, message, error);
        }
      });
    }

    //Delete recipe
    function deleteRecipe(recipeResource) {
      //Call Web API to delete a recipe
      $.ajax({
        url: recipeResource,
        type: 'DELETE',
        dataType: 'json',
        success: function (recipe) {
          showSaveActionStatus('Status', 'Recipe Deleted');
          console.log(recipe);
        },
        error: function (request, message, error) {
          handleException(request, message, error);
        }
      });
    }

    function showSaveActionStatus(title, content, closeSaveModal){
        $('#saveStatusModalTitle').html(title);
        $('#saveStatusModalBodyContent').html(content);
        $('#saveStatusModal').modal('show');
        if(closeSaveModal == true){
            $('#ajaxModel').modal('hide');
        }
    }

    //Get all recipes
    function recipeList(searchResource) {
      // Call Web API to get a list of Products
      $('searchUrl').val(searchResource);
      $.ajax({
        url: searchResource,
        type: 'GET',
        dataType: 'json',
        success: function (pagedResp) {
          console.log(pagedResp);
          recipeListSuccess(pagedResp);
        },
        error: function (request, message, error) {
          handleException(request, message, error);
        }
      });
    }

    function recipeListSuccess(pagedResp) {

      $("#recipeList").empty();

      var totalRecipes = pagedResp.page.totalElements;
      var pageNumber = pagedResp.page.number;
      var pageSize = pagedResp.page.size;

      var startElemPos = (pageNumber*pageSize)+1;
      var endElemPos = (pageNumber*pageSize)+pageSize;

      $('#resultRange').html(startElemPos+' - '+endElemPos);
      $('#totalResults').html(totalRecipes);

      var searchResultUl = $.parseHTML('<div class="bg-white rounded" id="search-items"></div>');
      $("#recipeList").append(searchResultUl);

      // Iterate over the collection of data
      $.each(pagedResp._embedded.recipes, function (index, recipe) {
        // Add a row to the Product table
        recipeAddRow2(recipe);
      });
    }

    // Add recipe row to <div>
    function recipeAddRow2(recipe) {

      // Append row to recipeList <div>
      var searchResultRow = $.parseHTML(recipeBuildRow2(recipe));
      $(searchResultRow).find('button[name="edit"]').first().click(function(){
        editRecipe(recipe._links.self.href);
      });
      $(searchResultRow).find('a[name="recipe-title"]').first().click(function(){
        editRecipe(recipe._links.self.href);
      });
      $(searchResultRow).find('button[name="delete"]').first().click(function(){
        deleteRecipe(recipe._links.self.href);
      });

      $("#search-items").append(searchResultRow);
    }

    function recipeBuildRow2(recipe) {

          var veganSec = '';

          if(recipe.vegetarian == true){
            veganSec = '<span class="badge badge-pill badge-success">vegetarian</span>';
          }

          var htmlRow = '<div class="search-item row">' +
                     '<div class="search-item-img col-md-1">' +
                         '<a href="#">' +
                             '<img src="/img/recipe.jpg" width="70" height="70">' +
                         '</a>' +
                     '</div>' +
                     '<div class="search-item-content col-md-10">' +
                         '<h3 class="search-item-caption">' +
                             '<a href="#" name="recipe-title">' + recipe.title +'</a>' +
                         '</h3>' +
                         '<div class="search-item-meta mb-15">' +
                             '<ul class="list-inline">' +
                                 '<li class="time">'+new Date(recipe.createdDate).toLocaleString()+'</li>' +
                                 '<li class="pl-0">' +
                                     ingredientsList2(recipe.ingredients) +
                                 '</li>' +
                             '</ul>' +
                         '</div>' +
                         '<div>'+recipe.desc+'</div>' +
                     '</div>' +
                     '<div class="col-md-1 d-flex justify-content-center">' +
                        '<div data-balloon="size: xs" data-balloon-pos="up" class="align-self-center">' +
                            '<button type="button" class="btn btn-outline-danger border-0" name="delete">' +
                                '<i class="bi bi-trash" style="font-size:24px;"></i>' +
                            '</button>' +
                        '</div>' +
                     '</div>' +
                 '</div>';

          return htmlRow;
    }

    function ingredientsList2(ingredients){
      var htmlIngredients = '';

      $.each(ingredients, function (index, ingredient) {
        htmlIngredients += ingredientAdd2(ingredient);
      });

      htmlIngredients = htmlIngredients.substring(0, htmlIngredients.length - 1);

      return htmlIngredients;
    }

    function ingredientAdd2(ingredient) {

        var htmlIngredient = '<a href="#">' +ingredient.name+ '</a>,';

        return htmlIngredient;
    }

    // Add Product row to <table>
    function recipeAddRow(recipe) {

      // Append row to recipeList <div>
      var searchResultRow = $.parseHTML(recipeBuildRow(recipe));
      $(searchResultRow).find('button[name="edit"]').first().click(function(){
        editRecipe(recipe._links.self.href);
      });

      $(searchResultRow).find('button[name="delete"]').first().click(function(){
        deleteRecipe(recipe._links.self.href);
      });

      $("#recipeList").append(searchResultRow);
    }

    // Build a <tr> for a row of table data
    function recipeBuildRow(recipe) {

      var veganSec = '';

      if(recipe.vegetarian == true){
        veganSec = '<span class="badge bg-success rounded-pill">veg</span>';
      }

      var htmlRow =  '<div class="bg-white p-3 rounded mt-2">' +
                '<div class="row">' +
                    '<div class="col-md-3">' +
                        '<div class="d-flex flex-column justify-content-center align-items-center icon-container bg-secondary text-white mb-2"><i class="fas fa-utensils fa-5x mb-3 mt-5"></i><span class="mb-4">No image</span></div>' +
                    '</div>' +
                    '<div class="col-md-6 border-end">' +
                        '<div class="listing-title">' +
                            '<h5>'+recipe.title+'</h5>' +
                        '</div>' +
                        '<div class="d-flex flex-row align-items-center">' +
                            '<div class="d-flex flex-row align-items-center ratings">' +
                                '<span class="me-4 text-black-50 number-ratings">Serves ' +recipe.portion+ ' people</span>' +
                                veganSec+
                            '</div>' +
                        '</div>' +
                        '<div class="description">' +
                            '<p>'+recipe.desc+'<br></p>' +
                        '</div>' +
                        '<div class="tags mb-2">'+ ingredientsList(recipe.ingredients) +'</div>' +
                    '</div>' +
                    '<div class="d-flex col-md-3">' +
                        '<div class="d-flex flex-column justify-content-start user-profile w-100">' +
                            '<div class="d-flex user mb-auto">' +
                                '<button type="button" name="edit" class="btn btn-outline-secondary btn-sm me-2">' +
                                    '<i class="bi bi-pencil-square"></i>' +
                                    'Edit' +
                                '</button>' +
                                '<button type="button" name="delete" class="btn btn-outline-secondary btn-sm">' +
                                    '<i class="bi bi-x-circle"></i>' +
                                    'Delete' +
                                '</button>' +
                            '</div>' +
                            '<div class="d-flex text-secondary fw-lighter">' +
                                new Date(recipe.createdDate).toLocaleString() +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'

      return htmlRow;
    }

    function ingredientsList(ingredients){
      var htmlIngredients = '';

      $.each(ingredients, function (index, ingredient) {
        htmlIngredients += ingredientAdd(ingredient);
      });

      return htmlIngredients;
    }

    function ingredientAdd(ingredient) {

        var htmlIngredient = '<span>' +ingredient.name+ '</span>';

        return htmlIngredient;
    }

    // Handle exceptions from AJAX calls
    function handleException(request, message, error) {

      if (request.responseJSON != null) {

        var msg = '';
        $.each(request.responseJSON.errors, function(index, error){
            msg += error.code + '\n';
        });

        showSaveActionStatus(request.responseJSON.status, msg, false);
      }

    }