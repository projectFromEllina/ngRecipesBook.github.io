import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class DataStorageService {
    constructor (private httpClient: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.httpClient.put('https://recipe-book-a.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            observe: 'body'
        });
    }
    getRecipe() {
        this.httpClient.get<Recipe[]>('https://recipe-book-a.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
        })
            .pipe(map (
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                          recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}