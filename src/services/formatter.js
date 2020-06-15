import { format } from 'currency-formatter';

const formatterConfig = { code: 'BRL' };

export default money => format(money, formatterConfig);
