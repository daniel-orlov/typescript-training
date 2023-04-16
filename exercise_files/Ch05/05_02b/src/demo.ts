interface Contact {
    id: number;
}

const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated(): boolean {
        return true;
    },
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    }
};

function authorize(role: string) {
    return function authorizeDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (!currentUser.isAuthenticated()) {
                throw Error("User not authenticated");
            }

            if (!currentUser.isInRole(role)) {
                throw Error("User not authorized to execute this action");
            }

            return original.apply(this, args);
        };

        return descriptor;
    };
}

class ContactRepository {
    private contacts: Contact[] = [];

    @authorize("ContactViewer")
    getContactById(id: number): Contact | null {
        if (!currentUser.isInRole("ContactViewer")) {
            throw Error("User not authorized to execute this action");
        }

        return this.contacts.find(x => x.id === id);
    }

    @authorize("ContactEditor")
    save(contact: Contact): void {
        const existing = this.getContactById(contact.id);

        if (existing) {
            Object.assign(existing, contact);
        } else {
            this.contacts.push(contact);
        }
    }
}