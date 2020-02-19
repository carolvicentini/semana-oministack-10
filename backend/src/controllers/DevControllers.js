const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response) {
        let devs = await Dev.find({});
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) {
            return response.json({ message: 'Erro: usuário existente', error: 1 });
        }

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
        };

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        // Filtrar as connexoes que estão a 10 km de distância e que tenha as techs filtradas
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);

        return response.json(dev);
    },

    async update(request, response) {
        const { id } = request.params;
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ _id: id });

        if (!dev || !github_username) {
            return response.json({ message: 'Erro: usuário inexistente', error: 1 });
        }

        // pega de novo a atualização da bio e do nome
        const apiResponse = await axios.get(`https://api.github.com/users/${dev.github_username}`);
        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = techs;// parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
        };

        dev = dev.overwrite({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        await dev.save();


        // Filtrar as connexoes que estão a 10 km de desitância e que tenha as techs filtradas
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        );

        console.log(sendSocketMessageTo);

        sendMessage(sendSocketMessageTo, 'update-dev', dev);

        return response.json(dev);
    },

    async delete(request, response) {
        let retorno = { message: 'Ok', error: 0 };
        
        const { id } = request.params;

        const dev = await Dev.findOne({_id: id});

        const latitude = dev.location.coordinates[1];
        const longitude = dev.location.coordinates[0];

        const techsArray = dev.techs;

        await Dev.deleteOne({ _id: id }, (err) => {
            retorno = { message: 'Erro', error: 1 };
        });

        // Filtrar as connexoes que estão a 10 km de distância e que tenha as techs filtradas
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        );

        sendMessage(sendSocketMessageTo, 'remove-dev', id);

        return response.json(retorno);
    },
    
};
