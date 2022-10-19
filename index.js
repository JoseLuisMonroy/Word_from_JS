const docx = require('docx');
const fs = require('fs');
const { Paragraph } = docx;


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
            new Paragraph("Metodo para crear texto sin estilos")
        ],
    }, ],
});

docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});