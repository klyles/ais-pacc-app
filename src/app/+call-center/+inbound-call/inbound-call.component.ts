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
  `]
})
export class InboundCallComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  // private callStatus: string;

  private $startCallTime: any;
  private $endCallTime: any;
  private $minutes: any;
  private $seconds: any;
  private context: any;
  private individualDetails: any;
  private patientList: any;
  private callStatusData: any;
  private callOutComesData: any;
  private selectedContactType: any;
  private selectedGender: any;
  public selectedState: any;
  private statesList: any;
  private states_list: any;
  private callsList: any;
  private calls_list: any;
  private callsSum: any;
  private patientAge: any;
  public _id: any;
  public newData: any;
  public selectedItem: '';
  public selectedOutCome: '';

  private last_name: string;
  private first_name: string;
  private middle_name: string;
  private gender: string;
  private dob: any;
  private home_phone: string;
  private work_phone: string;
  private mobile_phone: string;
  private email: string;
  private address1: string;
  private address2: string;
  private zip: string;
  private city: string;
  private state: string;
  private preferred_contact_method: string;


  public patID: number;

  private _startRecording: boolean;
  private _endRecording: boolean;
  private _endCall: boolean;
  private _addPatients: boolean;
  private _showsearchResults: boolean;
  private _loadmetrics: boolean;
  private callsListLength: boolean;

  birthdate: Date;
  form: any = { $searchStr: '', searchObjects: [], display: 'none' };
  addPatient: any = {};
  editPatient: any = {};
  constructor(
    private _InboundService: InboundService
  ) {
    this._startRecording = false;
    this._endRecording = false;
    this._endCall = true;
    this._showsearchResults = false;
    this._loadmetrics = false;
    this._addPatients = false;
    this.callsListLength = false;
  }

  ngOnInit() {
    this.getCallStatus();
    this.getCallOutComes();
    this.getStates();
  }
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
  public loadMetrics($id: any) {
    this._InboundService.getPatientDetail($id)
      .subscribe(
      (response: any) => {
        this._loadmetrics = true;
        this.individualDetails = response;
        this.patID = response.id;
        this.selectedContactType = this.individualDetails['preferred_contact_method'];
        this.selectedState = this.individualDetails['state'];
        this.selectedGender = this.individualDetails['gender'];
        this.birthdate = this.individualDetails['dob'];
        this.patientAge = this.getPatAge(this.individualDetails['dob']);
        this.getCalls();
      });
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
          this.form.searchObjects = response.filter;
          this._showsearchResults = true;
          this.form.display = 'block';
          this._addPatients = false;
        }
        )
    } else {
      this.form.searchObjects = [];
    }
  }
  public getCallOutComes() {
    this.patientList = this._InboundService.getCallOutComes()
      .subscribe((response: any) => {
        this.callOutComesData = response;
        if (this.callOutComesData.length > 0) {
          this.selectedOutCome = this.callOutComesData[0]['outcome_desc'];
        }
      })
  }
  public getStates() {
    this.statesList = this._InboundService.getStates()
      .subscribe((response: any) => {
        this.states_list = response;
      })
  }
  public getCalls() {
    this.callsList = this._InboundService.getCalls(this.patID)
      .subscribe((response: any) => {
        this.calls_list = response;
        this.callsSum = this.calls_list.length;
        if (this.calls_list.length > 0) {
          this.callsListLength = true;
        }
      })
  }
  public postCalls() {
    this._id = this.patID;
    const postCallData = {
      'call_start_date_time':  moment(this.$startCallTime).format('MM/DD/YYYY, hh:mm:ss a'),
      'call_stop_date_time':  moment(this.$endCallTime).format('MM/DD/YYYY, hh:mm:ss a'),
    }
    console.log(postCallData);
    this._InboundService.postCallsData(postCallData, this._id);
    this.getCalls();
  }
  public addPatientList() {
    this.context = null;
    this.last_name = '';
    this.first_name = '';
    this.middle_name = '';
    this.home_phone = '';
    this.work_phone = '';
    this.mobile_phone = '';
    this.email = '';
    this.address1 = '';
    this.address2 = '';
    this.zip = '';
    this.city = '';
    this.state = '';
    this.preferred_contact_method = '';

    this.form.display = 'none',
    this.selectedGender = 'Select Gender',
    this.selectedContactType = 'Select Preferred Contact';
    this.selectedState = 'Select State';
    this._addPatients = true;
    this._loadmetrics = false;
  }
  public updatePatientsList(obj: any) {
    this.context = obj;
    this.last_name = this.context.last_name;
    this.first_name = this.context.first_name;
    this.middle_name = this.context.middle_name;
    this.dob = this.birthdate;
    this.selectedGender = this.selectedGender;
    this.home_phone = this.context.home_phone;
    this.work_phone = this.context.work_phone;
    this.mobile_phone = this.context.mobile_phone;
    this.email = this.context.email;
    this.address1 = this.context.address1;
    this.address2 = this.context.address2;
    this.zip = this.context.zip;
    this.city = this.context.city;
    this.selectedState = this.selectedState;
    this.preferred_contact_method = this.preferred_contact_method;
    this._addPatients = true;
    this._loadmetrics = false;
  }
  public onPatientUpdate() {
    this._id = this.patID;
    if (this.context != null) {
      const editData = {
        'last_name': this.last_name,
        'first_name' : this.first_name,
        'middle_name' : this.middle_name,
        'dob': moment(this.birthdate).format('MM/DD/YYYY'),
        'gender': this.selectedGender,
        'home_phone': this.home_phone,
        'work_phone': this.work_phone,
        'mobile_phone': this.mobile_phone,
        'email': this.email,
        'address1': this.address1,
        'address2': this.address2,
        'zip': this.zip,
        'city': this.city,
        'state': this.selectedState,
        'preferred_contact_method': this.selectedContactType
      }
    this._InboundService.putPatientDetails(editData, this._id);
    } else {
    const newData = {
      'first_name' : this.first_name,
      'middle_name' : this.middle_name,
      'last_name': this.last_name,
      'dob': moment(this.birthdate).format('MM/DD/YYYY'),
      'gender': this.selectedGender,
      'home_phone': this.home_phone,
      'work_phone': this.work_phone,
      'mobile_phone': this.mobile_phone,
      'email': this.email,
      'address1': this.address1,
      'address2': this.address2,
      'zip': this.zip,
      'city' : this.city,
      'state': this.selectedState,
      'preferred_contact_method': this.selectedContactType
    }
    this._InboundService.postNewPatient(newData);
    }
  }
  public showContactType(contactMethod: any) {
    this.selectedContactType = contactMethod;
  }
  public showGender(popGender: any) {
    this.selectedGender = popGender;
  }
  public showStatus(status: any) {
    this.selectedItem = status;
  }
  public showState(state: any) {
    this.selectedState = state;
  }
  public showOutCome(callOutCome: any) {
    this.selectedOutCome = callOutCome;
  }
  public saveNotes() {
    this.childModal.show();
  }
  public hideChildModal(): void {
    this.childModal.hide();
  }
  public getPatAge(d: any) {
    const age = moment().diff(d, 'years');
    return age;
  }
  onWizardComplete(data) {
    alert('oncall loaded!!');
  }
}
