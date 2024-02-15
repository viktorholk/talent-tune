import type { LayoutServerLoad } from './$types'
import { jwtDecode } from "jwt-decode";

export const load: LayoutServerLoad = async ({ cookies }) => {

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