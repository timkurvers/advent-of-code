import * as operations from '.';

const lookup = new Map();
for (const operation of Object.values(operations)) {
  lookup.set(operation.opcode, operation);
}

export default lookup;
