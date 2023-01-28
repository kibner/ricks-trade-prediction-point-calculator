export const TEST_DATA__COMPLETED_TRADES__CSV = `
id,player
1,nick van exel
2,jose alvarado
`;

export const TEST_DATA__PREDICTED_TRADES__CSV = `
id,user,player
1,derek fisher fan,nick van exel
2,derek fisher fan,robert horry
3,derek fisher fan,jordan hill
4,derek fisher fan,chris mihm
5,austin rivers enjoyer,jose alvarado
6,austin rivers enjoyer,robin lopez
7,austin rivers enjoyer,jrue holiday
8,austin rivers enjoyer,jarrett jack
5,duplicate,jose alvarado
6,duplicate,robin lopez
7,duplicate,jrue holiday
8,duplicate,jarrett jack
`;

export const TEST_DATA__CALCULATED_RESULTS = [
  {
    user: `Derek Fisher Fan`,
    total_points: 16,
    bonus_points: 6,
    prediction_results: [
      {
        player: `Nick Van Exel`,
        points: 5,
      },
      {
        player: `Robert Horry`,
        points: 2,
      },
      {
        player: `Jordan Hill`,
        points: 2,
      }, {
        player: `Chris Mihm`,
        points: 1,
      },
    ],
  },
  {
    user: `Austin Rivers Enjoyer`,
    total_points: 6,
    bonus_points: 0,
    prediction_results: [
      {
        player: `Jose Alvarado`,
        points: 2,
      },
      {
        player: `Robin Lopez`,
        points: 1,
      },
      {
        player: `Jrue Holiday`,
        points: 2,
      },
      {
        player: `Jarret Jack`,
        points: 1,
      },
    ],
  },
  {
    user: `Superfan, King of Casuals`,
    total_points: 2,
    bonus_points: 0,
    prediction_results: [
      {
        player: `LeBron James`,
        points: 0,
      },
      {
        player: `Steph Curry`,
        points: 0,
      },
      {
        player: `Brandon Ingram`,
        points: 0,
      },
      {
        player: `Jason Tatum`,
        points: 2,
      },
    ],
  },
  {
    user: `Student of the Game`,
    total_points: 0,
    bonus_points: 0,
    prediction_results: [
      {
        player: `Alperen Sengun`,
        points: 0,
      },
      {
        player: `Zion Williamson`,
        points: 0,
      },
      {
        player: `Luka Doncic`,
        points: 0,
      },
      {
        player: `Bam Adebayo`,
        points: 0,
      },
    ],
  },
];
