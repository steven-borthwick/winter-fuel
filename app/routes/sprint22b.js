const express = require('express');
const router = express.Router()

router.use((req, res, next) => {
    if (req.method === 'POST') {
      console.log(JSON.stringify(req.session.data, null, 2))
    }
    next()
  })


  router.use((req, res, next) => {
  res.locals.back = req.headers.referer
  next()
})


// Pension credit/State Pension
router.post('/sprint22b/receiving-sp', (req, res) => {
  const pension = req.body.pension || []
  if (pension.includes('pc')) {
    res.redirect('/sprint22b/residency-type-pc')
  }
  else if (pension.includes('sp')) {
    res.redirect('/sprint22b/residency-type');
  } else {
    res.redirect('/sprint22b/deferral')
  }
})


  // Date of birth

  router.post('/sprint22b/date-of-birth', (req, res) => {
    res.redirect('/sprint22b/residency')
  })
  ;

  // Claimed Winter Fuel Payment

  router.post('/sprint22b/claimed', function(req, res) {
    if ( req.body['claimed'] === 'yes' ) {
      res.redirect('benefits');
    } else {
      res.redirect('deferral');
    }
  });

  // Living

  router.post('/sprint22b/residency', function(req, res) {
    if ( req.body['living'] === 'united-kingdom' ) {
      res.redirect('receiving-sp');
    } else {
      res.redirect('overseas');
    }
  });


  // Benefits

router.post('/sprint22b/benefits', function(req, res) {
  if ( req.body['benefits'] === 'yes' ) {
    res.redirect('receiving-benefits');
  } else {
    res.redirect('residency-type');
  }
});

// Query

router.post('/sprint22b/query', function(req, res) {
if ( req.body['query'] === 'eligibility' ) {
  res.redirect('date-of-birth');
} else {
  res.redirect('/sprint22a/find');
}
});



  // Residency type SP

  router.post('/sprint22b/residency-type', function(req, res) {
    if ( req.body['where-were-you-living'] === 'hospital' ) {
      res.redirect('hospital');
    } else if ( req.body['where-were-you-living'] === 'carehome' ) {
      res.redirect('care-home');
    } else if ( req.body['where-were-you-living'] === 'no-abode' ) {
      res.redirect('no-abode');
    } else if ( req.body['where-were-you-living'] === 'prison' ) {
      res.redirect('prison');
    } else {
      res.redirect('who');
    }
  });

  // Residency type PC

  router.post('/sprint22b/residency-type-pc', function(req, res) {
    if ( req.body['where-were-you-living'] === 'hospital' ) {
      res.redirect('hospital-pc');
    } else if ( req.body['where-were-you-living'] === 'carehome' ) {
      res.redirect('care-home-pc');
    } else if ( req.body['where-were-you-living'] === 'no-abode' ) {
      res.redirect('no-abode');
    } else if ( req.body['where-were-you-living'] === 'prison' ) {
      res.redirect('prison');
    } else {
      res.redirect('pension-credit');
    }
  });


  // Hospital

  router.post('/sprint22b/hospital', function(req, res) {
    if ( req.body['hospital-admission'] === 'yes' ) {
      res.redirect('who');
    } else {
      res.redirect('hospital-over-year');
    }
  });

  // Hospital PC

  router.post('/sprint22b/hospital-pc', function(req, res) {
    if ( req.body['hospital-admission'] === 'yes' ) {
      res.redirect('pension-credit');
    } else {
      res.redirect('hospital-over-year');
    }
  });


  // Care or nursing home

    router.post('/sprint22b/care-home', function(req, res) {
      if ( req.body['care-home-admission'] === 'yes' ) {
        res.redirect('who');
      } else {
        res.redirect('care-home-over-13');
      }
    });

    // Care or nursing home PC

      router.post('/sprint22b/care-home-pc', function(req, res) {
        if ( req.body['care-home-admission'] === 'yes' ) {
          res.redirect('who-pc');
        } else {
          res.redirect('care-home-over-pc');
        }
      });

    // Who (Living with)

      router.post('/sprint22b/who', function(req, res) {
        if ( req.body['who-do-you-live-with'] === 'yes' ) {
          res.redirect('living-with');
        } else {
          res.redirect('full-payment');
        }
      });

      // Who (Living with)

        router.post('/sprint22b/who-pc', function(req, res) {
          if ( req.body['who-do-you-live-with'] === 'yes' ) {
            res.redirect('shared-payment-pc');
          } else {
            res.redirect('receiving-benefits');
          }
        });


      // Living with (age)

        router.post('/sprint22b/living-with', function(req, res) {
          if ( req.body['live-with-age'] === 'yes' ) {
            res.redirect('live-with-carehome');
          } else {
            res.redirect('full-payment');
          }
        });

      // Shared payment to overpayment find

      router.post('/sprint22b/shared-payment', (req, res) => {
        res.redirect('/sprint22b/find-1')
      })
      ;

      // Shared payment to overpayment find

      router.post('/sprint22b/find-1', (req, res) => {
        res.redirect('/sprint22b/find-result-1')
      })
      ;

      // Overpayment branch

      router.post('/sprint22b/find-result-1', (req, res) => {
        res.redirect('/sprint22b/security-1')
      })
      ;

      router.post('/sprint22b/security-1', (req, res) => {
        res.redirect('/sprint22b/address-check-1')
      })
      ;

      router.post('/sprint22b/address-check-1', function(req, res) {
        if ( req.body['address-match'] === 'yes' ) {
          res.redirect('poa-1');
        } else {
          res.redirect('postcode-1');
        }
      });

      router.post('/sprint22b/poa-1', (req, res) => {
        res.redirect('/sprint22b/check-1')
      })
      ;

      router.post('/sprint22b/check-1', (req, res) => {
        res.redirect('/sprint22b/declaration')
      })
      ;

      // Full payment

      router.post('/sprint22b/full-payment', (req, res) => {
        res.redirect('/sprint22b/find')
      })
      ;

      // Find a person

      router.post('/sprint22b/find', (req, res) => {
        res.redirect('/sprint22b/find-result')
      })
      ;

      // Found person to security

      router.post('/sprint22b/find-result', (req, res) => {
        res.redirect('/sprint22b/security')
      })
      ;

      // Found person to security

      router.post('/sprint22b/security', (req, res) => {
        res.redirect('/sprint22b/address-check')
      })
      ;


// Who (Care home during Q week)

router.post('/sprint22b/live-with-carehome', function(req, res) {
  if ( req.body['live-with-carehome'] === 'yes' ) {
    res.redirect('live-with-carehome-13weeks');
  } else {
    res.redirect('shared-payment');
  }
});

router.post('/sprint22b/live-with-carehome-13weeks', function(req, res) {
  if ( req.body['carehome-13weeks'] === 'yes' ) {
    res.redirect('shared-payment');
  } else {
    res.redirect('full-payment');
  }
});

// Current address

router.post('/sprint22b/address-check', function(req, res) {
  if ( req.body['address-match'] === 'yes' ) {
    res.redirect('poa');
  } else {
    res.redirect('postcode');
  }
});


// Power of attorney

router.post('/sprint22b/poa', (req, res) => {
  res.redirect('/sprint22b/check')
})
;

// Postcode underpayment

router.post('/sprint22b/postcode', (req, res) => {
  res.redirect('/sprint22b/select-address')
})
;

// Postcode overpayment

router.post('/sprint22b/postcode-1', (req, res) => {
  res.redirect('/sprint22b/select-address-1')
})
;

// Check

router.post('/sprint22b/postcode', (req, res) => {
  res.redirect('/sprint22b/select-address')
})
;

// Select address to move date

router.post('/sprint22b/select-address', (req, res) => {
  res.redirect('/sprint22b/move-date')
})
;

// Select address to move date

router.post('/sprint22b/select-address-1', (req, res) => {
  res.redirect('/sprint22b/move-date-1')
})
;

// Move date to power of attorney

router.post('/sprint22b/move-date', (req, res) => {
  res.redirect('/sprint22b/poa')
})
;

// Move date to power of attorney 2

router.post('/sprint22b/move-date-1', (req, res) => {
  res.redirect('/sprint22b/poa-1')
})
;


// Occupants

router.post('/sprint22b/occupants', (req, res) => {
  res.redirect('/sprint22b/check')
})
;

// Check to declaration

router.post('/sprint22b/check', (req, res) => {
  res.redirect('/sprint22b/declaration')
})
;

// Check to declaration

router.post('/sprint22b/declaration', (req, res) => {
  res.redirect('/sprint22b/confirmation')
})
;




  //    } else if (something === something) {


  module.exports = router;
