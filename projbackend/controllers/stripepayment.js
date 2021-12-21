
const stripe = require("stripe")("sk_test_51HTrZhKSVRQwj4i1UpvK8uAVFtq0ittYnx3LNYTOSvsbGQpmKa23EL1vKTKfToP6sQp4EZOEZ4RFNd5dhUmeSStb00dYhQ5eI7")
const uuid = require("uuid/v4")





exports.makepayment = (req, res) => {
    const {products, token} = req.body
    
 

    let amount = 0;
    products.map(product => {
        amount = amount + (product.product.price * product.count )
    })

    const idempotencyKey = uuid()


    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
       stripe.charges.create(
            {
              amount: amount*100,
              currency: "myr",
              customer: customer.id,
              receipt_email: token.email,
              description: `Purchased the product`,
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip
                }
              }
            },
            {
              idempotencyKey
            }
          )
        .then(result => res.json(result))
        .catch(err => res.json(err))
    })

}