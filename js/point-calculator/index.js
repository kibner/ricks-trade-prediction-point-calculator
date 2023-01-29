import PROCESS_COMPLETED_TRADES from './process-completed-trades';
import {GET_POINTS_FOR_CORRECTLY_GUESSING_A_PLAYER, GET_POINTS_FOR_CORRECTLY_GUESSING_THREE_PLAYERS} from './rules';


const GET_GROUPED_PREDICTED_TRADES = function (predicted_trades)
{
  const INITIAL_GROUP_PREDICTED_TRADE_VALUE = {};

  return predicted_trades.reduce(
    function (accumulator, current_predicted_trade)
    {
      const KEY = current_predicted_trade.user;
      const CURRENT_GROUP = accumulator[KEY] ?? [];

      return {...accumulator, [KEY]: [...CURRENT_GROUP, current_predicted_trade.player]};
    }, INITIAL_GROUP_PREDICTED_TRADE_VALUE,
  );
};

const GET_CALCULATED_POINTS_FOR_PREDICTION = function (predicted_trade, completed_trades)
{
  return GET_POINTS_FOR_CORRECTLY_GUESSING_A_PLAYER(predicted_trade, completed_trades);
};

const GET_CALCULATED_BONUS_POINTS = function (user_results)
{
  return GET_POINTS_FOR_CORRECTLY_GUESSING_THREE_PLAYERS(user_results);
};

const GET_TOTAL_POINTS_FOR_USER = function (user_results)
{
  return user_results.prediction_results.reduce(
    function (accumulator, current_prediction)
    {
      return accumulator + current_prediction.points;
    }, user_results.bonus_points,
  );
};

const GET_CALCULATED_POINTS_FOR_USER = function (user, predicted_trades, completed_trades)
{
  let results = {
    user: user,
    prediction_results: predicted_trades.map(
      function (predicted_trade)
      {
        return {
          player: predicted_trade,
          points: GET_CALCULATED_POINTS_FOR_PREDICTION(predicted_trade, completed_trades),
        };
      },
    ),
  };

  results.bonus_points = GET_CALCULATED_BONUS_POINTS(results);
  results.total_points = GET_TOTAL_POINTS_FOR_USER(results);

  return results;
};

export const GET_CALCULATED_POINTS = function (completed_trades, predicted_trades)
{
  completed_trades = PROCESS_COMPLETED_TRADES(completed_trades, predicted_trades);
  const GROUPED_PREDICTED_TRADES = GET_GROUPED_PREDICTED_TRADES(predicted_trades);

  return Object.entries(GROUPED_PREDICTED_TRADES).map(
    function ([user, predicted_trades])
    {
      return GET_CALCULATED_POINTS_FOR_USER(user, predicted_trades, completed_trades);
    },
  );
};
