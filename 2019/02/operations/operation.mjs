export default (opcode, fn) => {
  const operation = (...args) => fn(...args);
  operation.opcode = opcode;
  return operation;
};
