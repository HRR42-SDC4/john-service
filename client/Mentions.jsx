import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: left;
  color: #101820;
  font: 19px/23px 'Calibre-Medium';
  letter-spacing: .13em;
  overflow-wrap: break-word;
  padding-right: 5px;
  padding-left: 5px;
`;

const Article = styled.div`
  align: left;
  margin: 0px 0px 50px 0px
  display: inline-block;
  width: 375px;
  height: 100px;
  overflow-wrap: break-word;
  cursor: pointer;
`;

const Articles = styled.div`
  display: inline-block;
  width: 750px;
  text-align: center;
`;

const Image = styled.img`
  float: left;
  width: 120px;
  height: 120px;
  object-fit: cover;
  padding-right: 10px;
  padding-left: 5px;
`;

const Mentions = ({ articles }) => {
  const items = [];
  for (let i = 0; i < articles.length; i+=2) {
    if (articles[i + 1]) {
      items.push(
        <Articles key={'A', i}>
          <Article key={i}>
            <Image src={articles[i].image} />
            <Title>{articles[i].title}</Title>
          </Article>
          <Article key={i + 1}>
            <Image src={articles[i + 1].image} />
            <Title>{articles[i + 1].title}</Title>
          </Article>
        </Articles>,
      );
    } else {
      items.push(
        <Article key={i}>
          <Image src={articles[i].image} />
          <Title>{articles[i].title}</Title>
        </Article>,
      );
    }
  }
  return (
    <div>{items}</div>
  );
};

export default Mentions;
