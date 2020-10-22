const languages = new Map();
languages.set("MODALPRODUCT.DESCRIPTION.LABEL", "Descrição");
languages.set("MODALPRODUCT.DESCRIPTION.PLACEHOLDER", "Descrição do produto");

languages.set("MODALPRODUCT.PRICE.LABEL", "Preço");
languages.set("MODALPRODUCT.PRICE.PLACEHOLDER", "Preço");

export default class Portuguese {    
    static Get(key){
        if(languages.has(key)){
            return languages.get(key);
        }
        else{
            return key;
        }
    };
}





