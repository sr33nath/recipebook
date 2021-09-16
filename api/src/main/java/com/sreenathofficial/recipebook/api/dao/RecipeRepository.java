package com.sreenathofficial.recipebook.api.dao;

import com.sreenathofficial.recipebook.enitites.Recipe;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@Profile("demo")
@RepositoryRestResource(collectionResourceRel = "recipes", path = "recipes")
public interface RecipeRepository extends MongoRepository<Recipe, String> {

    public Page<Recipe> findAllByInstructions(String instructions, Pageable pageable);

    public Page<Recipe> findAllByIngredientsName(String ingredientName, Pageable pageable);

    public Page<Recipe> findAllByVegetarian(boolean vegetarian, Pageable pageable);

    public Page<Recipe> findAllByCreatedDateBefore(@DateTimeFormat(pattern = "dd-MM-yyyy HH:mm") Date date, Pageable pageable);

    public Page<Recipe> findAllByCreatedDateAfter(@DateTimeFormat(pattern = "dd-MM-yyyy HH:mm") Date date, Pageable pageable);

    public Page<Recipe> findAllByPortion(int portion, Pageable pageable);

    @Query("{$text: {$search: ?0}}")
    public Page<Recipe> findAll(@Param("text") String text, Pageable pageable);

}
