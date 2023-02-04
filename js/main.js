import {DISPLAY_RESULTS} from './display-results';
import {GET_PARSED_CSV} from './parse-data';
import {GET_CALCULATED_POINTS} from './point-calculator';

(
  function ()
  {
    const FORM_SELECTOR = 'form';
    const SUBMIT_BUTTON_SELECTOR = 'button[type="submit"]';
    const INPUT__COMPLETED_TRADES_SELECTOR = '#completed-trades-file';
    const INPUT__PREDICTED_TRADES_SELECTOR = '#predicted-trades-file';
    const EXPORT_BUTTON_SELECTOR = '#export-calculator-result';

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

      const EXPORT_BUTTON = document.querySelector(EXPORT_BUTTON_SELECTOR);
      EXPORT_BUTTON.addEventListener('click', ON_EXPORT_BUTTON_CLICK);
    };

    const ON_SUBMIT = async function (event)
    {
      event.preventDefault();

      Promise.all([
                    GET_PARSED_DATA_FOR_FILE_INPUT(INPUT__COMPLETED_TRADES_SELECTOR),
                    GET_PARSED_DATA_FOR_FILE_INPUT(INPUT__PREDICTED_TRADES_SELECTOR),
                  ]).then(
        function (values)
        {
          const PARSED_COMPLETED_TRADES = values[0];
          const PARSED_PREDICTED_TRADES = values[1];
          const RESULTS = GET_CALCULATED_POINTS(PARSED_COMPLETED_TRADES, PARSED_PREDICTED_TRADES);

          // send the results as the first argument when the EXPORT_RESULTS function is called
          EXPORT_RESULTS.bind(null, RESULTS);
          DISPLAY_RESULTS(RESULTS);
        });
    };

    const GET_PARSED_DATA_FOR_FILE_INPUT = async function (file_input_selector)
    {
      const FILE = document.querySelector(file_input_selector).files[0];
      const FILE_TEXT = await FILE.text();

      return GET_PARSED_CSV(FILE_TEXT);
    };

    const ON_INPUT = function (event)
    {
      const IS_VALID = IS_EVERY_INPUT_VALID(this.querySelectorAll('input').values());
      const SUBMIT_BUTTON = this.querySelector(SUBMIT_BUTTON_SELECTOR);

      if (IS_VALID && SUBMIT_BUTTON.hasAttribute('disabled'))
      {
        SUBMIT_BUTTON.removeAttribute('disabled');
      } else
      {
        SUBMIT_BUTTON.setAttribute('disabled', '');
      }
    };

    const IS_EVERY_INPUT_VALID = function (input_values)
    {
      let is_valid = true;

      for (const INPUT of input_values)
      {
        is_valid = INPUT.checkValidity();

        if (is_valid === false)
        {
          break;
        }
      }

      return is_valid;
    };

    const ON_EXPORT_BUTTON_CLICK = function (event)
    {
      EXPORT_RESULTS();
    };

    const EXPORT_RESULTS = function (results)
    {
      console.log(results);
    };
  }
)();
