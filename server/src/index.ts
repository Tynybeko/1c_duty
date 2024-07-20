import express from 'express'
import axios from 'axios';
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3007

app.post('/login', (request, response) => {
    const token = request.body.token
    axios.get('http://dev.bwheel.ru:88/globalpro/hs/app/login', {
        method: 'GET',
        headers: {
            'Authorization': ('Basic ' + token)
        }
    })
        .then(data => response.status(200).json({ data: data.data }))
        .catch(error => response.status(401).json({ error }));
});



app.get('/list', (request, response) => {
    const token = request.headers?.authtoken
    axios.get('http://dev.bwheel.ru:88/globalpro/hs/app/getclients', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + token
        }
    })
        .then(data => response.status(200).json({ data: data.data }))
        .catch(error => {
            response.status(error?.response?.status ?? 401).json({ error })
        });
})


app.get('/credit', (request, response) => {
    const token = request.headers?.authtoken
    const query = request.query
    axios.get('http://dev.bwheel.ru:88/globalpro/hs/app/getcredit', {
        method: 'GET',
        params: {
            ...query
        },
        headers: {
            'Authorization': 'Basic ' + token
        }
    })
        .then(data => response.status(200).json({ data: data.data }))
        .catch(error => {
            response.status(error?.response?.status ?? 401).json({ error })
        });
})
app.listen(PORT, () => console.log(`Running on port ${PORT}`));