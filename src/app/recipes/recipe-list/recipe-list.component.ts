import {Component, OnDestroy, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  visibility: string;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
      this.recipes = this.recipeService.getRecipes();
      this.subscription = this.recipeService.recipesChanged
          .subscribe(
              (recipes: Recipe[]) => {
                this.recipes = recipes;
              }
          );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    if(!this.authService.onLogin()) {

    }
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  showHint(val: string) {
      const login = this.authService.onLogin();
      if (!login) {
          this.visibility = val;
      }
  }
}
