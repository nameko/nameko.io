import * as React from 'react';
import { css } from 'emotion';
import { Flex, Box } from 'grid-styled';
import Img from 'gatsby-image';

import { Container } from '../Layout';
import { media, colors } from '../../utils/css';
import { FeatherIcon } from '../Icons/FeatherIcon';

const containerStyles = css`
  margin: 88px auto;
  padding: 0 80px;
`;

function Author(props) {
  const { name, githubHandle, twitterHandle, image } = props;

  const iconStyles = css`
    color: ${colors.governorBay};
    vertical-align: middle;
    margin-right: 8px;
  `;

  const authorInfoStyles = css`
    padding-top: 10px;
    vertical-align: top;
    margin-bottom: 52px;
    text-align: center;

    ${media.desktop`
      display: inline-block;
      padding-top: 25px;
      text-align: left;
    `};
  `;

  const imageStyles = css`
    border-radius: 50%;
    border: 5px solid ${colors.white};

    ${media.desktop`
      display: inline-block;
      margin-right: 30px;
    `};
  `;

  const imageWrapperStyles = css`
    text-align: center;

    ${media.desktop`
      display: inline-block;
    `};
  `;

  const nameStyles = css`
    margin-bottom: 16px;
  `;

  const handleStyles = css`
    color: ${colors.governorBay};
  `;

  return (
    <>
      <Box w={[1, 6 / 12]}>
        <Img
          className={imageStyles}
          outerWrapperClassName={imageWrapperStyles}
          alt={name}
          resolutions={image.resolutions}
        />
        <div className={authorInfoStyles}>
          <p className={nameStyles}>{name}</p>
          <div>
            <FeatherIcon
              className={iconStyles}
              name="github"
              width="20"
              height="20"
            />
            <a
              className={css`
                text-decoration: none;
              `}
              href={`https://github.com/${githubHandle}`}
            >
              <span className={handleStyles}>@{githubHandle}</span>
            </a>
          </div>
          <div>
            <FeatherIcon
              className={iconStyles}
              name="twitter"
              width="20"
              height="20"
            />
            <a
              className={css`
                text-decoration: none;
              `}
              href={`https://twitter.com/${twitterHandle}`}
            >
              <span className={handleStyles}>@{twitterHandle}</span>
            </a>
          </div>
        </div>
      </Box>
    </>
  );
}

interface Contributor {
  avatar_url: string;
  html_url: string;
}

interface ContributorsState {
  contributors: Contributor[];
}

interface ContributorsProps {
  loginsToExclude: string[];
}

const contributorImageStyles = css`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 12px;
  margin-bottom: 12px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }

  ${media.desktop`
    width: 40px;
    height: 40px;
  `};
`;

const imageContainerStyles = css`
  ${media.mobile`
    text-align: center;
  `};
`;

class Contributors extends React.Component<
  ContributorsProps,
  ContributorsState
> {
  constructor(props) {
    super(props);
    this.state = {
      contributors: [],
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/nameko/nameko/contributors')
      .then(response => {
        return response.json();
      })
      .then(json => {
        const contributors = json.filter(
          contributor =>
            !this.props.loginsToExclude.includes(contributor.login),
        );
        this.setState({ contributors });
      });
  }

  render() {
    const { contributors } = this.state;

    return (
      <>
        <p
          className={css`
            margin-bottom: 32px;
          `}
        >
          With the help of a bunch of talented, hard working{' '}
          <a href="https://github.com/nameko/nameko/graphs/contributors">
            contributors!
          </a>
        </p>
        <div className={imageContainerStyles}>
          {contributors.map((contributor, i) => (
            <a key={i} href={contributor.html_url}>
              <img
                src={contributor.avatar_url}
                className={contributorImageStyles}
              />
            </a>
          ))}
        </div>
      </>
    );
  }
}

export function Authors({ data, images }) {
  const getImage = name =>
    images.edges.find(edge => edge.node.resolutions.originalName === name).node;

  return (
    <Container className={containerStyles}>
      <h2>{data.title}</h2>
      <Flex flexWrap="wrap" justifyContent="center">
        {data.authors.map((author, i) => (
          <Author key={i} {...author} image={getImage(author.image)} />
        ))}
      </Flex>
      <Contributors loginsToExclude={data.authors.map(a => a.githubHandle)} />
    </Container>
  );
}

export const query = graphql`
  fragment HomePageAuthors on HomeYaml {
    authors {
      title
      authors {
        name
        githubHandle
        twitterHandle
        image
      }
    }
  }
  fragment AuthorsImages on RootQueryType {
    authorsImages: allImageSharp(
      filter: { id: { regex: "/images/authors/" } }
    ) {
      edges {
        node {
          resolutions(width: 150) {
            ...GatsbyImageSharpResolutions_tracedSVG
            originalName
          }
        }
      }
    }
  }
`;
