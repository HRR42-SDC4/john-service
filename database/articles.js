const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'articles.csv',
  header: [
    { id: 'id', title: 'Id' },
    { id: 'image', title: 'Image' },
    { id: 'title', title: 'Title' },
    // { id: 'body', title: 'Body' },
  ],
  fieldDelimiter: ',',
  append: true,
  alwaysQuote: true,
});

const generate = (numA, start = 0) => {
  const articles = [];

  const generateArticles = (num) => {
    for (let i = 0; i < num; i++) {
      const imgId = Math.floor(Math.random() * 947 + 1);
      const objA = {
        id: i + 1 + start,
        image: `https://creidfecimages.s3-us-west-1.amazonaws.com/photo${imgId}.jpeg`,
        title: faker.lorem.words(),
        // body: faker.lorem.paragraphs(2),
      };
      articles.push(objA);
    }
  };

  generateArticles(100000);

  csvWriter
    .writeRecords(articles)
    .then(() => {
      if (numA - 100000 > 0) {
        console.log(`Recursing, ${(numA / 100000) - 1}...`);
        generate(numA - 100000, start + 100000);
      } else {
        console.log('The articles file was written successfully');
      }
    })
    .catch((err) => console.log('An error occurred during article file write: ', err));
};

generate(2000000);
