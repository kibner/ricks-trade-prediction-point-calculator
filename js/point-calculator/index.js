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

      return {
        ...accumulator,
        [KEY]: [...CURRENT_GROUP, {id: current_predicted_trade.id, player: current_predicted_trade.player}],
      };
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
  let prediction_results = predicted_trades.map(
    function (predicted_trade)
    {
      return {
        player: predicted_trade.player,
        points: GET_CALCULATED_POINTS_FOR_PREDICTION(predicted_trade, completed_trades),
      };
    },
  );

  prediction_results.sort(PREDICTION_RESULTS_SORT_ORDER);

  let results = {
    user: user,
    prediction_results: prediction_results,
  };

  results.bonus_points = GET_CALCULATED_BONUS_POINTS(results);
  results.total_points = GET_TOTAL_POINTS_FOR_USER(results);

  return results;
};

const PREDICTION_RESULTS_SORT_ORDER = function (a, b)
{
  if (a.points < b.points)
  {
    return 1;
  } else if (a.points > b.points)
  {
    return -1;
  }

  const a_player = a.player.toLowerCase();
  const b_player = b.player.toLowerCase();

  if (a_player > b_player)
  {
    return 1;
  } else if (a_player < b_player)
  {
    return -1;
  }

  return 0;
};

const RESULTS_SORT_ORDER = function (a, b)
{
  if (a.total_points < b.total_points)
  {
    return 1;
  } else if (a.total_points > b.total_points)
  {
    return -1;
  }

  const a_user = a.user.toLowerCase();
  const b_user = b.user.toLowerCase();

  if (a_user > b_user)
  {
    return 1;
  } else if (a_user < b_user)
  {
    return -1;
  }

  return 0;
};

export const GET_CALCULATED_POINTS = function (completed_trades, predicted_trades)
{
  completed_trades = PROCESS_COMPLETED_TRADES(completed_trades, predicted_trades);
  const GROUPED_PREDICTED_TRADES = GET_GROUPED_PREDICTED_TRADES(predicted_trades);

  let results = Object.entries(GROUPED_PREDICTED_TRADES).map(
    function ([user, predicted_trades])
    {
      return GET_CALCULATED_POINTS_FOR_USER(user, predicted_trades, completed_trades);
    },
  );

  results.sort(RESULTS_SORT_ORDER);

  return results;
};
