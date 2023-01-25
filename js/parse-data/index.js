import {parse} from 'csv-parse/lib/sync';

export const GET_PARSED_CSV = function (csv_string)
{
  return parse(csv_string, {
    columns: true,
    skip_empty_lines: true,
  });
};
