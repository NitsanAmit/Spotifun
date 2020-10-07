import React, {AnchorHTMLAttributes} from "react";
import styled from "styled-components";
import externalLinkIcon from '../static-resources/icons/external_link.svg';
import {EllipsisText} from "../styles/common-styles";

export const Link: React.FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = ({children, external, ...otherProps}) => {
    return (
        <StyledContainer>
            <StyledLink {...otherProps}>
                {children}
            </StyledLink>
            {
                external &&
                <StyledImage src={externalLinkIcon} alt="external link"/>
            }
        </StyledContainer>
    );
}

export interface LinkProps {
    external?: boolean;
}

const StyledContainer = styled.div`
    ${EllipsisText};
    white-space: pre;
    display: inline;
`,
    StyledLink = styled.a`
    text-decoration: none;
    color: black;
    &:hover {
        color: #FF5252;
    }
`,
    StyledImage = styled.img`
    height: 8px;
    opacity: 0.5;
    margin-left: 4px;
`;