import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userRole : string = "";
  loans = [
    { image: 'assets/images/crop.jpg', title: 'Crop Loan', description: 'A loan for agricultural crop needs.', link: '/crop-loan' },
    { image: 'assets/images/farmequipment.jpg', title: 'Farm Equipment Loan', description: 'Finance your farm machinery.', link: '/farm-equipment-loan' },
    { image: 'assets/images/livestock.jpg', title: 'Livestock Loan', description: 'Support for your livestock business.', link: '/livestock-loan' },
    { image: 'assets/images/landpurchase.jpg', title: 'Land Purchase Loan', description: 'Loans to buy agricultural land.', link: '/land-purchase-loan' },
    { image: 'assets/images/farmallied.jpg', title: 'Farm Allied Loan', description: 'For allied farming activities.', link: '/farm-allied-loan' }
  ];
 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole');
    console.log(this.userRole);

  }


  public navigateToLoanPage(link: string): void {
    this.router.navigate([link]);
  }
 
}
