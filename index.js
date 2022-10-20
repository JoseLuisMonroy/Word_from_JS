const docx = require('docx');
const fs = require('fs');
const { Paragraph, ImageRun, TableRow, TableCell, Table, TextRun, VerticalAlign } = docx;

const table = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph("Hello")],
                    columnSpan: 2,
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph("World")],
                }),
            ],
        }),
    ],
});

const table2 = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph("Imagen")],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [new Paragraph("Descripción")],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [new Paragraph("Ruta")],
                    verticalAlign: VerticalAlign.CENTER
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: fs.readFileSync("./images/pokemon.jpeg"),
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
                new TableCell({
                    children: [new Paragraph("Imagen de pokemon")],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [new Paragraph("/images/pokemon.jpeg")],
                    verticalAlign: VerticalAlign.CENTER
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: fs.readFileSync("./images/index.png"),
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
                new TableCell({
                    children: [new Paragraph("Pikachu")],
                    verticalAlign: VerticalAlign.CENTER

                }),
                new TableCell({
                    children: [new Paragraph("/images/index.png")],
                    verticalAlign: VerticalAlign.CENTER
                }),
            ],
        }),
    ],
});


const doc = new docx.Document({
    sections: [{
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
            ]
        },
        {
            children: [
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
                                    data: fs.readFileSync("./images/pokemon.jpeg"),
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                        flip: {
                                            horizontal: true,
                                        },
                                        rotation: 225,
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        },
        {
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Inserción de tabla simple",
                            bold: true,
                        }),
                    ],
                }, )
            ]
        },
        {
            children: [table],
        },
        {
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Inserción de tabla con imagenes",
                            bold: true,
                        }),
                    ],
                }, )
            ]
        },
        {
            children: [table2],
        },
    ],
});

docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});