use std::time::Duration;

pub trait DurationExt {
    fn humanize(self) -> String;
}

impl DurationExt for Duration {
    fn humanize(self) -> String {
        let nanos = self.as_nanos();
        if nanos >= 1000000 {
            format!("{}ms", num::Integer::div_ceil(&nanos, &1000000))
        } else if nanos >= 1000 {
            format!("{}μs", num::Integer::div_ceil(&nanos, &1000))
        } else {
            format!("{}ns", nanos)
        }.to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::DurationExt;

    mod humanize {
        use std::time::Duration;

        use super::DurationExt;

        #[test]
        pub fn test_humanize_durations() {
            assert_eq!(Duration::new(4,        0).humanize(), "4000ms");
            assert_eq!(Duration::new(2, 10000000).humanize(), "2010ms");
            assert_eq!(Duration::new(0,  1004000).humanize(),    "2ms");
            assert_eq!(Duration::new(0,   100000).humanize(),  "100μs");
            assert_eq!(Duration::new(0,    10400).humanize(),   "11μs");
            assert_eq!(Duration::new(0,     1400).humanize(),    "2μs");
            assert_eq!(Duration::new(0,     1000).humanize(),    "1μs");
            assert_eq!(Duration::new(0,      100).humanize(),  "100ns");
            assert_eq!(Duration::new(0,       10).humanize(),   "10ns");
            assert_eq!(Duration::new(0,        1).humanize(),    "1ns");
        }
    }
}
