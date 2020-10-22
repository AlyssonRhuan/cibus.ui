import Portuguese from './Portuguese';
import English from './English';

const langague = 'pt';

export default class Index {    
    static Get(key){
        switch(langague){
            case 'pt':
                return Portuguese.Get(key);
            case 'en':
                return English.Get(key);
        }
    };
}





