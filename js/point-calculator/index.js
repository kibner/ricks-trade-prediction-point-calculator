import {TEST_DATA__CALCULATED_RESULTS} from '../test-data';

// +01: For a correctly named player.
// +03 Bonus point if between (and including, to clarify) 5 and 1 other people mentioned this player
// +06: If you nail at least three players.
// +09: Bonus points if no one else mentioned this player.

const INITIAL_PICK_FREQUENCY_VALUE = 0;

const HAS_MATCHING_PLAYER = function (prediction, completed_trade)
{
  return prediction.player === completed_trade.player;
};

const GET_PICK_FREQUENCY = function (predicted_trades, completed_trade)
{
  return predicted_trades.reduce(
    function (accumulator, current_prediction)
    {
      if (HAS_MATCHING_PLAYER(current_prediction, completed_trade))
      {
        accumulator = accumulator + 1;
      }

      return accumulator;
    },
    INITIAL_PICK_FREQUENCY_VALUE,
  );
};

const SET_PICK_FREQUENCY_FOR_COMPLETED_TRADES = function (completed_trades, predicted_trades)
{
  completed_trades.map(
    function (completed_trade)
    {
      return completed_trade.pick_frequency = GET_PICK_FREQUENCY(predicted_trades, completed_trade);
    });

  return completed_trades;
};

export const GET_CALCULATED_RESULTS = function (completed_trades, predicted_trades)
{
  completed_trades = SET_PICK_FREQUENCY_FOR_COMPLETED_TRADES(completed_trades, predicted_trades);

  console.log(completed_trades);

  return TEST_DATA__CALCULATED_RESULTS;
};


