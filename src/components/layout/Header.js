import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import {
  CONTENT_MAX_WIDTH,
  HAMBURGER_MENU_ICON,
  HEADER_HEIGHT,
  LOGO_FONT,
  MEDIA_QUERY_BREAKPOINT_MED,
  MEDIA_QUERY_BREAKPOINT_XL,
  TRANSITION_DURATION,
} from "../../constants/StyleConstants";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";
import Icon from "../icon/Icon";
import { Link } from "../Link";
import SlideOutMenu from "../menu/SlideOutMenu";
import { getLinkFromJson } from "../../util/LinkUtil";
import { DYNAMIC_HEADER_SCROLL_AMOUNT } from "../../constants/AppConstants";

const HeaderContainer = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isActive ? ({ theme }) => theme.primaryBgCol : "transparent"};
  border-bottom: 1px solid
    ${(props) =>
      props.isActive ? ({ theme }) => theme.lineCol : "transparent"};
  z-index: 5;
  /* transition: background-color ${TRANSITION_DURATION} ease-in,
    border-bottom ${TRANSITION_DURATION} ease-in; */
`;

const Nav = styled.nav`
  width: ${CONTENT_MAX_WIDTH};
  height: max-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MEDIA_QUERY_BREAKPOINT_XL}) {
    width: 95%;
  }
`;

const Logo = styled(Link)`
  color: ${(props) => props.$color};
  font-family: ${LOGO_FONT};
  text-transform: uppercase;
`;

const LinkContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${MEDIA_QUERY_BREAKPOINT_MED}) {
    display: none;
  }
`;

const MenuIcon = styled(Icon)`
  display: none;

  @media (max-width: ${MEDIA_QUERY_BREAKPOINT_MED}) {
    display: inline-block;
    justify-self: flex-end;
    cursor: pointer;
  }
`;

function Header({
  logo,
  links,
  theme,
  onChangeTheme,
  changeBgOnScroll,
  slideOutMenuContent,
}) {
  const [displaySlideOutMenu, setDisplaySlideOutMenu] = useState(false);
  const [headerIsActive, setHeaderIsActive] = useState(false);

  const handlePageScroll = () => {
    window.scrollY > DYNAMIC_HEADER_SCROLL_AMOUNT
      ? setHeaderIsActive(true)
      : setHeaderIsActive(false);
  };

  const getLinkColor = () =>
    headerIsActive
      ? ({ theme }) => theme.primaryFontCol
      : ({ theme }) => theme.headerInitialFontCol;

  useEffect(() => {
    !changeBgOnScroll ? setHeaderIsActive(true) : setHeaderIsActive(false);
    window.addEventListener("scroll", handlePageScroll);
  }, [changeBgOnScroll]);

  return (
    <HeaderContainer isActive={headerIsActive}>
      <Nav>
        <Logo to={logo.to} $color={getLinkColor()}>
          {logo.name}
        </Logo>

        <LinkContainer>
          {links.length > 0 &&
            links.map((link) => getLinkFromJson(link, getLinkColor(), true))}
          <ThemeSwitcher
            onChangeTheme={onChangeTheme}
            theme={theme}
            headerIsActive={headerIsActive}
          />
        </LinkContainer>

        <MenuIcon
          icon={HAMBURGER_MENU_ICON}
          $color={getLinkColor()}
          onClick={() => setDisplaySlideOutMenu(true)}
        />
      </Nav>

      <SlideOutMenu
        display={displaySlideOutMenu}
        setDisplay={setDisplaySlideOutMenu}
        theme={theme}
        onChangeTheme={onChangeTheme}
        content={slideOutMenuContent}
      />
    </HeaderContainer>
  );
}

export default Header;
