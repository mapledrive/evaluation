import { memo } from 'react';
import { StyledHeader, Logo, StyledLogo } from 'style';

const HeaderComponent: React.FC = () => {
  return (
    <StyledHeader>
      <StyledLogo>
        <Logo>Оценка пользователей</Logo>
      </StyledLogo>
    </StyledHeader>
  );
};

export default memo(HeaderComponent);
