export class BookingForm {
  constructor() {
    this._bookingConfirmCheckbox = document.getElementById("bookingConfirm");
    this._bookingSubmitBtn = document.getElementById("bookingSubmitBtn");
    this.addEventListener();
  }

  addEventListener() {
    this._bookingConfirmCheckbox.addEventListener(
      "click",
      this.btnState.bind(this),
    );
  }

  btnState() {
    if (this._bookingConfirmCheckbox.checked) {
      this._bookingSubmitBtn.disabled = false;
    } else {
      this._bookingSubmitBtn.disabled = true;
    }
  }
}
