import { Component, OnInit, ViewChild } from '@angular/core';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InboundService } from './inbound-call.service';

import * as moment from 'moment';

declare var $: any;


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

  private $startCallTime: any;
  private $endCallTime: any;
  private $minutes: any;
  private $seconds: any;

  private patientList: any;
  private callStatusData: any;
  private individualDetails: any;
  private callOutComesData: any;
  private selectedContactType: any;
  private selectedGender: any;
  public selectedItem: '';
  public selectedOutCome: '';

  private _startRecording: boolean;
  private _endRecording: boolean;
  private _endCall: boolean;
  private _addPatients: boolean;
  private _showsearchResults: boolean;
  private _loadmetrics: boolean;

  datepickerModel: Date;

  start = moment().subtract(1, 'days');
  end = moment();
  date: Date;
  form: any = { $searchStr: '', searchObjects: [], display: 'none' };

  addPatient: any = {};

  newData: string;

  constructor(
    private _InboundService: InboundService
  ) {
    this._startRecording = false;
    this._endRecording = false;
    this._endCall = true;
    this._showsearchResults = false;
    this._loadmetrics = false;
    this._addPatients = false;
  }

  ngOnInit() {
    this.getCallStatus();
    this.getCallOutComes();
  }
  // public datePicker() {
  //   $(function () {
  //     $('input[id="birthdate"]').daterangepicker({
  //       singleDatePicker: true,
  //       showDropdowns: true,
  //       startDate: this.start,
  //       endDate: this.end,
  //       locale: {
  //         format: 'MM/DD/YYYY'
  //       }
  //     },
  //       function (start, end, label) {
  //         this.date = start.format('MM/DD/YYYY');
  //       });
  //   });
  // }
  public startCall() {
    this._startRecording = true;
    const startTime = new Date();
    this.$startCallTime = startTime.getTime();
    this._endRecording = false;
    this._endCall = false;
  }
  public endCall() {
    this._endRecording = true;
    const endTime = new Date();
    this.$endCallTime = endTime.getTime();

    const diff = this.$endCallTime - this.$startCallTime;
    this.$minutes = Math.floor(diff / 60000);
    this.$seconds = Math.floor(diff / 1000) % 60;
    this._endCall = true;
  }
  public getCallStatus() {
    this.patientList = this._InboundService.getCallStatus()
      .subscribe((response: any) => {
        this.callStatusData = response;
        if (this.callStatusData.length > 0) {
          this.selectedItem = this.callStatusData[0]['status'];
        }
      })
  }
  public displayResults() {
    if (this.form.$searchStr.length > 0) {
      this._InboundService.getSearchData(this.form.$searchStr)
        .subscribe(
        (response: any) => {
          console.log(this.form.$searchStr);
          this.form.searchObjects = response.filter;
          this._showsearchResults = true;
          console.log(this.form.searchObjects);
          this.form.display = 'block';
          this._addPatients = false;
        }
        )
    } else {
      this.form.searchObjects = [];
    }
  }
  public loadMetrics($id: any) {
    this._InboundService.getPatientDetail($id)
      .subscribe(
      (response: any) => {
        this._loadmetrics = true;
        this.individualDetails = response;
        this.selectedContactType = this.individualDetails['preferred_contact_method'];
        console.log(this.individualDetails.first_name);
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
    this._addPatients = true,
    this._loadmetrics = false,
    this.form.display = 'none',
    this.selectedGender = 'Select Gender',
    this.selectedContactType = 'Select Preferred Contact';
    // this.datePicker();
  }
  onAddNewPatient() {
  const newData =
    [{'first_name' : this.addPatient['first_name'],
      'middle_name' :  this.addPatient['middle_name'],
      'last_name' : this.addPatient['last_name'],
      'dob': this.datepickerModel,
      'gender' : this.selectedGender,
      'home_phone' : this.addPatient['home_phone'],
      'work_phone' : this.addPatient['work_phone'],
      'mobile_phone' : this.addPatient['mobile_phone'],
      'email' : this.addPatient['email'],
      'address1' : this.addPatient['address1'],
      'address2' : this.addPatient['address2'],
      'zip' : this.addPatient['zip'],
      'preferred_contact_method' : this.selectedContactType,
    }]
    // console.log(this.datepickerModel);
    this._InboundService.postNewPatient(newData);
  }
  public showContactType(contactMethod: any) {
    this.selectedContactType = contactMethod;
    console.log(this.selectedContactType);
  }
  public showGender(popGender: any) {
    this.selectedGender = popGender;
    console.log(this.selectedGender);
  }
  public showStatus(item: any) {
    this.selectedItem = item;
    console.log(this.selectedItem);
  }
  public showOutCome(item: any) {
    this.selectedOutCome = item;
    console.log(this.selectedOutCome);
  }
  public saveNotes() {
    this.childModal.show();
  }
  public onSavePatientData() {
    this.childModal.show();
  }
  public hideChildModal(): void {
    this.childModal.hide();
  }
  onWizardComplete(data) {
    alert('oncall loaded!!');
  }

}
