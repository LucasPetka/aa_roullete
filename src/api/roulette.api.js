import httpClient from './httpClient';

const getRouletteConfig = () => httpClient.get('/configuration');

const getNextGame = () => httpClient.get('/nextGame');

const getGameById = (gameId) => httpClient.get(`/game/${gameId}`);

const getRouletteStatistics = (limit) => httpClient.get(`/stats?limit=${limit}`);

export {
    getRouletteConfig,
    getNextGame,
    getGameById,
    getRouletteStatistics
}