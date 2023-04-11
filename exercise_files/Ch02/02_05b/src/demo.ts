interface Contact {
    id: number;
    name: string;

    // Methods
    clone(): Contact;
}

function clone(source: Contact): Contact {
    return {...source};
}

const contact: Contact = {
    id: 1,
    name: "Valkyrie",
    clone(): Contact {
        return clone(this);
    }
};

const clonedContact = contact.clone();
console.log(clonedContact);
