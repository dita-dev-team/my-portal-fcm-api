const request  = require('supertest');
const expect = require('expect');
const server = require('../../server');
let assert = require('chai').assert;

describe('/Testing API Calls',()=>{
   var token = null;
   var tokenRequestBody = {
     email: 'ditadev@daystar.ac.ke',
     uid : '885ffefef'
   };
   before(function(done){
       request(server)
           .post('/api/v1/client/access-token')
           .send(tokenRequestBody)
           .end(function(err,res){
              if(!err){
                  token = res.body.token.accessToken;
                  done();
              }
           });

   });
   it('it should not post data with invalid request body',(done)=>{
     setTimeout(done,1000);
     let invalidNotificationBody = {
       messageTopic: 'debug',
       messageTitle: 'test'
       //The Message Body Left Out Intentionally
     };
     request(server)
         .post('/api/v1/send')
         .set('Authorization', 'Bearer ' + token)
         .send(invalidNotificationBody)
         .expect(400)
         .end((err,res)=>{
             if(err){
                  throw err;
             }
             done();
         })
   });
});
describe('/Should Post Correct Data',()=>{
    var token = null;
    var tokenRequestBody = {
        email: 'ditadev@daystar.ac.ke',
        uid : '885ffefef'
    };
    before(function(done){
        request(server)
            .post('/api/v1/client/access-token')
            .send(tokenRequestBody)
            .end(function(err,res){
                if(!err){
                    token = res.body.token.accessToken;
                    done();
                }
            });

    });
    it('it should send notification on valid request body',(done)=>{
        setTimeout(done,1000);
        let validRequestBody = {
            messageTopic: 'debug',
            messageTitle: 'test',
            messageBody: 'passed test case'
        };
        request(server)
            .post('/api/v1/send')
            .set('Authorization', 'Bearer ' + token)
            .send(validRequestBody)
            .expect(200)
            .end((err,res)=>{
                if(err){
                    throw err;
                }
                done();
            })
    })
});
describe('/Non-Existent Endpoints',()=>{
   it('it should reject non-existent endpoints',(done)=>{
     setTimeout(done,1000);
     request(server)
         .get('/api/v1/send')
         .expect(404)
         .end((err,res)=>{
             if(err){
                 done();
                 throw err;
             }

             done();
         })
   });

   after(function () {
       server.close();
   })
});

