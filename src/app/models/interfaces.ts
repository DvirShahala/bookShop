export interface UserAttr {
    email: string;
    password: string;
}

export interface UserDoc {
    email: string;
    id: string;
    admin: boolean;
    purchaseBooks: string[];
}

export interface BookAtt {
    book: string;
    author: string;
    publisher: string;
    cover: string;
    price: number;
    id: string;
}

export interface CurrentUser {
    id: string,
    email: string,
    admin: boolean,
    iat: number
}