use lazy_static::lazy_static;
use regex::{Captures, Regex};

lazy_static! {
    static ref SPLIT_UPPER_LOWER: Regex = Regex::new(r"(?x)
        (\p{Upper}+)(\p{Upper}\p{Lower})
    ").unwrap();
    static ref SPLIT_LOWER_UPPER: Regex = Regex::new(r"(?x)
        ([\p{Lower}\d])(\p{Upper})
    ").unwrap();
    static ref DASH_OR_UNDERSCORE: Regex = Regex::new(r"[-_]").unwrap();
    static ref LOWER_STARTS: Regex = Regex::new(r"(?:^| )\p{Lower}").unwrap();
}

pub trait StringExt<T> {
    fn humanize(self) -> String;
    fn titleize(self) -> String;
    fn underscore(self) -> String;
}

impl StringExt<&str> for &str {
    fn humanize(self) -> String {
        self.to_owned().humanize()
    }

    fn titleize(self) -> String {
        self.to_owned().titleize()
    }

    fn underscore(self) -> String {
        self.to_owned().underscore()
    }
}

impl StringExt<String> for String {
    fn humanize(self) -> String {
        let mut string = self;
        string = SPLIT_UPPER_LOWER.replace_all(&string, "$1 $2").to_string();
        string = SPLIT_LOWER_UPPER.replace_all(&string, "$1 $2").to_string();
        string = DASH_OR_UNDERSCORE.replace_all(&string, " ").to_string();
        string.to_lowercase()
    }

    fn titleize(self) -> String {
        let mut string = self.humanize();
        string = LOWER_STARTS.replace_all(&string, |caps: &Captures| {
            caps[0].to_uppercase()
        }).to_string();
        string
    }

    fn underscore(self) -> String {
        let mut string = self.humanize();
        string = string.replace(" ", "_");
        string
    }
}

#[cfg(test)]
mod tests {
    use super::StringExt;

    mod humanize {
        use super::StringExt;

        #[test]
        pub fn test_humanize_string_slices() {
            assert_eq!("partOne".humanize(), "part one");
            assert_eq!("åKjøre".humanize(), "å kjøre");
            assert_eq!("UTFConverter".humanize(), "utf converter");
            assert_eq!("part-one".humanize(), "part one");
            assert_eq!("å-kjøre".humanize(), "å kjøre");
            assert_eq!("utf-converter".humanize(), "utf converter");
        }

        #[test]
        pub fn test_humanize_strings() {
            assert_eq!(String::from("partOne").humanize(), "part one");
            assert_eq!(String::from("åKjøre").humanize(), "å kjøre");
            assert_eq!(String::from("UTFConverter").humanize(), "utf converter");
            assert_eq!(String::from("part-one").humanize(), "part one");
            assert_eq!(String::from("å-kjøre").humanize(), "å kjøre");
            assert_eq!(String::from("utf-converter").humanize(), "utf converter");
        }
    }

    mod titleize {
        use super::StringExt;

        #[test]
        pub fn test_titleize_string_slices() {
            assert_eq!("partOne".titleize(), "Part One");
            assert_eq!("åKjøre".titleize(), "Å Kjøre");
            assert_eq!("UTFConverter".titleize(), "Utf Converter");
            assert_eq!("part-one".titleize(), "Part One");
            assert_eq!("å-kjøre".titleize(), "Å Kjøre");
            assert_eq!("utf-converter".titleize(), "Utf Converter");
        }

        #[test]
        pub fn test_titleize_strings() {
            assert_eq!(String::from("partOne").titleize(), "Part One");
            assert_eq!(String::from("åKjøre").titleize(), "Å Kjøre");
            assert_eq!(String::from("UTFConverter").titleize(), "Utf Converter");
            assert_eq!(String::from("part-one").titleize(), "Part One");
            assert_eq!(String::from("å-kjøre").titleize(), "Å Kjøre");
            assert_eq!(String::from("utf-converter").titleize(), "Utf Converter");
        }
    }

    mod underscore {
        use super::StringExt;

        #[test]
        pub fn test_underscore_string_slices() {
            assert_eq!("partOne".underscore(), "part_one");
            assert_eq!("åKjøre".underscore(), "å_kjøre");
            assert_eq!("UTFConverter".underscore(), "utf_converter");
            assert_eq!("part-one".underscore(), "part_one");
            assert_eq!("å-kjøre".underscore(), "å_kjøre");
            assert_eq!("utf-converter".underscore(), "utf_converter");
        }

        #[test]
        pub fn test_underscore_strings() {
            assert_eq!(String::from("partOne").underscore(), "part_one");
            assert_eq!(String::from("åKjøre").underscore(), "å_kjøre");
            assert_eq!(String::from("UTFConverter").underscore(), "utf_converter");
            assert_eq!(String::from("part-one").underscore(), "part_one");
            assert_eq!(String::from("å-kjøre").underscore(), "å_kjøre");
            assert_eq!(String::from("utf-converter").underscore(), "utf_converter");
        }
    }
}
