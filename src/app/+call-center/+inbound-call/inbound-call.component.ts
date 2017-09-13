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
  private callStatus: string;

  private startCallTime: any;
  private endCallTime: any;
  private hours: any;
  private minutes: any;
  private seconds: any;

  private startRecording: boolean;
  private endRecording: boolean;
  private _endCall: boolean;
  private employeeName: string;
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private patientDetails: any;
  private patientData: any;
  private patientName: any;
  private patientTelecom: any;
  private patientEmail: any;
  private patientAddress: any;

  private listOfPatients: any;
  private patientList: any;
  private data: any;
  private isPatDataLoading: boolean;

  private callStatusData: any;
  public selectedItem: '';

  form: any = {searchStr: '', searchObjects: [], display: 'none'};


  public items: Array<string> = ['Seton', 'Providence', 'Daughters of Charity', 'Centro', 'Nazareth',
  'John Matthew', 'Sean Paul', 'John Paul', 'John Sena', 'Kyle', 'Justin TimberLake', 'Eminem'];

  constructor(
    private _InboundService: InboundService
  ) {
    this.startRecording = false;
    this.endRecording = false;
    this._endCall = true;
    this.isPatDataLoading = true;
  }

  ngOnInit() {
    this.employeeName = 'Seton';
    this.getPatientData();
    this.getPatientsList();
    this.getCallStatus();
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
      })
  }
  /** this is all patient data */
  public getPatientsList() {
    this.patientList = this._InboundService.getPatientsList()
      .subscribe((response: any) => {
          this.data = response;
          this.isPatDataLoading = false;
          console.log(this.data);
      })
  }
  public getCallStatus() {
    this.patientList = this._InboundService.getCallStatus()
      .subscribe((response: any) => {
          this.callStatusData = response;
          if (this.callStatusData.length > 0) {
              this.selectedItem = this.callStatusData[0]['status'];
          }
          console.log(this.callStatusData);
          console.log(this.selectedItem);
      })
  }
  public displayResults() {
    if (this.form.searchStr.length > 0) {
      this._InboundService.getSearchData(this.form.searchStr)
      .subscribe(
        (response: any) => {
          console.log(this.form.searchStr);
          this.form.searchObjects = response.data;
          this.form.display = 'block';
        }

      )
    } else {
      this.form.searchObjects = [];
    }
  }
  public showStatus(item: any) {
    this.selectedItem = item;
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
  public startCall(event$) {
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
  onWizardComplete(data) {
    alert('oncall loaded!!');
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }
  public typed(value: any): void {
    console.log('New search input: ', value);
  }
  public refreshValue(value: any): void {
    this.value = value;
  }
  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

}
