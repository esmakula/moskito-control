import { PipeTransform, Pipe } from "@angular/core";
import { MoskitoComponent } from "../entities/moskito-component";
import { CategoriesService } from "../services/categories.service";


/**
 * Components pipe used to filter components by
 * specified category. Filter is triggered by scan column
 * item toggles in Category section.
 *
 * @author strel
 */
@Pipe({ name: 'componentsByCategoryFilter' })
export class ComponentsCategoryFilterPipe implements PipeTransform {

  constructor(private _categoryService: CategoriesService) {

  }

  /**
   * Filters list of {MoksitoComponent} by specified category.
   * If category name is empty, filter is bypassed.
   *
   * @param components List of {MoskitoComponent} to filter
   * @param category Component category name used as filter
   * @returns List of filtered {MoskitoComponent}
   */
  transform(components: MoskitoComponent[], category?: string): MoskitoComponent[] {
    if (!components) {
      return [];
    }

    if (!category || this._categoryService.defaultCategory.name === category) {
      return components;
    }

    let filteredComponents = [];

    for (let component of components) {
      if (component.category == category) {
        filteredComponents.push(component);
      }
    }

    return filteredComponents;
  }
}
