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
})()
