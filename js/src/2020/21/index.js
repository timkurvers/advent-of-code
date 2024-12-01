/* eslint-disable no-cond-assign */

import {
  Cache, intersection, solution, sum,
} from '../../utils/index.js';

const parse = (input) => {
  const dishes = [];
  const ingredients = new Cache({
    init: (name) => ({
      name,
      allergen: null,
      get dishes() { return dishes.filter((dish) => dish.ingredients.includes(this)); },
    }),
  });
  const allergens = new Cache({
    init: (name) => ({
      name,
      ingredient: null,
      get dishes() { return dishes.filter((dish) => dish.allergens.includes(this)); },
    }),
  });

  for (const line of input.trim().split('\n')) {
    const dish = {
      raw: line,
      ingredients: [],
      allergens: [],
    };
    dishes.push(dish);

    let variant = 'ingredient';
    for (const match of line.slice(0, -1).split(/,? \(?/)) {
      if (match === 'contains') {
        variant = 'allergen';
        continue;
      }

      if (variant === 'ingredient') {
        dish.ingredients.push(ingredients.lookup(match));
      } else {
        dish.allergens.push(allergens.lookup(match));
      }
    }
  }
  return { allergens, dishes, ingredients };
};

// Whether given ingredient or allergen is resolved
const isResolved = (entry) => entry.allergen || entry.ingredient;

// Whether given ingredient or allergen is unresolved
const isUnresolved = (entry) => !isResolved(entry);

// Resolves allergens, tagging each with their ingredient and vice versa
const resolve = (allergens) => {
  const frontier = Array.from(allergens.values());

  let current = null;
  while (current = frontier.shift()) {
    // Find all shared ingredients between dishes known to contain this allergen
    const shared = intersection(...current.dishes.map((dish) => dish.ingredients));

    // Filter shared ingredients to those that are unresolved
    const unresolved = shared.filter(isUnresolved);

    // Found the one and only ingredient for this allergen
    if (unresolved.length === 1) {
      const ingredient = unresolved[0];
      current.ingredient = ingredient;
      ingredient.allergen = current;
      continue;
    }

    frontier.push(current);
  }
};

export const partOne = solution((input) => {
  const { allergens, ingredients } = parse(input);
  resolve(allergens);

  // Count occurences of unresolved ingredients across all dishes
  const unresolved = Array.from(ingredients.values()).filter(isUnresolved);
  return sum(unresolved.map((ingredient) => ingredient.dishes.length));
});

export const partTwo = solution((input) => {
  const { allergens } = parse(input);
  resolve(allergens);

  // Sort all allergens alphabetically by name and comma-separate their ingredients
  const sorted = Array.from(allergens.values()).sort((a, b) => (
    a.name.localeCompare(b.name)
  ));
  return sorted.map((allergen) => allergen.ingredient.name).join(',');
});
