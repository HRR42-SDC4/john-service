const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'restaurantsRelational.csv',
  header: [
    { id: 'id', title: 'Id' },
    { id: 'article', title: 'Article' },
  ],
  fieldDelimiter: ',',
  append: true,
});

const generateRestaurants = (numR, start = 0) => {
  const restaurants = [];

  // return as an array the requested number of article ids, selected at random from a pool of 2M.
  const assignArticles = (num) => {
    const assigned = [];
    for (let i = 0; i < num; i++) {
      const selected = Math.floor(Math.random() * 2000000);
      assigned.push(selected);
    }
    return assigned;
  };

  // for a requested number of restaurants, for each restaurant, determine a random number of
  // articles and assign that many articles to that many copies of the restuarant, pushing each
  // of them to the restarant array.
  const assembleRestaurants = (num) => {
    for (let i = 0; i < num; i++) {
      const numArticles = Math.floor(Math.random() * 3) + 3;
      const articles = assignArticles(numArticles);
      const id = (i + 1 + start);
      for (let j = 0; j < articles.length; j++) {
        const objR = {
          id,
          article: articles[i].toString(),
        };
        restaurants.push(objR);
      }
    }
  };

  assembleRestaurants(100000);

  csvWriter
    .writeRecords(restaurants)
    .then(() => {
      if (numR - 100000 > 0) {
        console.log('Recursing...');
        generateRestaurants(numR - 100000, start + 100000);
      } else {
        console.log(restaurants[restaurants.length - 1]);
        console.log('The CSV file was written successfully');
      }
    })
    .catch((err) => console.log('An error occurred during CSV file write: ', err));
};

generateRestaurants(10000000);
