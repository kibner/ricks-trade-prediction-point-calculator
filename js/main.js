import {GET_PARSED_CSV} from "./parse-data";
import {COMPLETED_TRADES__CSV, PREDICTED_TRADES__CSV} from "./test-data"
import {DISPLAY_RESULTS} from "./display-results";
import {GET_CALCULATED_RESULTS} from "./point-calculator";

(function () {
  // readystatechange as event listener to insert or modify the DOM before DOMContentLoaded
  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      INITIALIZE_APP();
    }
  })

  const INITIALIZE_APP = function () {
    const PARSED_COMPLETED_TRADES = GET_PARSED_CSV(COMPLETED_TRADES__CSV)
    const PARSED_PREDICTED_TRADES = GET_PARSED_CSV(PREDICTED_TRADES__CSV)
    const RESULTS = GET_CALCULATED_RESULTS(PARSED_COMPLETED_TRADES, PARSED_PREDICTED_TRADES)
    DISPLAY_RESULTS(RESULTS)
  }
})()
