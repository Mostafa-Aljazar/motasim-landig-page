
export const LANDING_ROUTES = {
  HOME: '/',
  ABOUT_US: '/#about-us',
  OUR_SERVICES: '/#our-service',
  CONTACT_US: '/#contact-us',
  // CONTACT_US: '#contact-us',
  BLOG: '/blog',
  SUCCESS_STORY: '/success-stories',
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
} as const;


export const MANAGER_ROUTES_fUNC = (
  manager_Id: number,
) => {
  return {
    PROFILE: `/actor/manager/${manager_Id}/profile`,

    // ADS_BLOGS
    ADS_BLOGS: `/actor/manager/${manager_Id}/ads-blogs`,
    ADD_ADS_BLOGS: `/actor/manager/${manager_Id}/ads-blogs/add`,
  } as const;
};
