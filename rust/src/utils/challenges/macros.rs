#[macro_export]
macro_rules! preload_challenges {
    (into $vec:ident) => {
        preload_challenges! {
            into $vec
            2019 (
                01, 02, 05
            )
            2021 (
                01, 02, 03, 04, 05, 06, 07, 10
            )
            2022 (
                01
            )
            2023 (
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
                #[path="../" $year "/" $day ".rs"]
                mod [<year $year day $day>];
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
                        $year, $day, &*crate::[<year $year day $day>]::PARTS
                    )
                );
            )+
        }
    }
}

#[macro_export]
macro_rules! puzzle_args {
    ($($field:ident: $type:ty = $default:expr),+) => {
        #[derive(Debug)]
        struct PuzzleArgs {
            $(
                $field: $type,
            )+
        }

        impl PuzzleArgs {
            // Apologies in advance for this monstrosity >.>
            fn from(raw_args: &RawPuzzleArgs) -> PuzzleArgs {
                let mut instance = PuzzleArgs {
                    $(
                        $field: $default,
                    )+
                };
                $(
                    if let Some(entry) = raw_args.get(stringify!($field)) {
                        paste! {
                            instance.$field = puzzle_args_extract_value!(
                                entry as $type
                            );
                        }
                    }
                )+
                instance
            }
        }
    }
}

#[macro_export]
macro_rules! puzzle_args_extract_value {
    ($entry:ident as String) => {
        match $entry {
            PuzzleArg::String(str) => str.to_string(),
            _ => panic!(),
        }
    };

    ($entry:ident as u64) => {
        match $entry {
            PuzzleArg::Number(nr) => *nr,
            _ => panic!(),
        }
    };

    ($entry:ident as bool) => {
        match $entry {
            PuzzleArg::Boolean(bool) => *bool,
            _ => panic!(),
        }
    };
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
