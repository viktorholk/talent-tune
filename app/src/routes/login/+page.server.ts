import { post } from '$lib/actions/fetching';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
  cookies.delete('jwt', { path: '/' });
  return { ok: true };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const json = {};

    formData.forEach((value, key) => {
      json[key] = value;
    });

    try {
      const response = await post('/auth/token', json);
      const body = await response.json();
      cookies.set('jwt', JSON.stringify({ token: body.token }), { path: '/' });
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
