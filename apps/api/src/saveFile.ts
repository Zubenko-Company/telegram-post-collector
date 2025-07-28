import { promises as fs } from 'fs';

export async function saveJsonToFile(data: any, filePath: string) {
    try {
        const jsonString = JSON.stringify(data, null, 2); // 2 spaces for indentation
        await fs.writeFile(filePath, jsonString, 'utf8');
        console.log(`Data saved to ${filePath}`);
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// Usage
// const myData = { name: 'John', age: 30, hobbies: ['reading', 'coding'] };
// saveJsonToFile(myData, './data.json');