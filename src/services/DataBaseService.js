import FirebaseService from './FirebaseService'

export default class DataBaseService {
    static async getAll(table) {
        return await FirebaseService.getAll(table);
    };

    static async getByKey(table) {
        return await FirebaseService.getByKey(table);
    };
    
    static async push(table, object) {
        return FirebaseService.push(table, object);
    };

    static async delete(table, id) {
        return FirebaseService.delete(table, id);
    };

    static async update(table, id, object) {
        return FirebaseService.update(table, id, object);
    };
}