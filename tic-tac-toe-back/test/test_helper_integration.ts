import { Application } from 'express'
import { appPromise } from '@src/app'

let _app: Application | undefined

const getApp = async () => {
  if (!_app) {
    _app = await appPromise
  }
  return _app
}

export { getApp } 