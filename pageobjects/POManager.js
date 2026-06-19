const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { EventPage } = require('./EventPage');
const { BookingPage } = require('./BookingPage');
const { MyBookingPage } = require('./MyBookingPage');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.eventPage = new EventPage(this.page);
        this.bookingPage = new BookingPage(this.page);
        this.MybookingPage = new MyBookingPage(this.page);
    }


    getLoginPage() {
        return this.loginPage;
    }

    getEventPage() {
        return this.eventPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getBookingPage() {
        return this.bookingPage;
    }

    getMyBookingPage() {
        return this.MybookingPage;
    }


}
module.exports = { POManager };