import { NgSimplyonPage } from './app.po';

describe('ng-simplyon App', function() {
  let page: NgSimplyonPage;

  beforeEach(() => {
    page = new NgSimplyonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
