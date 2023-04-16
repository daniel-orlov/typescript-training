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
    return function authorizeDecorator(target: any, property: string, descriptor: PropertyDescriptor) {
        const wrapped = descriptor.value;

        descriptor.value = function () {
            if (!currentUser.isAuthenticated()) {
                throw Error("User is not authenticated");
            }

            if (!currentUser.isInRole(role)) {
                throw Error("User not authorized to execute this action");
            }

            return wrapped.apply(this, arguments);
        };
    };
}

function freeze(constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}

function singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class Singleton extends constructor {
        private static instance: null | Singleton = null;

        constructor(...args: any[]) {
            super(...args);

            if (!Singleton.instance) {
                Singleton.instance = new constructor(...args);
            }

            return Singleton.instance;
        }
    };
}

function auditable(target: object, key: string | symbol) {
    let original = target[key];

    Object.defineProperty(target, key, {
        get() {
            return original;
        },
        set(value) {
            console.log(`Setting ${key.toString()} to ${value}`);
            original = value;
        },
        enumerable: true,
        configurable: true
    });
}

@freeze
@singleton
class ContactRepository {
    @auditable
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