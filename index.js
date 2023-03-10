var getLinReg = function (dataset) {
  let ret = { a: 0, b: 0 }

  /* least squares */
  // y = f(x) = ax + b
  // (ax + b - y)^2 = 0
  // f(a, b) = 0 = sum(xi, yi){(a*xi + b - yi)^2} = paa*a^2 + pab*ab + pbb*b^2 + pa*a + pb*b + const

  let paa = 0 // parm of a^2
  let pbb = 0 // parm of b^2
  let pab = 0 // parm of ab
  let pa = 0 // parm of a
  let pb = 0 // parm of b

  if (dataset) {
    // calculate params of f(a, b)
    dataset.forEach(data => {
      let xi = data[0]
      let yi = data[1]

      paa += xi*xi
      pab += 2*xi
      pbb += 1
      pa += -2*xi*yi
      pb += -2*yi
    })
  }

  /* partial derivative */
  // df(da) = 0 = 2*paa*a + pab*b + pa
  // df(db) = 0 = 2*pbb*b + pab*a + pb
  ret.a = (pb*pab - 2*pa*pbb) / (4*paa*pbb - pab*pab)
  ret.b = (2*paa*pb - pa*pab) / (pab*pab - 4*paa*pbb)

  return ret
}

let dataset = [[1, 6], [2, 5], [3, 7], [4, 10]]
console.log(`dataset: ${JSON.stringify(dataset)}`)
let parms = getLinReg(dataset)
console.log(`y = f(x) = ${parms.a}*x + ${parms.b}`)
