const pool = require('../config/mysql');

class Favorite {
    LikeRequest(agentId, requestId) {
        return new Promise((resolve, reject) => {
            pool.getConnection().then((conn) => {
                var sql = "INSERT INTO like_request (agent_id, request_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE agent_id = ?, request_id = ?";
                conn.query(sql, [
                    agentId,
                    requestId,
                    agentId,
                    requestId
                ]).then(results => {
                    pool.releaseConnection(conn);
                    resolve(results);
                }).catch(err => {
                    pool.releaseConnection(conn);
                    reject("QUERY_ERR");
                    return;
                });
            }).catch(err => {
                reject("CONNECTION_ERR");
                return;
            });
        });
    }

    unLikeRequest(agentId, requestId) {
        return new Promise((resolve, reject) => {
            pool.getConnection().then((conn) => {
                var sql = 'DELETE FROM like_request WHERE agent_id = ? and request_id = ?';
                conn.query(sql, [agentId, requestId]).then(results => {
                    pool.releaseConnection(conn);
                    resolve(results);
                }).catch(err => {
                    pool.releaseConnection(conn);
                    reject("QUERY_ERR");
                    return;
                });
            }).catch(err => {
                reject("CONNECTION_ERR");
                return;
            });
        });
    }
}

module.exports = new Favorite();