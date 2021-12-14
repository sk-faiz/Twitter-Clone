const getTwitterData = async () => {
    const URL = 'http://localhost:5000/?q=coding&count=1';
    fetch(URL).then((res) => {
        return res.json();
    }).then ((data) => {
        console.log(data)
    })
}

getTwitterData();