use std::collections::VecDeque;

use crate::utils::challenges::prelude::*;

#[derive(Debug, Default)]
pub struct Intcode {
    source: Vec<i32>,
    pointer: usize,
    pub memory: Vec<i32>,
    pub input: VecDeque<i32>,
    pub output: VecDeque<i32>,
}

impl Intcode {
    pub fn read(&mut self) -> i32 {
        let value= self.memory[self.pointer];
        self.pointer += 1;
        value
    }

    pub fn read_params<const N: usize>(&mut self, modes: u32) -> [i32; N] {
        let mut params: [i32; N] = [0; N];
        for i in 0..N {
            let base = 10u32.pow(i as u32);
            let mode: ParamMode = ((modes % (base * 10)) / base).into();
            let value = self.read();

            params[i] = match mode {
                ParamMode::Immediate => value,
                ParamMode::Position => self.memory[value as usize],
            }
        }
        params
    }

    pub fn reset(&mut self) {
        self.pointer = 0;
        self.memory = self.source.clone();
    }

    pub fn run(&mut self) {
        let end = self.memory.len();

        while self.pointer < end {
            let int = self.read();
            let opcode = (int % 100) as u32;
            let modes = (int / 100) as u32;

            let operation: Operation = opcode.into();

            match operation {
                Operation::Add => {
                    let [a, b] = self.read_params::<2>(modes);
                    let c = self.read();
                    self.memory[c as usize] = a + b;
                }
                Operation::Multiply => {
                    let [a, b] = self.read_params::<2>(modes);
                    let c = self.read();
                    self.memory[c as usize] = a * b;
                }
                Operation::Input => {
                    let a = self.read();
                    let value = self.input.pop_front();
                    self.memory[a as usize] = value.unwrap() as i32;
                }
                Operation::Output => {
                    let [a] = self.read_params::<1>(modes);
                    self.output.push_back(a);
                }
                Operation::JumpIfTrue => {
                    let [a, target] = self.read_params::<2>(modes);
                    if a != 0 {
                        self.pointer = target as usize;
                    }
                }
                Operation::JumpIfFalse => {
                    let [a, target] = self.read_params::<2>(modes);
                    if a == 0 {
                        self.pointer = target as usize;
                    }
                }
                Operation::LessThan => {
                    let [a, b] = self.read_params::<2>(modes);
                    let c = self.read();
                    self.memory[c as usize] = if a < b { 1 } else { 0 };
                }
                Operation::Equals => {
                    let [a, b] = self.read_params::<2>(modes);
                    let c = self.read();
                    self.memory[c as usize] = if a == b { 1 } else { 0 };
                }
                Operation::Halt => {
                    break
                }
                _ => panic!("unknown opcode: {:?}", operation),
            }
        }
    }

    pub fn from(str: &str) -> Intcode {
        let source: Vec<i32> = str.split(",").map(|nr| (
            nr.trim().parse::<i32>().unwrap()
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
    Input = 3,
    Output = 4,
    JumpIfTrue = 5,
    JumpIfFalse = 6,
    LessThan = 7,
    Equals = 8,
    Halt = 99
}

impl From<u32> for Operation {
    fn from(opcode: u32) -> Self {
        unsafe {
            std::mem::transmute(opcode)
        }
    }
}

#[allow(dead_code)]
#[derive(Debug)]
#[repr(u32)]
enum ParamMode {
    Position = 0,
    Immediate = 1,
}

impl From<u32> for ParamMode {
    fn from(opcode: u32) -> Self {
        unsafe {
            std::mem::transmute(opcode)
        }
    }
}
