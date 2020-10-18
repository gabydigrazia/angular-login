import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ResponseSummaryData } from '../_models/login-data';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<ResponseSummaryData>();
  displayedColumns: string[] = ['id', 'ownerCompanyName', 'carrierCompanyName', 'carrierCompanyId', 'activityStatus', 'status', 'driverFullName', 'driverId', 'tractorPlate', 'tractorId', 'semiFirstPlate', 'semiFirstId', 'semiSecondPlate', 'semiSecondId', 'percentageCompleted', 'originDescription', 'lastMilestoneDescription', 'delayed', 'latitude', 'longitude', 'start', 'externalCode', 'dateCreated'];
  public pageLength: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getSummaryData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSummaryData() {
    this.authService.getSummary().subscribe((data: any) => {
      this.pageLength = data.length;
      this.dataSource.data = data as ResponseSummaryData[];
    });
  }
}
