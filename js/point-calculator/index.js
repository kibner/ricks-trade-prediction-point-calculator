// +01: For a correctly named player.
// +03 Bonus point if between (and including, to clarify) 5 and 1 other people mentioned this player
// +06: If you nail at least three players.
// +09: Bonus points if no one else mentioned this player.

import {TEST_DATA__CALCULATED_RESULTS} from '../test-data';

const HAS_MATCHING_PLAYER = function (predicted_trade, completed_trade)
{
  return predicted_trade.player === completed_trade.player;
};

const GET_PICK_FREQUENCY = function (predicted_trades, completed_trade)
{
  const INITIAL_PICK_FREQUENCY_VALUE = 0;

  return predicted_trades.reduce(
    function (accumulator, current_predicted_trade)
    {
      if (HAS_MATCHING_PLAYER(current_predicted_trade, completed_trade))
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

function GET_GROUPED_PREDICTED_TRADES(predicted_trades)
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
}

export const GET_CALCULATED_RESULTS = function (completed_trades, predicted_trades)
{
  completed_trades = SET_PICK_FREQUENCY_FOR_COMPLETED_TRADES(completed_trades, predicted_trades);
  const GROUPED_PREDICTED_TRADES = GET_GROUPED_PREDICTED_TRADES(predicted_trades);

  const RESULTS = Object.entries(GROUPED_PREDICTED_TRADES).map(
    function ([user, predicted_trades])
    {
      return {
        user,
        total_points: 0,
        bonus_points: 0,
        prediction_results: predicted_trades.map(
          function (predicted_trade)
          {
            return {
              player: predicted_trade,
              points: 0,
            };
          },
        ),
      };
    },
  );

  console.log(RESULTS);

  return TEST_DATA__CALCULATED_RESULTS;
};


