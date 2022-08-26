
//abstract class cannot be instantiated
//abstract class is a class that its methods are not implemented in the parent class, but implemented in the child class.
abstract class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];
    constructor(protected readonly id: string, public name: string) { }


    static createEmployee(name: string) {
        return { name: name };
    }

    //abstract method means that it must be implemented in the child class
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

//inherited from Department
class ITDepartment extends Department {

    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins
    }

    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}

//we can have only one instance of this class (private constructor)
//inherited from Department
class AccountingDepartment extends Department {

    private lastReport: string;
    private static instance: AccountingDepartment;

    //private constructor to prevent new instances of this class from being created
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {

        if (this.instance) {
            return this.instance;
        }

        //we can instantiate the class using the new keyword inside the class itself
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }

    //overridign the base class method
    addEmployee(employee: string): void {
        if (employee === 'Max') {
            return;
        }
        this.employees.push(employee);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value');
        }
        this.lastReport = value;
    }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['John', 'Anna']);


it.addEmployee("Max");
it.addEmployee("Manu");


it.describe();
it.printEmployeeInformation();

console.log(it)

// const accounting = new AccountingDepartment('d2', []);

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2)

accounting.mostRecentReport = "Year End Report";
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport)

// accounting.addEmployee('Max');
// accounting.addEmployee('Manu');

accounting.describe();
accounting.printReports();
accounting.printEmployeeInformation();