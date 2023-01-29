import {HAS_MATCHING_PLAYER} from './helpers';

const HAS_CORRECTLY_GUESSED_THREE_PLAYERS = function (user_results)
{
  return 3 < user_results.prediction_results.reduce(
    function (accumulator, current_prediction)
    {
      if (current_prediction.points > 0)
      {
        accumulator += 1;
      }

      return accumulator;
    }, user_results.bonus_points,
  );
};

export const GET_POINTS_FOR_CORRECTLY_GUESSING_THREE_PLAYERS = function (user_results)
{
  if (HAS_CORRECTLY_GUESSED_THREE_PLAYERS(user_results))
  {
    return 6;
  }

  return 0;
};

export const GET_POINTS_FOR_CORRECTLY_GUESSING_A_PLAYER = function (predicted_trade, completed_trades)
{
  const found_player = completed_trades.find(
    function (completed_trade)
    {
      return HAS_MATCHING_PLAYER(predicted_trade, completed_trade);
    });

  let points = 0;

  if (found_player)
  {
    points = points + 1;

    if (found_player.pick_frequency === 1)
    {
      points = points + 9;
    } else if (found_player.pick_frequency < 7)
    {
      points = points + 3;
    }
  }

  return points;
};
