const SPREADSHEET_ID = '1gAwSvwTnFfcXNoTzaktcgW_icCB_T2tWqOoy25q4Wug';
const API_KEY = '6921110ddb437dbe328990a4383da9c7e79c198e';
const RANGE = 'Sheet1!A1:R100'; // Adjust the range based on your data

async function fetchSheetData() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    return data.values;
}

function generateMarkdown(data) {
    let markdown = '# Meeting Data\n\n';
    
    data.forEach(row => {
        markdown += `## ${row[0]}\n\n`;
        markdown += `**Student Number:** ${row[1]}\n\n`;
        markdown += `**Phone Number:** ${row[2]}\n\n`;
        markdown += `**Meeting Topic:** ${row[3]}\n\n`;
        markdown += `**Meeting Goal:** ${row[4]}\n\n`;
        markdown += `**Comments:** ${row[5]}\n\n`;
        markdown += `**Number of People:** ${row[6]}\n\n`;
        markdown += '---\n\n';
    });
    
    return markdown;
}

async function displayData() {
    const data = await fetchSheetData();
    const markdown = generateMarkdown(data);
    document.getElementById('content').innerHTML = marked(markdown);
}

displayData();
