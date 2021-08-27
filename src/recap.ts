const myName = 'Andres';
const myAge = 15;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(12, 5);
class Persona {
  constructor(private age: number, private name: string) {}
  getSummary() {
    return `my name is ${this.name}, ${this.age}`;
  }
}

const andres = new Persona(16, 'Andres');
andres.getSummary();
