import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtpserviceService } from '../otpservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showform:Boolean = false;
  isOTPgenerated =false;
  isOTPvalid     = false;
  Visitor  = 
  { 
    email     : '',
  }
  OTP = {
    otp:'',
    visitorid:''
  }
  constructor(private otpService:OtpserviceService,private router:Router) { }

  ngOnInit(): void {
  }
  
  usersubmit(){
    this.otpService.create(this.Visitor)
    .subscribe({
      next: (result:any) =>  {
        if(result.message=='sending OTP failed'){
          this.isOTPgenerated = false;
          this.showform = false;
        }
        else {
          this.isOTPgenerated = true;
          this.showform = true;
          var newvisit = JSON.parse(JSON.stringify(result));
          this.OTP.visitorid = newvisit.visitorId; 
        }
            
      }
      
      });
    
  }
checkOTP()
{this.isOTPvalid = true;
  this.otpService.checkotp(this.OTP)
    .subscribe({
      next: (result:any) =>  {console.log(result.message);
        if(result.message=='OTP validation failed'){
          this.isOTPvalid = false;
        }
        else if(result.message=='OTP validated'){
          this.isOTPvalid = true;
          this.router.navigate(['/welcome']);
         }            
      }, 
      complete: () => {console.log('complete');},
      error: (err) => { 
        if(err.error.message=='OTP validation failed'){
          this.isOTPvalid = false;
      } 
    }      
  });

}

}
