// import {getCurrentTime} from '$/src/lib/util';
import knex from 'knex';
import knexStringcase from 'knex-stringcase';
import { config } from '../../config/knex-db'

export const getKnexInstance = () => {
    return knex(knexStringcase(config.production))
}

export const isDuplicatedValue = async (tableName, columnName, value, id) => {
    return new Promise((resolve, reject) => {
        const knex = getKnexInstance();
        
        knex.raw('SELECT * FROM is_duplicated_value(?, ?, ?, ?) as "isDuplicated" ', [tableName, columnName, value, id]).then((res) => {
            resolve(res.rows[0].isDuplicated);
        }).catch((err) => reject(err))
        .finally(() => {
            knex.destroy();
        })
    })
}

export const isExistedValue = async (tableName, columnName, value) => {
    return new Promise((resolve, reject) => {
        const knex = getKnexInstance();
        
        knex.raw('SELECT * FROM is_existed_value(?, ?, ?) as "isExisted"', [tableName, columnName, value]).then((res) => {
            resolve(res.rows[0].isExisted);
        }).catch((err) => reject(err))
        .finally(() => {
            knex.destroy();
        })
    })
}

export const updateSystemFields = (userId) => {
    // return {updatedAt: getCurrentTime(), updatedBy: userId}
    return {};
}

export const createSystemFields = (userId) => {
    // return {createdBy: userId}
    return {};
    
}

export const deleteSystemFields = (userId) => {
    // return {deletedAt: getCurrentTime(), deletedBy: userId}
    return {};
}