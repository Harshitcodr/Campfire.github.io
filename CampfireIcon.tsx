import React from 'react';

// Fix: Renamed component to NavCampfireIcon as intended and to resolve import errors.
// This name also clarifies its use as a specific UI icon distinct from other campfire visuals.
export const NavCampfireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.463 16.842C17.79 15.24 18 14.077 18 13.5C18 10.462 15.314 8 12 8C8.686 8 6 10.462 6 13.5C6 14.077 6.21 15.24 6.537 16.842C6.737 17.811 6.69 18.5 7.423 19.232C8.155 19.964 9.17 20 10 20H14C14.83 20 15.845 19.964 16.577 19.232C17.31 18.5 17.263 17.811 17.463 16.842ZM12 6C16.418 6 20 9.134 20 13.5C20 14.375 19.755 15.837 19.351 17.744C18.811 20.313 16.63 22 14 22H10C7.37 22 5.189 20.313 4.649 17.744C4.245 15.837 4 14.375 4 13.5C4 9.134 7.582 6 12 6Z" />
    <path d="M12 10C10.343 10 9 11.343 9 13C9 13.74 9.282 14.403 9.735 14.895C9.51 15.814 9.077 17.074 9 17.5C10.083 16.892 10.97 15.704 11.22 14.803C11.448 14.93 11.712 15 12 15C12.288 15 12.552 14.93 12.78 14.803C13.03 15.704 13.917 16.892 15 17.5C14.923 17.074 14.49 15.814 14.265 14.895C14.718 14.403 15 13.74 15 13C15 11.343 13.657 10 12 10Z" />
  </svg>
);