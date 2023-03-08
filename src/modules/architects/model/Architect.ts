class Architect {
    //Ambos precisam ter informações como Nome, E-mail, Telefone, Gênero, idade, etc.

    id?: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
    created_at: Date;

    constructor() {

    }
}

export { Architect }