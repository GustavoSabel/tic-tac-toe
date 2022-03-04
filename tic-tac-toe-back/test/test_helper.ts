import sinon from 'sinon'
import chai from 'chai'
import chaihttp from 'chai-http'
import supertest from 'supertest'

const expect = chai.expect
chai.use(chaihttp)

export { sinon, chai, expect, supertest } 