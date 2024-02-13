import { jwtDecode } from "jwt-decode";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => { 

    let token = cookies.get('jwt');

    if (token != null) {
        const decoded: { isCompany: boolean } = jwtDecode(token);
        return {
            data: decoded.isCompany
        }
    } else {
        return {
            data: true
        }
    }
 
}