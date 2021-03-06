import * as React from 'react';
import { Helmet } from 'react-helmet';

import { HeroBanner } from '../components/HomePage/HeroBanner';
import { Badges } from '../components/HomePage/Badges';
import { ValueProps } from '../components/HomePage/ValueProps';
import { Support } from '../components/HomePage/Support';
import { Installation } from '../components/HomePage/Installation';
import { Community } from '../components/HomePage/Community';
import { Companies } from '../components/HomePage/Companies';
import { Examples } from '../components/HomePage/Examples';
import { Extensions } from '../components/HomePage/Extensions';
import { Authors } from '../components/HomePage/Authors';
import { Testimonials } from '../components/HomePage/Testimonials';
import { GroupedSection } from '../components/HomePage/GroupedSection';
import { Footer } from '../components/HomePage/Footer';
import { colors } from '../utils/css';

export default function HomePage({ data }) {
  const siteMetadata = data.site.siteMetadata;

  return (
    <>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta property="og:url" content={siteMetadata.url} />
        <meta property="og:title" content={siteMetadata.title} />
        <meta
          property="og:description"
          content={data.homeYaml.heroBanner.tagLine}
        />
        <meta name="theme-color" content={colors.amethyst} />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </Helmet>

      <HeroBanner data={data.homeYaml.heroBanner} />
      <Badges />
      <ValueProps
        data={data.homeYaml.valueProps}
        images={data.valuePropsImages}
      />
      <div>
        <GroupedSection>
          <Examples data={data.codeExamples} />
        </GroupedSection>
        <GroupedSection>
          <Installation data={data.codeInstallation} />
        </GroupedSection>
        <GroupedSection>
          <Community
            data={data.homeYaml.community}
            images={data.communityImages}
          />
        </GroupedSection>
        <GroupedSection>
          <Support data={data.support} />
        </GroupedSection>
      </div>
      <Extensions data={data.homeYaml.extensions} />
      <div>
        <GroupedSection>
          <Testimonials data={data.homeYaml.testimonials} />
        </GroupedSection>
        <GroupedSection>
          <Companies
            data={data.homeYaml.companies}
            images={data.companiesImages}
          />
        </GroupedSection>
        <GroupedSection>
          <Authors data={data.homeYaml.authors} images={data.authorsImages} />
        </GroupedSection>
      </div>
      <Footer />
    </>
  );
}

export const query = graphql`
  query HomePage {
    site {
      siteMetadata {
        title
        url
      }
    }
    ...ValuePropsImages
    ...CompaniesImages
    ...CodeExamples
    ...CodeInstallation
    ...Support
    ...AuthorsImages
    ...CommunityImages
    homeYaml(id: { regex: "/home/home.yaml/" }) {
      ...HomePageHeroBanner
      ...HomePageValueProps
      ...HomePageCompanies
      ...HomePageExtensions
      ...HomePageCommunity
      ...HomePageTestimonials
      ...HomePageAuthors
    }
  }
`;

/*
---------------------------------------------------------------------------------
-------- FULL HOMEPAGE QUERY (use for debugging content api in graphiql) --------
---------------------------------------------------------------------------------

query HomePage {
  site {
    siteMetadata {
      title
      url
    }
  }
  ...ValuePropsImages
  ...CompaniesImages
  ...CodeExamples
  ...CodeInstallation
  ...AuthorsImages
  ...CommunityImages
  homeYaml(id: {regex: "/home/home.yaml/"}) {
    ...HomePageHeroBanner
    ...HomePageValueProps
    ...HomePageCompanies
    ...HomePageSupport
    ...HomePageCommunity
    ...HomePageExtensions
    ...HomePageTestimonials
    ...HomePageAuthors
  }
}

fragment HomePageValueProps on HomeYaml {
  valueProps {
    title
    description
    icon
  }
}

fragment ValuePropsImages on RootQueryType {
  valuePropsImages: allImageSharp(filter: {id: {regex: "/images/value_props/"}}) {
    edges {
      node {
        resolutions(width: 120) {
          originalName
        }
      }
    }
  }
}

fragment HomePageCompanies on HomeYaml {
  companies {
    title
  }
}

fragment CompaniesImages on RootQueryType {
  companiesImages: allImageSharp(filter: {id: {regex: "/images/companies/"}}) {
    edges {
      node {
        resolutions(width: 140) {
          originalName
        }
      }
    }
  }
}

fragment CodeExamples on RootQueryType {
  codeExamples: allMarkdownRemark(filter: {id: {regex: "/home/examples/"}}, sort: {fields: [frontmatter___order], order: ASC}) {
    edges {
      node {
        html
      }
    }
  }
}

fragment CodeInstallation on RootQueryType {
  codeInstallation: markdownRemark(id: {regex: "/home/installation/"}) {
    html
  }
}

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
  authorsImages: allImageSharp(filter: {id: {regex: "/images/authors/"}}) {
    edges {
      node {
        resolutions(width: 150) {
          originalName
        }
      }
    }
  }
}

fragment CommunityImages on RootQueryType {
  communityImages: allImageSharp(
    filter: { id: { regex: "/images/community/" } }
  ) {
    edges {
      node {
        resolutions(width: 120) {
          originalName
        }
      }
    }
  }
}

fragment HomePageHeroBanner on HomeYaml {
  heroBanner {
    title
    howToSay
    tagLine
    cta
  }
}

fragment HomePageExtensions on HomeYaml {
  extensions {
    title
    extensions {
      title
      description
      link
    }
  }
}

fragment HomePageTestimonials on HomeYaml {
  testimonials {
    title
    testimonials {
      quote
      author
      twitterHandle
    }
  }
}

fragment HomePageCommunity on HomeYaml {
  community {
    title
    items {
      title
      description
      link
      image
    }
  }
}

fragment Support on RootQueryType {
  support: markdownRemark(id: {regex: "/home/support/"}) {
    html
  }
}


*/
