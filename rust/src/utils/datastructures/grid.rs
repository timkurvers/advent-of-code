use num::Integer;
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;
use std::fmt::{self, Debug};
use std::ops::{AddAssign, Range};

#[derive(Debug, Default)]
pub struct Grid<X, Y, V> {
    pub points: BTreeMap<GridPoint<Y, X>, GridValue<V>>,
}

// Note: For ordering purposes, a grid point is (y, x) not (x, y)
type GridPoint<Y, X> = (Y, X);
type GridValue<V> = V;

impl<
    X: AddAssign + Copy + Debug + Integer,
    Y: AddAssign + Copy + Debug + Integer,
    V: fmt::Display,
> Grid<X, Y, V> {
    pub fn column(&self, x: X) -> impl Iterator<Item = Option<&GridValue<V>>> + '_ {
        let mut y = self.min_y();
        let max_y = self.max_y();
        std::iter::from_fn(move || {
            let result = if y <= max_y {
                Some(self.get((y, x)))
            } else {
                None
            };
            y += Y::one();
            result
        })
    }

    pub fn columns(&self) -> impl Iterator<Item = impl Iterator<Item = Option<&GridValue<V>>> + '_> + '_ {
        let mut x = self.min_x();
        let max_x = self.max_x();
        std::iter::from_fn(move || {
            let result = if x <= max_x {
                Some(self.column(x))
            } else {
                None
            };
            x += X::one();
            result
        })
    }

    pub fn row(&self, y: Y) -> impl Iterator<Item = Option<&GridValue<V>>> + '_ {
        let mut x = self.min_x();
        let max_x = self.max_x();
        std::iter::from_fn(move || {
            let result = if x <= max_x {
                Some(self.get((y, x)))
            } else {
                None
            };
            x += X::one();
            result
        })
    }

    pub fn rows(&self) -> impl Iterator<Item = impl Iterator<Item = Option<&GridValue<V>>> + '_> + '_ {
        let mut y = self.min_y();
        let max_y = self.max_y();
        std::iter::from_fn(move || {
            let result = if y <= max_y {
                Some(self.row(y))
            } else {
                None
            };
            y += Y::one();
            result
        })
    }

    fn xs(&self) -> impl Iterator<Item = X> + '_ {
        self.points.iter().map(|((_, x), _)| *x)
    }

    fn min_x(&self) -> X {
        self.xs().min().unwrap()
    }

    fn max_x(&self) -> X {
        self.xs().max().unwrap()
    }

    fn ys(&self) -> impl Iterator<Item = Y> + '_ {
        self.points.iter().map(|((y, _), _)| *y)
    }

    fn min_y(&self) -> Y {
        self.ys().min().unwrap()
    }

    fn max_y(&self) -> Y {
        self.ys().max().unwrap()
    }

    pub fn iter(&self) -> impl Iterator<Item = (&GridPoint<Y, X>, &GridValue<V>)> {
        self.points.iter()
    }

    pub fn iter_mut(&mut self) -> impl Iterator<Item = (&GridPoint<Y, X>, &mut GridValue<V>)> {
        self.points.iter_mut()
    }

    pub fn get_entry_mut(&mut self, point: GridPoint<Y, X>) -> Entry<GridPoint<Y, X>, V> {
        return self.points.entry(point);
    }

    pub fn get(&self, point: GridPoint<Y, X>) -> Option<&GridValue<V>> {
        return self.points.get(&point);
    }

    pub fn get_point(&self, point: GridPoint<Y, X>) -> Option<(&GridPoint<Y, X>, &GridValue<V>)> {
        return self.points.get_key_value(&point);
    }

    pub fn set(&mut self, point: GridPoint<Y, X>, value: GridValue<V>) {
        self.points.insert(point, value);
    }

    pub fn neighbors_iter(&self, (y, x): GridPoint<Y, X>) -> impl Iterator<Item = (&GridPoint<Y, X>, &GridValue<V>)> {
        let x1 = X::one();
        let y1 = Y::one();
        let neighbors = [
            (y - y1, x - x1), (y - y1, x), (y - y1, x + x1),
            (y,      x - x1),              (y,      x + x1),
            (y + y1, x - x1), (y + y1, x), (y + y1, x + x1),
        ];
        let mut index = 0;
        std::iter::from_fn(move || {
            while index < neighbors.len() {
                let result = self.get_point(neighbors[index]);
                index += 1;
                if result.is_some() {
                    return result
                }
            }
            None
        })
    }
}

impl<
    X: AddAssign + Copy + Debug + Integer + Ord,
    Y: AddAssign + Copy + Debug + Integer + Ord,
    V: fmt::Display,
> fmt::Display for Grid<X, Y, V>
    where Range<X>: Iterator<Item = X>, Range<Y>: Iterator<Item = Y> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for y in self.min_y()..self.max_y() + Y::one() {
            for x in self.min_x()..self.max_x() + X::one() {
                if let Some(value) = self.points.get(&(y, x)) {
                    write!(f, "{}", value)?;
                } else {
                    write!(f, ".")?;
                }
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}
