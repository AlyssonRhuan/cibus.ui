const languages = new Map();
languages.set("MODALPRODUCT.DESCRIPTION.LABEL", "Description");
languages.set("MODALPRODUCT.DESCRIPTION.PLACEHOLDER", "Product description");

languages.set("MODALPRODUCT.PRICE.LABEL", "Price");
languages.set("MODALPRODUCT.PRICE.PLACEHOLDER", "Price");

export default class English {    
    static Get(key){
        if(languages.has(key)){
            return languages.get(key);
        }
        else{
            return key;
        }
    };
}





