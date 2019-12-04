import { example } from '../../../utils';

export default [
  example('111111-111111', 1),
  example('223450-223450', 0),
  example('123789-123789', 0),
  example('123788-123789', 1),

  example('112233-112233', null, 1),
  example('123444-123444', null, 0),
  example('111122-111122', null, 1),
];
