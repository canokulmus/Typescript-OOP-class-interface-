

//interface as function type
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => n1 + n2;


//typescript interfaces are used to define the structure of the data that is being passed around in the application.
interface Named {
    readonly name?: string;

    //optional property
    outputName?: string;

}


//An interface can extend another interface (can be multiple interfaces)
interface Greetable extends Named {
    greet(phrase: string): void;
}


//Multiple interfaces can be implemented by a class+
class Person implements Greetable {

    //optional property
    name?: string;
    age: number = 30;

    constructor(n?: string) { //optional parameter
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi!');
        }
    }
}

let user1: Greetable;
user1 = new Person();

user1.greet('Hi there - I am');