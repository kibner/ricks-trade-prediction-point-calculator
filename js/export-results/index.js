export const GET_CSV = function (results)
{
  return results.reduce(
    function (accumulator, current_calculated_result)
    {
      const USER = current_calculated_result.user;
      const TOTAL_POINTS = current_calculated_result.total_points;
      const BONUS_POINTS = current_calculated_result.bonus_points;
      const PREDICTION_RESULTS = GET_PREDICTION_RESULTS_IN_CSV_FORMAT(current_calculated_result.prediction_results);

      return `${accumulator}\n${USER},${TOTAL_POINTS},${BONUS_POINTS},${PREDICTION_RESULTS}`;
    },
    'user,total_points,bonus_points,prediction_1,prediction_1_points,prediction_2,prediction_2_points,prediction_3,prediction_3_points,prediction_4,prediction_4_points',
  );
};

const GET_PREDICTION_RESULTS_IN_CSV_FORMAT = function (prediction_results)
{
  return prediction_results.reduce(
    function (accumulator, current_prediction_result)
    {
      return `${accumulator}${current_prediction_result.player},${current_prediction_result.points},`;
    }, '',
  );
};

export const DOWNLOAD = function (filename, text)
{
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
