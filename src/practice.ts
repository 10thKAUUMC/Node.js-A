/*
let count = 0; //숫자
count +=1;
//error: count = 'hello world';

const message: string = 'hello world'; //문자열

const done: boolean = true; //불리언

const numbers: number[] = [1, 2, 3]; //숫자 배열
const messages: string[] = ['hello', 'world']; //문자열 배열

//error: messages.push(1);

let mightBeUndefined: string | undefined = undefined; //문자열 또는 undefined
let nullableNumber: number | null = null; //숫자 또는 null

let color: 'red' | 'orange' | 'yellow' = 'red'; //색상은 red, orange, yellow 중 하나
color = 'yellow';
//error: color = 'green'


//함수
function sumArray(numbers: number[]): number {
    return numbers.reduce((acc,current) => acc + current, 0);
}
const total = sumArray([1,2,3,4,5])


//interface
interface Shape {
    getArea(): number;
}

class Circle implements Shape { //Circle이 Shape interface의 조건을 충족해야 함
    //radius: number; //멤버 변수
    constructor(public radius: number) {
        this.radius = radius;
    }
    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}
class Rectangle implements Shape {
    //width: number;
    //height: number;
    constructor(private width: number, private height: number) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

const circle = new Circle(5);
const rectangle = new Rectangle(10,5);

console.log(circle.radius);
//console.log(rectangle.width); //error: width는 private이므로 접근 불가
const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)]; //Shape 타입의 배열

shapes.forEach(shape => {
    console.log(shape.getArea());
});
*/

//interface
/* 
interface Person {
    name: string;
    age?: number; //?: 값 설정을 해도 되고 안해도 됨
}
//interface Develooper {
//    name: string;
//    age?: number;
//    skills: string[];
//}
interface Developer extends Person {
    skills: string[];
}

const person: Person = {
    name: 'Byo',
    age: 20
};
const expert: Developer = {
    name: 'Jane',
    skills: ['JavaScript', 'TypeScript']
};

const people: Person[] = [person,expert];
*/

//type alias
type Person = {
    name: string;
    age?: number;
};
type Developer = Person & { //&는 intersection 타입, Person과 Developer의 속성을 모두 가짐
    skills: string[];
};

const person: Person = { 
    name: 'Byo'
};
const expert: Developer = {
    name: 'Jane',
    skills: ['JavaScript', 'TypeScript']
};

type People = Person[]; //Person 타입의 배열
const people: People = [person, expert];

type Color =  'red' | 'orange' | 'yellow'; //색상은 red, orange, yellow 중 하나
const color: Color = 'red';
const colors: Color[] = ['red', 'orange'];

//Generics
function merge<A,B>(a: A, b: B): A & B {
    return {
        ...a,
        ...b
    };
}

const merged = merge({foo: 1},{bar: 1});

function wrap<T>(param: T): {param: T} {
    return {
        param
    };
}

const wrapped = wrap(10);


//interface에서 Generics 사용하기
interface Items<T> {
    list: T[];
}

const items: Items<string> = {
    list: ['a', 'b', 'c']
};


//class에서 Generics 사용하기
class Queue<T> {
    list: T[] = [];
    get length() {
        return this.list.length;
    }
    enqueue(itme: T) {
        this.list.push(itme);
    }
    dequeue() {
        return this.list.shift();
    }
}

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); //1
console.log(queue.dequeue()); //2