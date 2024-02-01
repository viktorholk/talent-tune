import {config} from '$lib/config'
export default async function (url = '/', data = {}, token = '') {
    let res = await fetch(`${config}${url}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if(!res.ok) {
        console.error(res.json());
        throw new Error("Failed to fetch");
    }
    return await res.json();
}