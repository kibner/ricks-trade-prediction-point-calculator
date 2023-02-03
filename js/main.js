import {DISPLAY_RESULTS} from './display-results';
import {GET_PARSED_CSV} from './parse-data';
import {GET_CALCULATED_POINTS} from './point-calculator';
import {TEST_DATA__COMPLETED_TRADES__CSV, TEST_DATA__PREDICTED_TRADES__CSV} from './test-data';

(
  function ()
  {
    const SUBMIT_BUTTON_SELECTOR = 'button[type="submit"]';
    const FORM_SELECTOR = 'form';

    // readystatechange as event listener to insert or modify the DOM before DOMContentLoaded
    document.addEventListener(
      'readystatechange',
      function (event)
      {
        if (event.target.readyState === 'complete')
        {
          INITIALIZE_APP();
        }
      },
    );

    const INITIALIZE_APP = function ()
    {
      INITIALIZE_LISTENERS();
    };

    const INITIALIZE_LISTENERS = function ()
    {
      const FORM = document.querySelector(FORM_SELECTOR);
      FORM.addEventListener('submit', ON_SUBMIT);
      FORM.addEventListener('input', ON_INPUT);
    };

    const ON_SUBMIT = function (event)
    {
      event.preventDefault();
      const PARSED_COMPLETED_TRADES = GET_PARSED_CSV(TEST_DATA__COMPLETED_TRADES__CSV);
      const PARSED_PREDICTED_TRADES = GET_PARSED_CSV(TEST_DATA__PREDICTED_TRADES__CSV);
      const RESULTS = GET_CALCULATED_POINTS(PARSED_COMPLETED_TRADES, PARSED_PREDICTED_TRADES);
      DISPLAY_RESULTS(RESULTS);
    };

    const ON_INPUT = function (event)
    {
      let is_valid = true;

      for (const input of this.querySelectorAll('input').values())
      {
        is_valid = input.checkValidity();

        if (is_valid === false)
        {
          break;
        }
      }

      const SUBMIT_BUTTON = this.querySelector(SUBMIT_BUTTON_SELECTOR);

      if (is_valid && SUBMIT_BUTTON.hasAttribute('disabled'))
      {
        SUBMIT_BUTTON.removeAttribute('disabled');
      } else
      {
        SUBMIT_BUTTON.setAttribute('disabled', '');
      }
    };
  }
)();
