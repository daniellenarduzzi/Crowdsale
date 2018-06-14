const Whitelist = artifacts.require('Whitelist')
const Crowdsale = artifacts.require('Crowdsale')
contract('Whitelist', addresses => {
  console.log('comienza test')
  const owner = addresses[0]
  const autorized = addresses[2]
  const notAutorized = addresses[3]
  let instanceWhitelist
  let instanceCrowdsale
  before(async () => {
     instanceWhitelist = await Whitelist
      .new( {from: owner})
     instanceCrowdsale = await Crowdsale
      .new(instanceWhitelist.address ,{from: owner})
  })

  describe('testing functionality', () => {

    it('autorized cant use someFunction when is not instantiated', async () => {
      try {
        await instanceCrowdsale.someFunction( { from: autorized})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

    it('owner can use initOperator from Crowdsale', async () => {
      try {
        await instanceWhitelist.whitelistAddress( autorized,{ from: owner})
        instanceWhitelist.addedAddress().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.added, autorized)
          }
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('autorized can use someFunction', async () => {
      try {
        let func = await instanceCrowdsale.someFunction( { from: autorized})
        assert.equal(func, 0)
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

  })
})
