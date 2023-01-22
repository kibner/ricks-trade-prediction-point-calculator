import {parse} from "csv-parse/lib/sync";

(function () {
  // readystatechange as event listener to insert or modify the DOM before DOMContentLoaded
  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      _initialize_app();
    }
  })

  function _initialize_app() {
    const TEST_COMPLETED_TRADES_CSV = `
id,player
1,nick van exel
2,jose alvarado
`

    const TEST_PREDICTED_TRADES_CSV = `
id,user,player
1,derek fisher fan,nick van exel
2,derek fisher fan,robert horry
3,derek fisher fan,jordan hill
4,derek fisher fan,chris mihm
5,austin rivers enjoyer,jose alvarado
6,austin rivers enjoyer,robin lopez
7,austin rivers enjoyer,jrue holiday
8,austin rivers enjoyer,jarrett jack
`

    const PARSED_COMPLETED_TRADES = get_parsed_csv(TEST_COMPLETED_TRADES_CSV)
    const PARSED_PREDICTED_TRADES = get_parsed_csv(TEST_PREDICTED_TRADES_CSV)
    const RESULTS = get_calculated_results(PARSED_COMPLETED_TRADES, PARSED_PREDICTED_TRADES)
    display_results(RESULTS)
  }

  function get_parsed_csv(csv_string) {
    return parse(csv_string, {
      columns: true,
      skip_empty_lines: true
    })
  }

  function get_calculated_results(completed_trades, predicted_trades) {
    return [
      {
        user: `Derek Fisher Fan`,
        total_points: 16,
        bonus_points: 6,
        prediction_results: [
          {
            player: `Nick Van Exel`,
            points: 5
          },
          {
            player: `Robert Horry`,
            points: 2
          },
          {
            player: `Jordan Hill`,
            points: 2
          }, {
            player: `Chris Mihm`,
            points: 1
          }
        ]
      },
      {
        user: `Austin Rivers Enjoyer`,
        total_points: 6,
        bonus_points: 0,
        prediction_results: [
          {
            player: `Jose Alvarado`,
            points: 2
          },
          {
            player: `Robin Lopez`,
            points: 1
          },
          {
            player: `Jrue Holiday`,
            points: 2
          },
          {
            player: `Jarret Jack`,
            points: 1
          }
        ]
      }]
  }

  function display_results(results) {
    const TBODY = document.querySelector(`output[name='calculator-result'] tbody`)
    const ROW_TEMPLATE = document.querySelector(`#calculated-points-row`)

    results.forEach(function (calculated_result, index, array) {
      const TEMPLATED_ROW = get_templated_row(ROW_TEMPLATE, calculated_result)
      TBODY.appendChild(TEMPLATED_ROW)
    })
  }

  function get_templated_row(row_template, calculated_result){
    const TEMPLATED_ROW = row_template.content.cloneNode(true)
    let tds = TEMPLATED_ROW.querySelectorAll(`td`)

    set_templated_row_td_values(tds, calculated_result)

    return TEMPLATED_ROW
  }

  function set_templated_row_td_values(tds, calculated_result){
    tds[0].textContent = calculated_result.user
    tds[1].textContent = calculated_result.total_points

    calculated_result.prediction_results.forEach(function (prediction_result, index, array) {
      const TD_INDEX = index + 2
      tds[TD_INDEX].textContent = prediction_result.player
    })
  }
})()
