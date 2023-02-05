import {parse} from 'csv-parse/lib/sync';

export const COMPLETED_TRADE_COLUMNS = ['id', 'player'];
export const PREDICTED_TRADE_COLUMNS = ['id', 'user', 'player'];

export const GET_PARSED_CSV = function (csv_string, columns)
{
  return parse(csv_string, {
    columns: columns,
    skip_empty_lines: true,
    from_line: 2,
  });
};
