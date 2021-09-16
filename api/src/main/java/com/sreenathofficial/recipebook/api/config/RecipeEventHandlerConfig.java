package com.sreenathofficial.recipebook.api.config;

import com.sreenathofficial.recipebook.api.service.RecipeEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RecipeEventHandlerConfig {
    @Bean
    RecipeEventHandler personEventHandler() {
        return new RecipeEventHandler();
    }
}