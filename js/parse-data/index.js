import {parse} from 'csv-parse/lib/sync';

export const COMPLETED_TRADE_COLUMNS = ['id', 'player'];
export const PREDICTED_TRADE_COLUMNS = ['id', 'user', 'player'];

const TRIM_DATA = function (data)
{
  const KEYS = Object.keys(data);

  KEYS.map(function(key){
    if(typeof data[key] === 'string' || data[key] instanceof String){
      data[key] = data[key].trim();
    }
  });

  return data
}

export const GET_PARSED_CSV = function (csv_string, columns)
{
  const PARSED_CSV = parse(csv_string, {
    columns: columns,
    skip_empty_lines: true,
    from_line: 2,
  });

  return PARSED_CSV.map(function (data) {
    return TRIM_DATA(data);
  });
};
