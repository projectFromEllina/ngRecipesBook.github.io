import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Pizza',
            'Very tasty pizza',
            'http://n1s1.hsmedia.ru/4e/8d/62/4e8d62ce0956a70731bfcb015e14657a/660x512_0_05e206ec9e1c0058abf9abb8934c22cc@1732x1731_0xc0a839a2_19429468231494799528.jpeg',
            [
                new Ingredient('dough', 10),
                new Ingredient('tomatoes', 5)
            ]),
        new Recipe(
            'Waffles',
            'Gorgeous waffles',
            'https://zabavnik.club/wp-content/uploads/Kartinki_pro_edu_1_14205756-1024x640.jpg',
            [
                new Ingredient('Milk', 5),
                new Ingredient('eggs', 3),
                new Ingredient('jam', 1)
            ]),
    ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}