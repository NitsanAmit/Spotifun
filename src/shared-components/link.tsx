import React, {AnchorHTMLAttributes} from "react";
import styled from "@emotion/styled";
import externalLinkIcon from '../static-resources/icons/external_link.svg';

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
    display: inline-block;
    white-space: pre;
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