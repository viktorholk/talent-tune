// @ts-nocheck
import post from '$lib/actions/loginAction';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
  cookies.delete('jwt', { path: '/' });
  return { ok: true };
}

export const actions = {
  default: async ({ request, cookies }) => {
    let res;
    const formData = await request.formData();
    const json = {};
    // @ts-ignore
    formData.forEach((value, key) => {
      json[key] = value;
    });
    try {
      res = await post('/users', json);
      cookies.set('jwt', JSON.stringify({ token: res.token }), { path: '/' });
    } catch (error) {
      return fail(422, {
        error: error.message
      });
    }
    if (cookies.get('jwt') != null) {
      throw redirect(303, '/');
    } else {
      return fail();
    }
  }
};
