package com.sreenathofficial.recipebook.api.service;

import com.sreenathofficial.recipebook.enitites.Recipe;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler
public class RecipeEventHandler {

    @HandleBeforeCreate
    public void handleRecipeCreate(Recipe r) {

    }

}