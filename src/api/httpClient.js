import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://dev-games-backend.advbet.com/v1/ab-roulette/1',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;