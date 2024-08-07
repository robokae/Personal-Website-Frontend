import styled from "styled-components";
import Card from "../../../components/card/Card";
import {
  ContentLayout,
  SectionLayout,
} from "../../../components/layout/Layout";
import Typography from "../../../components/typography/Typography";
import {
  BORDER_RADIUS,
  CARD_TITLE_HTML_TAG,
  SECTION_TITLE_HTML_TAG,
} from "../../../constants/StyleConstants";
import {
  LIGHT_BLUE,
  LIGHT_NAVY_BLUE,
  LIGHT_TURQUOISE,
  MEDIUM_BLUE,
  PURPLE,
  TURQUOISE,
} from "../../../constants/ColorConstants";
import { useState } from "react";
import { useEffect } from "react";
import Carousel from "../../../components/carousel/Carousel";
import {
  CARD_PADDING,
  CAROUSEL_PADDING,
  MEDIA_QUERY_BREAKPOINT_LG,
  MEDIUM_GAP,
} from "../../../constants/LayoutConstants";

const CardLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: ${MEDIUM_GAP};
  position: relative;

  & > * {
    height: auto;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${CARD_PADDING};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${BORDER_RADIUS} ${BORDER_RADIUS} 0 0;

  @media screen and (max-width: ${MEDIA_QUERY_BREAKPOINT_LG}) {
    padding: 0.5rem 0;
    flex-direction: column;
    align-items: flex-start;

    & > ${CARD_TITLE_HTML_TAG} {
      font-size: 1.25rem;
    }
  }
`;

const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${CARD_PADDING};
  gap: ${MEDIUM_GAP};
`;

const ListItem = styled.li`
  list-style: none;
  padding: 1rem;

  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.lineCol};
  }
`;

const Experience = ({ data }) => {
  const testLargeWindowSize = () => window.innerWidth <= 992;
  const { headings, subHeadings, text, listContent } = data;
  const cardHeadingColors = [LIGHT_TURQUOISE, LIGHT_NAVY_BLUE, MEDIUM_BLUE];

  const [displayCarousel, setDisplayCarousel] = useState(testLargeWindowSize);

  useEffect(() => {
    const handleResize = () => {
      setDisplayCarousel(testLargeWindowSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCards = () => {
    return subHeadings.map((subHeading, index) => {
      return (
        <Card key={index} padding={0} gap={0}>
          <CardHeader backgroundColor={cardHeadingColors[index]}>
            <Typography textAlign="center" tag={CARD_TITLE_HTML_TAG}>
              {subHeading}
            </Typography>
          </CardHeader>
          <CardContent>
            <Typography>{text[index]}</Typography>
            <ul>
              {listContent[index].map((listItem, index) => (
                <ListItem key={index}>{listItem}</ListItem>
              ))}
            </ul>
          </CardContent>
        </Card>
      );
    });
  };

  const heading = headings.map((line, index) => (
    <Typography key={index} tag={SECTION_TITLE_HTML_TAG} textAlign="center">
      {line}
    </Typography>
  ));

  return (
    <SectionLayout>
      {heading}
      {displayCarousel ? (
        <Carousel displayArrows paddingX={CAROUSEL_PADDING}>
          {getCards()}
        </Carousel>
      ) : (
        <ContentLayout>
          <CardLayout size={subHeadings.length}>{getCards()}</CardLayout>
        </ContentLayout>
      )}
    </SectionLayout>
  );
};

export default Experience;
