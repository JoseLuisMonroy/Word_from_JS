const docx = require('docx');
const fs = require('fs');

const doc = new docx.Document({
    sections: [{
        properties: {},
        children: [
            new docx.Paragraph({
                children: [
                    new docx.TextRun("Hello World"),
                    new docx.TextRun({
                        text: "Foo Bar",
                        bold: true,
                    }),
                ],
            }),
        ],
    }, ],
});