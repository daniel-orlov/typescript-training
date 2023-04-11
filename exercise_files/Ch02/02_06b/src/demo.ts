interface Contact {
    id: number;
    name: string;
}

interface UserContact extends Contact {
    email: string;
}

interface EnjoyerContact {
    id: number;
    name: string;
    email: string;
    role: string;
}

function clone<T1, T2 extends T1>(source: T1): T2 {
    const serialized = JSON.stringify(source);
    return JSON.parse(serialized);
}

const homer: Contact = {id: 123, name: "Homer Simpson"};
const homerClone = clone<Contact, EnjoyerContact>(homer);

console.log(homerClone.id, homerClone.name);

const secondClone = clone<Contact, UserContact>(homer);

console.log(secondClone.id, secondClone.name);

const dateRange = {
    from: new Date(2018, 1, 1),
    to: new Date(2018, 1, 31)
};

const clonedDateRange = clone(dateRange);

console.log(clonedDateRange.from, clonedDateRange.to);