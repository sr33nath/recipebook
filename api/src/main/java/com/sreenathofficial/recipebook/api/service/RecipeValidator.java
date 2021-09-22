package com.sreenathofficial.recipebook.api.service;

import com.sreenathofficial.recipebook.enitites.Ingredient;
import com.sreenathofficial.recipebook.enitites.Recipe;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class RecipeValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Recipe.class.equals(clazz);
    }

    @Override
    public void validate(Object obj, Errors errors) {
        Recipe recipe = (Recipe) obj;

        if (!StringUtils.hasText(recipe.getTitle())) {
            errors.rejectValue("title", "title.empty");
        }

        if (!StringUtils.hasText(recipe.getDesc())) {
            errors.rejectValue("desc", "desc.empty");
        }

        if (recipe.getPortion() <= 0) {
            errors.rejectValue("portion", "portion.invalid");
        }

        if (!StringUtils.hasText(recipe.getInstructions())) {
            errors.rejectValue("instructions", "instructions.empty");
        }

        if(recipe.getIngredients() != null && recipe.getIngredients().size() > 0){
            for(Ingredient ingre: recipe.getIngredients()){
                if (!StringUtils.hasText(ingre.getName())
                    || !StringUtils.hasText(ingre.getAmount())
                        || !StringUtils.hasText(ingre.getUom())) {
                    errors.rejectValue("ingredients", "ingredients.empty");
                    break;
                }

            }
        } else {
            errors.rejectValue("ingredients", "ingredients.empty");
        }

    }

    private boolean checkInputString(String input) {
        return (input == null || input.trim().length() == 0);
    }
}
