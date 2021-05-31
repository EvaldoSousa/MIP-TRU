function removeAcento(text){       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃÄ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊË]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎÏ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕÖ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛÜ]','gi'), 'u');
    return text;                 
}

var email = "   KäínLnsn@gâL.cOm    ";
var formatedMail = removeAcento(email.toLowerCase().trim());
console.log("." + formatedMail + ".");