import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  showToast: boolean = false;
  toastBody: string = 'This is the content of the toast.';

  private timeoutId: any;

  constructor() { }

  ngOnInit(): void {
  }

  openToast(msg: string): void {
    this.showToast = true;
    this.toastBody = msg;
    // Automatically close the toast after 2 seconds
    this.timeoutId = setTimeout(() => {
      this.closeToast();
    }, 2000);
  }

  closeToast(): void {
    this.showToast = false;

    // Clear the timeout if the close button is clicked before the timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}