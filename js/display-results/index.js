export const DISPLAY_RESULTS = function (results)
{
  const TBODY = document.querySelector(`#calculator-result tbody`);
  const ROW_TEMPLATE = document.querySelector(`#calculated-points-row`);
  const CORRECT_PREDICTION_PLAYER_POINTS_CELL_TEMPLATE = document.querySelector('#correct-prediction-player-points-cell');
  const WRONG_PREDICTION_PLAYER_POINTS_CELL_TEMPLATE = document.querySelector('#wrong-prediction-player-points-cell');

  get_templated_player_points_cell = get_templated_player_points_cell.bind(
    null,
    CORRECT_PREDICTION_PLAYER_POINTS_CELL_TEMPLATE,
    WRONG_PREDICTION_PLAYER_POINTS_CELL_TEMPLATE,
  );

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
  tds[2].textContent = calculated_result.bonus_points;

  calculated_result.prediction_results.forEach(
    function (prediction_result, index, array)
    {
      const TD_INDEX = index + 3;

      if (TD_INDEX < tds.length)
      {
        const TEMPLATED_PLAYER_POINTS_CELL = get_templated_player_points_cell(prediction_result);
        tds[TD_INDEX].append(TEMPLATED_PLAYER_POINTS_CELL);
      }
    });
};

let get_templated_player_points_cell = function (
  correct_prediction_player_points_cell_template,
  wrong_prediction_player_points_cell_template,
  prediction_result,
)
{
  let templated_player_points_cell;

  if (prediction_result.points > 0)
  {
    templated_player_points_cell = GET_CORRECT_PREDICTION_TEMPLATED_PLAYER_POINTS_CELL(
      correct_prediction_player_points_cell_template,
      prediction_result,
    );
  } else
  {
    templated_player_points_cell = GET_WRONG_PREDICTION_TEMPLATED_PLAYER_POINTS_CELL(
      wrong_prediction_player_points_cell_template,
      prediction_result,
    );
  }

  return templated_player_points_cell;
};

const GET_CORRECT_PREDICTION_TEMPLATED_PLAYER_POINTS_CELL = function (
  correct_prediction_player_points_cell_template,
  prediction_result,
)
{
  let templated_player_points_cell = correct_prediction_player_points_cell_template.content.cloneNode(true);
  const PLAYER_ELEMENT = templated_player_points_cell.querySelectorAll(`.player-name`);
  const POINTS_ELEMENT = templated_player_points_cell.querySelectorAll(`.player-points`);

  SET_CORRECT_PREDICTION_TEMPLATED_ROW_PLAYER_POINTS_CELL_VALUES(PLAYER_ELEMENT, POINTS_ELEMENT, prediction_result);
  return templated_player_points_cell;
};

const GET_WRONG_PREDICTION_TEMPLATED_PLAYER_POINTS_CELL = function (
  wrong_prediction_player_points_cell_template,
  prediction_result,
)
{
  let templated_player_points_cell = wrong_prediction_player_points_cell_template.content.cloneNode(true);
  const PLAYER_ELEMENT = templated_player_points_cell.querySelectorAll(`.player-name`);
  const POINTS_ELEMENT = templated_player_points_cell.querySelectorAll(`.player-points`);

  SET_WRONG_TEMPLATED_ROW_PLAYER_POINTS_CELL_VALUES(PLAYER_ELEMENT, POINTS_ELEMENT, prediction_result);
  return templated_player_points_cell;
};

const SET_CORRECT_PREDICTION_TEMPLATED_ROW_PLAYER_POINTS_CELL_VALUES = function (
  player_element,
  points_element,
  prediction_result,
)
{
  player_element[0].textContent = prediction_result.player;
  points_element[0].textContent = prediction_result.points;
};

const SET_WRONG_TEMPLATED_ROW_PLAYER_POINTS_CELL_VALUES = function (player_element, points_element, prediction_result)
{
  player_element[0].textContent = prediction_result.player;
  points_element[0].textContent = `\uFEFF`; // non-printed character
};
