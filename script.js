let names = ['Der alte Petterson', 'Kater Findus', 'Henni'];
let phoneNumbers = ['0123456789', '1234567890', '2345678901'];
load();


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `<h1>My Contacts</h1>`;
    content.innerHTML += `
    <div>
    <input id="name" placeholder="Name...">
    <input id="phone" placeholder="Telefonnummer">
    <button onclick="addContact()">Hinzufügen</button>
    </div>
    `;

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const number = phoneNumbers[i];

        content.innerHTML += `
            <div class="card">
                <b>Name: </b> ${name} <br>
                <b>Telefon: </b> ${number} <br>
                <button onclick="deleteContact(${i})">Löschen</button>
            </div>
        `;
    }
}

function addContact() {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');

    names.push(name.value);
    phoneNumbers.push(phone.value);

    render();
    save();
}

function deleteContact(i) {
    names.splice(i, 1); // wir etnfernen an der Stelle i genau 1 Element aus dem Array names
    phoneNumbers.splice(i, 1);

    render();
    save();
}

function save() { // diese Funktion rufen wir in allen Funktionen auf, die unser Array verändern
    let namesAsText = JSON.stringify(names); // wandelt den Inhalt des Arrays names in string um und weist ihn der Variablen namesAsText zu
    let phoneNumbersAsText = JSON.stringify(phoneNumbers);

    localStorage.setItem('names', namesAsText); // speichert im local storage unter dem Key names den Inhalt der Variablen namesAsText ab
    localStorage.setItem('phoneNumbers', phoneNumbersAsText);
}

function load() { // Variablen als Arrays aus dem Local Storage raus laden
    let namesAsText = localStorage.getItem('names'); // definiert die Variable namesAsText als den string aus dem Local Storage unter dem Key names
    let phoneNumbersAsText = localStorage.getItem('phoneNumbers');

    if (namesAsText && phoneNumbersAsText) { // Abfrage: existieren namesAsText und phoneNumbersAsText im Local Storage? denn wenn nichts im Local Storage vorhanden ist, funktioniert das nicht
        names = JSON.parse(namesAsText); // weist dem ganz oben definierten Array names einen neuen Inhalt zu, und zwar den zu String umgewandelten Inhalt der Variablen namesAsText
        phoneNumbers = JSON.parse(phoneNumbersAsText);
    }
}