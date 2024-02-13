

// export const load: LayoutServerData = async ({ cookies }: { cookies: any }) => {

// import type { ServerLoadEvent } from "@sveltejs/kit";
// import type { RouteParams } from "./$types";

// //     let token = cookies.get('jwt');

// //     if (token != null) {
// //         const decoded: { isCompany: boolean } = jwtDecode(token);
// //         return {
// //             data: decoded.isCompany
// //         }
// //     } else {
// //         return {
// //             data: true
// //         }
// //     }
 
// // }
// export async function load({ cookies }: ServerLoadEvent<RouteParams>) {
//     let data = cookies.get('jwt');
//     return {
//         data: data
//     }
// }