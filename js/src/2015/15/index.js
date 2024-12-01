import { cast, reduceMaxBy, solution } from '../../utils/index.js';

const INGREDIENT_MATCHER = /(\w+).+?(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+)/g;

const parse = (input) =>
  Array.from(input.matchAll(INGREDIENT_MATCHER)).map((match) => {
    const [, name, capacity, durability, flavor, texture, calories] = match;
    return {
      name,
      capacity: cast(capacity),
      durability: cast(durability),
      flavor: cast(flavor),
      texture: cast(texture),
      calories: cast(calories),
    };
  });

const combine = (ingredients, total) => {
  const remaining = [...ingredients];
  const ingredient = remaining.shift();
  if (remaining.length === 0) {
    return [
      [
        {
          ingredient,
          amount: total,
        },
      ],
    ];
  }

  const combinations = [];
  for (let amount = 0; amount <= total; ++amount) {
    for (const combination of combine(remaining, total - amount)) {
      combinations.push([{ ingredient, amount }, ...combination]);
    }
  }
  return combinations;
};

const bake = (ingredients, { total = 100 } = {}) => {
  const combinations = combine(ingredients, total);
  return combinations.map((mixture) => {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;
    let calories = 0;
    for (const { ingredient, amount } of mixture) {
      capacity += ingredient.capacity * amount;
      durability += ingredient.durability * amount;
      flavor += ingredient.flavor * amount;
      texture += ingredient.texture * amount;
      calories += ingredient.calories * amount;
    }
    const score =
      Math.max(0, capacity) * Math.max(0, durability) * Math.max(0, flavor) * Math.max(0, texture);
    return { mixture, score, calories };
  });
};

export const partOne = solution((input) => {
  const ingredients = parse(input);
  const cookies = bake(ingredients);
  return reduceMaxBy(cookies, 'score').score;
});

export const partTwo = solution((input) => {
  const ingredients = parse(input);
  const cookies = bake(ingredients).filter((cookie) => cookie.calories === 500);
  return reduceMaxBy(cookies, 'score').score;
});
