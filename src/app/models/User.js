const db = require('../../config/db');

const Base = require('./Base');

Base.init({ table: 'users' });

module.exports = {
    ...Base,
    async update(id, fields) {
        let query = "UPDATE users SET";

        Object.keys(fields).map((key, index, array) => {

            if((index+1) < array.length){
                query = `${query}
                    ${key} = '${fields[key]}',
                `
            } else {
                //last iteration
                query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}
                `
            }
            
        });
        
        await db.query(query);

        return;
    },
}