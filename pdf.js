async function generatePDF() {
    

        let downloading = document.querySelector(".resume");
        if(downloading){
        var doc = new jsPDF('p', 'pt');
    
        await html2canvas(downloading, {
            allowTaint: true,
            useCORS: true,
            // width: 530
        }).then((canvas) => {
            //Canvas (convert to PNG)

            doc.addImage(canvas.toDataURL("image/png"), 'PNG', 2, 2);
        })
    
        doc.save("Document.pdf");
        
    
        //End of downloading
    
        // document.getElementById("downloadButton").innerHTML = "Click to download";
    

    //Downloading
}
}
async function generatePNG() {
    // Select the element you want to capture
    let element = document.querySelector(".resume");
    let downloadLink = document.getElementById("png");

    // Check if both the element and the download link exist
    if (element && downloadLink) {
        try {
            // Generate the canvas from the element
            let canvas = await html2canvas(element, {
                allowTaint: true,
                useCORS: true,
            });

            // Convert the canvas to a data URL (PNG image)
            let imageURL = canvas.toDataURL("image/png");

            // Set the download link properties
            downloadLink.href = imageURL;
            downloadLink.download = "resume.png";
        } catch (error) {
            console.error("Error generating PNG:", error);
        }
    } else {
        console.error("Element or download link not found.");
    }
}



document.getElementById("pdf").addEventListener("click", async () =>{
    await generatePDF();
});
document.getElementById("png").addEventListener("click", async () =>{
    await generatePNG();
});