export const HAS_MATCHING_PLAYER = function (predicted_trade, completed_trade)
{
  return predicted_trade.player === completed_trade.player;
};
