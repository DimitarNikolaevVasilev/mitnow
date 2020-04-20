const sec = require('../util/sec');
const tools = require('../util/tools');
const env = require('../util/env');
const oauthPlugin = require('fastify-oauth2');



async function getGoogleKey(){
    let result = await tools.get({
        host: 'www.googleapis.com',
        port: 443,
        path: '/oauth2/v1/certs'
    });
    return result.json[Object.keys(result.json)[0]];
}


//getGoogleKey();

module.exports = {
    register_fastify(fastify){
      fastify.register(oauthPlugin, {
            name: 'googleOAuth2',
            scope: ['profile'],
            credentials: {
                client: {
                    id: env.auth.google.app.id,
                    secret: env.auth.google.app.secret
                },
                auth: oauthPlugin.GOOGLE_CONFIGURATION
            },
            startRedirectPath: '/login/google',
            callbackUri: `http://${env.server.domain}/login/google/callback`
        });

        fastify.get('/login/google/callback', async function(req, res) {
            console.log('CALLBACK');
            const result = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
            console.log(result.access_token);

            if(!result){
                res.redirect('/login');
                return;
            }
            tools.setTokenCookie(res, result.id_token);




            res.send({result: result});
        });
    },
    async validate_token(token){
        let key = await getGoogleKey();
        return await sec.tokenVerify(token, key, {
            algorithms: ['RS256'],
            audience: env.auth.google.aud,
            issuer: ['accounts.google.com', 'https://accounts.google.com']
        });
    }
};
