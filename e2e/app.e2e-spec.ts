import { Angular2DashboardPage } from './app.po';

describe('angular2-dashboard App', function() {
  let page: Angular2DashboardPage;

  beforeEach(() => {
    page = new Angular2DashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
