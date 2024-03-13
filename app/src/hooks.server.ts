import { redirect } from '@sveltejs/kit';

// @ts-ignore
export const handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
    return await resolve(event);
  } else {
    console.log(event.cookies.get('jwt'));
    if (event.cookies.get('jwt')) {
      return await resolve(event);
    } else {
      throw redirect(303, '/login');
    }
  }
};
