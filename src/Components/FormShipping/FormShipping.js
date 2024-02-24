import { React, useState } from 'react'
import { Button, Form, Container } from "react-bootstrap";
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import logo from '../Assets/kabayanboxlogo.jpg'

// Components
import TableForm from "./TableForm";

// API Calls
import { postShipment } from '../../utils/apicalls';
// import ShippingData from './ShippingData';

function FormShipping() {

    const [tel_s, setTelS] = useState('');
    const [tel_c, setTelC] = useState('');
    const [telSError, setTelSError] = useState(false);
    const [telCError, setTelCError] = useState(false);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    //Shipments
    const [data, setData] = useState([]);

    const handleTelSChange = (e) => {
        const input = e.target.value.replace(/[^0-9]/g, '');
        setTelS(input);
        setTelSError(!input);
    };

    const handleTelCChange = (e) => {
        const input = e.target.value.replace(/[^0-9]/g, '');
        setTelC(input);
        setTelCError(!input);
    };

    const generatePDF = async (form_data) => {
        const DEFAULT_TITLE = "KABAYANBOX S.L";
        const DEFAULT_SUBTEXT = 'CIF: B38788998';
        const DEFAULT_PARAGRAPH_SUBTEXT = 'Santa Cruz  de Tenerife, Islas Canarias, España Tels: 922-202736 /  922-709202 CP: 690-866588 Email: kabayanbox@wanadoo.es';
        const LOGO_PATH = logo

        const ADDITIONAL_TITLE = "SHIPPER'S EXPORT DECLARATION AND PACKING LIST";

        const smallText = "Use separate sheet/s if necessary but should be signed by the sender and KABAYANBOX S.L representative.";

        const POLICIES = "This is to certify that I am the sender of the above items. I have read and clearly understood Kcif's declarations  and fully  indemnify KABAYANBOX S.L Tenerife, on future claims and legal actions against the company. That the above detailed list  is the true and correct description of the goods contained in this box being sent to the Philippines; that there are no undeclared, restricted, illegal or banned items, including firearms ammunitions, legal drugs, combustible goods included in this shipment and that my freight/forward consolidator KABAYANBOX S.L and whoever Kcif's duly elected local/delivery agent in the Philippines is authorized  to clear the above shipment through customs and is under contractual obligation to ensure his duties, tax, charges penalites and other expenses due to the shipment and/or incurred for its release are paid. Any duty and tax incurred  apart from the regular expenses used in household goods and personal effects standart duty and tax imposed by the BOC, I, the shipper will shoulder additional expenses against BOC's official receipt."

        // Load the logo image
        const logoImageBytes = await fetch(LOGO_PATH).then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const { width, height } = page.getSize();
        const fontSize = 24;

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const titleWidth = font.widthOfTextAtSize(DEFAULT_TITLE, fontSize);

        // Draw the logo image
        const logoImage = await pdfDoc.embedJpg(logoImageBytes);
        const logoWidth = 75; // Adjust the width of the logo as needed
        const logoHeight = logoWidth * (logoImage.width / logoImage.height);
        page.drawImage(logoImage, {
            x: 50, // Adjust the position of the logo as needed
            y: height - 25 - logoHeight, // Adjust the position of the logo as needed
            width: logoWidth,
            height: logoHeight,
        });

        page.drawText(DEFAULT_TITLE, {
            x: (width - titleWidth) / 2,
            y: height - 50,
            size: fontSize,
        });

        // Draw the subtext
        page.drawText(DEFAULT_SUBTEXT, {
            x: 50 + logoWidth + 100, // Adjust the position of the subtext relative to the logo
            y: height - 50 - fontSize, // Adjust the position of the subtext relative to the title
            size: fontSize / 2, // Adjust the font size of the subtext as needed
            color: rgb(0, 0, 0), // Adjust the color of the subtext as needed
        });

        page.drawText(DEFAULT_PARAGRAPH_SUBTEXT, {
            x: 50 + logoWidth + 75, // Adjust the position of the paragraph subtext relative to the logo
            y: height - 50 - fontSize * 1.5, // Adjust the position of the paragraph subtext relative to the title
            size: fontSize / 2.5, // Adjust the font size of the paragraph subtext as needed
            color: rgb(0, 0, 0), // Adjust the color of the paragraph subtext as needed
            textAlign: 'justify', // Justify the text
            maxWidth: width - (400), // Set the xmaximum width of the text to the available width on the page
            lineHeight: fontSize / 3 * 1.1,
        });

        page.drawRectangle({
            x: width - 140, // Adjust the x-position as needed
            y: height - 100, // Adjust the y-position as needed
            width: 100,
            height: 30,
            borderColor: rgb(0, 0, 0), // Set border color to black
            borderWidth: 1, // Set border width to 1 unit
            color: rgb(1, 1, 1, 0),
        });

        // Draw the "Nº" label inside the rectangle
        page.drawText('Nº', {
            x: width - 135, // Adjust the x-position as needed
            y: height - 90, // Adjust the y-position as needed
            size: fontSize / 2, // Adjust the font size as needed
            color: rgb(0, 0, 0), // Adjust the color as needed
        });

        // Draw additional title above the table
        const additionalTitleFontSize = 14;
        const additionalTitleWidth = font.widthOfTextAtSize(ADDITIONAL_TITLE, additionalTitleFontSize);
        const additionalTitleX = (width - additionalTitleWidth) / 2;
        const additionalTitleY = height - 60 - fontSize * 3;
        page.drawText(ADDITIONAL_TITLE, {
            x: additionalTitleX,
            y: additionalTitleY,
            size: additionalTitleFontSize,
            color: rgb(0, 0, 0),
            font: fontBold
        });

        const cellWidth = (width - 100) / 2; // Adjust width as needed
        const cellHeight = 15;
        const margin = 50;
        const startX = margin;
        const startY = height - margin - logoHeight - fontSize * 2;

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 2; j++) {
                const x = startX + j * cellWidth;
                const y = startY - i * cellHeight;
                page.drawRectangle({
                    x,
                    y,
                    width: cellWidth,
                    height: cellHeight,
                    borderColor: rgb(0, 0, 0),
                    borderWidth: 1,
                });

                // Draw "SENDER" and "CONSIGNEE" in the first row
                if (i === 0) {
                    const text = j === 0 ? "SENDER" : "CONSIGNEE";
                    const textWidth = font.widthOfTextAtSize(text, 12);
                    const textHeight = 22;
                    const textX = x + (cellWidth - textWidth) / 2;
                    const textY = (y - (cellHeight - textHeight) / 2) ;
                    page.drawText(text, {
                        x: textX,
                        y: textY,
                        size: 12,
                        color: rgb(0, 0, 0),
                        font: fontBold
                    });
                }

                if (i === 1) {
                    if (j === 0) {
                        const text = "Name: " + form_data.name_s;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                    if (j === 1) {
                        const text = "Name: " + form_data.name_c;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                }
                if (i === 2) {
                    const text = "Address:";
                    const textHeight = 22;
                    const textX = x + 2; // Adjust for padding
                    const textY = y - (cellHeight - textHeight) / 2;
                    page.drawText(text, {
                        x: textX,
                        y: textY,
                        size: 12,
                        color: rgb(0, 0, 0),
                    });
                }
                if (i === 3) {
                    if (j === 0) {
                        const text = form_data.address_s;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                    if (j === 1) {
                        const text = form_data.address_c;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                }
                if (i === 4) {
                    if (j === 0) {
                        const text = "Tel: (   ) " + form_data.tel_s;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                    if (j === 1) {
                        const text = "Tel: (   ) " + form_data.tel_c;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                }

                if (i === 5) {
                    if (j === 0) {
                        const text = "DNI #: " + form_data.id_s;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
    
                    if (j === 1) {
                        const text = "Email: " + form_data.id_c;
                        const textHeight = 22;
                        const textX = x + 2; // Adjust for padding
                        const textY = y - (cellHeight - textHeight) / 2;
                        page.drawText(text, {
                            x: textX,
                            y: textY,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                }
            }
        }

        // Calculate the width of the columns for the second table
        const firstColumnWidth = (width - 100) * 0.4; // 40% of the available width
        const secondColumnWidth = (width - 100) * 0.1; // 10% of the available width
        const thirdColumnWidth = (width - 100) * 0.4; // 40% of the available width
        const fourthColumnWidth = (width - 100) * 0.1; // 10% of the available width

        // Draw second table with 4 columns and 16 rows
        const verticalGap = 10; // Adjust as needed
        const firstTableHeight = 15;
        const firstTableStartY = startY;
        // const secondTableWidth = (width - 100) / 4; 
        const secondTableHeight = 15;
        const secondTableStartX = margin;
        const secondTableStartY = firstTableStartY - 6 * firstTableHeight - verticalGap;

        for (let i = 0; i < 16; i++) {
            const x1 = secondTableStartX;
            const x2 = x1 + firstColumnWidth;
            const x3 = x2 + secondColumnWidth;
            const x4 = x3 + thirdColumnWidth;
            
            for (let j = 0; j < 4; j++) {
                const x = j === 0 ? x1 : j === 1 ? x2 : j === 2 ? x3 : x4;
                const y = secondTableStartY - i * secondTableHeight;
                const columnWidth = j === 0 ? firstColumnWidth : j === 1 ? secondColumnWidth : j === 2 ? thirdColumnWidth : fourthColumnWidth;
                page.drawRectangle({
                    x,
                    y,
                    width: columnWidth,
                    height: secondTableHeight,
                    borderColor: rgb(0, 0, 0),
                    borderWidth: 1,
                });
                if (i === 0) {
                    let text = '';
                    switch (j) {
                        case 0:
                        case 2:
                            text = "DESCRIPTION OF GOODS";
                            break;
                        case 1:
                        case 3:
                            text = "QTY.";
                            break;
                        default:
                            break;
                    }
                    const textWidth = font.widthOfTextAtSize(text, 12);
                    const textHeight = 22;
                    const textX = (x + (columnWidth - textWidth) / 2) - 10;
                    const textY = y - (secondTableHeight - textHeight) / 2;
                    page.drawText(text, {
                        x: textX,
                        y: textY,
                        size: 12,
                        color: rgb(0, 0, 0),
                        font: fontBold
                    });
                }
                if (data.length <= 29) {
                if (i !== 0 && j === 0 && i < data.length + 1) { // Skip the header row
                    const dataIndex = i - 1
                    const text = data[dataIndex].description;
                    const textWidth = font.widthOfTextAtSize(text, 12);
                    const textHeight = 22;
                    const textX = (x + 1);
                    const textY = y - (secondTableHeight - textHeight) / 2;
                    page.drawText(text, {
                        x: textX,
                        y: textY,
                        size: 12,
                        textAlign: "left",
                        color: rgb(0, 0, 0),
                    });
                    
                    }
                if (i !== 0 && j === 1 && i < data.length + 1) {
                    const dataIndex = i - 1
                    const text = String(data[dataIndex].quantity);
                    const textWidth = font.widthOfTextAtSize(text, 12);
                    const textHeight = 22;
                    const textX = (x + 1);
                    const textY = y - (secondTableHeight - textHeight) / 2;
                    page.drawText(text, {
                        x: textX,
                        y: textY,
                        size: 12,
                        textAlign: "left",
                        color: rgb(0, 0, 0),
                    });
                }
                if (i !== 0 && j === 2 && i < data.length + 1) {
                    const dataIndex = i - 1
                    const text = data[dataIndex + 15]?.description || '';
                    const textWidth = font.widthOfTextAtSize(text, 12);
                    const textHeight = 22;
                    const textX = (x + 1);
                    const textY = y - (secondTableHeight - textHeight) / 2;
                    page.drawText(text, {
                        x: textX,
                        y: textY,
                        size: 12,
                        textAlign: "left",
                        color: rgb(0, 0, 0),
                    });
                }
                if (i !== 0 && j === 3 && i < data.length + 1) {
                    const dataIndex = i - 1
                    const text = data[dataIndex + 15]?.quantity || '';
                    const textHeight = 22;
                    const textX = (x + 1);
                    const textY = y - (secondTableHeight - textHeight) / 2;
                    page.drawText(String(text), {
                        x: textX,
                        y: textY,
                        size: 12,
                        textAlign: "left",
                        color: rgb(0, 0, 0),
                    });
                }
                } 
                
            }
        }

        const smallTextWidth = font.widthOfTextAtSize(smallText, 10);
        const smallTextX = (width - smallTextWidth) / 2;
        const smallTextY = (secondTableStartY - 16 * secondTableHeight) + 9;
        page.drawText(smallText, {
            x: smallTextX + 50,
            y: smallTextY - 4,
            size: 8,
            color: rgb(0, 0, 0),
        });

        const additionalText = "Total amount of goods declared € _______________";
        const additionalTextWidth = font.widthOfTextAtSize(additionalText, 12); // Adjusted font size
        // Adjusting the calculation of additionalTextX to keep the text within the canvas
        const additionalTextX = width - margin - additionalTextWidth;
        const additionalTextY = smallTextY - 17; // Adjust vertical position as needed
        page.drawText(additionalText, {
            x: additionalTextX,
            y: additionalTextY - 5,
            size: 12,
            color: rgb(0, 0, 0),
        });

        const declarations = [
            "1. Maximum liability of KABAYANBOX S.L per package in case of 'TOTAL LOSS' shall be € 50.00 per box.",
            "2. KABAYANBOX S.L is not liable for loss, damages and delays due to act of God, force majeure occurrence or any cause reasonable beyond the control of the 'Company'.",
            "3. Receipt of the above shipment by the recipient without notation on the bill of lading of loss, damages or delays is understood that the box has been delivered in good order/condition and in accordance with the bill.",
            "4. All complaints must be made in writing Kcif, Tenerife; delivery staff complaints, missing items, opened box's etc. within 16 days maximum so that proper action is conducted.",
            "5. KABAYANBOX S.L will not pay nor responsible for any lost item/s properly declared in this form as a result of THEFT. However we will do our utmost best to investigate the problem.",
            "6. KABAYANBOX S.L will accept perishable/breakable item/s and 'shipped at owner's risk' (SOR) with ordinary care in handling."
        ];
        
                // Calculate the width of the column for the declaration
        const declarationWidth = (width - 100)  // 80% of the available width
        const declarationHeight = 10; // Adjust line height as needed
        const declarationStartX = margin; // Adjusted to align with the tables
        const declarationStartY = additionalTextY - 25; // Adjust vertical position as needed

        // Draw the rest of the declarations
        declarations.forEach((declaration, index) => {
            const startY = (declarationStartY - index * (declarationHeight * 2)); // Adjust spacing as needed
            const lines = breakTextIntoLines(declaration, declarationWidth, font, 10);
            lines.forEach((line, lineIndex) => {
                page.drawText(line.trim(), { // Trim each line to remove leading/trailing spaces
                    x: declarationStartX,
                    y: startY - lineIndex * declarationHeight, // Adjust position for each line
                    size: 10,
                    font: font,
                    color: rgb(0, 0, 0),
                    lineHeight: declarationHeight
                });
            });
        });

        // const policiesWidth = font.widthOfTextAtSize(POLICIES, 8);
        const policiesStartX = margin; // Adjusted to align with the tables
        const policiesStartY = declarationStartY - (declarations.length * (declarationHeight * 2)) - 50; // Adjust vertical position as needed

        // Draw the POLICIES text
        const policiesLines = breakTextIntoLines(POLICIES, declarationWidth, font, 10);
        policiesLines.forEach((line, lineIndex) => {
            page.drawText(line.trim(), {
                x: policiesStartX,
                y: (policiesStartY - lineIndex * declarationHeight) + 45,
                size: 10,
                font: font,
                color: rgb(0, 0, 0),
                lineHeight: declarationHeight
            });
        });

// Draw horizontal line at the bottom of the page
page.drawLine({
    start: { x: margin + 120, y: margin },
    end: { x: (width - margin - 120), y: margin },
    thickness: 1,
    color: rgb(0, 0, 0)
});

// Calculate Y position for "SENDER'S SIGNATURE" and "DATE"
const signatureY = margin - 20;
const dateY = margin - 20;

// Draw "SENDER'S SIGNATURE" and "DATE" below the line
page.drawText("SENDER'S SIGNATURE", {
    x: margin  + 150,
    y: signatureY,
    size: 10,
    font: fontBold,
    color: rgb(0, 0, 0)
});

const dateX = width - margin - font.widthOfTextAtSize("DATE", 10);
page.drawText("DATE", {
    x: dateX - 150,
    y: dateY,
    size: 10,
    font: fontBold,
    color: rgb(0, 0, 0)
});


        // Function to break text into lines
        function breakTextIntoLines(text, maxWidth, font, fontSize) {
            const words = text.split(' ');
            const lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
                if (width < maxWidth) {
                    currentLine += ' ' + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
            return lines;
        }

        // Load the logo image
        page.drawImage(logoImage, {
            x: ((width - logoWidth) / 2) - 100, // Center the logo horizontally
            y: (height - logoHeight) / 2, // Center the logo vertically
            width: logoWidth + 200,
            height: logoHeight +200,
            opacity: 0.2 // Set the opacity to 0.2 (adjust as needed)
        });
        

        return await pdfDoc.save();
    };

    // Function that triggers on submitting the form
    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        try {
            await postShipment(payload.name_s, payload.address_s, Number(payload.tel_s), payload.id_s, payload.name_c, payload.address_c, Number(payload.tel_c), payload.id_c, data);

            const pdfBytes = await generatePDF(payload);
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(pdfBlob, 'empty_pdf.pdf');

            // Show success banner
            setShowSuccessBanner(true);

            // Clear form fields
            clearForm();

            e.target.reset();


            setTimeout(() => {
                setShowSuccessBanner(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const clearForm = () => {
        setData([]);
        setTelS('');
        setTelC('');
        setTelSError(false);
        setTelCError(false);
    };

    return (
        <Container>
            {showSuccessBanner && (
                <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
                    Your form has been submitted successfully.
                </div>
            )}
            <h2 className='mt-3'>Sender</h2>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name_s" placeholder="Enter name of Sender" />
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address_s" placeholder="Enter Address" />
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control
                        type="text"
                        name="tel_s"
                        placeholder="Enter telephone number"
                        value={tel_s}
                        onChange={handleTelSChange}
                        isInvalid={telSError}
                    />
                    {telSError && <Form.Control.Feedback type="invalid">Please enter a valid 10-digit telephone number.</Form.Control.Feedback>}
                    <Form.Label>DNI</Form.Label>
                    <Form.Control text="text" name="id_s" placeholder="Enter identification" />
                </Form.Group>
                <hr></hr>
                <h2>Consignee</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name_c" placeholder="Enter name of Consignee" />
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address_c" placeholder="Enter Address" />
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control
                        type="text"
                        name="tel_c"
                        placeholder="Enter telephone number"
                        value={tel_c}
                        onChange={handleTelCChange}
                        isInvalid={telCError}
                    />
                    {telCError && <Form.Control.Feedback type="invalid">Please enter a valid 10-digit telephone number.</Form.Control.Feedback>}
                    <Form.Label>Email:</Form.Label>
                    <Form.Control text="text" name="id_c" placeholder="Enter identification" />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <TableForm data={data} setData={setData} onSubmit={setData} />
                </Form.Group>

                <Button className='mb-5' variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    );
}

export default FormShipping;