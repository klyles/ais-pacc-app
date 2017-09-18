import { Component, OnInit, ViewChild } from '@angular/core';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InboundService } from './inbound-call.service';


@FadeInTop()
@Component({
  selector: 'app-inbound-call',
  templateUrl: './inbound-call.component.html',
  styles: [`
    .step2 li {
      margin: 0.5em;
      border: 1px solid #fff;
      padding: 0.5em;
      background-color: #739e73;
      border-radius: 5px;
      color: #fff;
    }
    li {
      list-style: none;

    }
    ::-webkit-input-placeholder {
      color: #000000;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: #000000;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: #000000;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: #000000;
    }
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }
    input:focus::-moz-placeholder {
      color: transparent;
    }
    input:focus:-ms-input-placeholder {
      color: transparent;
    }
    input:-moz-placeholder { /* Firefox 18- */
      color: #000000;
    }
  `]
})
export class InboundCallComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  // private callStatus: string;

  private startCallTime: any;
  private endCallTime: any;
  private minutes: any;
  private seconds: any;

  private startRecording: boolean;
  private endRecording: boolean;
  private _endCall: boolean;

  // private value: any = {};
  // private _disabledV: string = '0';
  // private disabled: boolean = false;

  private patientDetails: any;
  private patientData: any;
  private patientName: any;
  private patientTelecom: any;
  private patientEmail: any;
  private patientAddress: any;
  private loadmetrics: boolean;

  private patientList: any;
  // public data: any;
  private isPatDataLoading: boolean;
  private addPatients: boolean;

  private callStatusData: any;
  public selectedItem: '';
  private callOutComesData: any;
  public selectedOutCome: '';
  private individualDetails: any;

  public phoneFields: boolean;

  public tab: string = 'callHistory';

  form: any = {searchStr: '', searchObjects: [], display: 'none'};
  private showsearchResults: boolean;


  // public items: Array<string> = ['Seton', 'Providence', 'Daughters of Charity', 'Centro', 'Nazareth',
  // 'John Matthew', 'Sean Paul', 'John Paul', 'John Sena', 'Kyle', 'Justin TimberLake', 'Eminem'];

  constructor(
    private _InboundService: InboundService
  ) {
    this.startRecording = false;
    this.endRecording = false;
    this._endCall = true;
    this.isPatDataLoading = true;
    this.showsearchResults = false;
    this.loadmetrics = false;
    this.addPatients = false;
    this.phoneFields = false;
  }

  ngOnInit() {
   // this.getPatientsList();
    this.getCallStatus();
    this.getCallOutComes();
  }
  public getCallHistory() {
    this.tab = 'callHistory';
  }
  public showPhoneFields() {
    this.phoneFields = true;
  }
  public startCall() {
    this.startRecording = true;
    const startTime = new Date();
    this.startCallTime = startTime.getTime();
    this.endRecording = false;
    this._endCall = false;
  }
  public endCall() {
    this.endRecording = true;
    const endTime = new Date();
    this.endCallTime = endTime.getTime();

    const diff = this.endCallTime - this.startCallTime;
    this.minutes = Math.floor(diff  / 60000);
    this.seconds = Math.floor(diff / 1000) % 60;
    this._endCall = true;
  }
  /** this is all patient data */
  // public getPatientsList() {
  //   this.patientList = this._InboundService.getPatientsList()
  //     .subscribe((response: any) => {
  //         this.data = response;
  //         this.isPatDataLoading = false;
  //         console.log(this.data);
  //     })
  // }
  public getCallStatus() {
    this.patientList = this._InboundService.getCallStatus()
      .subscribe((response: any) => {
          this.callStatusData = response;
          if (this.callStatusData.length > 0) {
              this.selectedItem = this.callStatusData[0]['status'];
          }
          console.log(this.callStatusData);
          console.log(this.selectedItem);
          this.tab = 'callDisposition';
      })
  }
  public getPatientData() {
    this.patientDetails = this._InboundService.getInboundData()
      .subscribe((response: any) => {
        this.patientData = response;
        this.patientName = response.name[0];
        this.patientTelecom = response.telecom[0];
        this.patientEmail = response.telecom[1];
        this.patientAddress = response.address[0];
        console.log(this.patientData);
        this.loadmetrics = true;
      })
  }
  public displayResults() {
    if (this.form.searchStr.length > 0) {
      this._InboundService.getSearchData(this.form.searchStr)
      .subscribe(
        (response: any) => {
          console.log(this.form.searchStr);
          this.form.searchObjects = response.filter;
          this.showsearchResults = true;
          console.log(this.form.searchObjects);
          this.form.display = 'block';
          this.addPatients = false;
        }
      )
    } else {
      this.form.searchObjects = [];
    }
  }
  public loadMetrics(lastName: any) {
    // this.getPatientData();
    this._InboundService.getSearchData(lastName.toLowerCase())
    .subscribe(
      (response: any) => {
        this.individualDetails = response.filter;
        const resultArray = this.individualDetails.map(function (obj) {
          return response.filter[0];
        })
        console.log(resultArray);
      });
  }
  public getCallOutComes() {
    this.patientList = this._InboundService.getCallOutComes()
      .subscribe((response: any) => {
          this.callOutComesData = response;
          if (this.callOutComesData.length > 0) {
              this.selectedOutCome = this.callOutComesData[0]['outcome_desc'];
          }
          console.log(this.callOutComesData);
          console.log(this.selectedOutCome);
      })
  }
  public addPatientsList() {
    this.addPatients = true;
    this.loadmetrics = false;
    this.form.display = 'none';
  }

  public showStatus(item: any) {
    this.selectedItem = item;
  }
  public showOutCome(item: any) {
    this.selectedOutCome = item;
  }
  public onSavePatientData() {
    this.childModal.show();
  }
  public saveNotes(): void {
    this.childModal.show();
  }
  public hideChildModal(): void {
    this.childModal.hide();
  }
  onWizardComplete(data) {
    alert('oncall loaded!!');
  }

  // public removed(value: any): void {
  //   console.log('Removed value is: ', value);
  // }
  // public typed(value: any): void {
  //   console.log('New search input: ', value);
  // }
  // public refreshValue(value: any): void {
  //   this.value = value;
  // }
  // private get disabledV(): string {
  //   return this._disabledV;
  // }

  // private set disabledV(value: string) {
  //   this._disabledV = value;
  //   this.disabled = this._disabledV === '1';
  // }

  // public selected(value: any): void {
  //   console.log('Selected value is: ', value);
  // }

}
