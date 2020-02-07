import {firebaseDatabase} from '../utils/firebaseUtils'

// referencia https://blog.tecsinapse.com.br/criando-uma-aplica%C3%A7%C3%A3o-react-firebase-passo-a-passo-9ebc5a8a442f

export default class FirebaseService {
    static getAll = (table) => new Promise((resolve, reject) => {
        try{
            // CONSTRUÇÃO DA QUERY
            const query = firebaseDatabase.ref(table);

            // EXECUTANDO E PREENCHENDO ITENS
            query.on('value', dataSnapshot => {
                const items = [];
                dataSnapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item['key'] = childSnapshot.key;
                    items.push(item);
                });
                resolve(items);
            });            
        }
        catch(error){
            console.log(error);
            reject([]);
        }
    });

    static getByKey = (table, size = 10) => new Promise((resolve, reject) => {
        try{
            
        }
        catch(error){
            console.log(error);
            reject([]);
        }
    });
    
    static push = (table, object) => new Promise((resolve, reject) => {
        try {
            const ref = firebaseDatabase.ref(table).push();
            const id = firebaseDatabase.ref(table).push().key;
            ref.set(object);
            resolve(id);        
        } catch (error) {
            console.log(error);
            reject([]);
        }
    });

    static delete = (table, id) => new Promise((resolve, reject) => {
        try {
            const deleteObj = firebaseDatabase.ref(table + '/' + id).remove();
            resolve(deleteObj);        
        } catch (error) {
            console.log(error);
            reject([]);
        }
    });

    static update = (table, id, object) => new Promise((resolve, reject) => {
        try {   
            const ref = firebaseDatabase.ref(table + '/' + id).update(object);
            resolve(id);        
        } catch (error) {
            console.log(error);
            reject([]);
        }
    });
}