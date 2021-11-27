#[macro_export]
macro_rules! preload_challenges {
    (into $vec:ident) => {
        preload_challenges! {
            into $vec
            2019 (
                01
            )
            2020 (
                01, 02
            )
        }
    };

    (into $vec:ident $($year:literal $days:tt)+) => {
        $(
            reference_challenge_modules!($year, $days);
        )*

        paste! {
            lazy_static! {
                pub static ref [<$vec>]: Vec<Challenge> = {
                    let mut challenges = Vec::new();
                    $(
                        create_challenges!(into challenges, $year, $days);
                    )+
                    return challenges;
                };
            }
        }
    }
}

#[macro_export]
macro_rules! reference_challenge_modules {
    ($year:literal, ( $($day:literal),+ )) => {
        $(
            paste! {
                #[path=$year "/" $day ".rs"]
                mod [<y $year c $day>];
            }
        )+
    }
}

#[macro_export]
macro_rules! create_challenges {
    (into $vec:ident, $year:literal, ( $($day:literal),+ )) => {
        paste! {
            $(
                $vec.push(
                    Challenge::new(
                        $year, $day, &*crate::[<y $year c $day>]::PARTS
                    )
                );
            )+
        }
    }
}

#[macro_export]
macro_rules! solve {
    ($($func:ident),+) => {
        lazy_static! {
            pub static ref PARTS: Vec<SolutionPart> = vec![
                $(
                    SolutionPart::new(stringify!($func), $func),
                )+
            ];
        }
    }
}
