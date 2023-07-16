fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#itemsData tbody');

    data.forEach(group => {
      const { type, items } = group;
      items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index === 0 ? type : ''}</td>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td><input type="checkbox" name="${item.name}" />&nbsp;</td>
        `;
        tableBody.appendChild(row);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  $(document).ready(function () {

    $("#shoppingListForm").submit(function(e){
      e.preventDefault(); // Prevent the form from submitting normally
    
      // Get all the selected checkbox values
      const checkboxes = $('#shoppingListForm input[type="checkbox"]:checked');
      const selectedItems = Array.from(checkboxes).map((checkbox) => checkbox.name);
    
      // Prepare the email body with the selected items
      const emailBody = selectedItems.join(", ");
    
      // Send the email (implementation depends on your email sending mechanism)
      sendEmail("recipient@example.com", "Selected Items", emailBody);
    });
    
    function sendEmail(recipient, subject, body) {
      // Use your preferred method to send the email, such as an API call or an email library
      // This is just a placeholder function for demonstration purposes
      // console.log(`Sending email to ${recipient}`);
      // console.log(`Subject: ${subject}`);
      // console.log(`Body: ${body}`);
      // alert("Items: "+ `${body}`);

      emailjs.init('NX8PoHU8ScQ0LHE5B');

      let params = {
        from_name: "User",
        message: subject,
        email_body: body
      }
      emailjs.send("service_i664784", "template_debf5uj", params).then(function (res) {
        alert("Success!")
      })
    }
    
  })
