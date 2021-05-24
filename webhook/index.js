const Crypto = require('crypto');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const hmac = Crypto.createHmac("sha1", "<secret>");
    const signature = hmac.update(JSON.stringify(req.body)).digest('hex');

    const shaSignature = `sha1=${signature}`;
    const gitHubSignature = req.headers['x-hub-signature'];

    if(!shaSignature.localeCompare(gitHubSignature)) {

        if (req.body.pusher.name && req.body.commits) {
            context.res = {
                body: "Pusher is: " + req.body.pusher.name + ", commits: " + JSON.stringify(req.body.commits)
            }
        } else {
            context.res = {
                status: 500,
                body: "Did not find required items in request."
            }
        }
    } else {
        context.res = {
            status: 401,
            body: "Signatures don't match"
        }
    }
}
