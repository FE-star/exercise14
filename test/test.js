const storage = require('../lib/storage.js')

describe('test remove localstorage', function () {
  it('从后往前删除item', function (done) {
      localStorage.clear();
      let i = 0
      while (i++ < 100000) {
          const tmp = (new Date).toString()
          storage.set(`data-${i}`, { date: tmp },'behind')
          storage.get(`data-${i}`).date.should.equal(tmp)
          done()
      }
  })

  it('从前往后删除item', function (done) {
    localStorage.clear();
        let i = 0
        while (i++ < 100000) {
            const tmp = (new Date).toString()
            storage.set(`data-${i}`, { date: tmp },'front')
            storage.get(`data-${i}`).date.should.equal(tmp)
            done()
        }
  })

  it('随机删除item', function (done) {
        localStorage.clear();
        let i = 0
        while (i++ < 100000) {
            const tmp = (new Date).toString()
            storage.set(`data-${i}`, { date: tmp },'random')
            storage.get(`data-${i}`).date.should.equal(tmp)
             done()
        }
  })
})