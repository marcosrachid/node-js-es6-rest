"use strict";
import supertest from 'supertest';
import chai from 'chai';
import app from '../../src/app.js';

global.app = app;
global.supertest = supertest;
global.expect = chai.expect;
global.assert = chai.assert;
