async function getData() {
    response1 = await fetch('https://jsonkeeper.com/b/DVXV');
    api_data1 = await response1.json()
    console.log(api_data1)
}

getData(); //https://jsonkeeper.com/b/WZO5