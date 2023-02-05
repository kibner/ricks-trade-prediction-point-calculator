export const DISPLAY_RESULTS = function (results)
{
  const TBODY = document.querySelector(`output[name='calculator-result'] tbody`);
  const ROW_TEMPLATE = document.querySelector(`#calculated-points-row`);
  TBODY.textContent = null;

  results.forEach(
    function (calculated_result, index, array)
    {
      const TEMPLATED_ROW = GET_TEMPLATED_ROW(ROW_TEMPLATE, calculated_result);
      TBODY.appendChild(TEMPLATED_ROW);
    });
};

const GET_TEMPLATED_ROW = function (row_template, calculated_result)
{
  const TEMPLATED_ROW = row_template.content.cloneNode(true);
  const TDS = TEMPLATED_ROW.querySelectorAll(`td`);

  SET_TEMPLATED_ROW_TD_VALUES(TDS, calculated_result);

  return TEMPLATED_ROW;
};

const SET_TEMPLATED_ROW_TD_VALUES = function (tds, calculated_result)
{
  tds[0].textContent = calculated_result.user;
  tds[1].textContent = calculated_result.total_points;

  calculated_result.prediction_results.forEach(
    function (prediction_result, index, array)
    {
      const TD_INDEX = index + 2;

      if (TD_INDEX < tds.length)
      {
        tds[TD_INDEX].textContent = prediction_result.player;
      }
    });
};
