import {TEST_DATA__COMPLETED_TRADES__CSV} from '../test-data';

export const GET_CSV = function (results)
{
  return TEST_DATA__COMPLETED_TRADES__CSV;
};

export const DOWNLOAD = function (filename, text)
{
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
