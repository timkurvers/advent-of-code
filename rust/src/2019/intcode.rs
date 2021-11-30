#[derive(Debug, Default)]
pub struct Intcode {
    source: Vec<u32>,
    pointer: usize,
    pub memory: Vec<u32>,
}

impl Intcode {
    pub fn read(&mut self) -> u32 {
        let value= self.memory[self.pointer];
        self.pointer += 1;
        value
    }

    pub fn reset(&mut self) {
        self.pointer = 0;
        self.memory = self.source.clone();
    }

    pub fn run(&mut self) {
        let end = self.memory.len();

        while self.pointer < end {
            let opcode: Operation = unsafe {
                std::mem::transmute(self.read())
            };
            match opcode {
                Operation::Add => {
                    let (a, b, c) = (self.read(), self.read(), self.read());
                    self.memory[c as usize] = self.memory[a as usize] + self.memory[b as usize];
                }
                Operation::Multiply => {
                    let (a, b, c) = (self.read(), self.read(), self.read());
                    self.memory[c as usize] = self.memory[a as usize] * self.memory[b as usize];
                }
                Operation::Halt => {
                    break
                }
                _ => panic!("unknown opcode: {:?}", opcode),
            }
        }
    }

    pub fn from(str: &str) -> Intcode {
        let source: Vec<u32> = str.split(",").map(|nr| (
            nr.parse::<u32>().unwrap()
        )).collect();
        let memory = source.clone();
        Intcode { source, memory, ..Default::default() }
    }
}

#[allow(dead_code)]
#[derive(Debug)]
#[repr(u32)]
enum Operation {
    Unused = 0,
    Add = 1,
    Multiply = 2,
    Halt = 99
}
