import type { LayoutServerLoad } from './$types';
import { jwtDecode } from 'jwt-decode';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const token = JSON.parse(cookies.get('jwt') || "{}")['token'];

  if (token) {
    const decoded: { isCompany: boolean } = jwtDecode(token);
    return {
      token,
      user: { ...decoded }
    };
  }
};
