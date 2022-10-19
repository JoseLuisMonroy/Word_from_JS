const docx = require('docx');
const fs = require('fs');
const { Paragraph, ImageRun } = docx;

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
            new Paragraph("Metodo para crear texto sin estilos"),
            new Paragraph("Inserción básica de imagen"),
            new Paragraph({
                children: [
                    new ImageRun({
                        data: fs.readFileSync("./images/index.png"),
                        transformation: {
                            width: 100,
                            height: 100,
                        },
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: fs.readFileSync("./images/pokemon.jpeg").toString("base64"),
                                transformation: {
                                    width: 100,
                                    height: 100,
                                },
                            }),
                        ],
                    }),
                ],
            }),
        ]
    }, ],
});

docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});