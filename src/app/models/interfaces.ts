export interface userAttr {
    email: string;
    password: string;
}

export interface userDoc {
    email: string;
    id: string;
    admin: boolean;
    purchaseBooks: any;
}

export interface BookAtt {
    book: string;
    author: string;
    publisher: string;
    cover: string;
    price: number;
    id: string;
}

export interface currentUser {
    id: string,
    email: string,
    admin: boolean,
    iat: number
}