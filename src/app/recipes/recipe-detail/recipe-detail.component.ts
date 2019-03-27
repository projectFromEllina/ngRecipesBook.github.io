import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  visibility: string;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
            private router: Router,
            private authService: AuthService) { }

  ngOnInit() {
    this.route.params
        .subscribe((params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEdditRecipe() {
      this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe() {
     this.recipeService.deleteRecipe(this.id);
     this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
  showHint(val: string) {
      const login = this.authService.onLogin();
      if (!login) {
          this.visibility = val;
      }
  }
}
