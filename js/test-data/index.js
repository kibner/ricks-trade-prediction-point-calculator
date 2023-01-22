export const COMPLETED_TRADES__CSV = `
id,player
1,nick van exel
2,jose alvarado
`

export const PREDICTED_TRADES__CSV = `
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

export const CALCULATED_RESULTS = [
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
  }
]