package com.sreenathofficial.recipebook.api.config;

import com.sreenathofficial.recipebook.api.service.RecipeValidator;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RecipeValidatorConfig  implements RepositoryRestConfigurer {
    @Override
    public void configureValidatingRepositoryEventListener(
            ValidatingRepositoryEventListener v) {
        v.addValidator("beforeCreate", new RecipeValidator());
        v.addValidator("beforeSave", new RecipeValidator());
    }
}
