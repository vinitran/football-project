import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

const fillImage = css`
  object-fit: cover;
`;

const StyledImage = styled.img<{ $hasFill: boolean }>`
  ${(p) => p.$hasFill && fillImage};
`;

interface ImageProps {
  alt: string | undefined;
  objectFit?: CSSProperties['objectFit'];
  objectPosition?: CSSProperties['objectPosition'];
  style?: any;
  fill?: any;
  [key: string]: any;
}

export const Image: React.FC<ImageProps> = ({
  alt,
  style,
  objectFit,
  objectPosition,
  ...props
}) => {
  return (
    <StyledImage
      alt={alt ?? ''}
      style={{ ...style, objectFit, objectPosition }}
      $hasFill={!!props.fill}
      {...props}
    />
  );
};
