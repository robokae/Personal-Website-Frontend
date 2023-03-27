import styled from "styled-components";
import PhotoCard from "../../components/card/PhotoCard";
import Grid from "../../components/layout/Grid";
import { ContentLayout, SectionLayout } from "../../components/layout/Layout";
import { getFontAwesomeIcon } from "../../util/IconUtil";

const Heading = styled.h2`
  width: 100%;
  text-align: center;
`;

function Experience({ heading, content }) {
  return (
    <SectionLayout>
      <ContentLayout>
        <Heading>{heading}</Heading>
        <Grid size={content.length}>
          {content.map((experience, index) => (
            <PhotoCard
              key={index}
              content={experience}
              photo={getFontAwesomeIcon(experience.icon)}
              gradient={true}
            />
          ))}
        </Grid>
      </ContentLayout>
    </SectionLayout>
  );
}

export default Experience;
