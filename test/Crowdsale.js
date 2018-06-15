const Whitelist = artifacts.require('Whitelist')
const Crowdsale = artifacts.require('Crowdsale')
contract('Whitelist', addresses => {

  const owner = addresses[0]
  const autorized = addresses[2]
  const autorized2 = addresses[4]
  const operator = addresses[3]
  let instanceWhitelist
  let instanceCrowdsale
  before(async () => {
     instanceWhitelist = await Whitelist
      .new( )
     instanceCrowdsale = await Crowdsale
      .new(instanceWhitelist.address)
  })
  describe('testing functionality', async () => {

    it('autorized cant use someFunction when is not instantiated', async () => {
      try {
        await instanceCrowdsale.someFunction({ from: autorized})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

    it('owner can use whitelistAddress from Crowdsale', async () => {
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
    it('anyone not being owner can use whitelistAddress from Crowdsale, when operator isnt instantiated', async () => {
      try {
        await instanceWhitelist.whitelistAddress( autorized,{ from: operator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })
    it('when operator is instantiated can use whitelistAddress from Crowdsale, ', async () => {

      try {
        await instanceWhitelist.initializeOperator( operator,{ from: owner})
        await instanceWhitelist.whitelistAddress( autorized2,{ from: operator})
        instanceWhitelist.addedAddress().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.added, autorized2)
          }
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })
    it('attempt to use whitelistAddress with an already added address will cause revert', async () => {
      try {
        await instanceWhitelist.whitelistAddress( addresses[5],{ from: owner})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

    it('autorized can use someFunction', async () => {
      try {
        await instanceCrowdsale.someFunction( { from: autorized})
        instanceCrowdsale.SomeEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert(res[0].args.ok)
          }
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

  })
})
