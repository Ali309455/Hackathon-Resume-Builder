// function getimage(){
// document.querySelector('.submitbtn').addEventListener('click', function() {
//     setTimeout(() => {
        
//         const input = document.getElementById('profilePicture');
//         const file = input.files[0];
//         console.log(file);
        
        
//         if (file) {
//             const reader = new FileReader();
//             console.log("reader", reader);
            
            
//             reader.onload = function(e) {
//                 const img = document.querySelector(".profile-pic")
//                 console.log(e);
//                 console.log(img);
                
//                 console.log(e);
                
//                 img.src = e.target.result; // Set the image source to the file data
//                 // img.style.display = 'block'; // Show the image
//             };
            
//             reader.readAsDataURL(file); // Read the file as a Data URL
//         } else {
//             alert('Please select an image file to upload.');
//         }
//     }, 2500);
//     console.log('started working');
    
//         });
// }
function getImage() {
    document.querySelector('.submitbtn').addEventListener('click', function() {
        setTimeout(() => {
            
            const input = document.getElementById('profilePicture');
            const file = input.files[0];
            
            if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.querySelector(".profile-pic");
                img.src = e.target.result; // Set the image source to the Data URL
                img.style.display = 'block'; // Show the image
            };
            
            // Check if the file is an image
            console.log(file.type,"ckdo");
            
            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file); // Read the file as a Data URL
            } else {
                alert('Please upload a valid image file.');
            }
        } else {
            alert('Please select an image file to upload.');
        }
    }, 2500);
    });
}

getImage();
console.log('Image upload function initialized.');

    
    