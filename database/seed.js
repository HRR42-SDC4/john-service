const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: `restaurants.csv`,
  header: [
    {id: 'id', title: 'Id'},
    {id: 'articles', title: 'Articles'},
  ],
  fieldDelimiter: ';',
  append: true
});

const generateRestaurants = (numR, start = 0) => {
  let restaurants = [];

  // return as an array a number of articles selected at random
  const assignArticles = (num) => {
    const assigned = [];
    for (let i = 0; i < num; i++) {
      let selected = Math.floor(Math.random() * 2000000);
      assigned.push(selected);
    }
    return assigned;
  }

  // for a given number of restaurants, assign a random number of articles to it and push it to the restarant array
  const assembleRestaurants = (num) => {
    for (let i = 0; i < num; i++) {
      const numArticles = Math.floor(Math.random() * 3) + 3;
      let objR = {
        id: (restaurants.length + 1 + start),
        articles: null,
      };
      objR.articles = assignArticles(numArticles);
      restaurants.push(objR);
    }
  }

  assembleRestaurants(100000);
  console.log(restaurants[restaurants.length - 1]);

  csvWriter
  .writeRecords(restaurants)
  .then(() => {
    if (numR - 100000 > 0) {
      console.log('Recursing...');
      generateRestaurants(numR - 100000, start + 100000);
    } else {
      console.log('The CSV file was written successfully');
    }
  })
  .catch(err => console.log('An error occurred during CSV file write: ', err))
};

generateRestaurants(10000000);
