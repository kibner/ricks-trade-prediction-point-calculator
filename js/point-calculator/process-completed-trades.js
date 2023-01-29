import {HAS_MATCHING_PLAYER} from './helpers';

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

const PROCESS_COMPLETED_TRADES = function (completed_trades, predicted_trades)
{
  return SET_PICK_FREQUENCY_FOR_COMPLETED_TRADES(completed_trades, predicted_trades);
};

export default PROCESS_COMPLETED_TRADES;
