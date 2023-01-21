(function () {
  // readystatechange as event listener to insert or modify the DOM before DOMContentLoaded
  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      _initialize_app();
    }
  });

  function _initialize_app() {
    const TEST_ACTUAL_TRADES_CSV = `
id,player
1,nick van exel
2,jose alvarado
`

    const TEST_PREDICTIONS_CSV = `
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
  }
})();
