window.onload =function () {
    subscription();
}
function subscription() {
    const subscribeForm = document.getElementById('email_subscribe');
    
    //validate phone Number
    const validatePhone= function(number) {
        const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        return phoneRe.test(number);
    }   
    //validate  email
    const validateEmail =function(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    } 
    subscribeForm.onsubmit = function(event) {
        event.preventDefault();
        const phoneNumber =subscribeForm.elements[0];
        const email = subscribeForm.elements[1];
        var warning =document.createElement('p');
        warning.setAttribute('id','warning');
             
        subscribeForm.appendChild(warning);
        if (!validatePhone(phoneNumber.value)) {
        warning.innerText='Incorrect phone number. Please enter the correct format';
          
        //console.log('Incorrect phone number');
          return false;
        }
        if (!validateEmail(email.value)) {
            warning.innerText= 'Incorrect email address. Please enter the correct format';
            //console.log('Incorrect Email');
          return false;
        }
         return true;
    
        
        }
}

/******************************************* */
app.get('/subscribe', (req, res) => {
    MongoClient.connect(url, function(err, client) {
      const db = client.db('products');
      const subscriptionCollection = db.collection('subscription');
        //get data from subscription form
      var phone=req.query.phone;
      var email=req.query.email;
      const doc = {'phone number':phone,'email':email,'subscribe_date':'Aug-14-2018'};
      // write the new subscription to db
      subscriptionCollection.insertOne(doc,(err, result)=>{
        res.render('subscribe', { title: 'Vietnamese Corner - SUBSCRIPTION', phone: phone, email: email });
      });
    });
  });

/*****************************************************/
