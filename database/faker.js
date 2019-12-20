const faker = require('faker');
const Restaurant = require('./schema.js');


const generateRestaurants = (numR, start = 0) => {
  const restaurants = [];

  const generateArticles = (numA) => {
    const arts = [];
    for (let i = 0; i < numA; i++) {
      const imgId = Math.floor(Math.random() * 20 + 1);
      const objA = {
        image: `https://creidfecimages.s3-us-west-1.amazonaws.com/photo${imgId}.jpeg`,
        title: faker.lorem.words(),
        body: faker.lorem.paragraphs(),
      };
      arts.push(objA);
    }
    return arts;
  };

  for (let j = start; j < (start + numR); j++) {
    const numArticles = Math.floor(Math.random() * 3) + 3;
    const objR = {
      id: (j + 1),
      articles: null,
    };
    objR.articles = generateArticles(numArticles);
    restaurants.push(objR);
  }

  Restaurant.insertMany(restaurants)
    .then(() => {
      console.log('Restaurants successfully inserted.');
    })
    .catch((err) => {
      console.log(err);
    });
};

generateRestaurants(100000, 0);
