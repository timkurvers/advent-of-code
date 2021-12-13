use num::Integer;
use std::collections::HashMap;
use std::collections::hash_map::Entry;
use std::fmt::{self, Debug};
use std::hash::Hash;
use std::ops::{AddAssign, Range};

#[derive(Debug, Default)]
pub struct Grid<X, Y, V> {
    points: HashMap<GridPoint<X, Y>, GridValue<V>>,
}
type GridPoint<X, Y> = (X, Y);
type GridValue<V> = V;

impl<
    X: AddAssign + Copy + Hash + Integer,
    Y: AddAssign + Copy + Hash + Integer,
    V: fmt::Display,
> Grid<X, Y, V> {
    pub fn column(&self, x: X) -> impl Iterator<Item = Option<&GridValue<V>>> + '_ {
        let mut y = self.min_y();
        let max_y = self.max_y();
        std::iter::from_fn(move || {
            let result = if y <= max_y {
                Some(self.get((x, y)))
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
                Some(self.get((x, y)))
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
        self.points.iter().map(|((x, _), _)| *x)
    }

    fn min_x(&self) -> X {
        self.xs().min().unwrap()
    }

    fn max_x(&self) -> X {
        self.xs().max().unwrap()
    }

    fn ys(&self) -> impl Iterator<Item = Y> + '_ {
        self.points.iter().map(|((_, y), _)| *y)
    }

    fn min_y(&self) -> Y {
        self.ys().min().unwrap()
    }

    fn max_y(&self) -> Y {
        self.ys().max().unwrap()
    }

    pub fn iter(&self) -> impl Iterator<Item = (&GridPoint<X, Y>, &GridValue<V>)> {
        self.points.iter()
    }

    pub fn iter_mut(&mut self) -> impl Iterator<Item = (&GridPoint<X, Y>, &mut GridValue<V>)> {
        self.points.iter_mut()
    }

    pub fn point(&mut self, point: GridPoint<X, Y>) -> Entry<GridPoint<X, Y>, V> {
        return self.points.entry(point);
    }

    pub fn get(&self, point: GridPoint<X, Y>) -> Option<&GridValue<V>> {
        return self.points.get(&point);
    }

    pub fn set(&mut self, point: GridPoint<X, Y>, value: GridValue<V>) {
        self.points.insert(point, value);
    }
}

impl<
    X: AddAssign + Copy + From<usize> + Hash + Integer + Ord,
    Y: AddAssign + Copy + From<usize> + Hash + Integer + Ord,
    V: fmt::Display,
> fmt::Display for Grid<X, Y, V>
    where Range<X>: Iterator<Item = X>, Range<Y>: Iterator<Item = Y> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for y in self.min_y()..self.max_y() {
            for x in self.min_x()..self.max_x() {
                if let Some(value) = self.points.get(&(x, y)) {
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
