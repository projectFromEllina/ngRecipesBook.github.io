import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from "rxjs";

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  private subscribtion: Subscription;
  editMode = false;
  editedItemIndex: number;
  editorItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscribtion = this.slService.startedEditing
        .subscribe((index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editorItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editorItem.name,
            amount: this.editorItem.amount
          });
        }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(newIngredient);
    }
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
