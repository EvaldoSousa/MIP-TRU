const ADMIN_PROFILE = '2';

function isAdmin(profile){
    return profile == ADMIN_PROFILE;
}

module.exports = (request) => {
    const user = request.user;
    if (!user) return false; //usuário anônimo

    const originalUrl = request.originalUrl;
    const profile = request.user.perfil;
    const method = request.method;

    console.log(originalUrl);
    //switch/case para tomada de decisão sobre autorizações
    switch(originalUrl){
        case '/': return true;
        case '/login': return true;
        case '/entrada': return true;;
        case '/table': return true;
        case '/editar': return true;
        case '/cadastro': { return isAdmin(profile); }
        default: return false;
    }
}