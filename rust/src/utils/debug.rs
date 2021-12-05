// Loosely based on built-in std::dbg macro
// See: https://doc.rust-lang.org/src/std/macros.rs.html#286-308
#[macro_export]
macro_rules! p {
    () => {
        println!();
    };

    (arg $val:literal $(,)?) => {
        print!("{} ", $val)
    };

    (arg $val:expr $(,)?) => {
        print!(
            "{}{} {}{} ",
            stringify!($val).bright_black(),
            ":".bright_black(),
            format!("{:#?}", $val).bright_cyan(),
            ",".bright_black(),
        )
    };

    ($($val:expr),+ $(,)?) => {
        $(
            p!(arg $val);
        )+
        println!();
    };
}
