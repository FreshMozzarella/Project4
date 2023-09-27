const BASE_URL = `${process.env.REACT_APP_BASE_URL}/bird`

export async function index(){
    const res = await fetch(BASE_URL, {method: 'GET'});
    if(res.ok){
        return res.json();
    }else {
        throw new Error('Invalid request')
    }
}

export async function detail(id){
    try {
        const url = `${BASE_URL}/${id}`
        const res = await fetch(url, {
            method: 'GET',
        })
        if (res.ok) {
            return res.json()
        }
    } catch (error) {
        console.log(error)
        throw new Error('Invalid request')
    }
}