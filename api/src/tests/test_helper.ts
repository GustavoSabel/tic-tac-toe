import sinon from 'sinon'
import chai from 'chai'
import chaihttp from 'chai-http'

var expect = chai.expect
chai.use(chaihttp)

var supertest = require("supertest");

export { sinon, chai, expect, supertest } 