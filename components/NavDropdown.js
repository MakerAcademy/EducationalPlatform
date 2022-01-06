import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { PersonIcon } from '@radix-ui/react-icons';
import { Link, NavLink } from 'theme-ui';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(DropdownMenuPrimitive.Content)`
  minWidth: 220,
  backgroundColor: 'red',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  };
`;

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: 'red',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 500,
  padding: '5 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: 'red',
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: 'red',
    color: 'red',
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item)`...itemStyles;`;
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`...itemStyles;`;
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem)`...itemStyles;`;
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem)`
  '&[data-state="open"]': {
    backgroundColor: 'red',
    color: 'red',
  },
  ...itemStyles;
`;

const StyledLabel = styled(DropdownMenuPrimitive.Label)`
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: 'red';
`;

const StyledSeparator = styled(DropdownMenuPrimitive.Separator)`
  height: 1,
  backgroundColor: 'red',
  margin: 5;
`;

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)`
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center';
`;

const StyledArrow = styled(DropdownMenuPrimitive.Arrow)`
  fill: 'red';
`;

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

const RightSlot = styled.div`
  marginLeft: 'auto',
  paddingLeft: 20,
  color: 'red',
  ':focus > &': { color: 'red' },
  '[data-disabled] &': { color: 'red' };
`;

const IconButton = styled.button`
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 35,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'red',
  backgroundColor: 'red',
  boxShadow: '0 2px 10px ${'black'}',
  '&:hover': { backgroundColor: 'red' },
  '&:focus': { boxShadow: '0 0 0 2px black' };
`;

export const NavDropdown = (props) => {
  const query = props.query;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="Customise options">
          <PersonIcon />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={{ pathname: '/account', query }} passHref key={'My Account'}>
            <NavLink
              key={'My Account'}
              sx={{
                display: ['none', 'none', 'block'],
                pr: 4,
                '&:last-child': { pr: [null, 0] },
              }}
              variant="links.nav"
            >
              {'My Account'}
            </NavLink>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/api/auth/logout" key={'Logout'} style={{ textDecoration: 'none' }}>
            <NavLink
              key={'Logout'}
              sx={{
                display: ['none', 'none', 'block'],
                pr: 4,
                '&:last-child': { pr: [null, 0] },
              }}
              variant="links.nav"
            >
              {'Logout'}
            </NavLink>
          </a>
        </DropdownMenuItem>
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
