let PLAYER_POINTS_CELL_TEMPLATE;

export const DISPLAY_RESULTS = function (results)
{
  const TBODY = document.querySelector(`#calculator-result tbody`);
  const ROW_TEMPLATE = document.querySelector(`#calculated-points-row`);
  PLAYER_POINTS_CELL_TEMPLATE = document.querySelector('#player-points-cell');

  TBODY.textContent = null;

  results.forEach(
    function (calculated_result, index, array)
    {
      const TEMPLATED_ROW = GET_TEMPLATED_ROW(ROW_TEMPLATE, PLAYER_POINTS_CELL_TEMPLATE, calculated_result);
      TBODY.appendChild(TEMPLATED_ROW);
    });
};

const GET_TEMPLATED_ROW = function (row_template, player_points_cell_template, calculated_result)
{
  const TEMPLATED_ROW = row_template.content.cloneNode(true);
  const TDS = TEMPLATED_ROW.querySelectorAll(`td`);

  SET_TEMPLATED_ROW_TD_VALUES(TDS, player_points_cell_template, calculated_result);

  return TEMPLATED_ROW;
};

const SET_TEMPLATED_ROW_TD_VALUES = function (tds, player_points_cell_template, calculated_result)
{
  tds[0].textContent = calculated_result.user;
  tds[1].textContent = calculated_result.total_points;

  calculated_result.prediction_results.forEach(
    function (prediction_result, index, array)
    {
      const TD_INDEX = index + 2;

      if (TD_INDEX < tds.length)
      {
        if (prediction_result.points > 0)
        {
          const TEMPLATED_PLAYER_POINTS_CELL = GET_TEMPLATED_PLAYER_POINTS_CELL(
            player_points_cell_template,
            prediction_result,
          );

          tds[TD_INDEX].append(TEMPLATED_PLAYER_POINTS_CELL);
        } else
        {
          tds[TD_INDEX].textContent = prediction_result.player;
        }
      }
    });
};

const GET_TEMPLATED_PLAYER_POINTS_CELL = function (player_points_cell_template, prediction_result)
{
  const TEMPLATED_PLAYER_POINTS_CELL = player_points_cell_template.content.cloneNode(true);
  const PLAYER_ELEMENT = TEMPLATED_PLAYER_POINTS_CELL.querySelectorAll(`.player-name`);
  const POINTS_ELEMENT = TEMPLATED_PLAYER_POINTS_CELL.querySelectorAll(`.player-points`);

  SET_TEMPLATED_ROW_PLAYER_POINTS_CELL_VALUES(PLAYER_ELEMENT, POINTS_ELEMENT, prediction_result);

  return TEMPLATED_PLAYER_POINTS_CELL;
};

const SET_TEMPLATED_ROW_PLAYER_POINTS_CELL_VALUES = function (player_element, points_element, prediction_result)
{
  player_element[0].textContent = prediction_result.player;
  points_element[0].textContent = prediction_result.points;
};
