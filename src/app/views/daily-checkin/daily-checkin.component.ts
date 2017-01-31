import { Component, OnInit } from '@angular/core';

import { DailyCheckinPM } from '../../PM/daily-checkin';

@Component({
  selector: 'app-daily-checkin',
  templateUrl : './daily-checkin.component.html'
})
export class DailyCheckinComponent implements OnInit {

  constructor(public dcPM: DailyCheckinPM) {
  }

  ngOnInit() {
  }

}